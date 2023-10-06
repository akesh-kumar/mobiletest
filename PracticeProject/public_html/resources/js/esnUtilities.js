/*-----------------------------------------------------------------------------------------------------------  
esnUtilities.js
------------------------------------------------------------------------------------------------------------- 
Copyright RCL Public Co., Ltd. 2007 
-------------------------------------------------------------------------------------------------------------
Author Thanapong Tienniem 10/10/2018
- Change Log ------------------------------------------------------------------------------------------------  
## DD/MM/YY 	-User-     		-TaskRef-       -Short Description
01 10/10/18 	Thanapong                       Added function for using Ajax with jQuery
02 29/10/18		Pichit							Add 
-----------------------------------------------------------------------------------------------------------*/

function getDataFormServerToTable(service, data, table, onDataDisplayed, onDataReceived){
	console.log("getDataFormServerToTable")
	rptClearDisplay(table);
//	showLoader(table);
	
	getResultAjax(service, data)
		.done(handleTable);
	
	function handleTable(response){
//		hideLoader(table);
		console.log(response)
		if(onDataReceived){
			onDataReceived(response.Content);
		}
        rptAddData(table, response.Content);
		rptDisplayTable(table);
		if(onDataDisplayed){
			onDataDisplayed();
		}
	}	
}

/*
function splitRowID(id){
	var idAll = id.split(id.substring(0,3));

	if(idAll.length > 2){
		return id.substring(0,3) + idAll[1] + '-' + idAll[2].split('-')[1];
	}
	else{
		return id;
	}
}
*/

function dialogConfirm(msg) {
    return dialogGeneric("Confirmation", msg, "Yes", "No");
}

function dialogGeneric(title, msg, yesLabel, noLabel , visibleClose, errorCode){
	if(visibleClose == undefined){
		visibleClose = true;
	}
	
	var deferred = new $.Deferred();
	
	rutOpenMessageBox(title, msg, errorCode, 
			noLabel ? function(){
				deferred.resolve(false);
			} : null, 
			yesLabel ? function(){
				deferred.resolve(true);
			} : null, 
		noLabel, yesLabel, visibleClose);
	
	return deferred.promise();
	/*
	var buttons = {};
	if(yesLabel){
		buttons[yesLabel] = function(){
			$(this).dialog('close');
            $('body').find('#dialog-confirm').remove();
            deferred.resolve(true);
		}
	}
	if(noLabel){
		buttons[noLabel] = function () {
            $(this).dialog('close');
            $('body').find('#dialog-confirm').remove();
            deferred.resolve(false);
        }
	}
	
	var deferred = new $.Deferred();
    $('body').append('<div id="dialog-confirm"></div>')
    $("#dialog-confirm").html(msg);
    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: title,
        height: 250,
        width: 400,
        open: function(event, ui) {
        	if(!visibleClose){
        		$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        	}
        },
        buttons: buttons
    });
    
    // stuff -- resolve deferred once async method is complete
    return deferred.promise();
    */
}

function dialogFadeout(msg, title, errorCode){
	return dialogGeneric(title ? title : "Warning", msg, "Ok", null, true, errorCode);
	/*
	if($('body').find('#dialog').length <= 0)
		$('body').append('<div id="dialog" style="display:none;"> ' + msg + ' </div>');
	else
		$('#dialog').html(msg);
		
	$('#dialog').dialog({
	    autoOpen: true,
	    show: "blind",
	    hide: "clip",
	    modal: true,
	    position: { at: "center top" },
	    open: function(event, ui) {
	    	//setTimeout(function() {
	        //	$('#dialog').dialog('close');
	        //	$('body').find('#dialog').remove();  
	    	//}, 12000);
	    }
	});
	*/
		
	//setTimeout(function() {
    //	$('body').find('#dialog').remove();  
	//}, 6000);
}

function dialogFadeoutArray(errorArray, title, errorCode){
	var msg = '';
	errorArray.forEach(function(row){
		msg += row[0]+' : '+row[2]+'<br>';
	});
	return dialogGeneric(title ? title : "Warning", msg, "Ok", null, true, errorCode);
	/*
	if($('body').find('#dialog').length <= 0);
	{
		var msg = '';
		errorArray.forEach(function(row){
			msg += row[0]+' : '+row[2]+'<br>';
		});
		$('body').append('<div id="dialog" style="display:none;"> ' + msg + ' </div>')
	}
		
	$('#dialog').dialog({
	    autoOpen: true,
	    show: "blind",
	    hide: "clip",
	    modal: true,
	    position: { at: "center top" },
	    open: function(event, ui) {
	    	//setTimeout(function() {
	        //	$('#dialog').dialog('close');
	        //	$('body').find('#dialog').remove();  
	    	//}, 12000);
	    }
	});
		
	setTimeout(function() {
    	$('body').find('#dialog').remove();  
	}, 6000);
	*/
}

function setDisableEnableElement(id, disabled, clearValue){
//	$("#" + id).prop('disabled', disabled);
	setCustomTagProperty(id, {dis: disabled});
	if(clearValue){
		rutSetElementValue(id,"");
	}
//	$("#" + id).val('');
}

function hideParentElemnt(id){
	$("#" + id).parent().remove();
}

function removeElementWithIcon(id){
	$("#" + id).parent().parent().parent().remove();
}

function criteriaTypeChangeUI(type, element){
	var typeText = $('#' + type).find(":selected").text();
	if(typeText.toUpperCase().indexOf('DATE') != -1){
		 //$('#' + element).prop('type', 'date');
		//$('#' + element).datepicker( "option", "disabled", false );
		$('#' + element).attr('data-type', 'date');
	}else{
		 $('#' + element).prop('type', 'text');	
		 $('#' + element).removeAttr('data-type');
		 //$('#' + element).datepicker( "option", "disabled", true );
	}
//	$('#' + element).val('');
}

function findCustomTagRoot(id){
	var root = $("label[for='"+id+"']");
	if(root.length == 0){
		var control = $("#" + id); 
		var hasIcon = control.parent().next().prop("tagName") === "I";
		if(hasIcon){
			root = control.parent().parent().parent();
		}else{
			root = control.parent();
		}
		
	}else{
		root = root.parent();
	}
	return root;
}

function activeTabWithOutChangeTrigger(tab){
	if(!tab)
		return;
	var tabs = $(".rcl-standard-navigation-bar-tab");
	
	var tabpane = $(".tab-pane");
	tab = tab.replace(/\s+/g,'');
	
	for (var i = 0;i < tabs.length; i++){
		var tabName = tabs[i].innerHTML.replace(/\s+/g,''); 
        if (tabName == tab){
        	tabs[i].classList.add("active");
        }
        else
    	{
    		tabs[i].classList.remove("active");
    	}
    }
	
	for (var i = 0;i < tabpane.length; i++){
        if (tabpane[i].id.split('-')[1] == tab){
        	tabpane[i].classList.add("active");
        }
        else
    	{
        	tabpane[i].classList.remove("active");
    	}
    }
}

function validateValue(area, isOnlyVisible, reportAllError){
	if(area){
		var elementRequired = [];
		if(Array.isArray(area)){
			$.each(area, function(index, value){
				$.each($("#" + value), function(index2, value2){
					elementRequired.push(value2);
				});
			});
		}
		else{
			elementRequired.push($("#" + area));
		}
	}
	else{
		var elementRequired = $(".searchArea ,.dtlArea, .tblArea");
	}
//	var checkElementRequired = $(":input[required]:visible ,.searchArea:visible ,.dtlArea:visible, .tblArea:visible");

	
	//var elementRequired = $(':input[required]:visible');
	//var elementRequired = $(':input[required]');

	var errorMsg = "";
	var error = "";
	var result = true;
	for (var i = 0; i < elementRequired.length; i++) {
		var chkError = rutCheckArea(elementRequired[i].id, isOnlyVisible);
			if(chkError.length > 0){
				var firsterrorElement = chkError[0][0];
				
				//find lebel error
				error = $('#' + chkError[0][0]).prev().html();
				if(!error){
					error =  $('#' + firsterrorElement).prop('name');
				}
				if(!error){
					error =  $('#' + firsterrorElement).parent().parent().parent()[0].firstElementChild.innerText;
				}
				
				
				//active tab error
				var tabs = $('.tab-pane');
				for (var j = 0; j < tabs.length; j++) {
					var tabError = $('#' + tabs[j].id).find('#' + firsterrorElement);
					if(tabError.length > 0){
						activeTabWithOutChangeTrigger($(".rcl-standard-navigation-bar-tab")[j].innerHTML);
						//$(".rcl-standard-navigation-bar-tab")[j].click();
					}
				}
				
				//focus element error
				$('#' + firsterrorElement).focus();
								
				result = false;
				if(!reportAllError){
					errorMsg = error;
					break;
				}else{
					errorMsg += (errorMsg.length === 0 ? "" : ", ") + error;
				}
			}
//		if(!elementRequired[i].value)
//		{
//			error = $('#' + elementRequired[i].id).prev().html();
//			if(!error)
//				error =  $('#' + elementRequired[i].id).parent().parent().parent()[0].firstElementChild.innerText;
//			if(!error.trim())
//				error =  $('#' + elementRequired[i].id).prop('name');
//			
//			result = false;
//			dialogFadeout(error + ' is required.');
//			break;
//		}
	}
	
	if(!result){
		dialogGeneric("Warning", "*"+errorMsg + (reportAllError ? ' required.' : ' is mandatory'), "Ok");
	}
	
	return result
}

function setCustomTagProperty(id, properties){
	setCustomTagPropertyParam(id, properties.dis, properties.rdo, properties.req, properties.iconClick);
}

function setCustomTagPropertyParam(id, disabled, readonly, required, keepIconClick){
	var setDis = typeof disabled === 'boolean';
	var setRdo = typeof readonly === 'boolean';
	var control = $("#" + id);
	if(keepIconClick === undefined){
		keepIconClick = false;
	}
	
	var isSelect = control.prop("tagName") === "SELECT";
	if(isSelect){
		if(setDis){
			control.attr('data-dis', disabled ? '' : null);
			//disabled ? control.addClass('selectArrowDisable') : control.removeClass('selectArrowDisable');
		}
		if(setRdo){
			control.attr('data-rdo', readonly ? '' : null);
			//readonly ? control.addClass('selectArrowDisable') : control.removeClass('selectArrowDisable');
		}
		if(control.attr('data-dis') !== undefined || control.attr('data-rdo') !== undefined){
			control.addClass('selectArrowDisable');
		}
		else{
			control.removeClass('selectArrowDisable')
		}
	}else{
		if(setDis){
			control.prop('disabled', disabled);
			//disabled ? control.addClass('fieldReadOnly') : control.removeClass('fieldReadOnly');
		}
		if(setRdo){
			control.prop('readonly', readonly);
			//readonly ? control.addClass('fieldReadOnly') : control.removeClass('fieldReadOnly');
		}
	}
	if(typeof required === 'boolean'){
		control.prop('required', required);
	}
	
	var iconControl = control.parent().next();
	var hasIcon = iconControl.prop("tagName") === "I";
	if(hasIcon && !keepIconClick){
		//Try to cache onclick to data-onclick first if not yet
		if(iconControl.attr('data-onclick') === undefined){
			var onclickContent = iconControl.attr('onclick');
			if(onclickContent === undefined){
				onclickContent = "";
			}
			iconControl.attr('data-onclick', onclickContent);
		}
		
		//Check if the control is becoming interactable or not
		var interactable = true;
		if(isSelect){
			interactable = control.attr('data-dis') === undefined && control.attr('data-rdo') === undefined; 
		}else{
			interactable = !control.prop('disabled') && !control.prop('readonly'); 
		}
		
		//Adjust icon accordingly
		/*if(!interactable){
			if(iconControl.attr("onclick")){
				iconControl.attr("data-onclick" , iconControl.attr("onclick"));
				iconControl.prop("onclick", null);
				//iconControl.attr("onclick", null);
			}
		}else{
			if(iconControl.attr("data-onclick")){
				iconControl.attr("onclick" , iconControl.attr("data-onclick"));
				//iconControl.prop("onclick" , iconControl.attr("data-onclick"));
				iconControl.removeAttr("data-onclick");
			}
		}*/
		
		if(interactable){
			//If possible, move data-onclick to onclick
			var onclickContent = iconControl.attr('data-onclick');
			if(onclickContent){
				iconControl.attr('onclick', onclickContent);
			}else{
				iconControl.prop('onclick', null);
			}
		}else{
			//clear onclick
			iconControl.prop('onclick', null);
		}
	}
}

function checkAction(oldobj, newobj){	

	var action = 'n';
	
	if(!oldobj)
		action = 'i';
	
	else if (JSON.stringify(oldobj) !== JSON.stringify(newobj))
		action = 'u';

	return action;
}

function getDataAreaToObject(area){
	var obj = { };
	var div = document.getElementById(area);
	
	$(div).find('input:text, input:password, input:file, input[type="date"], input:radio, input:checkbox, select, textarea')
	      .each(function() {
		        	switch($(this).attr("type")) {
			            case 'checkbox':
			            	obj[$(this).attr('id').substring(3, $(this).attr('id').length)] = $(this).is(":checked") ? "Y" : "N";
		                	break;
			            case 'radio':
		            		obj[$(this).attr('id').substring(3, $(this).attr('id').length)] = $(this).is(":checked");
		                	break;	
			            case 'date':
			            	obj[$(this).attr('id').substring(3, $(this).attr('id').length)] = convertDateFormat($(this).val());
			            	break;
			            default:
			            	obj[$(this).attr('id').substring(3, $(this).attr('id').length)] = $(this).val();
		            	    break;
	        			}
	      		});	
	return obj;
}

function convertDateFormat(date){

      if (!date) 
          return "";
  
      else {
    	  var d = date.split('-')[2];
          var m = date.split('-')[1];
          var y = date.split('-')[0];
          return y + m + d;
      }
}

function isoToDate(isoDate, isoTime){
	var year = 1970;
	var month = 1;
	var date = 1;
	var hour = 0;
	var min = 0;
	if(isoDate){
		var splitDt = isoDate.split('-');
		year = parseInt(splitDt[0], 10);
		month = parseInt(splitDt[1], 10);
		date = parseInt(splitDt[2], 10);
	}
	if(isoTime){
		var splitTime = isoTime.split(':');
		hour = parseInt(splitTime[0], 10);
		min = parseInt(splitTime[1], 10);
	}
    return new Date(year, month-1, date, hour, min);
}

function dateToIso(date){
	return date.getFullYear() + "-" + 
		("0" + (date.getMonth()+1)).slice(-2) + "-" + 
		("0" + date.getDate()).slice(-2);
}

function addIndexTable(list){
	for (i = 0; i < list.length; i++) { 
		list[i].index = i + 1;
	}
	return list;
}

/**
 * Invoke callback for each row in specified Powertable. Callback will be provided with the following parameters
 * rowId : HTML id of the row 
 * idNum : Numeric part extracted from rowId
 * index : "Sibling" index of the row in current collection of rows
 * data: Display data. Provided only if useData = true
 * element: Row element of current row. 
 * @param powerTableId Powertable to loop through
 * @param callback Callback to be invoked. Return false in callback will end the loop.
 * @param useData Whether callback should be provided with display data or not
 * @param criteria Additional row criteria for filtering before invoking callback. Pass falsy value if not using
 * @param stateData Any data. Will be passed to every iterations
 * @return All jquery rows being operated on (all rows will be returned even if the loop ends midway)
 */
function rptForeachRow(powerTableId, callback, useData, criteria, stateData){
	return _rptForeachRowInternal(0, powerTableId, callback, useData, criteria, stateData);
	/*
	var settings = rptGetTableSettings(powerTableId);
	var rowIndexStart = settings.rowId.length + 1;
	var jqueryResult = $("#" + powerTableId).find(".tblRow").not(":last");
	if(criteria){
		jqueryResult = jqueryResult.filter(criteria);
	}
	jqueryResult.each(function(){
		var rowId = $(this).attr("id");
		var idNum = parseInt(rowId.substring(rowIndexStart), 10);
		var index = $(this).index();
		if(useData){
			var rowData = rptGetDataFromDisplay(powerTableId, rowId);
			callback(rowId, idNum, index, rowData);
		}else{
			callback(rowId, idNum, index);
		}
	});
	*/
}

/**
 * Invoke callback for each row in specified Powertable. Callback will be provided with the following parameters
 * rowId : HTML id of the row 
 * idNum : Numeric part extracted from rowId
 * element : jquery element of current row
 * data: Display data. Provided only if useData = true
 * element: Row element of current row. 
 * @param powerTableId Powertable to loop through
 * @param callback Callback to be invoked. Return false in callback will end the loop.
 * @param useData Whether callback should be provided with display data or not
 * @param criteria Additional row criteria for filtering before invoking callback. Pass falsy value if not using
 * @param stateData Any data. Will be passed to every iterations
 * @return All jquery rows being operated on (all rows will be returned even if the loop ends midway)
 */
function rptForeachRowElement(powerTableId, callback, useData, criteria, stateData){
	return _rptForeachRowInternal(1, powerTableId, callback, useData, criteria, stateData);
}

//Type 0: rowId, idNum, index[, data, stateData]
//Type 1: rowId, idNum, element[, data, stateData]
function _rptForeachRowInternal(callbackType, powerTableId, callback, useData, criteria, stateData){
	var settings = rptGetTableSettings(powerTableId);
	var rowIndexStart = settings.rowId.length + 1;
	var jqueryResult = $("#" + powerTableId).find(".tblRow").not(":last");
	if(criteria){
		jqueryResult = jqueryResult.filter(criteria);
	}
	jqueryResult.each(function(){
		var rowId = $(this).attr("id");
		var idNum = parseInt(rowId.substring(rowIndexStart), 10);
		var args = [rowId, idNum];
		switch(callbackType){
		case 0: 
			args.push($(this).index());
			break;
		case 1:
			args.push($(this));
			break;
		}
		if(useData){
			var rowData = rptGetDataFromDisplay(powerTableId, rowId);
			args.push(rowData);
		}else{
			args.push(null);
		}
		if(stateData){
			args.push(stateData);
		}
		return callback.apply(null, args);
	});
	return jqueryResult;
}

function rptGetDataFromDisplayAll(containerId){
	var listData = [];
 
    $("#" + containerId).find(".tblRow").not(':last').each(function(){
     
    	var rowData = rptGetDataFromDisplay(containerId, $(this)[0].id);
	     
	    rowData.rowId = $(this)[0].id;
	     
	    listData.push(rowData);
    });
    
    return listData;
}

function rptCusorRowTable(containerId, rowid){
    $("#" + containerId).find(".tblRow").each(function(){
    	console.log(rowid,  $(this)[0].id)
    	if(rowid ==  $(this)[0].id){
    		$("#" + $(this)[0].id).addClass("table-info");
    		$("#" + $(this)[0].id).removeClass("bg-light");
    	}
    	else
    		$("#" + $(this)[0].id).removeClass("table-info");
    });
}

/**
 * Generate a map consisting of { rowId -> { Display data } }
 * @param containerId Powertable to extract data from
 * @returns A map
 */
function rptGetDataMapFromDisplay(containerId){
	var map = {};
	
	$("#" + containerId).find(".tblRow").not(':last').each(function(){
		var rowId = $(this).attr("id");
		var rowData = rptGetDataFromDisplay(containerId, rowId);
   		map[rowId] = rowData;   		
   	});
	
	return map;
}

function rptAddDataWithCache(containerId, data){
	var settings = rptGetTableSettings(containerId);
	var original = JSON.parse(JSON.stringify(data));
	rptGetInsertsAndChanges(containerId, true);
	settings.originalData = original;
	rptAddData(containerId, data);
}

/**
 * Return summarized version of history log of Powertable retrieved with rptGetInsertsAndChanges
 * 
 * @returns {Array} An array of summarized log that has these characteristics:
 * - Each log element will contain key "index", specifying which data (in cache) is associated with this log
 * - rowId in history will be unique
 * - Action for existing row will be either 'u' or 'd'. Action for newly inserted row will always be 'i'
 */
function getSummarizedPtLog(containerId, action){
	var settings = rptGetTableSettings(containerId);
	var rowIndexStart = settings.rowId.length + 1; //Index to extract row index from element id
	
	//History log. Action for existing row will be either 'u' or 'd'. Action for new row will be either 'i' or 'd'
	var historyLog = rptGetInsertsAndChanges(containerId, action);
	
	var historyCache = {}; //rowId -> action
	for(var i=0; i<historyLog.length; i++){
		var h = historyLog[i];
		if(h.action === 'd' && historyCache[h.rowId] && historyCache[h.rowId].action === 'i'){
			//Any newly inserted row that gets deleted should be removed from log
			delete historyCache[h.rowId];
		}else{
			var rowIndex = parseInt(h.rowId.substring(rowIndexStart), 10);
			historyCache[h.rowId] = {action:h.action, index:rowIndex};
		}
	}
	
	historyLog = [];
	for(var rowId in historyCache){
		historyLog.push({ rowId:rowId, index:historyCache[rowId].index, action:historyCache[rowId].action });
	}
	
	return historyLog;
}

function getCurrentPtDataWithAction(containerId, clearLog, addRowId){
	var settings = rptGetTableSettings(containerId);
	var prefixLength = settings.configuration.prefixLength;
	var prefix = containerId.substring(0,prefixLength);
	var prechangeData = settings.originalData;
	
	//Extract pk field from template row
	var pks = []; //A list of pk field name (prefix removed)
	$("#"+settings.rowId).find(".pk").each(function(){
		var str = this.id.substring(prefixLength);
		pks.push(str); 
		});
	
	//Get current displayed data map, tag all of them as no-change
	var dataMap = rptGetDataMapFromDisplay(containerId);
	for(var k in dataMap){
		if(dataMap.hasOwnProperty(k)){
			dataMap[k].action = 'n';
		}
	}
	
	//Get summarized history log
	var historyLog = getSummarizedPtLog(containerId, clearLog);
	
	/*
	 * Loop through history log and check for pk(s) change. The update action will be changed to
	 * - The pre-update row is deleted
	 * - The post-update row is inserted
	 * History log will now contain keys: 
	 * - "pk" is object containing pks
	 */ 
	var historyLength = historyLog.length; //Save length so that the loop does not iterate pass initial log
	for(var i=0; i<historyLength; i++){
		var log = historyLog[i];
		if(log.action === 'u'){
			//Check for pk change first
			var pkChanged = false;
			var rowData = prechangeData[log.index];
			var rowDisplayData = dataMap[log.rowId];
			var dataPks = {};
			var displayPks = {};
			for(var j=0; j<pks.length; j++){
				var pk = pks[j];
				if(rowData[pk] != rowDisplayData[pk]){ //Use == as number input becomes string ##pp
					pkChanged = true;
				}
				dataPks[pk] = rowData[pk];
				displayPks[pk] = rowDisplayData[pk];
    		}
			if(pkChanged){
				//Pre-update becomes delete action. Switch update log to delete
				log.action = 'd';
				log.pk = dataPks;
				
				//Post-update becomes insert action. Add insert log
				historyLog.push({ rowId:log.rowId, index:log.index, action:'i', pk:displayPks });
			}else{
				//If pk(s) is not changed, takes data from display
				log.pk = displayPks;
			}
		}else{
			//If insert action -> take pks from display
			//If delete action -> take pks from data
			var rowData = log.action === 'i' ? rptGetDataFromDisplay(containerId, log.rowId) : prechangeData[log.index];
			log.pk = {};
			for(var j=0; j<pks.length; j++){
				var pk = pks[j];
				log.pk[pk] = rowData[pk];
    		}
		}
	}
	
	/*
	 * At this state, all "insert" and "update" are guaranteed to be written to db.
	 * Any "delete" with repeated pks as "insert"/"update" should be removed.
	 * "insert"/"update" should be changed to "update" with rowId changed to the deleted one.
	 */
	//Sort "delete" to the end
	historyLog.sort(function(a,b){
		return a.action === 'd' ? 1 : (b.action === 'd' ? -1 : 0);
	});
	//Loop through history, inspect "delete"
	var deleteStartIndex = -1;
	for(var i=0; i<historyLog.length; i++){
		if(historyLog[i].action === 'd' && deleteStartIndex === -1){
			deleteStartIndex = i;
		}
		//"delete" log
		if(i >= deleteStartIndex){
			//Check for pks match between "delete" and "insert"/"update"
			for(var j=0; j<deleteStartIndex; j++){
				var pkMatched = true;
				for(var pkIdx = 0; pkIdx < pks.length; pkIdx++){
					var pkName = pks[pkIdx];
					if(historyLog[i].pk[pkName] != historyLog[j].pk[pkName]){ //Use == as number input becomes string ##pp
						pkMatched = false;
						break;
					}
				}
				if(!pkMatched) continue;
				//Match found
				historyLog[j].action = 'u';
				historyLog[i] = null;
				break;
			}
		}
	}
	
	//Gather data for each changed row
	var result = [];

	for(var i = 0; i < historyLog.length; i++ ){
		var log = historyLog[i];
		if(!log) continue;
		if(log.action === 'd'){
			var obj = { action: 'd' };
			for(var pkName in log.pk){
				obj[pkName] = log.pk[pkName];
			}
			result.push(obj);
		}else{
			//Take data from map and add it to result
			var obj = dataMap[log.rowId];
		
			//comment for order by
			delete dataMap[log.rowId];
			
			obj.action = log.action;
			obj.rowId = log.rowId;	
			
			result.push(obj);
		}
	}

	//Take remaining data from dataMap
	for(var k in dataMap){
		if(dataMap.hasOwnProperty(k)){
			//add for order by
			dataMap[k].rowId = k;
			result.push(dataMap[k]);
		}
	}

	//sort data by rowId
	result = result.sort(function (a, b) {
		//Use any index for row that can extract idNum
		var aIndex = 1000000000;
		var bIndex = 1000000000;
		if(a.rowId && a.rowId.indexOf("-") >= 0){
			aIndex = parseInt(a.rowId.substring(a.rowId.indexOf("-") + 1));
			if(isNaN(aIndex)){
				aIndex = 1000000000;
			}
		}
		if(b.rowId && b.rowId.indexOf("-") >= 0){
			bIndex = parseInt(b.rowId.substring(b.rowId.indexOf("-") + 1));
			if(isNaN(bIndex)){
				bIndex = 1000000000;
			}
		}
	    return aIndex - bIndex;
	});
	
	
	//add row data (move from gather data for each changed row)
	if(!addRowId){
		for(var i = 0; i < result.length; i++){
			delete result[i]["rowId"]
		}
	}
	
	return result;
}

function sortByKeyDesc(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
function sortByKeyAsc(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}



/**
 * Returns an array of data of all rows that are either inserted or changed based on history log
 * (the list used by rptGetInsertsAndChanges).
 * Each row of data will have additional key "action" with 3 possible values: i/u/d (insert/update/delete)  
 * For a row with action = d, only fields with class pk will be included.
 * This function will try to summarize change if multiple actions occurs on the same data row.
 * The function also checks for actual action on existing data if it is actually update or delete.
 * If action is true the existing history log is cleaned.
 * IMPORTANT: 
 * - Before calling this function, all current pk fields must be unique.
 * - Data must be added with rptAddDataWithCache
 * 
 * @param {String} containerId The html id of the table area.
 * @param {Boolean} action True or false depending on whether the list shall be cleared or not.
 * @returns {Array} An array of rows data extracted from the table, each row have "action" key included. 
 */
function getChangedData(containerId, action, rowId){
	var settings = rptGetTableSettings(containerId);
	var prefixLength = settings.configuration.prefixLength;
	var prefix = containerId.substring(0,prefixLength);
	var prechangeData = settings.originalData;
	
	//Extract pk field from template row
	var pks = []; //A list of pk field name (prefix removed)
	$("#"+settings.rowId).find(".pk").each(function(){
		var str = this.id.substring(prefixLength);
		pks.push(str); 
		});
	
	//Get summarized history log
	var historyLog = getSummarizedPtLog(containerId, action);
	
	/*
	 * Loop through history log and check for pk(s) change. The update action will be changed to
	 * - The pre-update row is deleted
	 * - The post-update row is inserted
	 * History log will now contain keys: 
	 * - "pk" is object containing pks
	 */ 
	var historyLength = historyLog.length; //Save length so that the loop does not iterate pass initial log
	for(var i=0; i<historyLength; i++){
		var log = historyLog[i];
		if(log.action === 'u'){
			//Check for pk change first
			var pkChanged = false;
			var rowData = prechangeData[log.index];
			var rowDisplayData = rptGetDataFromDisplay(containerId, log.rowId);
			var dataPks = {};
			var displayPks = {};
			for(var j=0; j<pks.length; j++){
				var pk = pks[j];
				if(rowData[pk] != rowDisplayData[pk]){ //Use == as number input becomes string ##pp
					pkChanged = true;
				}
				dataPks[pk] = rowData[pk];
				displayPks[pk] = rowDisplayData[pk];
    		}
			if(pkChanged){
				//Pre-update becomes delete action. Switch update log to delete
				log.action = 'd';
				log.pk = dataPks;
				
				//Post-update becomes insert action. Add insert log
				historyLog.push({ rowId:log.rowId, index:log.index, action:'i', pk:displayPks });
			}else{
				//If pk(s) is not changed, takes data from display
				log.pk = displayPks;
			}
		}else{
			//If insert action -> take pks from display
			//If delete action -> take pks from data
			var rowData = log.action === 'i' ? rptGetDataFromDisplay(containerId, log.rowId) : prechangeData[log.index];
			log.pk = {};
			for(var j=0; j<pks.length; j++){
				var pk = pks[j];
				log.pk[pk] = rowData[pk];
    		}
		}
	}
	
	/*
	 * At this state, all "insert" and "update" are guaranteed to be written to db.
	 * Any "delete" with repeated pks as "insert"/"update" should be removed.
	 * "insert"/"update" should be changed to "update" with rowId changed to the deleted one.
	 */
	//Sort "delete" to the end
	historyLog.sort(function(a,b){
		return a.action === 'd' ? 1 : (b.action === 'd' ? -1 : 0);
	});
	//Loop through history, inspect "delete"
	var deleteStartIndex = -1;
	for(var i=0; i<historyLog.length; i++){
		if(historyLog[i].action === 'd' && deleteStartIndex === -1){
			deleteStartIndex = i;
		}
		//"delete" log
		if(i >= deleteStartIndex){
			//Check for pks match between "delete" and "insert"/"update"
			for(var j=0; j<deleteStartIndex; j++){
				var pkMatched = true;
				for(var pkIdx = 0; pkIdx < pks.length; pkIdx++){
					var pkName = pks[pkIdx];
					if(historyLog[i].pk[pkName] != historyLog[j].pk[pkName]){ //Use == as number input becomes string ##pp
						pkMatched = false;
						break;
					}
				}
				if(!pkMatched) continue;
				//Match found
				historyLog[j].action = 'u';
				historyLog[i] = null;
				break;
			}
		}
	}
	
	//Gather data for each changed row
	var result = [];
	for(var i = 0; i < historyLog.length; i++ ){
		var log = historyLog[i];
		if(!log) continue;
		if(log.action === 'd'){
			var obj = { action: 'd' };
			for(var pkName in log.pk){
				obj[pkName] = log.pk[pkName];
			}
			result.push(obj);
		}else{
			var obj = rptGetDataFromDisplay(containerId, log.rowId);
			obj.action = log.action;
			
			if (rowId)
				obj.rowId = log.rowId;	
			
			result.push(obj);
		}
	}
	
	return result;
}

/**
 * Try to delete all rows marked for deletion from specified table. A row is marked using
 * an element with id specified in checkboxId. The element must return value as either 'Y' or 'N'.
 * Any row with the element with value 'Y' will be deleted. Delete confirmation and warning is optional
 * @param tableId Powertable to delete rows
 * @param checkboxId Row element ID to check for deletion. The element must return value 'Y' or 'N'
 * @param showDialog If true, dialog is shown if no row to delete and when confirmation needed
 * @param onDeleteCallback Callback function with (rowId) as parameter. Called before the row is deleted
 */
function rptTryToDeleteSelectedRows(tableId, checkboxIdWithoutPrefix, showDialog, onDeleteCallback){
	var allData = rptGetDataFromDisplayAll(tableId);
	var deleting = [];
	allData.forEach(function(row){
		if(row[checkboxIdWithoutPrefix] === 'Y'){
			deleting.push(row.rowId);
		}
	});
	if(deleting.length == 0){
		if(typeof showDialog == "string"){
			dialogGeneric("Warning", "At least one delete checkbox should be checked at "+showDialog , "Ok");
		}else if(showDialog){
			dialogGeneric("Warning", "At least one delete checkbox should be checked" , "Ok");
		}
	}else{
		for(var i=0; i<deleting.length; i++){
			if(onDeleteCallback){
				onDeleteCallback(deleting[i]);
			}
			rptRemoveRow(tableId, deleting[i]);
		}
	}
}

function _rptHandleRowChildChange(settings, rowid){
    var found=false; //whether we found the row already
    //array.find is not supported in IE11 and earlier
    for (var i=0;i<settings.insertsAndChanges.length;i++){
        if (settings.insertsAndChanges[i]==('u-'+ rowid)){
            found=true;
            break;
        }
        else if (settings.insertsAndChanges[i]==('i-'+ rowid)){
            found=true;
            break;
        }
    }
    if (!found){
        settings.insertsAndChanges.push('u-'+ rowid);
    }
}

function esnParseNumber(data, defaultValue){
	if(typeof data == "number"){
		return data;
	}
	if(data){
		if(data.indexOf(".") !== -1){
			data = parseFloat(data);
		}else{
			data = parseInt(data, 10);
		}
	}
	if(isNaN(data)){
		data = defaultValue;
	}
	return data;
}

function rutSetDialogTitle(dialogId, title){
	$("[aria-describedBy='" + dialogId + "']").find("span.ui-dialog-title").text(title);
}

/**
 * Toggle standard checkbox (checkbox input wrapped in div and has label as its preceding sibling) 
 * to view mode, which is <rcl:select>
 */
function toggleCheckboxToViewMode(checkboxId, wrapperClasses ,callback){
	var checkbox = $("#" + checkboxId);
	var originalValue = rutGetElementValue(checkboxId);
	var wrapper = checkbox.parent();
	if(wrapperClasses){
		wrapper.attr("class", wrapperClasses);
	}
	var label = checkbox.prev();
	var customTagClass = "";
	var checkboxClass = checkbox.attr("class");
	if(checkboxClass){
		var ctClasses = ["dtlField", "searchField", "tblField"];
		for(var i=0; i<ctClasses.length; i++){
			if(checkboxClass.indexOf(ctClasses[i]) !== -1){
				customTagClass = ctClasses[i];
			}
		}
	}
	
	var html = '<label class="rcl-standard-font" for="' + checkboxId + '">' + label.html() + "</label>\n" +
				'<select id="' + checkboxId + '" class="rcl-standard-form-control rcl-standard-component ' + 
						customTagClass + ' selectArrowDisable" data-rdo data-ct="bt-select tb-YesNo">\n' +
				'	<option value></option>\n' +
				'	<option value="Y">Yes</option>\n' +
				'	<option value="N">No</option>\n' +
				'</select>\n';
	
	wrapper.html(html);
	rutSetElementValue(checkboxId,originalValue);
	if(callback != undefined){
		callback();
	}
}

//====================================================

function openEdiHistory(bookingNo){
	var baseUrl = ediBaseUrl + "fromModule=BOOKING&servaction=find&txt_booking_no=" + bookingNo;
	var w = window.open(baseUrl, 'PopupWindow', 'width=650,height=650,resizable=no,scrollbars=yes,toolbar=no,,left=100,top=100');
	w.focus();
}

/*
//overide fucntion ascan 
function rutSelectLookupEntry2(dialogId, returnCols, returnIds ){
    var element=document.activeElement;
    var parents=rptGetParentIds(element);
    var settings=rptGetTableSettings(parents.parentContainerId);
    var prefix=settings.idPrefix;
    var r=parents.parentRowId.split('-');
    var rowSuffix='-'+r[r.length-1];
    // now we have prefix and suffix and are capable to build the elementIds.
    var columns=returnCols.split(',');
    var returnIdList=returnIds.split(',');
    var el=null;
    for (var i=0;i<columns.length;i++){
        if (columns[i]!=''){
            el=document.getElementById(prefix+columns[i]+rowSuffix);
            fid=prefix+columns[i]+rowSuffix;
            el=document.getElementById(fid);
            rutSetElementValue(splitRowID(returnIdList[i]),rutGetElementValue(el) );
        }
    }
    rutCloseLookupPopoverDialog(dialogId, parents.parentContainerId);
    
    //Add trigger after setting value from lookup
    for (var i=0;i<columns.length;i++){
        if (columns[i]!=''){
        	$("#" + returnIdList[i]).trigger("lookup");
        }
    }
    
    function splitRowID(id){
    	var idAll = id.split('-');
    
    	if(idAll.length > 1){
    		return idAll[0] + '-' + idAll[2]
    	}
    }
}
*/

/**
 * Return if the specified row can be further processed or not.
 * If the row is deleted, this function returns false
 */
function addActionHistoryPowerTable(containerId, rowId){
	
	var rowData = rptGetDataFromDisplay(containerId, rowId);
	
	var settings = getTableSettings(containerId);
		
	switch (rowData.action){
		case "d":
			rptRemoveRow(containerId, rowId);
			return false;
		case "i":
		case "u":
			settings.insertsAndChanges.push(rowData.action + '-' + rowId);
			break;
		default:
			break;
	}
	return true;
}

function rutOpenLookupTableWithReturnAction(table, returnCols, returnIds, selectCols, selectValues, selectOperators, displayTitle){
    //1 call web service to get the data with table, selectedCols, selectedVals
    //2 when data array is returned analyse first record in array to build the html template
    //3 assign data to settings
    //4 Display dialog box
    //5 Close dialog box, assign return values
    var title=(displayTitle)?displayTitle: rutToTitleCase(table.substring(4)+' Lookup'); //remove the VRL_ from the table name
    //##60 BEGIN
    //var wsInput = _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators);
    var wsInput = _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators, returnCols);
    returnCols = returnCols.replace(/\*\w*/g, "");
    //##60 END
    rutGetLookupData(wsInput, showLookupDialog); //###42
    //showLookupDialog(getTestData()); //only for dry test without server
    return; //###42

    //Inner Function
    function showLookupDialog(lookupResult){
        //###55 BEGIN
        var data=lookupResult.data;
        var metaData=lookupResult.metadata; 
        if (data.length<=0){
            //No data found display error message
            let errorMessage=(wsInput.select.length==0)?'No data found':'No data found for ';
            for (var i=0; i<wsInput.select.length;i++){
                errorMessage+=wsInput.select[i].column+wsInput.select[i].operator+wsInput.select[i].value+' ';
            }
            rutOpenMessageBox('Error on lookup of '+table.substring(4), errorMessage, 'rut003-001',null,'');
            return;
        }
        var element=document.getElementById('t99Lookup-dlg');
        if (element!=null){ //another lookup table was not clossed properly but through x button
            element.parentNode.removeChild(element); //element.remove does not work in IE
        }
        var htmlString='';
        var cr='\r\n';
        var tdStyleString='';
        var tdStyleNumber='';
        var tdHideClass="d-none"; 
        var tdClass='';

        var minDialogWidth = 550; //This is wide enough for paging/dialog buttons //##56e
        
        var colWidths=[]; //##56f
        var selectColSize = 50; //##56f
        var colSizes=[];
        //var totalColSize=50; //we have already the select button //##56f
        var totalColSize=selectColSize; //##56f
        var numCols=0;
        var colSize=0;
        for (var i=0;i<metaData.length;i++){ //Here we compute the size of the columns
            colSize=Math.min(Math.max(metaData[i].precision,metaData[i].columnName.length)*9,200); //1 char ~ 9px
            colSize = Math.max(colSize, 72); //Need at least space for sort buttons //##56f
            colWidths.push(colSize); //##56f
            colSizes.push(colSize+'px;');
            if (metaData[i].columnName.substring(0,5).toUpperCase()!='HIDE_'){
                numCols++;
                totalColSize+=colSize;
            }
        }
        //var totalAreaWidth=((1+numCols)*8)+totalColSize+1; //each column has 2 x 3px padding and 1px border, 17px for scrollbar //##56f
        var totalAreaWidth=((1+numCols)*8)+totalColSize+17;
        
        //##56f BEGIN 
        if(totalAreaWidth < minDialogWidth){
        	//Redistribute column width using width ratio
        	var oldTotalColSize = totalColSize;
        	totalColSize = 0;
        	//Fix select to 50
        	//var expectedTotalColSize = minDialogWidth - 17 - ((1+numCols)*8);
        	//selectColSize = (50.0/oldTotalColSize) * expectedTotalColSize;
        	var expectedTotalColSize = minDialogWidth - 17 - ((1+numCols)*8) - 50;
        	oldTotalColSize -= 50;
        	for(var i=0; i<colSizes.length; i++){
        		colWidths[i] = (colWidths[i]*1.0/oldTotalColSize) * expectedTotalColSize;
        		colSizes[i] = colWidths[i]+'px;';
        		if (metaData[i].columnName.substring(0,5).toUpperCase()!='HIDE_'){
                    totalColSize+=colWidths[i];
                }
        	}
        	totalAreaWidth=minDialogWidth; 
        }
        //##56f END
        
        htmlString+='<div id="t99Lookup-dlg">';
        var containerId="t99Lookup";
        var buttonIdAsc=null;
        var buttonIdDes=null;
        var buttonColorClass="rclDlgSortDirectionBtn"; //settings are not ready, so we cannot get it from there
        //Display search area
        htmlString+='<div style="padding:2px;"><table>'+
                    '<tr>'+
                        '<td><label class="col-sm1 bt-1" for="'+containerId+'-dlgSearch'+'">Search</label></td>'+ 
                        '<td colspan=2> <input class="col-sm2" type="text" id="'+containerId+'-dlgSearch'+'" '+                                
                        '></input></td>'+
                    '</tr>'+
                '</table>';
        htmlString+='</div>';

        //htmlString+= '<div>'; //##56f
        htmlString+= '<div style="overflow-x:auto;">'; //##56f
        htmlString+='<div id="t99HeaderRow" class="rcl-lkHeader">'; 
        htmlString+='<p class="rcl-lkHeaderRow">';
        //htmlString+='<span class="rcl-lkHeaderCell" style="flex-basis:50px;max-width:50px;min-width:50px;">Select</span>'; //##56f
        htmlString+='<span class="rcl-lkHeaderCell" style="flex-basis:' + selectColSize + 'px;max-width:' + //##56f
        	selectColSize + 'px;min-width:' + selectColSize + 'px;">Select</span>'; //##56f
        var colHeader=null;
        for (var i=0;i<metaData.length;i++){ 
            if (metaData[i].columnName.substring(0,5).toUpperCase()=='HIDE_'){
                tdClass='class="rcl-lkHeaderCell '+tdHideClass+'"';
            }
            else {
                tdClass='class="rcl-lkHeaderCell"';
            }
            colHeader=rutToTitleCase(metaData[i].columnName);
            htmlString+=('<span '+tdClass+' style="flex-basis:'+colSizes[i]+'max-width:'+colSizes[i]+'">'+colHeader+'</span>');
        }
        htmlString+='</p>'; 
        
        //htmlString+='<p class="rcl-lkHeaderRow">'+cr+'<span class="rcl-lkHeaderCell" style="flex-basis:50px;max-width:50px;min-width:50px;"></span>'; //##56f
        htmlString+='<p class="rcl-lkHeaderRow">'+cr+'<span class="rcl-lkHeaderCell" style="flex-basis:' + //##56f 
        	selectColSize + 'px;max-width:' + selectColSize + 'px;min-width:' + selectColSize + 'px;"></span>'; //##56f
        for (var i=0;i<metaData.length;i++){
            colHeader=rutToTitleCase(metaData[i].columnName);//###42x
            if (metaData[i].columnName.substring(0,5).toUpperCase()=='HIDE_'){//###42x
                tdClass='class="rcl-lkHeaderCell '+tdHideClass+'" ';
            }
            else {
                tdClass='class="rcl-lkHeaderCell"';;
            }
            buttonIdAsc='"'+containerId+"-dlgAsc-"+i+'"';  
            buttonIdDes='"'+containerId+"-dlgDes-"+i+'"'; 
            htmlString+=('<span '+tdClass+' style="flex-basis:'+colSizes[i]+'max-width:'+colSizes[i]+'"> '                       
                + '<button id='+buttonIdAsc+' class="'+buttonColorClass 
                + '" style="font-size:10px;width:30px;text-align:center;margin:0;"'
                +' data-toggle="tooltip" data-placement="top" title="Sorts by ascending values of '+colHeader+'. Existing sorts are expanded."' 
                +' onclick=\'rptInjectSortDef("'+containerId+'", '+buttonIdAsc+', "'+metaData[i].columnName+'", 1); \'>&and;</button>'); 
            htmlString+=('<button id='+buttonIdDes+' class="'+buttonColorClass 
                + '" style="font-size:10px;width:30px;text-align:center;margin:0;"' 
                +' data-toggle="tooltip" data-placement="top" title="Sorts by descending values of '+colHeader+'. Existing sorts are expanded."' 
                +' onclick=\'rptInjectSortDef("'+containerId+'", '+buttonIdDes+', "'+metaData[i].columnName+'", -1); \'>&or;</button>'
                +'</span>');
        }// end for listOfColumns
        htmlString+='</p>';
        
        htmlString+='</div>'+cr;
        htmlString+='<div id="t99Lookup" class="tblArea rcl-lkArea" style="min-width:'+totalAreaWidth+'px;width:'+totalAreaWidth+'px;">';
        htmlString+='<p id="t99Row" class="tblRow rcl-lkAreaRow" >';
        //##56f BEGIN
        /*
        htmlString+='<span class="rcl-lkAreaCell" style="flex-basis:50px;min-width:50px;max-width:50px;"><button id="t99SelectButton" class="'+buttonColorClass+'" onclick="rutSelectLookupEntry(\'t99Lookup-dlg\',\''+
                    returnCols+'\',\''+returnIds+'\')">select</button></span>';
        */
        htmlString+='<span class="rcl-lkAreaCell" style="flex-basis:' + selectColSize + 'px;min-width:' + 
        		selectColSize + 'px;max-width:' + selectColSize + 'px;"><button id="t99SelectButton" class="'+buttonColorClass+'" onclick="rutSelectLookupEntryWithReturnAction(\'t99Lookup-dlg\',\''+
        		returnCols+'\',\''+returnIds+'\')">select</button></span>';
        //##56f END
        for (var i=0;i<metaData.length;i++){
            tdStyleString=style='style="flex-basis:'+colSizes[i]+'max-width:'+colSizes[i]+'"';
            if (0<='-5,4,5,-6,2,6,8'.indexOf(metaData[i].columnType)){  //integer or decimal
                style='data-type="number" data-check="dec('+metaData[i].precision+','+metaData[i].scale+')" '+tdStyleNumber;
            }
            else if (metaData[i].precision==10){ //check for date
                for (var j=0; j<Math.min(10,data.length);j++){ //check for data
                    value=data[j][metaData[i].columnName];
                    //if (value==null){ //##56a
                    if(!value){ //##56a
                    }
                    else if ((value.length==10)&&(value.charAt(4)=='-') && (value.charAt(7)=='-')){ 
                        style='data-type="date" '+tdStyleString;
                        break;
                    }
                }
            }
            else {
                style=tdStyleString;
            }
            if (metaData[i].columnName.substring(0,5).toUpperCase()=='HIDE_'){
                tdClass='class="tblField rcl-lkAreaCell '+tdHideClass;
            }
            else {
                tdClass='class="tblField rcl-lkAreaCell"';
            }
            htmlString+=('<span id="t99'+metaData[i].columnName+'" '+tdClass+' '+tdStyleString+'></span>');
        }// end for listOfColumns
        //htmlString+='</p></div>'; //##56f
        htmlString+='</p></div></div>'; //end table area //##56f
        if (data.length>50){
            htmlString+='<div id="t99paging" class="container-fluid" data-pageSize="50"></div>'; 
        }

        //htmlString+='</div></div>'; // end modal-body //##56f
        htmlString+='</div>'; //##56f
        $("body").append( htmlString);
        //The below makes RCL PowerTable study the template in the html and build a model
        tableSettings=tableInit("t99Lookup"); //Id of the container, we may have more than one table on the same page
        document.getElementById("t99Lookup"+tableSettings.configuration.sortDialogSearchFieldSuffix).addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                _rptCallSearch("t99Lookup");
            }
        }); 
        //attaches data to RCL PowerTable
        rptAddData("t99Lookup",data);
        //diplays the data by copying the template as many times as the data require and fill it from the data.
        rptDisplayTable("t99Lookup");
        
        //BEGIN ###56e
        var maxDialogWidth = $(window).width() * 0.8;
        var dialogWidth = totalAreaWidth + 52;
        dialogWidth = Math.min(maxDialogWidth, Math.max(minDialogWidth, dialogWidth));
        //END ###56e
        
        $("#t99Lookup-dlg").dialog({
            autoOpen: false, 
            modal: true, 
            draggable: true,
            resizable:false,
            //width: "auto", //###56e
            width: dialogWidth, //###56e
            height:"auto", 
            title: title,
            buttons: [    
                        {
                            text: "Search",     
                            click: function() {
                                _rptCallSearch(containerId); 
                            },
                            class: "rclLookupDlgBtn"
                        },
                        {
                            text: "Reset Search",     //####TO DO parameterisieren
                            click: function() {
                                rptResetSearch(containerId); 
                            },
                            class: "rclLookupDlgBtn"
                        },                            
                        {
                            text: "Reset Sort",
                            click: function() {
                                rptResetSortDefinitions(containerId);  
                            },
                            class: "rclLookupDlgBtn"
                        },
                        { 
                            text: "Export to csv",
                            click: function() {
                                rptSaveAsCsv("t99Lookup");  
                            },
                            class: "rclLookupDlgBtn"
                        },
                        {
                            text: "Cancel",  
                            click: function() {
                                rutCloseDialog("t99Lookup-dlg"); 
                            },
                            class: "rclLookupDlgBtn"
                        },
                    ],
            open: function(event, ui){ $(this).css("overflow", "hidden"); }, //##56f
            close: function( event, ui ) {rutCloseLookupPopoverDialog('t99Lookup-dlg','t99Lookup');},// changed from t99Lookup-Dlg 
        });
        $("#t99Lookup-dlg").dialog('open');
        //###55 END
    }//end inner function showLookupDialog //###42
}//end function rutOpenLookupTable

function rutSelectLookupEntryWithReturnAction(dialogId, returnCols, returnIds){	
    var element=document.activeElement;
    var parents=rptGetParentIds(element);
    var settings=rptGetTableSettings(parents.parentContainerId);
    var prefix=settings.idPrefix;
    var r=parents.parentRowId.split('-');
    var rowSuffix='-'+r[r.length-1];
    // now we have prefix and suffix and are capable to build the elementIds.
    var columns=returnCols.split(' ');
    var returnIdList=returnIds.split(' ');
    var el=null;
    var triggeringElements = []; //###61
    for (var i=0;i<columns.length;i++){
        if (columns[i]!=''){
            el=document.getElementById(prefix+columns[i]+rowSuffix);
            fid=prefix+columns[i]+rowSuffix;
            el=document.getElementById(fid);
            //rutSetElementValue(returnIdList[i],rutGetElementValue(el) ); //###56c
            //###61 BEGIN
            //rutSetElementValue(rutSplitRowID(returnIdList[i]),rutGetElementValue(el) ); //###56c
            var targetId = rutSplitRowID(returnIdList[i]);
            rutSetElementValue(targetId, rutGetElementValue(el));
            
            var idAll = returnIdList[i].split(returnIdList[i].substring(0,3));
            var rowId = returnIdList[i].substring(0,3) + idAll[2];
            
            var data = {};
            data.seqNo = rutGetElementValue(document.getElementById(prefix+'SEQ_NO'+rowSuffix));

        	getResultAjax("WS_BKG_GET_PRINT_CLAUSE_DETAIL", data).done(function(response){
        		
//        		var newData = {};
//        		newData.printClauseHdrSeqNo = data.seqNo;
//        		newData.clauseTitle = rutGetElementValue(el);
//        		newData.Detail = response;
        		
        		var detailPrintClause = getCurrentPtDataWithAction("t70clauseArea", false);
        		var newData = detailPrintClause[detailPrintClause.length - 1];
          		newData.printClauseHdrSeqNo = data.seqNo;
        		newData.clauseTitle = rutGetElementValue(el);
        		newData.Detail = response;
        		
        		rptClearDisplay("t70clauseArea");
        		rptAddData("t70clauseArea", detailPrintClause);
        		rptDisplayTable("t70clauseArea");
        		
        		var clicklastrow = document.getElementById('t70selectclauseTitle-' + (detailPrintClause.length - 1));
        		
        		setDisableisMandatory();
        		
        		if(clicklastrow)
        			clicklastrow.click();

//        		rptSetSingleAreaValues(targetId, newData);
        	});
                  
            triggeringElements.push($("#" + targetId)[0]);
            //###61 END
        }
    }
    //###61 BEGIN
    for(var i=0; i<triggeringElements.length; i++){
    	//$("#" + targetId).change() //This does not propagate event to parent
        var event = document.createEvent('Event');
        event.initEvent('change', true, true);
        triggeringElements[i].dispatchEvent(event);
    }
    //###61 END
    
    rutCloseLookupPopoverDialog(dialogId, parents.parentContainerId);
    
    function handleSetPrintClauseDetail(data){
    	rptSetSingleAreaValues("d70printClauseArea", data.PrintClauseHeader);
    }
}//end function rutSelectLookupEntry

function setDeleteBtnPowerTable(table, button) { 
	var sizeTypeRows = $("#" + table).find(".tblRow").not(":last");
	if(sizeTypeRows.length > 0){
		if(!viewMode){
			$("#" + button).show();
		}else{
			$("#" + button).hide();
		}
	}else{
		$("#" + button).hide();
	}
}
function setIconProperties(id , disabled){
	if(disabled){
		if($('#'+id).attr("onclick")){
			$('#'+id).attr("data-onclick" , $('#'+id).attr("onclick"));
			$('#'+id).removeAttr("onclick");
		}

	}else{
		if($('#'+id).attr("data-onclick")){
			$('#'+id).attr("onclick" , $('#'+id).attr("data-onclick"));
			$('#'+id).removeAttr("data-onclick");
		}
	}
}

function openSpinner(){
	if($("body").find('.loading').length < 1){
		$("body").append('<div class="loading"></div>');
	}
	
}


function closeSpinner(){
	
		$("body").find('.loading').remove();
	
}



function contp_OpenLookupTable(table, returnCols, returnIds, selectCols, selectValues, selectOperators, displayTitle, selectOperatorsParam, selectColsOr) {

	var title = (displayTitle) ? displayTitle : rutToTitleCase(table.substring(4) + ' Lookup'); //remove the VRL_ from the table name

	var wsInput = null;
	try {
		wsInput = _ContpPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators, returnCols, false, selectOperatorsParam, selectColsOr);
	} catch (e) {
		rutOpenMessageBox("Warning", e.message, e.code, null, '');
		return;
	}
	//###64 END
	returnCols = returnCols.replace(/\*\w*/g, "");
	//##60 END
	$("body").append('<div class="loading"></div>'); //###65
	contp_GetLookupData(wsInput, showLookupDialog); //###42
	//showLookupDialog(getTestData()); //only for dry test without server
	return; //###42

	//Inner Function
	function showLookupDialog(lookupResult) {

		//###55 BEGIN
		var data = lookupResult.data;
		var metaData = lookupResult.metadata;
		var type = lookupResult.Type;
		
			if(type == "expire"){
				console.log("type :: " + type);
				rutOpenMessageBox('Warning', 'Session Expired!', '');
				
				return;
			}else if(type == "changedFSC"){
				location.href = changeFsc;
			}else{ 
				if (data == '401') {
				
					console.log("data.length :: " + data);
					rutOpenMessageBox('Warning', 'Session Expired!', '');
					//###77 END
					return;
				} else if (data.length <= 0) {
					rutOpenMessageBox('Warning', 'No row(s) retrieved', '');
					//###77 END
					return;
				}
			}
	
			
		
		var element = document.getElementById('t99Lookup-dlg');
		if (element != null) { //another lookup table was not clossed properly but through x button
			element.parentNode.removeChild(element); //element.remove does not work in IE
		}
		var htmlString = '';
		var cr = '\r\n';
		var tdStyleString = '';
		var tdStyleNumber = '';
		var tdHideClass = "d-none";
		var tdClass = '';

		var minDialogWidth = 550; //This is wide enough for paging/dialog buttons //##56e

		var colWidths = []; //##56f
		var selectColSize = 50; //##56f
		var colSizes = [];
		//var totalColSize=50; //we have already the select button //##56f
		var totalColSize = selectColSize; //##56f
		var numCols = 0;
		var colSize = 0;
		for (var i = 0; i < metaData.length; i++) { //Here we compute the size of the columns
			colSize = Math.min(Math.max(metaData[i].precision, metaData[i].columnName.length) * 9, 200); //1 char ~ 9px
			colSize = Math.max(colSize, 72); //Need at least space for sort buttons //##56f
			colWidths.push(colSize); //##56f
			colSizes.push(colSize + 'px;');
			if (metaData[i].columnName.substring(0, 5).toUpperCase() != 'HIDE_') {
				numCols++;
				totalColSize += colSize;
			}
		}
		//var totalAreaWidth=((1+numCols)*8)+totalColSize+1; //each column has 2 x 3px padding and 1px border, 17px for scrollbar //##56f
		var totalAreaWidth = ((1 + numCols) * 8) + totalColSize + 17;

		//##56f BEGIN
		if (totalAreaWidth < minDialogWidth) {
			//Redistribute column width using width ratio
			var oldTotalColSize = totalColSize;
			totalColSize = 0;
			//Fix select to 50
			//var expectedTotalColSize = minDialogWidth - 17 - ((1+numCols)*8);
			//selectColSize = (50.0/oldTotalColSize) * expectedTotalColSize;
			var expectedTotalColSize = minDialogWidth - 17 - ((1 + numCols) * 8) - 50;
			oldTotalColSize -= 50;
			for (var i = 0; i < colSizes.length; i++) {
				colWidths[i] = (colWidths[i] * 1.0 / oldTotalColSize) * expectedTotalColSize;
				colSizes[i] = colWidths[i] + 'px;';
				if (metaData[i].columnName.substring(0, 5).toUpperCase() != 'HIDE_') {
					totalColSize += colWidths[i];
				}
			}
			totalAreaWidth = minDialogWidth;
		}
		//##56f END

		htmlString += '<div id="t99Lookup-dlg">';
		var containerId = "t99Lookup";
		var buttonIdAsc = null;
		var buttonIdDes = null;
		var buttonColorClass = "rclDlgSortDirectionBtn"; //settings are not ready, so we cannot get it from there
		//Display search area
		htmlString += '<div style="padding:2px;"><table>' +
			'<tr>' +
			'<td><label class="col-sm1 bt-1" for="' + containerId + '-dlgSearch' + '">Search</label></td>' +
			'<td colspan=2> <input class="col-sm2" type="text" id="' + containerId + '-dlgSearch' + '" ' +
			'></input></td>' +
			'</tr>' +
			'</table>';
		htmlString += '</div>';

		//htmlString+= '<div>'; //##56f
		htmlString += '<div style="overflow-x:auto;">'; //##56f
		htmlString += '<div id="t99HeaderRow" class="rcl-lkHeader">';
		htmlString += '<p class="rcl-lkHeaderRow">';
		//htmlString+='<span class="rcl-lkHeaderCell" style="flex-basis:50px;max-width:50px;min-width:50px;">Select</span>'; //##56f
		htmlString += '<span class="rcl-lkHeaderCell" style="flex-basis:' + selectColSize + 'px;max-width:' + //##56f
			selectColSize + 'px;min-width:' + selectColSize + 'px;">Select</span>'; //##56f
		var colHeader = null;
		for (var i = 0; i < metaData.length; i++) {
			if (metaData[i].columnName.substring(0, 5).toUpperCase() == 'HIDE_') {
				tdClass = 'class="rcl-lkHeaderCell ' + tdHideClass + '"';
			}
			else {
				tdClass = 'class="rcl-lkHeaderCell"';
			}
			colHeader = rutToTitleCase(metaData[i].columnName);
			htmlString += ('<span ' + tdClass + ' style="flex-basis:' + colSizes[i] + 'max-width:' + colSizes[i] + '">' + colHeader + '</span>');
		}
		htmlString += '</p>';

		//htmlString+='<p class="rcl-lkHeaderRow">'+cr+'<span class="rcl-lkHeaderCell" style="flex-basis:50px;max-width:50px;min-width:50px;"></span>'; //##56f
		htmlString += '<p class="rcl-lkHeaderRow">' + cr + '<span class="rcl-lkHeaderCell" style="flex-basis:' + //##56f
			selectColSize + 'px;max-width:' + selectColSize + 'px;min-width:' + selectColSize + 'px;"></span>'; //##56f
		for (var i = 0; i < metaData.length; i++) {
			colHeader = rutToTitleCase(metaData[i].columnName);//###42x
			if (metaData[i].columnName.substring(0, 5).toUpperCase() == 'HIDE_') {//###42x
				tdClass = 'class="rcl-lkHeaderCell ' + tdHideClass + '" ';
			}
			else {
				tdClass = 'class="rcl-lkHeaderCell"';;
			}
			buttonIdAsc = '"' + containerId + "-dlgAsc-" + i + '"';
			buttonIdDes = '"' + containerId + "-dlgDes-" + i + '"';
			htmlString += ('<span ' + tdClass + ' style="flex-basis:' + colSizes[i] + 'max-width:' + colSizes[i] + '"> '
				+ '<button id=' + buttonIdAsc + ' class="' + buttonColorClass
				+ '" style="font-size:10px;width:30px;text-align:center;margin:0;"'
				+ ' data-toggle="tooltip" data-placement="top" title="Sorts by ascending values of ' + colHeader + '. Existing sorts are expanded."'
				+ ' onclick=\'rptInjectSortDef("' + containerId + '", ' + buttonIdAsc + ', "' + metaData[i].columnName + '", 1); \'>&and;</button>');
			htmlString += ('<button id=' + buttonIdDes + ' class="' + buttonColorClass
				+ '" style="font-size:10px;width:30px;text-align:center;margin:0;"'
				+ ' data-toggle="tooltip" data-placement="top" title="Sorts by descending values of ' + colHeader + '. Existing sorts are expanded."'
				+ ' onclick=\'rptInjectSortDef("' + containerId + '", ' + buttonIdDes + ', "' + metaData[i].columnName + '", -1); \'>&or;</button>'
				+ '</span>');
		}// end for listOfColumns
		htmlString += '</p>';

		htmlString += '</div>' + cr;
		htmlString += '<div id="t99Lookup" class="tblArea rcl-lkArea" style="min-width:' + totalAreaWidth + 'px;width:' + totalAreaWidth + 'px;">';
		htmlString += '<p id="t99Row" class="tblRow rcl-lkAreaRow" >';
		//##56f BEGIN
		/*
		htmlString+='<span class="rcl-lkAreaCell" style="flex-basis:50px;min-width:50px;max-width:50px;"><button id="t99SelectButton" class="'+buttonColorClass+'" onclick="rutSelectLookupEntry(\'t99Lookup-dlg\',\''+
					returnCols+'\',\''+returnIds+'\')">select</button></span>';
		*/
		htmlString += '<span class="rcl-lkAreaCell" style="flex-basis:' + selectColSize + 'px;min-width:' +
			selectColSize + 'px;max-width:' + selectColSize + 'px;"><button id="t99SelectButton" class="' + buttonColorClass + '" onclick="rutSelectLookupEntry(\'t99Lookup-dlg\',\'' +
			returnCols + '\',\'' + returnIds + '\')">select</button></span>';
		//##56f END
		for (var i = 0; i < metaData.length; i++) {
			tdStyleString = style = 'style="flex-basis:' + colSizes[i] + 'max-width:' + colSizes[i] + '"';
			if (0 <= '-5,4,5,-6,2,6,8'.indexOf(metaData[i].columnType)) {  //integer or decimal
				style = 'data-type="number" data-check="dec(' + metaData[i].precision + ',' + metaData[i].scale + ')" ' + tdStyleNumber;
			}
			else if (metaData[i].precision == 10) { //check for date
				for (var j = 0; j < Math.min(10, data.length); j++) { //check for data
					value = data[j][metaData[i].columnName];
					//if (value==null){ //##56a
					if (!value) { //##56a
					}
					else if ((value.length == 10) && (value.charAt(4) == '-') && (value.charAt(7) == '-')) {
						style = 'data-type="date" ' + tdStyleString;
						break;
					}
				}
			}
			else {
				style = tdStyleString;
			}
			if (metaData[i].columnName.substring(0, 5).toUpperCase() == 'HIDE_') {
				tdClass = 'class="tblField rcl-lkAreaCell ' + tdHideClass;
			}
			else {
				tdClass = 'class="tblField rcl-lkAreaCell"';
			}
			htmlString += ('<span id="t99' + metaData[i].columnName + '" ' + tdClass + ' ' + tdStyleString + '></span>');
		}// end for listOfColumns
		//htmlString+='</p></div>'; //##56f
		htmlString += '</p></div></div>'; //end table area //##56f
		if (data.length > 50) {
			htmlString += '<div id="t99paging" class="container-fluid" data-pageSize="50"></div>';
		}

		//htmlString+='</div></div>'; // end modal-body //##56f
		htmlString += '</div>'; //##56f
		$("body").append(htmlString);
		//The below makes RCL PowerTable study the template in the html and build a model
		tableSettings = tableInit("t99Lookup"); //Id of the container, we may have more than one table on the same page
		document.getElementById("t99Lookup" + tableSettings.configuration.sortDialogSearchFieldSuffix).addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				_rptCallSearch("t99Lookup");
			}
		});
		//attaches data to RCL PowerTable
		//  rptAddData("t99Lookup",data);
		//diplays the data by copying the template as many times as the data require and fill it from the data.
		//  rptDisplayTable("t99Lookup");

		//BEGIN ###56e
		var maxDialogWidth = $(window).width() * 0.8;
		var dialogWidth = totalAreaWidth + 52;
		dialogWidth = Math.min(maxDialogWidth, Math.max(minDialogWidth, dialogWidth));
		//END ###56e

		$("#t99Lookup-dlg").dialog({
			autoOpen: false,
			modal: true,
			draggable: true,
			resizable: false,
			//width: "auto", //###56e
			width: dialogWidth, //###56e
			height: "auto",
			title: title,
			buttons: [
				{
					text: "Search",
					click: function () {
						_rptCallSearch(containerId);
					},
					class: "rclLookupDlgBtn"
				},
				{
					text: "Reset Search",     //####TO DO parameterisieren
					click: function () {
						rptResetSearch(containerId);
					},
					class: "rclLookupDlgBtn"
				},
				{
					text: "Reset Sort",
					click: function () {
						rptResetSortDefinitions(containerId);
					},
					class: "rclLookupDlgBtn"
				},
				{
					text: "Export to csv",
					click: function () {
						rptSaveAsCsv("t99Lookup");
					},
					class: "rclLookupDlgBtn"
				},
				{
					text: "Cancel",
					click: function () {
						rutCloseDialog("t99Lookup-dlg");
					},
					class: "rclLookupDlgBtn"
				},
			],
			open: function (event, ui) {
				rptAddData("t99Lookup", data);//Change to avoid focus on firstpage without the dialog open
				rptDisplayTable("t99Lookup");//Change to avoid focus on firstpage without the dialog open

				$(this).css("overflow", "hidden");
			}, //##56f
			close: function (event, ui) { rutCloseLookupPopoverDialog('t99Lookup-dlg', 't99Lookup'); },// changed from t99Lookup-Dlg
		});
		$("#t99Lookup-dlg").dialog('open');
	}
}

function _ContpPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators, returnCols, forAutoLookup, selectOperatorsParam, selectColsOr) { //###64
	//console.log("selectColsOr :: " + selectColsOr)
	//var sc=(selectCols)?selectCols.split(' '):[];
	//###64 BEGIN
	var selectProcessors = (selectCols) ? selectCols.split(' ') : []; //Store processors for each column
	var sc = [];
	for (var i = 0; i < selectProcessors.length; i++) {
		var processorIndex = selectProcessors[i].indexOf("*");
		if (processorIndex >= 0) {
			sc.push(selectProcessors[i].substring(0, processorIndex));
			selectProcessors[i] = _rutParseLookupSelectProcessor(selectProcessors[i].substring(processorIndex + 1));
		} else {
			sc.push(selectProcessors[i]);
			selectProcessors[i] = undefined;
		}
	}
	var scProcessor = null;
	//###64 END
	var sv = (selectValues) ? selectValues.split(' ') : [];
	var so = (selectOperators) ? selectOperators.split(' ') : [];
	var operatorparam = selectOperatorsParam;
	var columnor = selectColsOr;
	var select = [];
	var element = null;
	var value = null;
	var operator = null;
	var dataType = null;
	var check = null;
	var index = null;
	var tag = null;
	for (var i = 0; i < sv.length; i++) {
		if (sc[i] == '') { continue; }
		if (sv[i] == '') { continue; }
		//element=document.getElementById(sv[i]); //###56c
		element = document.getElementById(rutSplitRowID(sv[i])); //###56c
		value = (element == null) ? sv[i] : rutGetElementValue(element);
		dataType = null;
		//###64 BEGIN
		scProcessor = selectProcessors[i];
		if (scProcessor && scProcessor.min) {
			//Process min validation
			if (typeof value === "string" && value.length < scProcessor.min) {
				throw {
					code: "rut010-001",
					message: (element == null ? "Value" : _findElementLabel(element.id))
						+ " requires at least " + scProcessor.min + " character(s)"
				};
			}
		}
		//###64 END
		if (element != null) {
			if ((value == null) || (value == '')) { continue; }
			tag = element.nodeName;
			if (tag == 'INPUT') {
				dataType = element.type;
				//we may haved changed the type during init like for Chrome number to tel, then the original type is in data-type
				dataType = (element.getAttribute('data-type') == null) ? element.type : element.getAttribute('data-type');
				if (dataType == 'number') {
					check = element.getAttribute('data-check');
					if (check != null) {
						index = check.indexOf('dec(');
						if (index >= 0) {
							check = check.substring(index);
							dataType = check.split(')')[0];
						}//endif data-check has dec
					}//endif data-check exists
				}// endif type number
				//###60 BEGIN
				else if (dataType == 'date') {
					value = value.replace(/\-/g, "");
					value = "'" + value + "'";
				}
				//###60 END
				//###73 BEGIN
				else if (dataType == 'time') {
					value = rutConvertTime(value, false);
				}
				//###73 END
				else {
					value = "'" + value + "'";
				}
			}//endif input
			else {
				dataType = 'unknown';
				value = "'" + value + "'";
			}
		}
		//###64 BEGIN
		//operator=(i>=so.length)?'=': so[i];
		if (scProcessor && scProcessor.main) {
			//Set operator for main field
			operator = forAutoLookup ? "=" : "LIKE";
		} else {
			operator = (i >= so.length) ? '=' : so[i];
		}
		//###79 BEGIN
		if (operator.indexOf("*$p") >= 0) {
			operator = operator.replace(/\*\$p/g, " ");
		}
		//###79 END
		//###64 END
		if (dataType) {
			select.push({ column: sc[i], value: value, operator: operator, operatorparam: operatorparam, columnor: columnor, dataType: dataType })
		}
		else {
			select.push({ column: sc[i], value: value, operator: operator, operatorparam: operatorparam, columnor: columnor })
		}
		//console.log("select :: " + JSON.stringify(select))
	}
	//###42 BEGIN
	var userData = {
		userToken: rutGetElementValue('h3-userToken')
		, userId: rutGetElementValue('h3-userId')
		, line: rutGetElementValue('h3-line')
		, trade: rutGetElementValue('h3-trade')
		, agent: rutGetElementValue('h3-agent')
		, fscCode: rutGetElementValue('h3-fscCode')
	}
	var userToken = userData.userToken; //temporary until Nuttapol has fixed it
	//###42 END
	/* This is the JSON structure for the webservice
	{   userData : {}},
		table: <tbl>,
		{
			select: [{ column: <selectColumn>, value: <selectValue>, operator: <selectOperator>}]
		},
	}
	*/
	//var wsInput = { table: table, //###42

	var wsInput = { userToken: userToken, userData: userData, table: table }; //###42

	if (select.length > 0) {
		wsInput.select = select;
	}
	//##60 BEGIN
	if (returnCols) {
		var processor = [];
		var rco = returnCols.split(' ');
		for (var i = 0; i < rco.length; i++) {
			//Processor exists
			var processorIndex = rco[i].indexOf("*");
			if (processorIndex >= 0) {
				var processorType = rco[i].substring(processorIndex + 1);
				processor.push({
					column: rco[i].substring(0, processorIndex),
					type: processorType
				});
			}
		}
		if (processor.length > 0) {
			wsInput.processor = processor;
		}
	}
	//##60 END
	return wsInput;
}

function contp_GetLookupData(lookupRequest, callbackFunction) {
	
	var baseurl = "http://" + location.hostname + "/";	
	var url = baseurl + 'BKGWSWebApp/rclws/help/contpGenericHelp';
	
	if(location.hostname == "127.0.0.1"){
		url = "http://marlin-ce9.rclgroup.com/BKGWSWebApp/rclws/help/contpGenericHelp";
	}

	//###60 BEGIN
	var processor = lookupRequest.processor;

	if (processor) {
		delete lookupRequest.processor;
	}

	//###60 END
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(lookupRequest),
		complete: function () { $("body").find('.loading').remove(); }, //###65
		//success: callbackFunction, //###60
		//###60 BEGIN
		success: function (response, status, jqxhr) {
			if (processor) {
				var data = response.data;
				var metadata = response.metadata;
				//Process each field in returned data
				if (data) {
					for (var i = 0; i < data.length; i++) {
						for (var j = 0; j < processor.length; j++) {
							if (data[i].hasOwnProperty(processor[j].column)) {
								//Process depends on type
								if (processor[j].type.indexOf('d') >= 0) {
									var col = processor[j].column;
									var dateStr = data[i][col] + "";
									data[i][col] = dateStr.substring(0, 4) + "-" +
										dateStr.substring(4, 6) + "-" + dateStr.substring(6, 8);
								}
							}
						}
					}
				}
				//Process metadata
				if (metadata) {
					for (var i = 0; i < metadata.length; i++) {
						for (var j = 0; j < processor.length; j++) {
							if (metadata[i].columnName == processor[j].column) {
								//Process depends on type
								if (processor[j].type.indexOf('d') >= 0) {
									//Framework check precision == 10 for date
									metadata[i].precision = 10;
								}
								//##63 BEGIN
								if (processor[j].type.indexOf('h') >= 0) {
									metadata[i].columnName = "HIDE_" + metadata[i].columnName;
								}
								//##63 END
							}
						}
					}
				}
			}
			callbackFunction(response, status, jqxhr);
		},
		//###60 END
		error: function (result) {
			rutOpenMessageBox("Lookup Error", result.responseText, 'rut004-' + result.readyState, null, ''); //###50
		}
	});
}
var myVar = '';
function ckSecsion(){
	
		var data = {userData: getUserDataFromHeader()};
		var urlPort = "http://" + location.hostname;
		var baseurl = urlPort + "/BKGWSWebApp/rclws/";
		var getSomeData = "";
			getSomeData = $.ajax({
				    url:baseurl + "BookingService/WS_KEEP_ALIVE",
				    async: false,
				    method:"POST",
				    cache:false,
				    contentType: "application/json",
				    data: JSON.stringify({userData: getUserDataFromHeader()}),
				    dataType: "json"
			  }).responseJSON;
	console.log(getSomeData)
		if(getSomeData.Success){
			return true;
		}else{
			if(getSomeData.Type == "expire"){
				location.href = expiryUrl;
			}
		}

	
	
	
	
}


