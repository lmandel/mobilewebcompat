// timelines.js sorts out the time lines for
// a) Site lists
// b) Individual sites
$.ajax({
  url: "./preproc/data/bugzilla/index.json",
  dataType: 'json',
  success: setGlobalVar('masterBugTable'),
  error: function(jqXHR, textStatus, errorThrown){
    alert('Failed to retrieve bug data master table (JSON)');
  }
});

var flagThesePris =  {'P1':1,'P2':2}
var bz_show_bug = 'https://bugzilla.mozilla.org/show_bug.cgi?id=';
var alexaGlobalTreshold = 11; // sites that appear higher than 11 in alexa-1000 will not appear in "local" listings
// should possibly tweak this more.. For example, baidu is #5 and might be better placed in the "local Chinese" listing
// setting the threshold at 5 will however exclude pretty "global" stuff like amazon.com.
var resolvedStates = {'RESOLVED':1,'CLOSED':1,'VERIFIED':1};
var testResults = {};
function retrieveMetaBugs(){}; // sorry, dummy because retrieveTestIndex calls it..
retrieveTestIndex();
$(document).ready(function () {
	if(!(window.masterBugTable)){
		setTimeout(arguments.callee, 500);
		return;
	} // try again..
	window.masterBugTable['lists']={};
	var table = document.body.appendChild(document.createElement('table')), row, a;
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
	for(var i=0, list; list=topLists[i]; i++){
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
		$.ajax({
			  url: 'data/'+topLists[i].url,
			  crossDomain:false,
			  dataType: 'json',
			  success: (function(list){
			    return function(data){
				var id=list.id, tr = document.getElementById('row-'+id), data = data.data;
				tr.getElementsByTagName('td')[0].textContent = data.length+' sites. ';
				var todos = [], timedata = [];
				window.masterBugTable['lists'][list.id] = {data: data };
				// now we have enough data to calculate numbers, severities etc.
				var openBugCount=0, resolvedBugCount=0, hasHighPriIssue = false;
				for(var i = 0, site; site = data[i]; i++){
					if( ! masterBugTable[site] ){
						continue;
					}else if(id !== 'alexa1000' && masterBugTable.lists['alexa1000'] && masterBugTable.lists['alexa1000'].data.indexOf(site)<alexaGlobalTreshold){
						// now.. the local lists become more interesting and useful if the big, "global" sites are taken out.
						// So let's skip sites
						continue;
					}
					openBugCount += masterBugTable[site].open.length;
					resolvedBugCount += masterBugTable[site].resolved.length;

					for(var j=0, bug; bug=masterBugTable[site].open[j]; j++){
						if(bug.Opened)timedata.push( [new Date(bug.Opened), 1, 0, bug['Bug ID']+' ☐'] ); // "date object", "change to open count", "change to resolved count"
						if(bug['Last Resolved'] && ( bug.Status in resolvedStates))timedata.push( [new Date(bug['Last Resolved']), -1, 1, bug['Bug ID']+' ☑'] );
						if(bug.Priority && bug.Priority in flagThesePris) hasHighPriIssue = true;
						if(bug.Status === 'NEW' && bug.Whiteboard.indexOf('[sitewait]')===-1){
							todos.push( ['Contact '+site+' regarding "'+bug.Summary+'"', bug['Bug ID'], bug.Priority] );
						}else if(bug.Status === 'UNCONFIRMED' || bug.Whiteboard.indexOf('sniff')===-1){
							todos.push( ['Analyze "'+bug.Summary+'" problem on '+site, bug['Bug ID'], bug.Priority] );
						}
					}
				}
				if(openBugCount + resolvedBugCount > 0){
					var d = tr.getElementsByTagName('td')[1].appendChild(document.createElement('div'));
					d.className = 'list-status-graph';
					[[resolvedBugCount, 'resolved'], [openBugCount, 'open']].forEach(function(details){
						if(details[0]===0)return;
						var d2;
						(d2=d.appendChild(document.createElement('span'))).appendChild(document.createTextNode(details[0]+' '+details[1]));
						d2.className = details[1];
						d2.style.width = (parseInt((details[0] / (openBugCount+resolvedBugCount))*d.offsetWidth)-1) + 'px';
					});
				}
				window.masterBugTable['lists'][list.id].timedata = timedata;
				window.masterBugTable['lists'][list.id].counts = {open:openBugCount, resolved:resolvedBugCount};
//				tr.getElementsByTagName('td')[1].textContent = openBugCount;
//				tr.getElementsByTagName('td')[2].textContent = resolvedBugCount;
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
				if(location.hash && location.hash.indexOf(list.id)>-1)showListDetails(location.hash);
			    }
		  })(topLists[i]),
			  error: (function(list){return function(jqXHR, textStatus, errorThrown){
			    alert('Failed to retrieve top list '+list.id +' for url:'+ list.url +'.');
			  }
			})(topLists[i])
		});

	}
	//document.getElementById('details').appendChild(d);
});
window.onhashchange = function(e){
	var newHash = e.newURL.substr(e.newURL.indexOf('#'));
	console.log('hashchange '+newHash);

	// Find the link that was clicked... (TODO: do we need this?)
	for(var i=0,link;link=document.links[i];i++){
		if( link.href.indexOf(newHash)>-1 && link.href.length === link.href.indexOf( newHash )+newHash.length ){
			break;
		}
	}
	showListDetails(newHash);
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
	newHash = newHash.substr(1);
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
			if(list !== 'alexa1000' && masterBugTable.lists['alexa1000'] && masterBugTable.lists['alexa1000'].data.indexOf(host)<alexaGlobalTreshold){
				// now.. the local lists become more interesting and useful if the big, "global" sites are taken out.
				// So let's skip sites
				return;
			}
			var tr = table.appendChild(document.createElement('tr'));
			tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(host));
			tr.appendChild(document.createElement('td'));
//			paper.text(50, (index*32)+50, host);
			if(masterBugTable[host])masterBugTable[host].open.forEach(function(bug, bindex){
				var a = tr.lastChild.appendChild(document.createElement('a'));
				var resolved = bug.Status in resolvedStates;
				a.href=bz_show_bug+bug['Bug ID'];
				a.textContent = bug['Bug ID'];
				a.title = bug['Summary'];
				if(bug['Priority'] in flagThesePris)a.className = 'major-issue';
				if(testResults[bug['Bug ID']]){
					// We have some automated test results for this bug
					testResults[bug['Bug ID']].forEach(function(value, index){
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
						a.parentNode.appendChild(span[0]);
					});
				}
				tr.lastChild.appendChild(document.createTextNode(' '));
			});
		});
		var timedata = masterBugTable.lists[list].timedata, openBugCount = masterBugTable.lists[list].counts.open, resolvedBugCount=masterBugTable.lists[list].counts.resolved;
		timedata.sort( function(a,b){ if((+a[0])>(+b[0]))return 1; return -1; } );
		var treshold = Date.now() - (1000*60*60*24*365);
		var chartdata = {
			labels:[],
			datasets:[
				{data:[], strokeColor:'#070', fillColor:'rgba(0,200,0,0.5)'},
				{data:[], strokeColor:'#700', fillColor:'rgba(200,0,0,0.5)'}
			]
		}

		for(var i=timedata.length-1; i>0; i--){
			if(timedata[i][0].getTime()<treshold)break;
			chartdata.labels.push(timedata[i][3]);//timedata[i][0].getFullYear()+'-'+timedata[i][0].getMonth()+'-'+timedata[i][0].getDate());
			openBugCount += timedata[i][1];
			resolvedBugCount += timedata[i][2];
			chartdata.datasets[0].data.push(resolvedBugCount); // green is dataset 0
			chartdata.datasets[1].data.push(openBugCount); // red is dataset 1
		}


		var div = td.appendChild(document.createElement('div'));
		div.className = 'chart-canvas-parent';
		var canvas = div.appendChild(document.createElement('canvas'));
		// Here's an ugly hack.. Chart apparently requires canvas.width to be set. We're still display:none though, so we have to grab the width of the ancestor table..
		canvas.width = div.parentNode.parentNode.parentNode.offsetWidth; canvas.height = 200;
		new Chart(canvas.getContext('2d')).Line(chartdata, {scaleShowLabels:true, scaleLabel:'<%=value%> bugs', scaleStartValue:0});
	}

	detailsrow.classList.add('active');
	document.addEventListener('click', function(e){
		if(e.target.classList.contains('testres')){
			if(e.target.title)alert(e.target.title);
		}
	}, false);
};
