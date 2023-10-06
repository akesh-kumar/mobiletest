<!--
-----------------------------------------------------------------------------------------------------------
PortDataScreen.jsp
-------------------------------------------------------------------------------------------------------------
Copyright RCL Public Co., Ltd. 2018
-------------------------------------------------------------------------------------------------------------
Author Author Cognis Solution 06/06/2023
- Change Log ------------------------------------------------------------------------------------------------
## DD/MM/YY -User-     -TaskRef-      -Short Description
1  06/06/2023       Lakshmi Utti         Initial Version
-----------------------------------------------------------------------------------------------------------
-->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/custom.tld" prefix="rcl"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" session="true" autoFlush="true"
	errorPage="/pages/error/RcmErrorPage.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=11" />

<jsp:include page="../include/commonInclude.jsp"></jsp:include>
<title>Port Data Screen</title>
</head>
<body>
<body id="amd200">
	<jsp:include page='../include/header.jsp'>
		<jsp:param name="pageHeader" value="Port Data Screen" />
	</jsp:include>
	<rcl:area id="s1-header" title="Port Data Edit Screen"
		areaMode="search" collapsible="true" buttonList="Submit Clear Cancel"
		onClickList="submit clearData cancel">
		<div class="col-12">
			<div class="row mb-2">
				<label class="col-sm-2">Port</label>
				<rcl:select id="s1-port" classes="div(col-sm-4)"
					check="req len(10) upc " />

				<label class="col-sm-2">Terminal</label>
				<rcl:select id="s1-terminal" classes="div(col-sm-4)"
					check=" req len(10) upc" />
			</div>
			<div class="row mb-2">
				<label class="col-sm-2">Situation/Event</label>
				<rcl:select id="s1-situation" classes="div(col-sm-4)" check="req" />
			</div>
			<div class="row mb-2">
				<label class="col-sm-2">Start Event (Date & Time)</label>
				<rcl:date id="s1-startEvent" classes="div(col-sm-4)" check=" req" />
				<label class="col-sm-2">End Event (Date & Time)</label>
				<rcl:date id="s1-endEvent" classes="div(col-sm-4)" check=" req" />
			</div>
			<div class="row mb-2">
				<label class="col-sm-2">Start Effected (Effected)</label>
				<rcl:date id="s1-startEffected" classes="div(col-sm-4)" check=" req" />
				<label class="col-sm-2">End Effected (Effected)</label>
				<rcl:date id="s1-endEffected" classes="div(col-sm-4)" check=" req" />
			</div>
			<div class="row mb-2">
				<label class="col-sm-2">Max Crane</label>
				<rcl:number id="s1-maxCrane" classes="div(col-sm-4)"
					check=" req len(10) upc" />
				<label class="col-sm-2">Operating Crane</label>
				<rcl:number id="s1-operatingCrane" classes="div(col-sm-4)"
					check=" req len(10) upc" />
			</div>
		</div>
		<hr>

	</rcl:area>





	<script>
$(document).ready(function() {
	var portOptions="<option value='-1'>Please Select One</option>";
	portOptions+="<option>ERYMJI</option>";
	portOptions+="<option>CHISTI</option>";
	portOptions+="<option>GTERYJ</option>";

	 $("#s1-port").html(portOptions);

	 var terminalOptions="<option value='-1'>Please Select One</option>";
	 terminalOptions+="<option>TDEFFD</option>";
	 terminalOptions+="<option>SERFVC</option>";
	 terminalOptions+="<option>OJRRDE</option>";

		 $("#s1-terminal").html(terminalOptions);


	var options="<option value='-1'>Please select One</option>";
	options+="<option>Crane Down</option>";
	options+="<option>Truck Movement</option>";

	$("#s1-situation").html(options);
	});

function cancel(){
	$("#portDataEditScreenPopUp").hide();
}

function submit(){
	var startEvent = $("#s1-startEvent").val();
	var endEvent = $("#s1-endEvent").val();
	if(new Date(endEvent) < new Date(startEvent)){
		rutOpenMessageBox("Warning", "End Date should not be less than start Date", "cancel", "ok", true);
		
		}
}
function clearData(){
	$("#s1-port").val("-1");
	$("#s1-terminal").val("-1");	
	$("#s1-situation").val("-1");	
	$("#s1-startEvent").val('');	
	$("#s1-endEvent").val('');	
	$("#s1-startEffected").val('');	
	$("#s1-endEffected").val('');	
	$("#s1-maxCrane").val('');	
	$("#s1-operatingCrane").val('');	
}

</script>
</body>
</html>
