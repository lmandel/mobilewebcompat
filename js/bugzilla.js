function getMetabugs(metabugs, successFunction){
	_getBugs(metabugs, "alias,assigned_to,id,depends_on,status,summary", successFunction);
}

function getDependentBugs(dependentBugs, successFunction, errorFunction){
	_getBugs(dependentBugs, "alias,component,id,product,status,summary", successFunction);
}

function _getBugs(bugIds, fields, successFunction, errorFunction){
	var url = "https://api-dev.bugzilla.mozilla.org/latest/bug?include_fields=" + fields + "&id=" + bugIds;
	$.ajax({
	  url: url,
	  crossDomain:true, 
	  dataType: 'json',
	  success: function(data){
	    successFunction(data.bugs);
	  },
	  error: function(jqXHR, textStatus, errorThrown){
	    alert('Failed to retrieve bug data from Bugzilla.');
	  }
	});
}