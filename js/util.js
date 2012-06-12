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