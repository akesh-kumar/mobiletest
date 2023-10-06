<!--
-----------------------------------------------------------------------------------------------------------
PowerTablePractice.jsp
-------------------------------------------------------------------------------------------------------------
Copyright RCL Public Co., Ltd. 2018
-------------------------------------------------------------------------------------------------------------
Author Author Cognis Solution 05/06/2023
- Change Log ------------------------------------------------------------------------------------------------
## DD/MM/YY -User-     -TaskRef-      -Short Description
1  09/06/2023       Lakshmi Utti         Initial Version
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
<title>Power Table</title>
</head>
<body id="amd200">
	<jsp:include page='../include/header.jsp'>
		<jsp:param name="pageHeader" value="Power Table" />
	</jsp:include>


	<rcl:area id="s0-header" title=" Search Criteria" areaMode="search"
		collapsible="true" buttonList="Find Reset" onClickList="find reset">

		<div class="row">


			<rcl:text id="s0-port" label="Port" classes="div(col-sm-2)"
				check="len(10) req siz(10) upc " defaultValue="port"
				lookup="tbl(VE_NOTICE_PORT) rco(TERMINAL ZONE) rid(s0-termnal s0-location) sco(ZONE) sva(s0-location)" />

			<rcl:text id="s0-terminal" label="termnal" classes="div(col-sm-2)"
				check="len(10) req siz(10) upc " defaultValue="TER"
				lookup="tbl(VE_NOTICE_CAM_CUSTOMER) rco(VENDOR_CODE VENDOR_NAME) rid(s0-termnal s0-location) sco(VENDOR_CODE) sva(s0-termnal) tit(ddddd)" />

			<%-- <rcl:number id="s0-number" label="Number" classes="div(col-sm-2)"
				check="len(10) upc" defaultValue="111"/>

			<rcl:date id="s0-date" label="Date" classes="div(col-sm-2)"
				check="len(10) upc" defaultValue="-10" /> --%>


			<rcl:date id="s0-fromDate" label="Date" classes="div(col-sm-2)"
				check="len(10) upc" defaultValue="-10" />
			<rcl:date id="s0-toDate" label="Date" classes="div(col-sm-2)"
				check="len(10) upc" defaultValue="+1" />

			<%-- <rcl:select id="s0-pol" label="Pol" classes="div(col-2)">
			</rcl:select> --%>
		</div>
	</rcl:area>

	<rcl:area id="t0-area" title=" List of Users" areaMode="table"
		collapsible="true" useHeader="true">
		<!-- Table header -->
		<div class="row border">
			<div id="t-seq" class="col-1x25 mr-0"
				style="font-weight: bold; text-align: center;">Seq#</div>
			<div id="t-port" class="col-1x75 mr-0" style="font-weight: bold;">Port</div>
			<div id="t-terminal" class="col-1x75 ml-0" style="font-weight: bold;">Terminal</div>
			<div id="t-fromDate" class="col-1x75 mr-0" style="font-weight: bold;">From
				date</div>
			<div id="t-toDate" class="col-1x75 mr-0" style="font-weight: bold;">To
				date</div>



			<!-- <div id="t-pol" class="col-1x75 mr-0" style="font-weight: bold;">Input</div> -->


		</div>
		<!-- Table row -->
		<div class='tblArea' style="padding-left: 0px">
			<div id="t0-row" class="tblRow  row pt-1">
				<div class="container-fluid">
					<div class="row gridRow selectData">
						<!-- start table row -->
						<div class="col-1x25 mr-0" style="text-align: center;">
							<p id="t0-seq" class="listsearch"></p>
						</div>

						<div class="col-1x75 mr-0" style="text-align: left;">
							<p id="t0-port" class="listsearch"></p>
						</div>
						<div class="col-1x75 mr-0" style="text-align: left;">
							<p id="t0-terminal" class="listsearch"></p>
						</div>

						<div class="col-1x75 mr-0" style="text-align: left;">
							<p id="t0-fromDate" class="listsearch"></p>
						</div>
						<div class="col-1x75 mr-0" style="text-align: left;">
							<p id="t0-toDate" class="listsearch"></p>
						</div>


						<%-- <div class="col-1x75 mr-0" style="text-align: center;">
							 <rcl:text id="t0-location" classes="div(listsearch)"></rcl:text> --%>
					</div>
				</div>
			</div>

		</div>
		</div>
	</rcl:area>

	<div id="t0-paging" class="container-fluid pl-0 pr-0"
		data-pageSize="10"></div>

</body>
</html>

<script>
 

$(document).ready(function() {
	

	
	var options="<option value='-1'>Select Status</option>";
	options+="<option value='S'>Submited</option>";
		options+="<option value='A'>Approve</option>";
		options+="<option value='R'>Rejected</option>";
		 
		$("#s0-pol").html(options);
		
		
	$('.listsearch').addClass('rcl-standard-form-control rcl-standard-textbox rcl-standard-font tblField');
	
	rptTableInit('t0-area');
	
	
});

	function find(){
		rptClearDisplay('t0-area');
		rptAddData('t0-area', []);
		
		 // both are same this will give json Object
		 //var requestData = getDataAreaToObject("s0-header");
		 var requestData = rptGetDataFromSingleArea("s0-header");
		 var url="/search/findData"
			sendPostRequest(url, requestData, function(data) {
				debugger;
				
				
				
				rptAddData('t0-area', data);
	    	    rptDisplayTable('t0-area');
				rutOpenMessageBox("Warning", "find");
			})
			
		//rutOpenMessageBox("Warning", "find");
	}
	
	function reset(){
		rptClearDisplay('t0-area');
		rptAddData('t0-area', []);
		rutOpenMessageBox("Warning", "reset");
	}
</script>