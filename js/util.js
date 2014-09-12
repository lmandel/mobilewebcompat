function startLoadingNotification(){
	$('#loading')
		.hide()
		.ajaxStart(function() {
			$(this).show();
			_appendDot();
		})
		.ajaxStop(function() {
			$(this).hide();
		});
}

function _appendDot(){
	var loading = $('#loading');
	loading.append(".");
	if(loading.is(":visible")){
		setTimeout(_appendDot, 1500);
	}

}

function createTabs(tabs){
	var detailsDiv = $('#details');
	var tabContainer = $('<div>');
	detailsDiv.append(tabContainer);

	var ul = $('<ul>');
	tabContainer.append(ul);
	for(var i = 0; i < tabs.length; i++){
		var name = tabs[i].name;
		var id = tabs[i].id;

		var li = $('<li>');
		var a = $('<a>');
		a.attr("href", "#"+id);
		a.append(name);
		li.append(a);
		ul.append(li);

		var div = $('<div>');
		div.attr("id", id);
		_createCompatTable(div, id);
		tabContainer.append(div);
	}
	tabContainer.tabs();
}

function _createCompatTable(div, id){
	var table = $('<table>');
	table.attr("id", id+"-compattable");
	var row = $('<tr>');
	table.append(row);
	row.append(_createTH("Rank"));
	row.append(_createTH("Site"));
	row.append(_createTH("URL"));
	row.append(_createTH("Meta bug"));
	row.append(_createTH("Layout bugs"));
	row.append(_createTH("Evangelism bugs"));
	row.append(_createTH("Other bugs"));
	row.append(_createTH("Owner"));
	row.append(_createTH("Other info"));
	div.append(table);
}

function _createTH(title){
	var th = $('<th>');
	th.append(title);
	return th;
}
function retrieveTestIndex(done1, done2){
	$.ajax({
	  url: "./data/testing/index.json",
	  dataType: 'json',
	  success: function(data){retrieveTestResults(data, done1, done2)},
	  error: function(jqXHR, textStatus, errorThrown){
	    alert('Failed to retrieve test results index.');
	  }
	});
	$.ajax({
		url: 'data/testing/manual_testing.json',
		dataType:'json',
		success: function(data){manualTestResults = data;},
		error:function(){}
	});
}
function retrieveTestResults(indexData, done1, done2){
	// We assume indexData is a chronologically sorted array
	// and we want only the newest 4-5 results for any bug
	// TODO: it would be cool to build on this to find "interesting" points (date of fix, date of apparent regression etc.)
	// and load per-bug data in a more sophisticated way, probably from a proper database..
	var filesToLoad = {}, loadCounter=0, numFilesToLoad = 1;
        indexData = indexData.slice(-numFilesToLoad);
	for(var i=indexData.length-1;i>=0; i--){
		filesToLoad[indexData[i]]=1;
		$.ajax({
			url: "./data/testing/"+indexData[i],
			success: (function(file){
				  return function(data){
					loadCounter++;
					delete filesToLoad[file];
					processTestResults(data);
					if(Object.keys(filesToLoad).length === 0 && loadCounter === indexData.length){
						done1();
						done2();
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
		testResults[value[0]].unshift(value);
	});
}

function setGlobalVar(name){
	return function (data){window[name] = data;}
}

// CSVToArray() from http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
	// Check to see if the delimiter is defined. If not,
	// then default to comma.
	strDelimiter = (strDelimiter || ",");

	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp(
	(
	// Delimiters.
	"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

	// Quoted fields.
	"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

	// Standard fields.
	"([^\"\\" + strDelimiter + "\\r\\n]*))"
	),
	"gi"
	);

	// Create an array to hold our data. Give the array
	// a default empty first row.
	var arrData = [[]];

	// Create an array to hold our individual pattern
	// matching groups.
	var arrMatches = null;


	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while (arrMatches = objPattern.exec( strData )){

	// Get the delimiter that was found.
	var strMatchedDelimiter = arrMatches[ 1 ];

	// Check to see if the given delimiter has a length
	// (is not the start of string) and if it matches
	// field delimiter. If id does not, then we know
	// that this delimiter is a row delimiter.
	if (
	strMatchedDelimiter.length &&
	(strMatchedDelimiter != strDelimiter)
	){

	// Since we have reached a new row of data,
	// add an empty row to our data array.
	arrData.push( [] );

	}


	// Now that we have our delimiter out of the way,
	// let's check to see which kind of value we
	// captured (quoted or unquoted).
	if (arrMatches[ 2 ]){

	// We found a quoted value. When we capture
	// this value, unescape any double quotes.
	var strMatchedValue = arrMatches[ 2 ].replace(
	new RegExp( "\"\"", "g" ),
	"\""
	);

	} else {

	// We found a non-quoted value.
	var strMatchedValue = arrMatches[ 3 ];

	}


	// Now that we have our value string, let's add
	// it to the data array.
	arrData[ arrData.length - 1 ].push( strMatchedValue );
	}

	// Return the parsed data.
	return( arrData );
}
