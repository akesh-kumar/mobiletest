<!--
-----------------------------------------------------------------------------------------------------------
SearchScreen.jsp
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
<title>Search Screen</title>
</head>
<body>
<body id="amd200">
	<jsp:include page='../include/header.jsp'>
		<jsp:param name="pageHeader" value="Search Screen" />
	</jsp:include>
	<jsp:include page="../screen/popup/PortDataPopUp.jsp"></jsp:include>

	<rcl:area id="s0-header" title="SEARCH CRITERIA" areaMode="search"
		collapsible="true" buttonList="Find Reset portData NewPage"
		onClickList="find reset portData data">


		<div class="row">
			<rcl:select id="s0-port" label="Port" classes="div(col-sm-3)"
				check="req upc" />

			<rcl:select id="s0-terminal" label="Terminal" classes="div(col-sm-3)"
				check="req upc" />

			<rcl:date id="s0-fromDate" label="From Date" classes="div(col-sm-3)"
				check="req" />

			<rcl:date id="s0-toDate" label="To Date" classes="div(col-sm-3)"
				check="req" />

		</div>
		<hr>
	</rcl:area>
	<script>
		$(document)
				.ready(
						function() {
							var portOptions = "<option value='-1'>Please Select One</option>";
							portOptions += "<option>ERYMJI</option>";
							portOptions += "<option>CHISTI</option>";
							portOptions += "<option>GTERYJ</option>";

							$("#s0-port").html(portOptions);

							var terminalOptions = "<option value='-1'>Please Select One</option>";
							terminalOptions += "<option>TDEFFD</option>";
							terminalOptions += "<option>SERFVC</option>";
							terminalOptions += "<option>OJRRDE</option>";

							$("#s0-terminal").html(terminalOptions);
						});

		function find() {
			debugger;
			//var requestData = getDataAreaToObject("s0-header");
			//another way to send data in json format
			var requestData = rptGetDataFromSingleArea("s0-header");
			var url = "/search/findData";
			sendPostRequest(url, requestData, function(data) {
				rutOpenMessageBox("Message", "findData");
	    	    
			})
		
		}
		function reset() {
			debugger;
			$("#s0-port").val("-1");
			$("#s0-terminal").val("-1");
		/* 	var today = moment */
			
			$("#s0-fromDate").val('');
			$("#s0-toDate").val('');
		}

		function portData() {
			$("#portDataEditScreenPopUp").show();
		}

		function data() {
			var href = window.location.protocol + "//" + location.hostname
					+ ':' + window.location.port
					+ "/PracticeProject/pages/screen/PortDataScreen.jsp"
			console.log("href " + href);
			var type = 'goTo';
			var rclp = new rutDialogFlow(type, href);
			rclp.packForRclServlet = true;
			rclp.addToField('trg', 'variable', null, '', 'src', 'variable',
					null, {});
			rclp.openPage();
		}
	</script>

</body>
</html>