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
var testResults = {};
masterBugTable.metrics.failingTests = 0;
function retrieveMetaBugs(){}; // sorry, dummy because retrieveTestIndex calls it.. TODO: remove this and fix retrieveTestIndex when AWCY 2.0 is ready to replace AWCY 1.0 ..
retrieveTestIndex();
$(document).ready(function () {
	window.masterBugTable['lists']={}; // TODO: why not create masterBugTable.lists server-side too?
	var table = document.body.appendChild(document.createElement('table')), row, a;
	if(masterBugTable.metrics){
		var percOfHostsHaveBugs = parseInt((masterBugTable.metrics.numHostsWithOpenBugs / masterBugTable.metrics.numHosts ) * 100), m;
		(m=document.getElementById('metrics')).appendChild(document.createTextNode('There are '))
		m.appendChild(document.createElement('b')).appendChild(document.createTextNode(masterBugTable.metrics.numOpenBugs));
		m.appendChild(document.createTextNode(' open bugs on listed sites, '))
		m.appendChild(document.createElement('b')).appendChild(document.createTextNode(percOfHostsHaveBugs));
		m.appendChild(document.createTextNode('% of listed sites are affected, and '))
		for(var bug in testResults){
			var numTests = testResults[bug].length;
			if(testResults[bug][numTests-1][3] !== true)masterBugTable.metrics.failingTests++;
		}
		m.appendChild(document.createElement('b')).appendChild(document.createTextNode(masterBugTable.metrics.failingTests))
		m.appendChild(document.createTextNode(' tests fail'))
	}
	table.border=1;
	table.className = 'list-master-table';
	table = table.appendChild(document.createElement('tbody'));
	row = table.appendChild(document.createElement('tr'));
	row.appendChild(document.createElement('th')).appendChild(document.createTextNode('Category'));
	row.appendChild(document.createElement('th')).appendChild(document.createTextNode('Number of sites'));
	row.appendChild(document.createElement('th')).appendChild(document.createTextNode('Status'));
	row.lastChild.width="70%";
//	row.appendChild(document.createElement('th')).appendChild(document.createTextNode('Todo'));
//	row.appendChild(document.createElement('th')).appendChild(document.createTextNode('Closed bugs'));
	for(var i=0, list, listurl; list=topLists[i]; i++){
		row = table.appendChild(document.createElement('tr'));
		row.id='row-'+list.id;
		a = row.appendChild(document.createElement('th')).appendChild(document.createElement('a'));
		a.appendChild(document.createTextNode(list.name));
		a.href = '#list:'+list.id+'-details';
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
//		row.appendChild(document.createElement('td'));
		row = table.appendChild(document.createElement('tr'));
		row.id = 'list:'+list.id+'-details';
		row.className = 'list-details-row';
		row.appendChild(document.createElement('td')).setAttribute('colspan', 4);
		listurl = topLists[i].url;
		if(/_[a-z]{2}\.json$/.test(listurl))listurl = listurl.replace(/_([a-z]{2})\.json$/, '_$1.cc.json'); // Read the data files with extra ccTLD domains added
		$.ajax({
			  url: 'data/'+listurl,
			  crossDomain:false,
			  dataType: 'json',
			  success: (function(list, listurl){
			    return function(data){
				var id=list.id, tr = document.getElementById('row-'+id), ccTLD = data.ccTLD, data = data.data;
				tr.getElementsByTagName('td')[0].textContent = data.length+' sites. ';
				var todos = [], timedata = [];
				window.masterBugTable['lists'][id] = {data: data };
				// now we have enough data to calculate numbers, severities etc.
				var openBugIds=[], resolvedBugIds=[], contactedBugIds=[];
				var openBugCount=0, resolvedBugCount=0, contactedBugCount=0, hasHighPriIssue = false;
				for(var i = 0, site; site = data[i]; i++){
					if( ! masterBugTable[site] ){
						continue;
					}else if(shouldExcludeUSSite(id, site)){
						// now.. the local lists become more interesting and useful if the big, "global" sites are taken out.
						// So let's skip sites
						continue;
					}
					for(var j=0, bug; bug=masterBugTable[site].open[j]; j++){//console.log(bug.summary+' '+bug.whiteboard)
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
						if(bug.status === 'NEW' && bug.whiteboard.indexOf('[contactready]')>-1){
							todos.push( ['Contact '+site+' regarding "'+bug.summary+'"', bug.id, bug.priority] );
						}else if(bug.status === 'UNCONFIRMED' || ( bug.whiteboard.indexOf('[contactready]')===-1 && bug.whiteboard.indexOf('[sitewait]')===-1)){
							todos.push( ['Analyze "'+bug.summary+'" problem on '+site, bug.id, bug.priority] );
						}
					}
					for(var j=0, bug; bug=masterBugTable[site].resolved[j]; j++){
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
					var d = tr.getElementsByTagName('td')[1].appendChild(document.createElement('div'));
					d.className = 'todo';
					d.appendChild(document.createElement('a')).href = bz_show_bug+todos[0][1];
					d.firstChild.appendChild(document.createTextNode(todos[0][0]));
					d.appendChild(document.createElement('hr'));
					var b = d.appendChild(document.createElement('button'));
					b.appendChild(document.createTextNode('<<'));
					b.onclick = function(){updateTodoRow(d, todos, -1)};
					var b = d.appendChild(document.createElement('button'));
					b.appendChild(document.createTextNode('>>'));
					b.onclick = function(){updateTodoRow(d, todos, 1)};
					//setInterval(/* (function(tr,todos){return */ function(){
					//	updateTodoRow(d, todos);}
					///*} )(tr, todos) */, 3000);
				}
				if(location.hash && location.hash.indexOf(list.id)>-1)showListDetails(location.hash.substr(1));
			    }
		  })(topLists[i], listurl),
			  error: (function(list, listurl){return function(jqXHR, textStatus, errorThrown){
			    alert('Failed to retrieve top list '+list.id +' for url:'+ list.url +' ('+listurl+').');
			  }
			})(topLists[i], listurl)
		});

	}
	//document.getElementById('details').appendChild(d);
});
window.onhashchange = function(e){
	var newHash = e.newURL.substr(e.newURL.indexOf('#')+1);
	showListDetails(newHash);
	// removing and adding lots of content in document from hashchange event tends to mess up "scroll to #hash" logic in browsers
	// let's fix that again with a little help from jQuery..
	setTimeout(function(){
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

function showListDetails(newHash){
	$('.active').removeClass('active');
	var detailsrow = document.getElementById(newHash);
	var list = newHash.substring(5, newHash.length-8);
	if(!detailsrow)throw 'Details TR not found for '+newHash;
	if(!detailsrow.firstChild.hasChildNodes()){
		var td = detailsrow.firstChild;
		var table =  td.appendChild(document.createElement('table'));
		table.className = 'list-details-subtable';
		table = table.appendChild(document.createElement('tbody'));
		masterBugTable.lists[list].data.forEach(function(host, index){
			if( !masterBugTable[host] || ( masterBugTable[host] && masterBugTable[host].open.length === 0))return; // List only the hosts with active issues
			if(shouldExcludeUSSite(list, host)){
				// now.. the local lists become more interesting and useful if the big, "global" sites are taken out.
				// So let's skip certain sites..
				return;
			}
			var tr = table.appendChild(document.createElement('tr'));
			tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(host));
			tr.appendChild(document.createElement('td'));
//			paper.text(50, (index*32)+50, host);
			if(masterBugTable[host])masterBugTable[host].open.forEach(function(bug, bindex){
				var a = tr.lastChild.appendChild(document.createElement('a'));
				var resolved = bug.status in resolvedStates;
				a.href=bz_show_bug+bug.id;
				a.textContent = bug.id;
				a.title = bug['summary'];
				if(bug['priority'] in flagThesePris)a.className = 'major-issue';
				if(testResults[bug.id]){
					// We have some automated test results for this bug
					a.parentNode.appendChild(document.createElement('span')).appendChild(document.createTextNode(' - test results: '));
					testResults[bug.id].forEach(function(value, index){
						// indexes: 0 bug number, 1 date, 2 UA string, 3 status
						var span = $("<span>");
						span.addClass("testres");
						span.title = "Tested on "+value[1];
						span.append("\u25AA"); // black square
						if( value[3] === "true" ){
							span.addClass("pass");
							if(!resolved){
								span.addClass("needs-attention");
							}
						}
						else{
							span.addClass("fail");
							if(resolved){
								span.addClass("needs-attention");
							}
						}
						a.nextSibling.appendChild(span[0]);
					});
				}
				tr.lastChild.appendChild(document.createTextNode(' '));
			});
		});
		var timedata = masterBugTable.lists[list].timedata, openBugCount = masterBugTable.lists[list].counts.open, resolvedBugCount=masterBugTable.lists[list].counts.resolved;
		timedata.sort( function(a,b){ if((+a[0])<(+b[0]))return 1; return -1; } ); // sort chronologically descending (most recent first)
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
			for(var i=timedata.length-1; i>0; i--){
				if(timedata[i][0].getTime()<treshold && chartdata.datasets[0].data.length>=16)break;
				chartdata.labels.unshift(timedata[i][3]+' '+timedata[i][0].getFullYear()+'-'+timedata[i][0].getMonth()+'-'+timedata[i][0].getDate());
				openBugCount -= timedata[i][1];
				resolvedBugCount -= timedata[i][2];
				chartdata.datasets[0].data.unshift(resolvedBugCount); // green is dataset 0
				chartdata.datasets[1].data.unshift(openBugCount); // red is dataset 1
				if(Math.max(resolvedBugCount, openBugCount)>maxChartValue) maxChartValue = Math.max(resolvedBugCount, openBugCount);
			}
		}
		// If trawling timedata didn't yield at least two data points, no graphs will be drawn. This looks silly. Let's make sure we have at least two numbers..
		while(chartdata.datasets[0].data.length < 2){
				chartdata.datasets[0].data.push(resolvedBugCount); // green is dataset 0
				chartdata.datasets[1].data.push(openBugCount); // red is dataset 1
				chartdata.labels.push('');
		}
		var scaleStepWidth = Math.ceil(maxChartValue/10);
		var div = td.appendChild(document.createElement('div'));
		div.className = 'chart-canvas-parent';
		var canvas = div.appendChild(document.createElement('canvas'));
		// Here's an ugly hack.. Chart apparently requires canvas.width to be set. We're still display:none though, so we have to grab the width of the ancestor table..
		canvas.width = div.parentNode.parentNode.parentNode.offsetWidth; canvas.height = 200;
		new Chart(canvas.getContext('2d')).Line(chartdata, {scaleShowLabels:true, scaleOverlay:true, bezierCurve: true, scaleLabel:'<%=value%> bugs', scaleOverride:true, scaleStartValue:0,  scaleSteps:10, scaleStepWidth:scaleStepWidth});
	}

	detailsrow.classList.add('active');
	document.addEventListener('click', function(e){
		if(e.target.classList.contains('testres')){
			if(e.target.title)alert(e.target.title);
		}
	}, false);
};
function shouldExcludeUSSite(list, host){

	if( list !== 'alexa1000' && masterBugTable.lists['alexa1000'] && masterBugTable.lists['alexa1000'].data.indexOf(host)>-1  && masterBugTable.lists['alexa1000'].data.indexOf(host)<alexaGlobalTreshold ){
	//if( list !== 'alexa50us' && masterBugTable.lists['alexa50us'] && masterBugTable.lists['alexa50us'].data.indexOf(host)>-1 /* && masterBugTable.lists['alexa1000'].data.indexOf(host)<alexaGlobalTreshold */){
		// now.. the local lists become more interesting and useful if the big, "global" sites are taken out.
		// So let's skip sites
		return true;
	}
	return false;
}
