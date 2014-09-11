// timelines.js sorts out the time lines for
// a) Site lists
// b) Individual sites
/*{
        "status": "RESOLVED",
        "whiteboard": "",
        "url": "http://msnbc.msn.com",
        "depends_on": "",
        "last_change_time": "2013-01-16T05:46:56Z",
        "creation_time": "2012-06-08T08:22:00Z",
        "summary": "Only the right half of the picture is loaded when advancing through the picture slideshows at msnbc.com",
        "priority": "--",
        "id": 762810,
        "resolution": "WORKSFORME",
        "cf_last_resolved": "2012-09-27 08:24:22"
      }
*/

var flagThesePris =  {'P1':1,'P2':2}
var bz_show_bug = 'https://bugzilla.mozilla.org/show_bug.cgi?id=';
var bz_list_specific_bug = 'https://bugzilla.mozilla.org/buglist.cgi?bug_id=';
var resolvedStates = {'RESOLVED':1,'CLOSED':1,'VERIFIED':1};
var alexaGlobalTreshold = 4;
var testResults = {}; // automated test results, per bug
var manualTestResults = {}; // manual test results, per site, will contain a list of "ok" flags for a specific date/browser
// some variables related to calculating Alexa metrics..
var alexaListsUniqueHosts = {}, alexaListsUniqueHostsWithOpenBugs={}, uniqueAlexaListedBugs={};
masterBugTable.metrics.failingTests = 0;
if('ontouchstart' in window){document.documentElement.classList.add('touch_friendly');} // show links always rather than on hover if touch..
retrieveTestIndex(fillTables, regressionTable);
function fillTables() {
	var parent_div = document.getElementById('details');
	if(parent_div === null)return window.onload = fillTables;
	var table = parent_div.appendChild(document.createElement('table')), row, a;
	table.border=1;
	table.className = 'list-master-table';
	table = table.appendChild(document.createElement('tbody'));
	row = table.appendChild(document.createElement('tr'));
	row.appendChild(document.createElement('th')).appendChild(document.createTextNode('Category'));
	row.appendChild(document.createElement('th')).appendChild(document.createTextNode('Number of sites'));
	row.appendChild(document.createElement('th')).appendChild(document.createTextNode('Status'));
	row.lastChild.width="70%";
	for(var listnum=0, list; list=topLists[listnum]; listnum++){
		constructListRows(table, list)

		var data = masterBugTable.lists[list.id].data;
		var id=list.id, tr = document.getElementById('row-'+id), ccTLD = masterBugTable.lists[list.id].ccTLD;
		// one round purely for Alexa-related metrics, before we mix in the non-Alexa domains..
		for(var i = 0, site; site = data[i]; i++){
			if( ! (site in alexaListsUniqueHosts) )  alexaListsUniqueHosts[site] = 1;
			if(masterBugTable.hostIndex[site] && masterBugTable.hostIndex[site].open.length){
				alexaListsUniqueHostsWithOpenBugs[site]=1;
				masterBugTable.hostIndex[site].open.forEach(function(id){uniqueAlexaListedBugs[id]=1});
			}
		}
		if(ccTLD){
			// We love local stuff. Let's add up all domains with this TLD
			for(var site in masterBugTable.hostIndex){
				if( site.indexOf('.'+ccTLD)>-1 && site.indexOf('.'+ccTLD) + ccTLD.length === site.length-1 ){ // we found a name that ends with our ccTLD
					if(data.indexOf(site)==-1)data.push(site);
				}
			}
		}
		tr.getElementsByTagName('td')[0].textContent = data.length+' sites. ';
		calculateListDetails(tr, list, true)
		if(location.hash && location.hash.indexOf(list.id)>-1)showListDetails(location.hash.substr(1), true);
	} // end of toplist loop
	if(masterBugTable.metrics){
		var numUniqueAlexaHosts = Object.keys(alexaListsUniqueHosts).length;
		var numHostsWithOpenBugs = Object.keys(alexaListsUniqueHostsWithOpenBugs).length;
		var numOpenBugsOnAlexaLists = Object.keys(uniqueAlexaListedBugs).length;
		var percOfHostsHaveBugs = parseInt((numHostsWithOpenBugs / numUniqueAlexaHosts ) * 100), m;
		(m=document.getElementById('metrics')).appendChild(document.createTextNode('There are '))
		m.appendChild(elm('b', numOpenBugsOnAlexaLists));
		m.appendChild(document.createTextNode(' open bugs on listed sites, '))
		m.appendChild(elm('b', percOfHostsHaveBugs));
		m.appendChild(document.createTextNode('% of listed sites are affected. We are tracking ' ))
		m.appendChild(elm('b', numUniqueAlexaHosts));
		m.appendChild(document.createTextNode(' sites across ' ))
		m.appendChild(elm('b', Object.keys(masterBugTable.lists).length));
		m.appendChild(document.createTextNode(' lists. '));
		m.appendChild(document.createTextNode(' There are '));
		m.appendChild(elm('b', masterBugTable.metrics.numOpenBugs-numOpenBugsOnAlexaLists));
		m.appendChild(document.createTextNode(' open bugs on sites we don\'t currently track.'));
		/*, and '))
		for(var bug in testResults){
			var numTests = testResults[bug].length;
			if(testResults[bug][numTests-1][3] !== true)masterBugTable.metrics.failingTests++;
		}
		m.appendChild(document.createElement('b')).appendChild(document.createTextNode(masterBugTable.metrics.failingTests))
		m.appendChild(document.createTextNode(' tests fail'))*/
                quickSearchInit();
	}
}
window.onhashchange = function(e){
	var newHash = e.newURL.substr(e.newURL.indexOf('#')+1);
	if(newHash.indexOf('list:custom')===-1)showListDetails(newHash, true); // custom list hash will be handled in quickSearchInit()
	// removing and adding lots of content in document from hashchange event tends to mess up "scroll to #hash" logic in browsers
	// let's fix that again with a little help from jQuery..
	if(newHash && document.getElementById(newHash))setTimeout(function(){
		$(document.documentElement).animate({scrollTop:$(document.getElementById(newHash).previousSibling).offset().top}, 10);
	}, 10);
}

function updateTodoRow(div, todos, direction){
	var idx = 0;
	var a = div.getElementsByTagName('a')[0];
	var currentTodo = a.firstChild.data;
	if(currentTodo === ''){
		idx = 0;
	}else{
		for(;idx<todos.length;idx++){
			if(currentTodo === todos[idx][0])break;
		}
	}

	if(direction){
		idx+=direction;
		if(idx === -1)idx = todos.length-1; // only if direction is -1, jump to last
	}else{
		idx ++;
	}

	if(idx === -1 || idx >= todos.length){
		idx = 0;
	}else{
	}
	a.firstChild.data = todos[idx][0];
	a.href = bz_show_bug + todos[idx][1];
	var counter = div.getElementsByTagName('span')[0] || div.appendChild(document.createElement('span'));
	counter.textContent=' ('+(idx+1)+'/'+todos.length+')';
}

function regressionTable(){
	// boast or cry when tests have changed state..
	// indexes: 0 bug number, 1 date, 2 UA string, 3 status
	var shifts = [], ids = [];
	for(var bug in testResults){ // test results are sorted chronologically descending, last result *first*
		if(!(bug in masterBugTable.bugs)){console.log('We\'re missing info for bug ' + bug + ' - likely not in Tech Evang::Mobile'); continue;}
		var str = '', i=0, type = '';
		var resolved = masterBugTable.bugs[bug].status in resolvedStates;
		// let's list details of all bugs whose last test result does not match the bug's state
		if (resolved && testResults[bug][0][3] !== "true") {
			if (masterBugTable.bugs[bug].resolution in {'WONTFIX':1, 'INVALID':1, 'DUPLICATE':1}) {
				continue; // we don't care if wontfixed bugs fail
			};
			// don't complain about bugs that were updated (presumably closed) AFTER the test ran
			var change_time = fxFixDate(masterBugTable.bugs[bug].cf_last_resolved), test_time = fxFixDate(testResults[bug][i][1]);
			if(change_time.getTime() - test_time.getTime() > 0)continue;
			// cry! Reopen me (or fix this borked test)!
			type = 'regr';
			str = 'Might have regressed (or test is bad)';
		}else if(testResults[bug][0][3] === "true" && !resolved){
			// yay! Close me!
			type = 'fix';
			str = 'Might be fixed (or test is optimistic..)'
		}
		if(type){
			shifts.push({dsc:str, date:testResults[bug][i][1], newState:testResults[bug][i][3], type:type, bug:bug, comment:testResults[bug][i][5]});
			ids.push(bug);
		}
	}
	shifts.sort( function(a,b){ if((new Date(a.date.replace(/\s/, 'T'))).getTime()<(new Date(b.date.replace(/\s/, 'T'))).getTime())return 1; return -1; } ); // sort chronologically descending (most recent first)

	if(shifts.length){
		// Test data extra processing
		var t = document.body.insertBefore(document.createElement('table'), document.getElementsByTagName('footer')[0]), tb, tr, td;
		t.classList.add('test-result-changes-table');
		var tb = t.appendChild(document.createElement('tbody'));
		var tr = tb.appendChild(document.createElement('tr'));
		tr.innerHTML = '<th colspan="4"><h2>Interesting test results</h2> (' + shifts.length + ' entries)<br>These tests can be reviewed <a href="https://github.com/hallvors/sitecomptester-extension/blob/master/data/sitedata.js">in the sitecomptester Github repo</a> (search for the bug number). Many are automatically generated (and thus sometimes of poor quality). Review and test fixes welcome.</th>';
		var tr = tb.appendChild(document.createElement('tr'));
		tr.innerHTML = '<th>Bug</th><th>Status</th><th>Tested</th><th></th>';

		for(var i=0, a; i<shifts.length; i++){
			bug = shifts[i].bug;
			tr = tb.appendChild(document.createElement('tr'));
			if(shifts[i].type)tr.classList.add(shifts[i].type);
			a = tr.appendChild(elm('th', '', {className:'title'})).appendChild(elm('a', bug +' '+(masterBugTable.bugs[bug]?masterBugTable.bugs[bug].summary:''), {href:bz_show_bug+bug} ));
			a.parentNode.appendChild(elm('br'));
			a.parentNode.appendChild(elm('a', 'View test code', {onclick:showTestCode, className:'viewcode', href:'https://github.com/hallvors/sitecomptester-extension/blob/master/data/sitedata.js#'+bug })); /* this hash is a noop on GitHub, sorry.. */
			td = tr.appendChild(elm('td'));
			td.appendChild(elm('p', masterBugTable.bugs[bug]?masterBugTable.bugs[bug].status+' '+masterBugTable.bugs[bug].resolution : 'unknown'));

			td = tr.appendChild(elm('td'));
			td.appendChild(elm('p', timeSince(shifts[i].date)  +' ago. '));

			td = tr.appendChild(elm('td'));
			if(shifts[i].type)td.className = shifts[i].type;
			var desc = shifts[i].newState in {'false':1,'true':1} ? shifts[i].dsc : shifts[i].newState
			td.appendChild(elm('p', desc+(shifts[i].comment?'\n'+shifts[i].comment:'')));
		}
		if(window.console)console.log(ids.join(' ')); // this simplifies a re-run of all "interesting" results
	}
}

function showTestCode(evt){
	var bug = evt.target.hash.substr(1);
	if(bugdata && bugdata[bug]){
		evt.preventDefault();
		var div = elm('div', 'To run the test, try pasting this code in the console after spoofing as '+ bugdata[bug].ua +' and loading ', {id:'testcodeviewer'});
		div.appendChild(elm('a', bugdata[bug].url, {href:bugdata[bug].url, target:'_blank'}));
		var insertCode = (bugdata[bug].testType === 'xhr') ? 'var response, xhr = new XMLHttpRequest(); xhr.open("GET", "' + bugdata[bug].url+'", false); response = {text:xhr.responseText, headers:{}}; var tmp = xhr.getAllResponseHeaders().split(/\r\n/i);for(var i=0, nv; nv=tmp[i]; i++){nv = nv.split(/:\s?/); response.headers[nv[0]]=nv[1];}' : '';
		var pre = elm('pre', '(function(){\n\tvar i=1, steps = [\n\n' + bugdata[bug].steps.join('\n\n') + '\n]\n\n'+insertCode+'\n\tfunction doStep(){ if(typeof hasViewportMeta !== "function"){var s=document.body.appendChild(document.createElement(\'script\')); s.src=\'http://hallvord.com/temp/moz/stdTests.js\'; s.onload = doStep; return;};if(steps.length){var result = steps[0](); console.log(\'test step \'+i+\' says: \'+result); if(result !==\'delay-and-retry\')steps.shift(); i++; setTimeout(doStep,300);}} doStep();})()');
		div.appendChild(pre);
		pre.onclick = function(){
			var rng = document.createRange();
			rng.selectNodeContents(pre);
			window.getSelection().addRange(rng);
		}
		div.appendChild(elm('a', 'close', {href:'#', onclick:function(evt){evt.preventDefault();div.parentNode.removeChild(div)}}));
		div.addEventListener('keydown', function(e){if(e.keyCode === 27)div.parentNode.removeChild(div);}, false);
		document.body.appendChild(div);
	}
}

function showListDetails(newHash, excludeUS){
	$('.active').removeClass('active');
	var detailsrow = document.getElementById(newHash);
	var list = newHash.substring(5);
	if(!detailsrow)throw 'Details TR not found for '+newHash;
	// removing and adding lots of content in document from hashchange event tends to mess up "scroll to #hash" logic in browsers
	// let's fix that again with a little help from jQuery..
	if(newHash && document.getElementById(newHash))setTimeout(function(){
		var row = detailsrow.previousSibling && detailsrow.previousSibling.tagName === 'TR' ? detailsrow.previousSibling : detailsrow;
		if(row.scrollIntoView){
			row.scrollIntoView();
		}else{
			$(document.documentElement).animate({scrollTop:$(row).offset().top}, 10);
		}
	}, 10);
	if(!detailsrow.firstChild.hasChildNodes()){
		var td = detailsrow.firstChild;
		var table =  td.appendChild(document.createElement('table'));
		var thead = table.appendChild(document.createElement('thead'));
		thead.innerHTML = '<tr class="tabs"><td colspan="3"></td></tr>';
		thead.rows[0].cells[0].appendChild(elm('a','Open bugs', {href:"#", onclick:function(){table.classList.remove('closed');table.classList.remove('no_bugs'); table.classList.add('open');return false;}}));
		thead.rows[0].cells[0].appendChild(elm('a','Closed bugs', {href:"#", onclick:function(){table.classList.remove('open');table.classList.remove('no_bugs'); table.classList.add('closed');return false;}}));
		thead.rows[0].cells[0].appendChild(elm('a','No bugs', {href:"#", onclick:function(){table.classList.remove('closed');table.classList.remove('open'); table.classList.add('no_bugs');return false;}}));
		table.className = 'list-details-subtable open';
		openTable = table.appendChild(document.createElement('tbody'));
		openTable.className = 'open';
		var closedTable = table.appendChild(document.createElement('tbody'));
		closedTable.className = 'closed';
		var noBugsTable = table.appendChild(document.createElement('tbody'));
		noBugsTable.className = 'no_bugs';
		masterBugTable.lists[list].data.forEach(function(host, index){
			var add_to_table;
			if((! (host in masterBugTable.hostIndex)) || (masterBugTable.hostIndex[host].resolved.length === 0 && masterBugTable.hostIndex[host].open.length === 0) ){
				// we don't know anything about this site..
				add_to_table = noBugsTable;
			}else if( masterBugTable.hostIndex[host] && masterBugTable.hostIndex[host].open.length === 0 ){
				add_to_table = closedTable;
			}else{
				add_to_table = openTable;
			}
			if(excludeUS && shouldExcludeUSSite(list, host)){
				// now.. the local lists become more interesting and useful if the big, "global" sites are taken out.
				// So let's skip certain sites..
				return;
			}
			var tr = add_to_table.appendChild(document.createElement('tr'));
			tr.appendChild(elm('td', host+' '));
            // title important for a11y - text content is not exactly descriptive for this link..
            var a = tr.lastChild.insertBefore(elm('a','\u2192 ', {target:'_blank', href:'http://'+host, title:host, className:'sitelink'} ), tr.lastChild.firstChild);
			tr.appendChild(document.createElement('td'));
			if(masterBugTable.hostIndex[host] && (masterBugTable.hostIndex[host].open.length || (add_to_table === closedTable && masterBugTable.hostIndex[host].resolved.length)) ){
				var bugtable = tr.lastChild.appendChild(document.createElement('table')); // yes, it's all about data..! TABLE is quite correct, even nested..
				bugtable.className = 'nested-bug-table';
				masterBugTable.hostIndex[host].open.forEach(function(bug, bindex){
					addBugTableCell(bugtable, bug, bindex);
				});
				if ( add_to_table === closedTable && masterBugTable.hostIndex[host].resolved.length) {
					masterBugTable.hostIndex[host].resolved.forEach(function(bug, bindex){
						addBugTableCell(bugtable, bug, bindex);
					});
				};
			}
			/* conundrum: some of our lists contain URLs - not just host names (i.e. the "video" list is full of stuff like whitehouse.gov/live )
				When registering manual test results, should people have to register the full URL? It's inconvenient and error-prone.
				So let's support registering manual test results under hostname only.
			*/
			var hostname = getHostname(host);
			if(manualTestResults[hostname]){ // Interesting.. we have manual test results for this site
				var p, mResult, div;
				if(!('length' in manualTestResults[hostname])){ // only a single result.. let's arrayify it.
					mResult = [manualTestResults[hostname]];
				}else{
					mResult = manualTestResults[hostname];
				}
				if(tr.lastChild.hasChildNodes()){ // there's a table of bug data in the right column of the site table, let's put this information in the left column
					div = tr.firstChild.appendChild(elm('div'));
				}else{
					div = tr.lastChild.appendChild(elm('div'));
				}
				mResult.forEach(function(result){
					var p = div.appendChild(elm('p', 'Manual test: '))
					p.className = 'manualTestResults';
					p.appendChild(elm('strong', result.status)).className = result.status === 'ok' ? 'pass':'fail';
					p.appendChild(document.createElement('br'));
					p.appendChild(elm('small', 'Tested by '+result.tested_by+' using '+result.tested_on+', ' + timeSince(result.date) + ' ago'));
				});
			}
		});
		var timedata = masterBugTable.lists[list].timedata, openBugCount = masterBugTable.lists[list].counts.open, resolvedBugCount=masterBugTable.lists[list].counts.resolved;
		timedata.sort( function(a,b){ if((+a[0])>(+b[0]))return 1; return -1; } ); // sort chronologically descending (most recent first)
		var treshold = Date.now() - (1000*60*60*24*365);
		var chartdata = {
			labels:[],
			datasets:[
				{data:[], strokeColor:'#070', fillColor:'rgba(0,200,0,0.5)'},
				{data:[], strokeColor:'#700', fillColor:'rgba(200,0,0,0.5)'}
			]
		};
		var maxChartValue = 0;
		if(timedata.length > 0){
			for(var i=timedata.length-1; i>=0; i--){
				if(timedata[i][0].getTime()<treshold && chartdata.datasets[0].data.length>=16)break;
				chartdata.labels.unshift(timedata[i][3]+' '+timedata[i][0].getFullYear()+'-'+(timedata[i][0].getMonth()+1)+'-'+timedata[i][0].getDate());
				chartdata.datasets[0].data.unshift(resolvedBugCount); // green is dataset 0
				chartdata.datasets[1].data.unshift(openBugCount); // red is dataset 1
				openBugCount -= timedata[i][1];
				resolvedBugCount -= timedata[i][2];
				if(Math.max(resolvedBugCount, openBugCount)>maxChartValue) maxChartValue = Math.max(resolvedBugCount, openBugCount);
			}
		}
		// If trawling timedata didn't yield at least two data points, no graphs will be drawn. This looks silly. Let's make sure we have at least two numbers..
		while(chartdata.datasets[0].data.length < 2){
				chartdata.datasets[0].data.push(chartdata.datasets[0].data[0]||0); // green is dataset 0
				chartdata.datasets[1].data.push(chartdata.datasets[1].data[0]||0); // red is dataset 1
				chartdata.labels.push('');
		}

		var scaleStepWidth = maxChartValue > 9 ? Math.ceil(maxChartValue/10) : 1;
		var scaleSteps = Math.min(10, maxChartValue||1);
		var div = td.appendChild(document.createElement('div'));
		div.className = 'chart-canvas-parent';
		var canvas = div.appendChild(document.createElement('canvas'));
		// Here's an ugly hack.. Chart apparently requires canvas.width to be set. We're still display:none though, so we have to grab the width of the ancestor table..
		canvas.width = div.parentNode.parentNode.parentNode.offsetWidth; canvas.height = 200;
		new Chart(canvas.getContext('2d')).Line(chartdata, {scaleShowLabels:true, scaleOverlay:true, bezierCurve: true, scaleLabel:'<%=value%> bugs', scaleOverride:true, scaleStartValue:0,  scaleSteps:scaleSteps, scaleStepWidth:scaleStepWidth});
	}

	detailsrow.classList.add('active');
	document.addEventListener('click', function(e){
		if(e.target.classList.contains('testres')){
			if(e.target.title)alert(e.target.title);
		}
	}, false);
};
function shouldExcludeUSSite(list, host){
	// now.. the local lists become more interesting and useful if the big, "global" sites are taken out.
	// So let's skip sites from local listings even if they are popular in that country..
	if(list === '1000' || list === 'us50') return false; // include all sites in these lists
	//if( masterBugTable.lists['alexa1000'] && masterBugTable.lists['alexa1000'].data.indexOf(host)>-1  && masterBugTable.lists['alexa1000'].data.indexOf(host)<alexaGlobalTreshold ){
	if( list !== 'us50' && masterBugTable.lists['us50'] && masterBugTable.lists['us50'].data.indexOf(host)>-1 /* && masterBugTable.lists['alexa1000'].data.indexOf(host)<alexaGlobalTreshold */){
		return true;
	}
	return false;
}
function listMissingTestBugs(includeClosedBugs){
    var list=[];
    for(var bug in masterBugTable.bugs){
        if( ! (bug in testResults) ){
            if(!includeClosedBugs && masterBugTable.bugs[bug].status in resolvedStates)continue;
            list.push(bug+'\t'+masterBugTable.bugs[bug].summary+'\t'+masterBugTable.bugs[bug].url);
        }
    }
    return list.join('\n');
}

function quickSearchInit(){
    var p = document.getElementById('metrics').appendChild(document.createElement('p'));
    var qs = p.appendChild(document.createElement('input'));
    qs.placeholder = 'Type domain name or *.pattern..';
		qs.style.minWidth = '250px';
    var dl = p.appendChild(document.createElement('datalist'));
    dl.id = qs.list = 'datalist-hostnames';
    qs.setAttribute('list', 'datalist-hostnames');
    for(var host in masterBugTable.hostIndex){
        dl.appendChild(document.createElement('option')).value = host;
    }
		var delay; // Make sure there is a small delay after typing, to avoid queueing up too much work
		function uniQueue(){
			if(delay)clearTimeout(delay);
			delay = setTimeout(addDomainDetails, 500);
		}
    function addDomainDetails(){
				var domain = qs.value.toLowerCase();
				var data=[];
				if(p.getElementsByTagName('table').length){
						p.removeChild(p.getElementsByTagName('table')[0]);
				}
				if(domain === '')return;
				if(masterBugTable.hostIndex[domain]){
					data.push(domain);
				}else{
					var domains = Object.keys(masterBugTable.hostIndex);
					// include all sites we know about (hm.. we sort of should have a unique array..)
					for(var list in masterBugTable.lists)domains = domains.concat(masterBugTable.lists[list].data);
					if(domain.indexOf('*')>-1){ // wildcard matching
						var pattern ='^'+domain.replace(/\./g, '\\.').replace(/\*/g, '.*')+'$';
						var rx = new RegExp(pattern);
						for(var i=0; i<domains.length; i++){
							if(rx.test(domains[i]) && data.indexOf(domains[i])==-1)data.push(domains[i]);
						}
					}else if(domain !== ''){ // substr matching
						for(var i=0; i<domains.length; i++){
							if(domains[i].indexOf(domain)>-1 && data.indexOf(domains[i])==-1)data.push(domains[i]);
						}
					}
				}
        masterBugTable.lists.custom = {id:'custom', name:'Custom list: '+domain,counts:{}, data:data, timedata:[]}
        var t = p.appendChild(document.createElement('table'));
        t.className = 'single-domain-detail-table';
				constructListRows(t, masterBugTable.lists.custom);
				t.getElementsByTagName('tr')[0].getElementsByTagName('td')[0].textContent = data.length+' sites. ';
				calculateListDetails(document.getElementById('row-custom'), masterBugTable.lists.custom, false);
        showListDetails('list:custom', false, true);
        location.hash = '#list:custom:'+domain;
    }
    qs.addEventListener('input', function(e){ uniQueue(); }, false);
    // support custom list in hash
    if(location.hash && location.hash.indexOf('list:custom:')>-1){
        var searchFromHash = location.hash.substr(13);
        qs.value = searchFromHash;
        uniQueue();
    }
}

function constructListRows(table, list){
		var row = table.appendChild(document.createElement('tr'));
		row.id='row-'+list.id;
		var a = row.appendChild(document.createElement('th')).appendChild(document.createElement('a'));
		a.appendChild(document.createTextNode(list.name));
		a.href = '#list:'+list.id;
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row = table.appendChild(document.createElement('tr'));
		row.id = 'list:'+list.id;
		row.className = 'list-details-row';
		row.appendChild(document.createElement('td')).setAttribute('colspan', 4);
}

function calculateListDetails(tr, list, excludeUS){
		var todos = [], timedata = [];
		// now we have enough data to calculate numbers, severities etc.
		var openBugIds=[], resolvedBugIds=[], contactedBugIds=[];
		var openBugCount=0, resolvedBugCount=0, contactedBugCount=0, hasHighPriIssue = false;
		var data = masterBugTable.lists[list.id].data;
		for(var i = 0, site; site = data[i]; i++){
			if( ! masterBugTable.hostIndex[site] ){
				continue;
			}else if(excludeUS){
				if(shouldExcludeUSSite(list.id, site)){
					// now.. the local lists become more interesting and useful if the big, "global" sites are taken out.
					// So let's skip sites
					continue;
				}
			}
			for(var j=0, bugnum, bug; bugnum=masterBugTable.hostIndex[site].open[j]; j++){//console.log(bug.summary+' '+bug.whiteboard)
				bug = masterBugTable.bugs[bugnum];
				bug.whiteboard = bug.whiteboard||'';
				if(bug.summary.indexOf('[meta]')>-1)continue;
				if(bug.creation_time)timedata.push( [new Date(bug.creation_time), 1, 0, bug.id+' ☐'] ); // "date object", "change to open count", "change to resolved count"
				if(bug.whiteboard.indexOf('[sitewait]')>-1){
					contactedBugIds.push(bug.id);
					contactedBugCount++;
				}else{
					openBugIds.push(bug.id);
					openBugCount++;
				}
				if(bug.priority && bug.priority in flagThesePris) hasHighPriIssue = true;
				// We don't want bugs with a needinfo in the Todos - this todo should probably be handled by the needinfo "target"
				var hasNeedInfoFlag = false;
				if(bug.flags){
					bug.flags.forEach(function(flag){
						if(flag.name === 'needinfo') hasNeedInfoFlag = true;
					});
				}
				if(bug.status === 'NEW' && bug.whiteboard.indexOf('[contactready]')>-1){
					todos.push( ['Contact '+site+' regarding "'+bug.summary+'"', bug.id, bug.priority] );
				}else if((bug.status === 'UNCONFIRMED' || ( ! /\[((not|)contactready|sitewait|(server|client)sniff)\]/.test(bug.whiteboard) )) && ! hasNeedInfoFlag ){
					// We ignore bugs that have: notcontactready, contactready, sitewait, serversniff, clientsniff labels in whiteboard, and bugs with a 'needinfo' flag
					todos.push( ['Analyze "'+bug.summary+'" problem on '+site, bug.id, bug.priority] );
				}
			}
			for(var j=0, bug; bug=masterBugTable.hostIndex[site].resolved[j]; j++){
				bug = masterBugTable.bugs[bug];
				if(bug['cf_last_resolved'] && ( bug.status in resolvedStates)){
					// Firefox's date parser really likes that T between date and time..
					timedata.push( [new Date((bug['cf_last_resolved']).replace(/\s/, 'T')), -1, 1, bug.id+' ☑'] );
					resolvedBugCount++;
					resolvedBugIds.push(bug.id);
				}
			}
		}

		if(openBugCount + contactedBugCount +  resolvedBugCount > 0){
			var d = tr.getElementsByTagName('td')[1].appendChild(document.createElement('div'));
			d.className = 'list-status-graph';
			[[resolvedBugIds, 'resolved'], [contactedBugIds, 'contacted'], [openBugIds, 'open']].forEach(function(details){
				if(details[0].length===0)return;
				var d2;
				(d2=d.appendChild(document.createElement('a'))).appendChild(document.createTextNode(details[0].length+' '+details[1]));
				d2.className = details[1];
				d2.style.width = (parseInt((details[0].length / (openBugCount+contactedBugCount+resolvedBugCount))*100)) + '%';
				d2.href = bz_list_specific_bug+ details[0].join(',');
			});
		}
		window.masterBugTable['lists'][list.id].timedata = timedata;
		window.masterBugTable['lists'][list.id].counts = {open:openBugCount+contactedBugCount, resolved:resolvedBugCount};
		if(hasHighPriIssue){
			tr.classList.add('major-issue');
		}else if(openBugCount>0){
			tr.classList.add('minor-issue');
		}
		if(todos.length>0){ // will this ever be false? :-p
			(function(todos){
			var d = tr.getElementsByTagName('td')[1].appendChild(document.createElement('div'));
			d.className = 'todo';
			d.appendChild(document.createElement('a')).href = bz_show_bug+todos[0][1];
			d.firstChild.appendChild(document.createTextNode(todos[0][0]));
			d.appendChild(document.createElement('hr'));
			var b = d.appendChild(elm('button', '<<'));
			b.onclick = function(){updateTodoRow(d, todos, -1)};
			var b = d.appendChild(elm('button', '>>'));
			b.onclick = function(){updateTodoRow(d, todos, 1)};})(todos);
		}

}
function addBugTableCell(bugtable, bug, bindex){
	bug = masterBugTable.bugs[bug];
	var bugrow = bugtable.appendChild(document.createElement('tr'));
	bugrow.appendChild(document.createElement('td'));
	var a = bugrow.lastChild.appendChild(elm('a', bug.id, {href:bz_show_bug+bug.id}));
	var resolved = bug.status in resolvedStates;
	bugrow.classList.add(resolved?'resolved':'open')
	bugrow.appendChild(document.createElement('td'));
	var a = bugrow.lastChild.appendChild(elm('a', bug.summary, {href:bz_show_bug+bug.id, title:bug.summary}));
	if(resolved)a.appendChild(document.createTextNode(' - '+bug.status+':'+bug.resolution));
	if(bug.priority in flagThesePris)a.className = 'major-issue';
	bugrow.appendChild(document.createElement('td'));
	if(testResults[bug.id]){
		// We have some automated test results for this bug
		var lastResult = testResults[bug.id][0];
		var testresultspan = bugrow.lastChild.appendChild(elm('span', 'Tested '+ timeSince(lastResult[1]) +' ago: '));
		testresultspan.classList.add('testres');
		var resultdesc = '';
		if(resolved && lastResult[3] === 'true'){
			resultdesc = 'Verified passing';
		}else if(lastResult[3] === 'true' && ! resolved){
			resultdesc = 'might be fixed, needs check';
		}else if(lastResult[3]==='false' && resolved && bug.resolution in {'INVALID':1, 'WONTFIX':1}){
			resultdesc = ':-(';
		}else if(lastResult[3]==='false' && resolved){
			resultdesc = 'might have regressed, needs check'
		}else if(lastResult[3]==='false'){
			resultdesc = 'fail';
		}else{
			resultdesc = lastResult[3];
		}
		testresultspan.appendChild(elm('strong', '\u25AA '+resultdesc));
		if( lastResult[3] === "true" ){
			testresultspan.classList.add("pass");
			if(!resolved){
				testresultspan.classList.add("needs-attention");
			}
		}else{
			testresultspan.classList.add("fail");
			if(resolved){
				testresultspan.classList.add("needs-attention");
			}
		}
	}
	//tr.lastChild.appendChild(document.createTextNode(' '));
}

function elm(tagname, text, attributes){
	var e=document.createElement(tagname);
	if(text)e.appendChild(document.createTextNode(text));
	attributes = attributes || {};
	for(var prop in attributes)e[prop] = attributes[prop];
	return e;
}

function getHostname(str){
	if(!/^https?:/.test(str))str = 'http://'+str;
	return elm('a', null, {href:str}).hostname;
}

function timeSince(datestr){
	return millisecondsToStr(Date.now() - fxFixDate(datestr).getTime())
}

function fxFixDate(datestr){
	var date = new Date(datestr);
	if (isNaN(date.getTime())) { // Firefox is picky about having that T inside date strings..
		date = new Date(datestr.replace(/\s/, 'T'));
	};
	return date;
}

function millisecondsToStr (milliseconds) {

    function numberEnding (number) { //todo: replace with a wiser code
        return (number > 1) ? 's' : '';
    }

    var temp = milliseconds / 1000;
    var years = Math.floor(temp / 31536000);
    if (years) {
        return years + ' year' + numberEnding(years);
    }
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        return days + ' day' + numberEnding(days);
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        return hours + ' hour' + numberEnding(hours);
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        return minutes + ' minute' + numberEnding(minutes);
    }
    var seconds = temp % 60;
    if (seconds) {
        return seconds + ' second' + numberEnding(seconds);
    }
    return 'now'; //'just now' //or other string you like;
}