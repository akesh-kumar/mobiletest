<!--
-----------------------------------------------------------------------------------------------------------
LakshmiPractice.jsp
-------------------------------------------------------------------------------------------------------------
Copyright RCL Public Co., Ltd. 2018
-------------------------------------------------------------------------------------------------------------
Author Author Cognis Solution 05/06/2023
- Change Log ------------------------------------------------------------------------------------------------
## DD/MM/YY -User-     -TaskRef-      -Short Description
1  05/06/2023       Lakshmi Utti         Initial Version
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
<title>E-Notice Search Criteria</title>
</head>
<body>
<body id="amd200">
	<jsp:include page='../include/header.jsp'>
		<jsp:param name="pageHeader" value="Sample Search" />
	</jsp:include>

	<rcl:area id="s0-header" title="CN BARGE E-NOTICE SEARCH CRITERIA"
		areaMode="search" collapsible="true"
		buttonList="New Find BookingInq UserLog Clear"
		onClickList="createNew find bookingInq userLog clearSearch">

		<div class="row">
			<rcl:text id="s0-category" label="Category" classes="div(col-sm-2)"
				check="dis" defaultValue="Barge" />

			<rcl:text id="s0-venderCode" label="Vender Code"
				classes="div(col-sm-2)" check="len(10) siz(10) upc"
				lookup="tbl(VE_NOTICE_CAM_CUSTOMER) rco(VENDOR_CODE VENDOR_NAME) rid(s0-venderCode s0-venderName) sco(VENDOR_CODE) sva(s0-venderCode)" />

			<rcl:text id="s0-venderName" label="Vender Name"
				classes="div(col-sm-2)" check="len(10) siz(10) upc"
				lookup="tbl(VE_NOTICE_CAM_CUSTOMER) rco(VENDOR_CODE VENDOR_NAME) rid(s0-venderCode s0-venderName) sco(VENDOR_NAME) sva(s0-venderName)" />


			<rcl:text id="s0-fromLocation" label="From Location"
				classes="div(col-sm-2)" check="len(10) req siz(10) upc"
				lookup="tbl(VE_NOTICE_PORT) rco(Name ZONE) rid(s0-fromLocation s0-toLocation) sco(Name) sva(s0-fromLocation)" />

			<rcl:text id="s0-toLocation" label="To Location"
				classes="div(col-sm-2)" check="len(10) req siz(10) upc"
				lookup="tbl(VE_NOTICE_PORT) rco(Name ZONE) rid(s0-fromLocation s0-toLocation) sco(ZONE) sva(s0-toLocation)" />


			<rcl:text id="s0-fromTerminal" label="From Terminal"
				classes="div(col-sm-2)" check="len(10) req siz(10) upc"
				lookup="tbl(VE_NOTICE_PORT) rco(TERMINAL ZONE) rid(s0-fromTerminal s0-toTerminal) sco(TERMINAL) sva(s0-fromTerminal)" />


			<rcl:text id="s0-toTerminal" label="To Terminal"
				classes="div(col-sm-2)" check="len(10) req siz(10) upc"
				lookup="tbl(VE_NOTICE_PORT) rco(TERMINAL ZONE) rid(s0-fromTerminal s0-toTerminal) sco(ZONE) sva(s0-toTerminal)" />



			<rcl:select id="s0-status" label="Status" classes="div(col-2)">
			</rcl:select>

			<rcl:select id="s0-sortBy" label="Sort By" classes="div(col-2)">
			</rcl:select>

			<rcl:select id="s0-sortIn" label="Sort In" classes="div(col-2)">
			</rcl:select>

			<%-- <rcl:date id="s0-startEffect" name="startEffect" label="StartEffect"
				classes="div(col-2)" check="req len(10) " defaultValue="today"></rcl:date>

			<rcl:date id="s0-endEffect" name="endEffect" label="EndEffect"
				classes="div(col-2)" check="req len(10) " defaultValue="today"></rcl:date> --%>
		</div>
		<hr>
	</rcl:area>

	<script>
	$(document).ready(function(){

		var statusOptions="<option>Select Status</option>";
		statusOptions+="<option value='A'>Active</option>";
		statusOptions+="<option value='I'>In Active</option>";

		$("#s0-status").html(statusOptions);

		var sortOptions="<option value='-1'>Select One..</option>";
		sortOptions+="<option value='Asc'>Ascending</options>";
		sortOptions+="<option value='Desc'>Decending</options>";

		$("#s0-sortBy").html(sortOptions);
		$("#s0-sortIn").html(sortOptions);

		
		});

	function createNew() {
		rutOpenMessageBox("Info", "Do you want to create new ", "", cancelRequest, okRequest,"Cancel", "Ok", false);
		
	}
	function cancelRequest(){
		rutOpenMessageBox("Info", "cancelRequestData");
	}
	
	function okRequest(){
		rutOpenMessageBox("Info", "okRequestData");
	}

	function find(){
		/* var startEffect = $("#s0-startEffect").val();
		var endEffect = $("#s0-endEffect").val();
		if(new Date(startEffect) >= new Date(endEffect)){
			alert("both are same");
			return;
			} */
		rutOpenMessageBox("Message", "Do you want to find a Record", "cancel", "ok", true);
		}
	function bookingInq(){
		rutOpenMessageBox("Message", "Booking Inqiry");
		}
	function userLog() {
		rutOpenMessageBox("Message", "<h6>User Log</h6>");
		}
	function clearSearch() {
		debugger;
		$("#s0-venderCode").val('');
		$("#s0-venderName").val('');
		$("#s0-fromLocation").val('');
		$("#s0-toLocation").val('');
		$("#s0-fromTerminal").val('');
		$("#s0-toTerminal").val('');
		$("#s0-status").val("Select Status");
		$("#s0-sortBy").val("-1");
		$("#s0-sortIn").val("-1");
		}
	
	</script>
</body>
</html>