
function getUserDataFromHeader(){
	var referrer = document.referrer;
	 
	return rptGetDataFromSingleArea("h3-hidden");
}

(function ($) {
	$.fn.serializeFormJSON = function () {

		var o = {};
		var a = this.serializeArray();
		$.each(a, function () {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
})(jQuery);
/**
	Note this method is used to send ajax post request
	paramter : url menas url where user want to send request
	data     : data which user want to send to server 
*/
function sendPostRequest(url, data, sucessFunction, errorFunction) {
	url="/PracticeWSProject/rclws"+url;
	$( "body" ).append('<div class="loading"></div>');
	$("body").find('.loading').remove();
	$( "body" ).append('<div class="loading"></div>');
	data["browserData"]=getUserDataFromHeader();
	
	$.ajax({
		method: "POST",		
		async: true,
		cache: false,
		url: url,
		data: JSON.stringify(data),
		contentType: "application/json;",
		traditional: true,
		dataType: 'json',
		
		success: function (dataResponse) {
			$("body").find('.loading').remove();
			
			 
				if(dataResponse.status===true){
				data = dataResponse.data;
				sucessFunction.apply(this, [data]);
				}else{
					if(data.message && data.message){
						dialogFadeout(data.message);
					}else{
						dialogFadeout("Internal Server Error");
					}
				 }
			
			
		},
		error: function (error, textStatus, jqXHR) {
			//process error msg
			$("body").find('.loading').remove();
			handleAjaxError(error)
			//errorFunction.apply(this, [data]);
		},
	});

}
/**
	Note this method is used to send ajax get request
	paramter : url menas url where user want to send request
	data     : data which user want to send to server 
*/

function sendGetRequest(url, data, sucessFunction, errorFunction) {
	url="/PracticeWSProject/"+url;
	data["browserData"]=getUserDataFromHeader();
	$( "body" ).append('<div class="loading"></div>');
	$("body").find('.loading').remove();
	$( "body" ).append('<div class="loading"></div>');
	$.ajax({
		method: "GET",
		url: url,
		data: data,
		contentType: "application/json;",
		traditional: true,
		dataType: 'json',
		success: function (data) {
			$("body").find('.loading').remove();
			sucessFunction.apply(this, [data]);
		},
		error: function (error, textStatus, jqXHR) {
			 
			$("body").find('.loading').remove();
			handleAjaxError(error)
			//errorFunction.apply(this, [data]);
		}
	});

}


  

function GetURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length;i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return decodeURIComponent(sParameterName[1]);
		}
	}
}
  
function closeWindow(){
	window.location.href="logout.do";
}
 

function formateNumber(grandTotal){
	if(grandTotal){
	return (grandTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
	}else {
	return "";
	}
	}

	 
 
	
	function handleAjaxError(error){
		console.log()
		if(error.statusText =="Internal Server Error"){
			dialogFadeout("Internal Server Error");
		}
		else
		{
			if(error.responseText){
				dialogFadeout(error.responseText);
			}
		}
	    return { $_success: false };
	}
	
	
	
	 function lookupSerVesVoy(){
			var rowData = rptGetDataFromSingleArea("s0-header");
			var rco = "SERVICE VESSEL VOYAGE HIDE_DIRECTION";
			var rid = "s0-service s0-vessel s0-voyage";
			var sco = "SERVICE VESSEL VOYAGE";
			var sva = "s0-service s0-vessel s0-voyage";
			var sop = "LIKE";
	
			
			rutOpenLookupTable('VRL_BKG_BOOKING_CTR_SERV', rco, rid, sco.trim(), sva.trim(), sop.trim(), "Service/Vessel/Voyage Lookup");
		}
	 
	 function onClickClose(){
		// alert("close");
		 window.close();
		}
      
	 function removeEmtryOptions(elementId) {
			var x = document.getElementById(elementId);
			x.remove(0);
		} 
	 
	 
	 function lookupBl(){
			var rowData = rptGetDataFromSingleArea("s0-header");
				var rco = "BL_NO";
				var rid = "s0-blNo";
				var sco = "";
				var sva = "";
				var sop = "";
				var getstrAter = "";
				console.log(rowData.blNo.length);

				if (rowData.blNo.trim() != "") {
					if (rowData.blNo.length >= 13 && rowData.blNo.length <= 17) {
						sco += " BL_NO";
						sva += "s0-blNo";
						sop += " = ";
						console.log("inside length");
						console.log("SVA = " + sva);
					} else {
						getstrAter = "*Bl Number should be between 13 to 17";
					}
				} else {
					sco += " HIDE_ISSUE_DATE";
					sva += "'" + rutGetDate('today', -180, 'num') + "'";
					sop = " >";
					console.log("inside date");
				}

				if (getstrAter != "") {
					dialogGeneric("Warning", getstrAter, "Ok");
				} else {
					rutOpenLookupTable('VRL_BL', rco, rid, sco.trim(), sva, sop
							.trim(), "BL Lookup");
				}
			}


	 
	 function lookupInVoyage(){
			var rowData = rptGetDataFromSingleArea("s0-header");
				var rco = "IN_VOYAGE ETA_DATE";
				var rid = "s0-inVoyage s0-etaForSgsin";
				var sco = "";
				var sva = "";
				var sop = "";
				var getstrAter = "";
				console.log(rowData.inVoyage.length);

				if (rowData.inVoyage.trim() != "") {
					if (rowData.inVoyage.length <= 10) {
						sco += " IN_VOYAGE";
						sva += "s0-inVoyage";
						sop += " LIKE";
						console.log("inside length");
						console.log("SVA = " + sva);
					} 
				} else {
					sco += " ETA_DATE";
					sva += "'" + rutGetDate('today', -540, 'num') + "'";
					sop = " >";
					console.log("inside date");
				}

				if (getstrAter != "") {
					dialogGeneric("Warning", getstrAter, "Ok");
				} else {
					rutOpenLookupTable('VRL_BL_INVOYAGE', rco, rid, sco.trim(), sva, sop
							.trim(), "InVoyage  Lookup");
				}
			}

	 
	 function lookupVessel(){
			var rowData = rptGetDataFromSingleArea("s0-header");
				var rco = "SERVICE VESSEL VOYAGE HIDE_DIRECTION";
				var rid = "s0-service s0-vessel s0-voyage";
				var sco = "";
				var sva = "";
				var sop = "";
				var getstrAter = "";
				//console.log(rowData.blNo.length);

				if (rowData.vessel.trim() != "") {
					
						sco += "VESSEL";
						sva += "s0-vessel";
						sop += "  LIKE";
						
						
						if (rowData.voyage) {
							
							sco += " VOYAGE";
							sva += " s0-voyage";
							sop += " LIKE";
							
						}
							
							if(rowData.service){
								sco += " SERVICE";
								sva += " s0-service";
								sop += " LIKE";
							}
					
				} else {
					sco += "HIDE_ETA_DATE";
					sva += "'" + rutGetDate('today', -540, 'num') + "'";
					sop = " >";
					console.log("inside date");
				}

				if (getstrAter != "") {
					dialogGeneric("Warning", getstrAter, "Ok");
				} else {
					
					console.log("rco  " +rco);	
					console.log("rid  " +rid);
					console.log("sco.trim()  " +sco.trim());
					console.log("sva  " +sva);
					console.log("sop.trim()  " +sop.trim());
					rutOpenLookupTable('VRL_BL_VESSEL_SCHEDULE_ALL', rco, rid, sco.trim(), sva, sop.trim(), "Service/Vessel/Voyage Lookup");
				}
			}

	 function lookupVoyage(){
			var rowData = rptGetDataFromSingleArea("s0-header");
				var rco = "SERVICE VESSEL VOYAGE HIDE_DIRECTION";
				var rid = "s0-service s0-vessel s0-voyage";
				var sco = "";
				var sva = "";
				var sop = "";
				var getstrAter = "";
				//console.log(rowData.blNo.length);

				if (rowData.voyage.trim() != "") {
					
						sco += " VOYAGE";
						sva += "s0-voyage";
						sop += " LIKE";
						
						
						if(rowData.vessel){
							sco += " VESSEL";
							sva += " s0-vessel";
							sop += " LIKE";
						}
						if(rowData.service){
							sco += " SERVICE";
							sva += " s0-service";
							sop += " LIKE";
						}
					
				} else {
					sco += "HIDE_ETA_DATE";
					sva += "'" + rutGetDate('today', -540, 'num') + "'";
					sop = " >";
					console.log("inside date");
				}

				if (getstrAter != "") {
					dialogGeneric("Warning", getstrAter, "Ok");
				} else {
					rutOpenLookupTable('VRL_BL_VESSEL_SCHEDULE_ALL', rco, rid, sco.trim(), sva, sop.trim(), "Service/Vessel/Voyage/Direction Lookup");
					
				}
			}
	 
	 function lookupService(){
			var rowData = rptGetDataFromSingleArea("s0-header");
				var rco = "SERVICE VESSEL VOYAGE HIDE_DIRECTION";
				var rid = "s0-service s0-vessel s0-voyage";
				var sco = "";
				var sva = "";
				var sop = "";
				var getstrAter = "";
				//console.log(rowData.blNo.length);

				if (rowData.service.trim() != "") {
					
						sco += "SERVICE";
						sva += "s0-service";
						sop += " LIKE";
						
						if (rowData.voyage) {
							
							sco += " VOYAGE";
							sva += " s0-voyage";
							sop += " LIKE";
							
						}	
							if(rowData.vessel){
								sco += " VESSEL";
								sva += " s0-vessel";
								sop += " LIKE";
							}
					
				} else {
					sco += "HIDE_ETA_DATE";
					sva += "'" + rutGetDate('today', -540, 'num') + "'";
					sop = " >";
					console.log("inside date");
				}

				if (getstrAter != "") {
					dialogGeneric("Warning", getstrAter, "Ok");
				} else {
					rutOpenLookupTable('VRL_BL_VESSEL_SCHEDULE_ALL', rco, rid, sco.trim(), sva, sop.trim(), "Service/Vessel/Voyage/Direction Lookup");
				}
			}
	 
	 
	 $(document).ready(function(){
		 $( "body" ).append('<div class="loading"></div>'); 
		
		 $("body").find('.loading').remove();
	 
	 });
      