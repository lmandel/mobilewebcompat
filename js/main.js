$(document).ready(function () {
  populateTable();
});


function populateTable(){
	var metabugs = [];
	var table = $("#compattable");
	for(var i = 0; i < data.length; i++){
		if(data[i].bug > -1){
			metabugs.push(data[i].bug);
		}
		var id = createId(data[i].bug);
		var row = $("<tr>");
		table.append(row);
		row.append(createTableCell(i+1));
		row.append(createTableCell(data[i].name));
		row.append(createTableCell(createLink(data[i].url)));
		row.append(createTableCell(createBugDiv(id)));
		row.append(createTableCell(createDependsLayoutDiv(id)));
		row.append(createTableCell(createDependsEvangelismDiv(id)));
		row.append(createTableCell(createDependsDiv(id)));
		row.append(createTableCell(data[i].info));
		if(data[i].bug != -1){
			row.attr("class", "closed");	
		}
	}
	getMetabugs(metabugs);

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

function createLink(url){
	if(url.indexOf("http://") != 0){
		url = "http://" + url;
	}
	var a = $("<a>");
	a.attr("href", url);
	a.append(url);
	return a;
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

function getMetabugs(metabugs){
	var url = "https://api-dev.bugzilla.mozilla.org/latest/bug?include_fields=alias,id,depends_on,status,summary&id=";
	var ids ="";
	for(var i = 0; i < metabugs.length; i++){
		if(i == metabugs.length-1){
			ids += metabugs[i];
		}
		else{
			ids += metabugs[i] + ",";
		}
	}
	$.ajax({
	  url: url + ids,
	  crossDomain:true, 
	  dataType: 'json',
	  success: function(data){
	    processMetabugs(data.bugs);
	  },
	  error: function(data){
	    alert('fail.');
	  }
	});
}

function processMetabugs(bugs){
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
			
			id = bugs[i].id + "_" + k;
		}while($("#bug"+id).length == 1);
	}
	getDependentBugs(depends);
}

function isResolved(status){
	if(status == "RESOLVED" || status == "VERIFIED" || status == "CLOSED"){
		return true;
	}
	return false;
}

function getDependentBugs(dependentBugs){
	var url = "https://api-dev.bugzilla.mozilla.org/latest/bug?include_fields=alias,component,id,product,status,summary&id=";
	var ids =dependentBugs;
	$.ajax({
	  url: url + ids,
	  crossDomain:true, 
	  dataType: 'json',
	  success: function(data){
	    processDependentbugs(data.bugs);
	  },
	  error: function(data){
	    alert('fail.');
	  }
	});
}

function processDependentbugs(bugs){
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