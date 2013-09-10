#!/usr/bin/env python
# This will generate various Bugzilla URLs and download CSV-formatted lists of bug data

import json, glob, urllib, os, urllib2,csv,StringIO
from pprint import pprint

# The URLs will query bugzilla for bugs where EITHER summary OR the URL field matches the regexp
urltemplate = 'https://bugzilla.mozilla.org/buglist.cgi?component=Mobile&f1=bug_file_loc&f2=short_desc&j_top=OR&o1=regexp&o2=regexp&product=Tech%20Evangelism&query_format=advanced&v1=%28\.|^%29{0}&v2=%28\.|^%29{0}&ctype=csv&human=1w&columnlist=bug_id%2Copendate%2Cchangeddate%2Cbug_status%2Cresolution%2Cdependson%2Cstatus_whiteboard%2Cshort_desc%2Ccf_last_resolved%2Cbug_file_loc%2Cpriority'
# Doing a big ccTLD sweep requires a slightly different regexp..
ccTLDurltemplate = 'https://bugzilla.mozilla.org/buglist.cgi?component=Mobile&f1=bug_file_loc&f2=short_desc&j_top=OR&o1=regexp&o2=regexp&product=Tech%20Evangelism&query_format=advanced&v1=.\.{0}([[:>:]]|/)&v2=.\.{0}([[:>:]]|/)&human=1w&columnlist=bug_id%2Copendate%2Cchangeddate%2Cbug_status%2Cresolution%2Cdependson%2Cstatus_whiteboard%2Cshort_desc%2Ccf_last_resolved%2Cbug_file_loc%2Cpriority&ctype=csv'

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
fcount=0
hcount=0
# Iterate over JSON data files (lists of hosts)
for fn in glob.glob('../data/*.json'):
	fcount += 1
	f = open(fn)
	data = json.load(f)
	if 'ccTLD' in data:
		data['data'].append((data['ccTLD'], ccTLDurltemplate))
	data = data['data']
	f.close()
	for hostname in data: #
		if isinstance(hostname, tuple):
			curtemplate = hostname[1]
			hostname = hostname[0]
		else :
			curtemplate = urltemplate
		# Now, we want to create some output files, but if the URL in the JSON file has a pathname having the / is ugly and not cross-platform compatible
		if '/' in hostname:
			outputfn = hostname.replace('/', '_')
		else:
			outputfn = hostname
		# Now, this domain may already have been found in an earlier file. Let's skip ahead if we've already pulled data from bugzilla..
		if os.path.exists('./data/bugzilla/'+outputfn+'.csv'):def loadBugdata(searchword,
			continue
		hcount += 1
		print "List "+str(fcount)+", host "+str(hcount)+", looking for "+hostname+" bugs...\n"
		# if we have an alias, the alias is what we want to search for
		if hostname in aliases :
			searchword = aliases[hostname]
		else :
			searchword = hostname

		# Ready to get the data from Bugzilla
		url = curtemplate.format(searchword.replace('.', '\\.'))
		u = urllib2.urlopen(url)
		csvdata = u.read()
		# Write a CSV file so we have a record of what we got
		f = open('./data/bugzilla/'+outputfn+'.csv', 'w')
		f.write(csvdata)
		f.close()
		# Now, let's do some more data massage..
		csvdatabuf = StringIO.StringIO(csvdata)
		csvlines = csv.DictReader(csvdatabuf)
		outstructure = {hostname:{"resolved":[], "open":[]}}
		for row in csvlines:
			if row['Status'] in ['RESOLVED', 'CLOSED', 'VERIFIED']:
				outstructure[hostname]['resolved'].append(row)
			else :
				outstructure[hostname]['open'].append(row)
			#pprint(outstructure)

		f = open('./data/bugzilla/'+outputfn+'.json', 'w');
		f.write(json.dumps(outstructure, indent=2))
		f.close()
		# If the search returned bugs, add them
		if len(outstructure[hostname]['resolved']) or len(outstructure[hostname]['open']):
			alloutput[hostname]=outstructure[hostname]
	# End of for hostname in data - loop
# End of for file in directory loop
# Make a big file with all the information we found - depending on its size, it might be
# better to load this than to load each site.json file independently

#TODO: consider moving this into the "for file in directory" loop, meaning we write one "allbugs.json" file
# per list of sites. This may be a good compromise between loading tons of small files and one very large,
# however requires some special handling right before the continue in lin 31 (if os.path.exists condition)
# or some per-list files will be missing data
f = open('./data/bugzilla/index.json', 'w')
f.write(json.dumps(alloutput, indent=2))
f.close()

#		quit()

