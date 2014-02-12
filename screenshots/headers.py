#!/usr/bin/env python
import cgi
from os import environ
import cgitb
cgitb.enable()
import argparse
import requests

UAS = {
    "b2g": "Mozilla/5.0 (Mobile; rv:18.1) Gecko/18.1 Firefox/18.1", 
    "fxa": "Mozilla/5.0 (Android; Mobile; rv:26.0) Gecko/26.0 Firefox/26.0"
}


def make_request(url, ua):
    session = requests.Session()
    session.headers.update({'User-Agent': ua})
    session.headers.update({'Cookies': None})
    session.headers.update({'Cache-Control': 'no-cache, must-revalidate'})
    r = session.get(url, allow_redirects=False)
    return r


def dump(response, output):
    wanted_headers = ['content-length', 'location', 'content-type']
    output.append("Response for: '{}'\n".format(response.request.headers['user-agent']))
    output.append("Response Status: {}\n".format(response.status_code))
    for key, value in response.headers.iteritems():
        if key in wanted_headers:
            output.append("{}: {}\n".format(key, value))
    output.append("\n")

def check_url(url, iteration=0):
    responses = []
    for ua in UAS.itervalues():
        response = make_request(url, ua)
        responses.append(response)
        # dump(response)
    # Now compare selected responses..
    output = []
    try:
        biggest_cl = int(max(responses[0].headers['content-length'], responses[1].headers['content-length']))
        difference = abs(int(responses[0].headers['content-length']) - int(responses[1].headers['content-length']))
        if biggest_cl > 0:
            if int(float(difference) / float(biggest_cl)*100 ) > 10: 
                output.append('Significant difference in source code:\nResponse sent to Firefox OS has Content-Length: '+responses[0].headers['content-length']) 
                output.append('\nResponse sent to Firefox Android has Content-Length: '+responses[1].headers['content-length']+'\n')
    except Exception,e:
        pass
    try:
        if 'location' in responses[0].headers and not 'location' in responses[1].headers:
            output.append('\nFirefox OS redirected to '+responses[0].headers['location']+', Firefox for Android not redirected\n')
        elif 'location' in responses[1].headers and not 'location' in responses[0].headers:
            output.append('\nFirefox Android redirected to %s, Firefox OS not redirected' % str(responses[1].headers['location']))
        elif 'location' in responses[1].headers and 'location' in responses[0].headers:
            if responses[1].headers['location'] != responses[0].headers['location']:
                output.append('\nFirefox Android redirected to '+responses[0].headers['location']+', Firefox OS redirected to '+responses[1].headers['location'])
            elif responses[1].headers['location'] == responses[0].headers['location']:
                if iteration == 0: # follow redirects only once
                    return check_url(responses[1].headers['location'], 1)

        if len(output)>0:
            output.append('\n\nSelected HTTP response headers:\n\n')
            dump(responses[0], output)
            dump(responses[1], output)
    except Exception,e:
        print e
        return []

    return output
