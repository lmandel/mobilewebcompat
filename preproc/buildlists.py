#!/usr/bin/python

# Other possible sources of tech evang bugs:
# http://code.google.com/p/chromium/issues/csv?can=2&q=label%3ANeeds-Evangelism&colspec=ID%20Pri%20M%20Iteration%20ReleaseBlock%20Cr%20Status%20Owner%20Summary%20OS%20Modified
# https://bugs.webkit.org/buglist.cgi?bug_file_loc=&bug_file_loc_type=allwordssubstr&bug_id=&bug_status=UNCONFIRMED&bug_status=NEW&bug_status=ASSIGNED&bug_status=REOPENED&bugidtype=include&chfieldfrom=&chfieldto=Now&chfieldvalue=&component=Evangelism&email1=&email2=&emailassigned_to1=1&emailassigned_to2=1&emailcc2=1&emailreporter2=1&emailtype1=substring&emailtype2=substring&field-1-0-0=component&field-1-1-0=bug_status&field0-0-0=noop&keywords=&keywords_type=allwords&long_desc=&long_desc_type=substring&query_format=advanced&remaction=&short_desc=&short_desc_type=allwordssubstr&type-1-0-0=anyexact&type-1-1-0=anyexact&type0-0-0=noop&value-1-0-0=Evangelism&value-1-1-0=UNCONFIRMED%2CNEW%2CASSIGNED%2CREOPENED&value0-0-0=&ctype=csv
# https://bazaar.launchpad.net/~phablet-team/webbrowser-app/trunk/view/head:/src/Ubuntu/Components/Extras/Browser/ua-overrides.js
# Browser.js for Opera (from Github)
# https://github.com/operasoftware/browserjs/blob/master/OPRdesktop/
# https://github.com/operasoftware/browserjs/blob/master/desktop/spoofs.xml (old!)
# IE's compatview lists

import json, glob, urllib, os, urllib2,csv,StringIO,re, sys, time
from pprint import pprint
from urlparse import urlparse
import socket
socket.setdefaulttimeout(240) # Seconds. Loading Bugzilla searches can be slow

if os.path.exists('/home/hallvors/lib'): # custom path for tldextract module on hallvord.com host.
    sys.path.insert(1, '/home/hallvors/lib/tldextract-1.2-py2.6.egg') # TODO: remove or fix this for people.mozilla :)
import tldextract

os.chdir(os.path.dirname(os.path.abspath(__file__))) # For CRON usage..
# We generally want to handle the main domains (i.e. google.com for www.google.com) instead of the full host names
# however, for some major sites with lots of distinct properties we loose too much useful information if we classify it just by domain name..
# conf['weWantSubdomainsFor'] is a list of hostnames that should not be reduced to domain names. For these, we'll strip any *www.* prefix, but
# no other subdomains. (Another option is to only strip www - might work too)
conf = { 'weWantSubdomainsFor': r'(\.google\.com|\.live\.com|\.yahoo\.com|go\.com|\.js$)' } # the latter is not, strictly speaking, a subdomain..

# http://stackoverflow.com/questions/8230315/python-sets-are-not-json-serializable :-(
class SetEncoder(json.JSONEncoder):
    def default(self, obj):
       if isinstance(obj, set):
          return list(obj)
       return json.JSONEncoder.default(self, obj)

f = open('data/aliases.json')
aliases = json.load(f)
f.close()

masterBugTable = {'hostIndex':{}, 'bugs':{}, 'lists':{}}

def main():
	urltemplate = 'https://api-dev.bugzilla.mozilla.org/latest/bug?component=Mobile&product=Tech%20Evangelism&component=Desktop&include_fields=id,summary,creation_time,last_change_time,status,resolution,depends_on,whiteboard,cf_last_resolved,url,priority' # removed ",flags" to work around bugzilla bug..
	bzdata = get_remote_file(urltemplate, True)
	bzdataobj = json.loads(bzdata)

	# reading our lists of regionally important sites
	for fn in glob.glob('..' + os.sep +'data' + os.sep + '*.json'):
		f = open(fn)
		data = json.load(f)
		f.close()
		listname = os.path.splitext(os.path.basename(fn))[0]

		if listname:
			masterBugTable['lists'][listname] = data
			masterBugTable['lists'][listname]['metrics']={'numOpenBugs':0, 'numClosedBugs':0}
		f.close()
	metrics={'allOpenBugsForAllLists':set(), 'hostsWithOpenBugs':set(), 'totalUniqueHosts':set()}

	for bug in bzdataobj['bugs']:
		if re.search(r'\[meta\]', bug['summary'], re.I) : # We don't care about [meta] stuff. Why? Well, we're post-post-modern, that's why.
			continue
		masterBugTable['bugs'][bug['id']] = bug;
		# extract host names:
		hostnames = set()
		if 'url' in bug:
			hostnames = hostsFromText(bug['url']) # extract host name from URL field
		if 'summary' in bug:
			hostnames = hostnames.union(hostsFromText(bug['summary'])) # ...and extract host name(s) from summary
		#
		for host in hostnames:
			if not host in masterBugTable['hostIndex']:
				masterBugTable['hostIndex'][host] = {'open':[], 'resolved':[]}
				metrics['totalUniqueHosts'].add(host)

			if bug['status'] in ['RESOLVED', 'CLOSED', 'VERIFIED'] :
				masterBugTable['hostIndex'][host]['resolved'].append(bug['id'])
			else:
				masterBugTable['hostIndex'][host]['open'].append(bug['id'])
				metrics['allOpenBugsForAllLists'].add(bug['id'])
				metrics['hostsWithOpenBugs'].add(host)
			# Done looking at bug status, updating structures and calculating metrics
		# Done processing each host mentioned for this bug
	# Done processing all bugs in the data dump, one at a time
	#get_ie_data()
	# Calculate metrics
	# total metrics - all lists
	masterBugTable['metrics'] = {"numOpenBugs":len(metrics['allOpenBugsForAllLists']), "numHosts":len(metrics['totalUniqueHosts']), "numHostsWithOpenBugs":len(metrics['hostsWithOpenBugs'])}
        masterBugTable['timestamp'] = time.time()
	# local metrics..
	for the_list in masterBugTable['lists']:
		the_list_data = masterBugTable['lists'][the_list]
		for domain in the_list_data['data']:
			if str(domain) in masterBugTable['hostIndex']:
				the_list_data['metrics']['numOpenBugs'] += len(masterBugTable['hostIndex'][domain]['open'])
				the_list_data['metrics']['numClosedBugs'] += len(masterBugTable['hostIndex'][domain]['resolved'])
	# Write a JS(ON) file
	print 'Writing masterbugtable.js'
	f = open('../data/masterbugtable.js', 'w')
	f.write('/* This file is generated by preproc/buildlists.py - do not edit */\nvar masterBugTable = '+json.dumps(masterBugTable, indent=2, cls=SetEncoder))
	f.close()
	return;

def hostsFromText(text):
	#  We need to extract any hosts names mentioned in
	#    a) URL field
	#    b) Summary
	#    c) Alias words from aliases.json (i.e. "Hotmail" in summary -> file under live.com)
	#  Also, we want domain names without subdomains (no www. or m. prefixes, for example)
	#  This is a generic method to extract one or more domain names from a text string - the argument can be a URL or some text with a host name mentioned
	text = text.strip().lower()
	hosts = []
	text = re.split('\s', text)

	for word in text:
		word = word.strip('.()!?,[]') # make sure we don't assume a random 'foo.' is a domain due to a sentence-delimiting dot in summary.. Also removing some other characters that might be adjacent..
		if '.' in word and not '][' in word: # now go on to assume the first white-space separated string that contains at least one internal period is a domain name
		# above if excludes words that contain ][ to avoid grabbing parts of the [foo][e.me] labels used in bugzilla
			hosts.append(word)
		else : #
			for hostname in aliases:
				if aliases[hostname] in word:
					#print ('alias match '+hostname+' in '+word+' '+' '.join(text))
					hosts.append(hostname)
	# now we've listed any words/character sequences that contain internal dots.
	# However, we do not want www. or m. or similar prefixes, so we'll run through the list and use
	# tldextract to remove those
	uniquehosts = set()

	for hostname in hosts:
		parts = tldextract.extract(hostname)
		if parts.domain == '' or parts.domain == 'www':
			hostname = parts.suffix # Hello blogspot.com and friends..
		else:
			if re.search(conf['weWantSubdomainsFor'], hostname, re.I) and not re.search('^www', parts[0]):
				hostname = '.'.join(parts[0:3])
			else:
				hostname = '.'.join(parts[1:3])

		uniquehosts.add(hostname)

	# That's it! (We hope..)
	return uniquehosts

def get_remote_file(url, req_json=False):
	pprint('Getting '+url)
	req = urllib2.Request(url)
	if req_json:
		req.add_header('Accept', 'application/json')
#	req.add_header('User-agent', 'Mozilla/5.0 (Windows NT 5.1; rv:27.0) Gecko/20100101 Firefox/27.0')
	bzresponse = urllib2.urlopen(req, timeout=240)
	return bzresponse.read()

def get_ie_data():
	# IE site patching lists:
	iecvlist = 'https://iecvlist.microsoft.com/ie10/201206/iecompatviewlist.xml'
	import xml.etree.ElementTree as ET
	xmltree = ET.fromstring(get_remote_file(iecvlist))
	#iedata = {'hostIndex':{}, 'bugs':{}, 'lists':{'iecvlist':[]}}
	masterBugTable['lists']['iecvlist'] = {"data":[], "metrics":{"numOpenBugs": 0,"numClosedBugs": 0}}
	i=1
	for child in xmltree:
		if child.tag == 'domain':
			host = child.text.strip()
			masterBugTable['lists']['iecvlist']['data'].append(host)
			bug_id = 'IE-%i'%i
			mode = '['+child.attrib['docMode']+']' if 'docMode' in child.attrib else ''
			if len(child.attrib.keys()) == 0:
				mode = '[renders in IE7-standard-mode or IE5-quirks-mode, depends on doctype]'
			feat = '['+child.attrib['featureSwitch']+']' if 'featureSwitch' in child.attrib else ''
			uaString = '['+child.attrib['uaString']+']' if 'uaString' in child.attrib else ''
			masterBugTable['bugs'][bug_id] = {
				"status":"NEW",
			      "whiteboard": "%s %s %s" % (mode, feat, uaString),
			      "url": "http://%s" % host,
			      "depends_on": "",
			      "last_change_time": "",
			      "creation_time": "",
			      "summary": "%s is on Internet Explorer compatibility view list %s %s %s" % (host, mode, feat, uaString),
			      "priority": "--",
			      "id": bug_id,
			      "resolution": "",
			      "cf_last_resolved": "",
			      "bug_link": iecvlist
			}
			if not host in masterBugTable['hostIndex']:
				masterBugTable['hostIndex'][host] = {"open":[], "resolved":[]}
			masterBugTable['hostIndex'][host]["open"].append(bug_id)
			i+=1

if __name__ == "__main__":
    main()
