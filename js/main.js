$(document).ready(function () {
	startLoadingNotification();
	createTabs(topLists);
	populateTables();
	retrieveMetaBugs();
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
		if(siteData != null){
			rawId = siteData.bug;
			id =  createId(rawId);
			name = siteData.name;
			info = siteData.info;
		}
		var row = $("<tr>");
		table.append(row);
		row.append(createTableCell(i+1));
		row.append(createTableCell(name));
		row.append(createTableCell(url));
		row.append(createTableCell(createBugDiv(id)));
		row.append(createTableCell(createDependsLayoutDiv(id)));
		row.append(createTableCell(createDependsEvangelismDiv(id)));
		row.append(createTableCell(createDependsDiv(id)));
		row.append(createTableCell(createOwnerDiv(id)));
		row.append(createTableCell(info));
		if(rawId != -1){
			row.attr("class", "no-issue");
			numInvestigated++;
		}
	}
	topLists[topListId].investigated = numInvestigated;
}

function retrieveMetaBugs(){
	var metabugs = [];
	
	for (var site in data) {
		if(data[site].bug > -1){
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

function createDependsLayoutDiv(value){
	var div = $("<div>");
	div.attr("id", "bug" + value + "-dependslayout");
	div.attr("class", "dependbugs");
	return div;
}

function createDependsEvangelismDiv(value){
	var div = $("<div>");
	div.attr("id", "bug" + value + "-dependsevang");
	div.attr("class", "dependbugs");
	return div;
}

function createDependsDiv(value){
	var div = $("<div>");
	div.attr("id", "bug" + value + "-depends");
	div.attr("class", "dependbugs");
	return div;
}

function createBugDiv(id, name, alias, resolved){
	nakedId = id;
	if(typeof id == "string"){
		nakedId = id.split('_')[0];
	}
	var div = $("<div>");
	div.attr("id", "bug"+ id);
	if(nakedId > 0){
		var link = $("<a>");
		link.attr("href", "https://bugzilla.mozilla.org/show_bug.cgi?id="+nakedId);
		link.attr("title", name);
		if(resolved){
			link.attr("style", "text-decoration: line-through;");
		}
		if(alias){
			link.append(alias);
		}
		else{
			link.append(nakedId);
		}
		div.append(link);
	}
	return div;
}

function createStubBugDiv(id, name, alias, resolved){
	var div = $("<div>");
	div.attr("id", "bug"+ id);
	return div;
}

function createOwnerDiv(value){
	var div = $("<div>");
	div.attr("id", "bug" + value + "-owner");
	div.attr("class", "owner");
	return div;
}

function processMetaBugs(bugs){
	var depends = "";
	for(var i = 0; i < bugs.length; i++){
		var k = 0;
		var id = bugs[i].id;
		do {
			k++;
			var bugdiv = $("#bug"+id);
			var newbugdiv = createBugDiv(id, bugs[i].summary, bugs[i].alias, isResolved(bugs[i].status));
			bugdiv.replaceWith(newbugdiv);
			var localDepends = bugs[i].depends_on;
			if(localDepends && localDepends != ""){
				if(depends != ""){
					depends += ",";
				}
				depends += localDepends;
			}
			var dependsdiv = $("#bug"+ id + "-depends");
			var dependslayoutdiv = $("#bug"+ id + "-dependslayout");
			var dependsevangdiv = $("#bug"+ id + "-dependsevang");
			var ownerdiv = $("#bug"+ id + "-owner");
			
			if(typeof localDepends == "string"){
				var stubId = createId(localDepends);
				dependsdiv.append(createStubBugDiv(stubId));
				dependslayoutdiv.append(createStubBugDiv(stubId + "-layout"));
				dependsevangdiv.append(createStubBugDiv(stubId + "-evang"));
			}
			else {
				for(var j = 0; j < localDepends.length; j++){
					var stubId = createId(localDepends[j]);
					dependsdiv.append(createStubBugDiv(stubId));
					dependslayoutdiv.append(createStubBugDiv(stubId + "-layout"));
					dependsevangdiv.append(createStubBugDiv(stubId + "-evang"));
				}
			}
			
			var owner = bugs[i].assigned_to;
			if(owner.name != "nobody"){
				ownerdiv.append(owner.real_name);
			}
			
			id = bugs[i].id + "_" + k;
		}while($("#bug"+id).length == 1);
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
		var k = 0;
		do{
			k++;
			var bugdiv = $("#bug"+id);
			var siteUrl = bugdiv.parent().parent().parent().children().get(2).innerHTML;
			if(bugs[i].component.indexOf("Layout") > -1){
				bugdiv = $("#bug"+id + "-layout");
			}
			else if(bugs[i].component.indexOf("Evangelism") > -1 || bugs[i].product.indexOf("Evangelism") > -1){
				bugdiv = $("#bug"+id + "-evang");
			}
			var resolved = isResolved(bugs[i].status);
			if(!resolved){
				if(bugs[i].priority == "P2" && !bugdiv.parent().parent().parent().hasClass("major-issue")){
					bugdiv.parent().parent().parent().attr("class", "minor-issue");
				}
				else{
					bugdiv.parent().parent().parent().attr("class", "major-issue");
				}
				data[siteUrl].isClosed = false;
			}
			var newbugdiv = createBugDiv(id, bugs[i].summary, bugs[i].alias, resolved);
			bugdiv.replaceWith(newbugdiv);
			newbugdiv.append(", ");
			id = bugs[i].id + "_" + k;
		}while($("#bug"+id).length == 1);
	}
	populateSummary();
}

function populateSummary(){
	for(var i = 0; i < topLists.length; i++){
		_getTopList(i, _createTopListSummary);
	}
}

function _createTopListSummary(topListId, siteList){
	var summary = $('#summary');
	var summaryitem = $('<div>');
	summaryitem.attr("class", "summaryitem");
	summary.append(summaryitem);
	var title = $('<div>');
	title.attr("class","summarytitle");
	title.append(topLists[topListId].name);
	summaryitem.append(title);
	var summarydetails = $('<div>');
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