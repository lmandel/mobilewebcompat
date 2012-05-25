$(document).ready(function () {
  populateTable();
});


function populateTable(){
	//var metabugs = [];
	var table = $("#compattable");
	for(var i = 0; i < data.length; i++){
		var row = $("<tr>");
		table.append(row);
		row.append(createTableCell(data[i].name));
		row.append(createTableCell(data[i].url));
		row.append(createTableCell(createMetabug(data[i].bug)));
		row.append(createTableCell(data[i].info));
	}
	

}

function createTableCell(value){
	var td = $("<td>");
	td.append(value);
	return td;
}

function createMetabug(bug){
	var div = $("<div>");
	div.attr("id", "bug"+ bug);
	var link = $("<a>");
	link.attr("href", "https://bugzilla.mozilla.org/show_bug.cgi?id="+bug);
	link.append(bug);
	div.append(link);
	return div;
}