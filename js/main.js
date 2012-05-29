$(document).ready(function () {
  populateTable();
});


function populateTable(){
	var metabugs = [];
	var table = $("#compattable");
	for(var i = 0; i < data.length; i++){
		metabugs.push(data[i].bug);
		var id = createId(data[i].bug);
		var row = $("<tr>");
		table.append(row);
		row.append(createTableCell(data[i].name));
		row.append(createTableCell(data[i].url));
		row.append(createTableCell(createBugDiv(id)));
		row.append(createTableCell(createDependsDiv(id)));
		row.append(createTableCell(data[i].info));
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

function createTableCell(value){
	var td = $("<td>");
	td.append(value);
	return td;
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
			//var dependsArray = localDepends.split(',');
			for(var j = 0; j < localDepends.length; j++){
				dependsdiv.append(createBugDiv(createId(localDepends[j])));
				if(j+1 < localDepends.length){
					dependsdiv.append(", ");
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
	var url = "https://api-dev.bugzilla.mozilla.org/latest/bug?include_fields=alias,id,status,summary&id=";
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
			var newbugdiv = createBugDiv(id, bugs[i].summary, bugs[i].alias, isResolved(bugs[i].status));
			bugdiv.replaceWith(newbugdiv);
			id = bugs[i].id + "_" + k;
		}while($("#bug"+id).length == 1);
	}
}