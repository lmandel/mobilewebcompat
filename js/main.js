$(document).ready(function () {
  populateTable();
});


function populateTable(){
	var table = $("#compattable");
	alert("yay");
	if(data){
		alert("data");
	}
	for(var i = 0; i < data.length; i++){
		alert("yay2");
		var row = $("<tr>");
		table.append(row);
		row.append(createTableCell(data[i].name));
		row.append(createTableCell(data[i].url));
		row.append(createTableCell(data[i].bug));
		row.append(createTableCell(data[i].info));
	}
	

}

function createTableCell(value){
	var td = $("<td>");
	td.append(value);
	return td;
}