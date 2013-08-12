(function() {
	// The methods processMetaBugs() and processDependentBugs() can be greatly simplified with some shared state,
	// namely a way to look up what master bug a given bug number belongs to. Hence, we define a masterMap that will
	// be populated by the processMetaBugs() function
	var masterMap = {};
	var testResults = {}; // is populated by processTestResults()
	$(document).ready(function () {
		startLoadingNotification();
		createTabs(topLists);
		populateTables();
		retrieveTestIndex();
		document.getElementById('check_show_resolveds').addEventListener('change', function(e){
			if(e.target.checked){
				document.body.classList.add('show_resolved_bugs');
			}else{
				document.body.classList.remove('show_resolved_bugs');
			}
		});
	});

	function populateTables(){
		for(var i = 0; i < topLists.length; i++){
			_getTopList(i, _populateTable);
		}

	}

	function _getTopList(topListId, successFunction){

		$.ajax({
			  url: 'data/'+topLists[topListId].url,
			  crossDomain:false,
			  dataType: 'json',
			  success: function(data){
			    successFunction(topListId, data.data);
			  },
			  error: function(jqXHR, textStatus, errorThrown){
			    alert('Failed to retrieve top list '+ listId +' for url:'+ url +'.');
			  }
			});
	}

	function _populateTable(topListId, siteList){
		var table = $("#" + topLists[topListId].id + "-compattable");
		var numInvestigated = 0;
		for(var i = 0; i < siteList.length; i++){
			var url = siteList[i];
			var siteData = data[url];
			var rawId = -1;
			var id = -1;
			var info = "";
			var name = url;
			var desktopSite = false;
			if(siteData != null){
				rawId = siteData.bug;
				id =  createId(rawId);
				name = siteData.name;
				info = siteData.info;
				desktopSite = siteData.desktoponly | false;
			}
			var row = $("<tr>");
			if(rawId!==-1 && rawId !==0)row.attr("class", "bug"+rawId+"-row");
			table.append(row);
			row.append(createTableCell(i+1));
			row.append(createTableCell(name));
			row.append(createTableCell(url));
			row.append(createTableCell(createBugDiv(id)));
			row.append(createTableCell().
				attr("class", "dependslayout dependbugs"));
			row.append(createTableCell().
				attr("class", "evang dependbugs"));
			row.append(createTableCell().
				attr("class", "depends dependbugs"));
			row.append(createTableCell().
				attr("class", "owner"));
			row.append(createTableCell(info).
				attr("class", "info"));
			if(rawId == 0 && desktopSite){
				row.addClass("desktop-site");
				numInvestigated++;
			}
			else if(rawId != -1){
				row.addClass("no-issue");
				numInvestigated++;
			}
		}
		topLists[topListId].investigated = numInvestigated;
	}

	function retrieveMetaBugs(){
		var metabugs = [];

		for (var site in data) {
			if(data[site].bug > -1){
				if(metabugs.indexOf(data[site].bug) == -1)
					metabugs.push(data[site].bug);
				data[site].isClosed = true;
			}
		}
		getMetabugs(metabugs, processMetaBugs);
	}

	function createId(id){
		var docId = id;
		if($("#bug"+id).length == 1){
			var i = 0;
			do {
				i++;
				docId = id + "_" + i;
			}while($("#bug"+docId).length == 1);
		}
		return docId;
	}

	function createTableCell(value){
		var td = $("<td>");
		td.append(value);
		return td;
	}
	function createBugDiv(id, name, alias, resolved){
		var div = $("<div>");
		div.attr("id", "bug"+ id);
		div.addClass("bugdiv");
		if(id > 0){
			var link = $("<a>");
			link.attr("href", "https://bugzilla.mozilla.org/show_bug.cgi?id="+id);
			link.attr("title", name);
			if(resolved){
				link.attr("style", "text-decoration: line-through;");
				div.attr("class", "resolved_bug");
			}
			if(alias){
				link.append(alias);
			}
			else{
				link.append(id);
			}
			div.append(link);
		}
		if(testResults[id]){
			// We have some automated test results for this bug
			testResults[id].forEach(function(value, index){
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
				div.append(span);
			});
		}
		return div;
	}
	function processMetaBugs(bugs){
		var depends = [];
		for(var i = 0; i < bugs.length; i++){
			var id = bugs[i].id;
			for(var elms = document.getElementsByTagName("bug"+id+"-row"),j=0,el; el=elms[j];j++){
				var bugdiv = el.getElementsByClassName("bug"+id+"-master")[0];
				// we replace the bugdiv - mostly to add the previously unknown 'alias' if there is one
				var newbugdiv = createBugDiv(id, bugs[i].summary, bugs[i].alias, isResolved(bugs[i].status));
				newbugdiv.addClass("bug"+id+"-master");
				bugdiv.replaceWith(newbugdiv);
				var ownerdiv = el.getElementsByClassName("owner")[0];
				var owner = bugs[i].assigned_to;
				if(owner.name != "nobody"){
					ownerdiv.append(owner.real_name);
				}
			}
			var localDepends = bugs[i].depends_on;
			if(typeof localDepends === "string"){
				localDepends = localDepends.split(",");
			}
			for(var j=0; j<localDepends.length; j++){
				masterMap[localDepends[j]] = id;
				if(depends.indexOf(localDepends[j]) === -1)depends.push(localDepends[j]);
			}
		}
		getDependentBugs(depends, processDependentBugs);
	}

	function isResolved(status){
		if(status == "RESOLVED" || status == "VERIFIED" || status == "CLOSED"){
			return true;
		}
		return false;
	}

	function processDependentBugs(bugs){
		for(var i = 0; i < bugs.length; i++){
			var id = bugs[i].id;
			var masterId = masterMap[id];
			for(var elms = document.getElementsByClassName("bug"+masterId+"-row"),j=0,el; el=elms[j];j++){
				var newbugdiv = createBugDiv(id, bugs[i].summary, bugs[i].alias, resolved);
				if(bugs[i].component.indexOf("Layout") > -1){
					bugdiv = $(el.getElementsByClassName("dependslayout")[0]);
				}
				else if(bugs[i].component.indexOf("Evangelism") > -1 || bugs[i].product.indexOf("Evangelism") > -1){
					bugdiv = $(el.getElementsByClassName("evang")[0]);
				}
				else{
					bugdiv = $(el.getElementsByClassName("depends")[0]);
				}
				bugdiv.append(newbugdiv);
				newbugdiv.append(", ");
				var siteUrl = $(el).children().get(2).innerHTML;
				var resolved = isResolved(bugs[i].status);
				if(!resolved){
					if(bugs[i].priority == "P1" || bugs[i].priority == "P2"){
						el.classList.remove("no-issue");
						el.classList.remove("minor-issue");
						el.classList.add("major-issue");
					}
					else if(!$(el).hasClass("major-issue")){
						el.classList.remove("no-issue");
						el.classList.add("minor-issue");
					}
					data[siteUrl].isClosed = false;
				}
			}
		}
		populateSummary();
	}

	function populateSummary(){
		for(var i = 0; i < topLists.length; i++){
			_getTopList(i, _createTopListSummary);
		}
	}

	function _createTopListSummary(topListId, siteList){
		var summary = $("#summary");
		var summaryitem = $("<div>");
		summaryitem.attr("class", "summaryitem");
		summary.append(summaryitem);
		var title = $("<div>");
		title.attr("class","summarytitle");
		title.append(topLists[topListId].name);
		summaryitem.append(title);
		var summarydetails = $("<div>");
		summarydetails.attr("class", "summarydetails");
		var functional = 0;
		var issues = 0;
		var notInvestigated = 0;
		for(var i = 0; i < siteList.length; i++){
			if(data[siteList[i]]){
				var id = data[siteList[i]].bug;
				if(id == -1){
					notInvestigated++;
				}
				else if(data[siteList[i]].isClosed){
					functional++;
				}
				else{
					issues++;
				}
			}
			else{
				notInvestigated++;
			}
		}
		summarydetails.append($('<div>').append(functional + " functional (" + Math.round(functional*100/siteList.length) + "%)"));
		summarydetails.append($('<div>').append(issues + " with known issues ("+ Math.round(issues*100/siteList.length) + "%)"));
		summarydetails.append($('<div>').append(notInvestigated + " to investigate (" + Math.round(notInvestigated*100/siteList.length) + "%)"));
		summaryitem.append(summarydetails);
	}
	function retrieveTestIndex(){
		$.ajax({
		  url: "./data/testing/index.json",
		  dataType: 'json',
		  success: retrieveTestResults,
		  error: function(jqXHR, textStatus, errorThrown){
		    alert('Failed to retrieve test results index.');
		  }
		});
	}
	function retrieveTestResults(indexData){
		// We assume indexData is a chronologically sorted array
		// and we want only the newest 4-5 results for any bug
		// TODO: it would be cool to build on this to find "interesting" points (date of fix, date of apparent regression etc.)
		// and load per-bug data in a more sophisticated way, probably from a proper database..
		var filesToLoad = {};
		for(var i=indexData.length-1;i>=0 && i>indexData.length-6; i--){
			filesToLoad[indexData[i]]=1;
			$.ajax({
				url: "./data/testing/"+indexData[i],
				success: (function(file){
					  return function(data){
						delete filesToLoad[file];
						processTestResults(data);
						if(Object.keys(filesToLoad).length === 0){
							retrieveMetaBugs();
						}
					}
				})(indexData[i]),
				error: function(jqXHR, textStatus, errorThrown){
				alert("Failed to retrieve test results.");
				}
			});

		}
	}
	function processTestResults(data){
		data = CSVToArray(data);
		data.forEach(function(value,index){
			if(!testResults[value[0]])testResults[value[0]]  = [];
			testResults[value[0]].push(value);
		});
	}
})();