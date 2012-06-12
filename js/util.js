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
