$(document).ready(function () {
	startLoadingNotification();
	createTabs(topLists);
	populateTables();
	retrieveMetaBugs();
});

function populateTables(){
	for(var i = 0; i < topLists.length; i++){
		//get top list from url
		_getTopList(topLists[i].url, topLists[i].id);
	}

}

function _getTopList(theurl, listId){

	$.ajax({
		  url: 'data/'+theurl,
		  crossDomain:false, 
		  dataType: 'json',
		  success: function(data){
		    _populateTable(listId, data.data);
		  },
		  error: function(jqXHR, textStatus, errorThrown){
		    alert('Failed to retrieve top list '+ listId +' for url:'+ url +'.');
		  }
		});
}

function _populateTable(tableId, siteList){
	var table = $("#" + tableId + "-compattable");
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
			row.attr("class", "closed");	
		}
	}
}

function retrieveMetaBugs(){
	var metabugs = [];
	
	for (var site in data) {
		if(data[site].bug > -1){
			metabugs.push(data[site].bug);
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
			if(bugs[i].component.indexOf("Layout") > -1){
				bugdiv = $("#bug"+id + "-layout");
			}
			else if(bugs[i].component.indexOf("Evangelism") > -1 || bugs[i].product.indexOf("Evangelism") > -1){
				bugdiv = $("#bug"+id + "-evang");
			}
			var resolved = isResolved(bugs[i].status);
			if(!resolved){
				bugdiv.parent().parent().parent().attr("class", "open");
			}
			var newbugdiv = createBugDiv(id, bugs[i].summary, bugs[i].alias, resolved);
			bugdiv.replaceWith(newbugdiv);
			newbugdiv.append(", ");
			id = bugs[i].id + "_" + k;
		}while($("#bug"+id).length == 1);
	}
}