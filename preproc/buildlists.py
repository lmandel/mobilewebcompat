#!/usr/bin/env python
 # -*- coding: utf-8 -*-
# This will generate various Bugzilla URLs and download/save JSON-formatted lists of bug data

import json, glob, urllib, os, urllib2,csv,StringIO,re
from pprint import pprint
from urlparse import urlparse

os.chdir(os.path.dirname(os.path.abspath(__file__))) # For CRON usage..

# The URLs will query bugzilla for bugs where EITHER summary OR the URL field matches the regexp
urltemplate = 'https://api-dev.bugzilla.mozilla.org/latest/bug?component=Mobile&f1=bug_file_loc&f2=short_desc&j_top=OR&o1=regexp&o2=regexp&product=Tech%20Evangelism&query_format=advanced&v1=%28\.|^%29{0}&v2=%28\.|^%29{0}&include_fields=id,summary,creation_time,last_change_time,status,resolution,depends_on,whiteboard,cf_last_resolved,url,priority' # CSV URL was: 'https://bugzilla.mozilla.org/buglist.cgi?component=Mobile&f1=bug_file_loc&f2=short_desc&j_top=OR&o1=regexp&o2=regexp&product=Tech%20Evangelism&query_format=advanced&v1=%28\.|^%29{0}&v2=%28\.|^%29{0}&ctype=csv&human=1w&columnlist=bug_id%2Copendate%2Cchangeddate%2Cbug_status%2Cresolution%2Cdependson%2Cstatus_whiteboard%2Cshort_desc%2Ccf_last_resolved%2Cbug_file_loc%2Cpriority'
# Doing a "list sites with open bugs for given ccTLD" sweep requires a slightly different regexp..
ccTLDurltemplate = 'https://api-dev.bugzilla.mozilla.org/latest/bug?component=Mobile&f1=bug_file_loc&f2=short_desc&j_top=OR&o1=regexp&o2=regexp&product=Tech%20Evangelism&query_format=advanced&v1=.\.{0}(/|%20|$)&v2=.\.{0}(/|%20|.?$)&o3=substring&f3=status_whiteboard&v3=[country-{0}]&include_fields=id,summary,whiteboard,url&bug_status=UNCONFIRMED&bug_status=NEW&bug_status=ASSIGNED&bug_status=REOPENED' # CSV URL was: 'https://bugzilla.mozilla.org/buglist.cgi?component=Mobile&f1=bug_file_loc&f2=short_desc&j_top=OR&o1=regexp&o2=regexp&product=Tech%20Evangelism&query_format=advanced&v1=.\.{0}(/|%20|$)&v2=.\.{0}(/|%20|.?$)&o3=substring&f3=status_whiteboard&v2=[country-{0}]&human=1w&columnlist=bug_id%2Copendate%2Cchangeddate%2Cbug_status%2Cresolution%2Cdependson%2Cstatus_whiteboard%2Cshort_desc%2Ccf_last_resolved%2Cbug_file_loc%2Cpriority&ctype=csv&bug_status=UNCONFIRMED&bug_status=NEW&bug_status=ASSIGNED&bug_status=REOPENED'

# kill old files?
kill_old_files = 1

# Empty the directory of temporary data files from bugzilla before iterating over data to fetch a new cache
if kill_old_files :
	for fn in glob.glob('./data/bugzilla/*.*'):
		os.unlink(fn)

# read alias file
f = open('data/aliases.json')
aliases = json.load(f)
f.close()
alloutput={}
metrics={'allOpenBugsForAllLists':set(), 'hostsWithOpenBugs':set(), 'totalUniqueHosts':set()}
fcount=0
hcount=0
# Iterate over JSON data files (lists of hosts)
for fn in glob.glob('../data/*.json'):
	if '.cc.json' in fn:
		continue # This loop will add .json files to the directory we're iterating over. We don't want to do this infinitely..
	fcount += 1
	f = open(fn)
	data = json.load(f)
	isCCquery = 0
	if 'ccTLD' in data: # We add a ccTLD query that will make the script pick up bugs for hostnames with this ccTLD
		data['data'].append((data['ccTLD'], ccTLDurltemplate))
	f.close()
	for hostname in data['data']: #
		if isinstance(hostname, tuple):
			# sorry that this is a bit ugly. It's hacked on afterwards, and that shows.
			curtemplate = hostname[1]
			hostname = hostname[0]
			isCCquery = 1
		else :
			curtemplate = urltemplate
			isCCquery = 0
		# Now, we want to create some output files, but if the URL in the JSON file has a pathname having the / is ugly and not cross-platform compatible
		if '/' in hostname:
			outputfn = hostname.replace('/', '_')
		else:
			outputfn = hostname
		pprint(outputfn)
		# Now, this domain may already have been found in an earlier file. Let's skip ahead if we've already pulled data from bugzilla..
		if os.path.exists('./data/bugzilla/'+outputfn+'.csv'):
			continue
		hcount += 1
		print "List "+str(fcount)+" - "+fn+", host "+str(hcount)+", looking for "+hostname+" bugs...\n"
		# if we have an alias, the alias is what we want to search for
		if hostname in aliases :
			searchword = aliases[hostname]
		else :
			searchword = hostname

		# Ready to get the data from Bugzilla
		url = curtemplate.format(searchword.replace('.', '\\.'))
		req = urllib2.Request(url)
		req.add_header('Accept', 'application/json')
		bzresponse = urllib2.urlopen(req)
		bzdata = bzresponse.read()
		bzdataobj = json.loads(bzdata)
		# Write a CSV file so we have a record of what we
		print 'Writing '+outputfn+'.json'
		f = open('./data/bugzilla/'+outputfn+'.json', 'w')
		f.write(json.dumps(bzdataobj, indent=2))
		f.close()
		# Returned JSON has .bugs which is an array of objects with fields: {cf_last_resolved, creation_time,id,status,summary,priority,resolution}
		# Now, let's do some more data massage..
		if isCCquery :
			# We want to extract host names for all open *.ccTLD bugs and add them to data
			# this is to make sure we catch locale sites that Alexa doesn't care about, but
			# which matter enough to our users that bugs are reported
			for row in bzdataobj['bugs']:
				# We need to extract a host name from either URL or Summary
				text = row['url'].strip() or row['summary']
				#pprint(text)
				ccHost = ''
				if re.search( '\s', text) : # summary, we need to do some more work here to extract the domain from the text..
					text = re.split('\s', text)
					for word in text :
						word = word.strip('.') # make sure we don't assume a random 'foo.' is a domain due to a sentence-delimiting dot in summary..
						if '.' in word: # now go on to assume the first white-space separated string that contains at least one internal period is a domain name
							ccHost = word
							break
				else :
					ccHost = text

				if re.search('https?:\/\/', ccHost):
					ccHost = urlparse(ccHost)[1]
					#print 'urlpars\'d '+ccHost
				if ccHost == '': # we didn't find any host name here..
					continue
				# Elsewhere in the data files, domain names are typically www-less ...
				ccHost = re.sub('^www\.', '', ccHost)
				#print 'found ccHost: '+ccHost
				if not ccHost in data['data']:
					print 'Found new host with ccTLD search: '+ccHost
					pprint(ccHost)
					data['data'].append(ccHost) # the for hostname in data loop will get to this item too and fetch bug info for the domain
		else :
			outstructure = {hostname:{"resolved":[], "open":[]}}
			metrics['totalUniqueHosts'].add(hostname)
			for row in bzdataobj['bugs']:
				if row['status'] in ['RESOLVED', 'CLOSED', 'VERIFIED']:
					outstructure[hostname]['resolved'].append(row)
				else :
					outstructure[hostname]['open'].append(row)
					metrics['allOpenBugsForAllLists'].add(row['id'])
					metrics['hostsWithOpenBugs'].add(hostname)
				#pprint(outstructure)

			f = open('./data/bugzilla/'+outputfn+'.json', 'w');
			f.write(json.dumps(outstructure, indent=2))
			f.close()
			# If the search returned bugs, add them
			if len(outstructure[hostname]['resolved']) or len(outstructure[hostname]['open']):
				alloutput[hostname]=outstructure[hostname]
	# End of for hostname in data - loop. Got to Karl's Nirvana.
	# we may have found some new, never seen before ccTLD sites with open bugs.
	# As we've extended the list of relevant domains, let's save it.
	for hostname in data['data']:
		if isinstance(hostname, tuple):
			data['data'].remove(hostname) # we don't want this tuple included when dumping the extended host name list to file...
	f = open(fn.replace('.json', '.cc.json'), 'w')
	f.write(json.dumps(data, indent=2))
	f.close()
# Calculate metrics
alloutput['metrics'] = {"numOpenBugs":len(metrics['allOpenBugsForAllLists']), "numHosts":len(metrics['totalUniqueHosts']), "numHostsWithOpenBugs":len(metrics['hostsWithOpenBugs'])}


# End of for file in directory loop
# Make a big file with all the information we found - depending on its size, it might be
# better to load this than to load each site.json file independently

#TODO: consider moving this into the "for file in directory" loop, meaning we write one "allbugs.json" file
# per list of sites. This may be a good compromise between loading tons of small files and one very large,
# however requires some special handling right before the continue in lin 31 (if os.path.exists condition)
# or some per-list files will be missing data
f = open('../data/masterbugtable.js', 'w')
f.write('/* This file is generated by preproc/buildlists.py - do not edit */\nvar masterBugTable = '+json.dumps(alloutput, indent=2))
f.close()

#		quit()

