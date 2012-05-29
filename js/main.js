$(document).ready(function () {
  populateTable();
});


function populateTable(){
	var metabugs = [];
	var table = $("#compattable");
	for(var i = 0; i < data.length; i++){
		metabugs.push(data[i].bug);
		var row = $("<tr>");
		table.append(row);
		row.append(createTableCell(data[i].name));
		row.append(createTableCell(data[i].url));
		row.append(createTableCell(createMetabug(data[i].bug)));
		row.append(createTableCell(createDependsDiv(data[i].bug)));
		row.append(createTableCell(data[i].info));
	}
	getMetabugs(metabugs);

}

function createTableCell(value){
	var td = $("<td>");
	td.append(value);
	return td;
}

function createDependsDiv(value){
	var div = $("<div>");
	div.attr("id", "bug" + value + "-depends");
	return div;
}

function createMetabug(id, name, resolved){
	var div = $("<div>");
	div.attr("id", "bug"+ id);
	var link = $("<a>");
	link.attr("href", "https://bugzilla.mozilla.org/show_bug.cgi?id="+id);
	link.attr("title", name);
	link.append(id);
	div.append(link);
	return div;
}

function getMetabugs(metabugs){
	var url = "https://api-dev.bugzilla.mozilla.org/latest/bug?include_fields=id,depends_on,status,summary&id=";
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
		var id = bugs[i].id;
		var bugdiv = $("#bug"+id);
		var newbugdiv = createMetabug(id, bugs[i].summary);
		bugdiv.replaceWith(newbugdiv);
		var localDepends = bugs[i].depends_on;
		if(localDepends && localDepends != ""){
			if(depends != ""){
				depends += ",";
			}
			depends += localDepends;
		}
		var dependsdiv = $("#bug"+ id + "-depends");
		var dependsArray = depends.split(',');
		for(var j = 0; j < dependsArray.length; j++){
			var d = $("<span>");
			d.attr("id", "bug" + dependsArray[j]);
			var link = $("<a>");
			link.attr("href", "https://bugzilla.mozilla.org/show_bug.cgi?id="+dependsArray[j]);
			link.append(dependsArray[j]);
			d.append(link);
			dependsdiv.append(d);
			if(j+1 < dependsArray.length){
				dependsdiv.append(",");
			}
		}

	}
}