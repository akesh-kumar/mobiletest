<!--
-----------------------------------------------------------------------------------------------------------
SimpleTest.jsp
-------------------------------------------------------------------------------------------------------------
Copyright RCL Public Co., Ltd. 2018
-------------------------------------------------------------------------------------------------------------
Author Author Cognis Solution 05/06/2023
- Change Log ------------------------------------------------------------------------------------------------
## DD/MM/YY -User-     -TaskRef-      -Short Description
1  05/06/2023       chandrabhan harode         Initial Version
-----------------------------------------------------------------------------------------------------------
-->


<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<%@ taglib  uri="/WEB-INF/custom.tld"  prefix="rcl"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" session="true" autoFlush="true"
	errorPage="/pages/error/RcmErrorPage.jsp"%>


 
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=11" />

  
<jsp:include page="../include/commonInclude.jsp"></jsp:include>
<title>Insert title here</title>
</head>
<body id="amd200">
	<jsp:include page='../include/header.jsp'>
		<jsp:param name="pageHeader" value="Sample Test" />
	</jsp:include>


<rcl:area id="s0-header" title=" Search Criteria" areaMode="search"
		collapsible="true" buttonList="Create&nbsp;User Find Reset" onClickList="create find reset">
		
		<div class="row">
  				<rcl:text id="s0-termnal" label="termnal" classes="div(col-sm-2)"   
				check="len(10) req siz(10) upc "   lookup="tbl(VE_NOTICE_PORT) rco(TERMINAL ZONE) rid(s0-termnal s0-location) sco(TERMINAL) sva(s0-termnal)" 	 />
				
				
				<rcl:text id="s0-location" label="Location" classes="div(col-sm-2)"   
				check="len(10) req siz(10) upc "   lookup="tbl(VE_NOTICE_PORT) rco(TERMINAL ZONE) rid(s0-termnal s0-location) sco(ZONE) sva(s0-location)" 	 />
				 
				
				<rcl:number id="s0-number" label="Number" classes="div(col-sm-2)"
				check="len(10) upc"  />
				
				<rcl:date id="s0-date" label="Date" classes="div(col-sm-2)"
				check="len(10) upc"  />
				
				<rcl:select id="s0-pol" label="Pol" classes="div(col-2)"	> </rcl:select>	
		</div>
</rcl:area>
</body>
</html>

<script>


$(document).ready(function() {			 
	 
	
		
	var options="<option value='-1'>Select Status</option>";
	options+="<option value='S'>Submited</option>";
		options+="<option value='A'>Approve</option>";
		options+="<option value='R'>Rejected</option>";
		 
		$("#s0-pol").html(options);
		
	 
		 
					
});

	function cancelRequestData(){
		rutOpenMessageBox("Info", "cancelRequestData");
	}
	
	function okRequestData(){
		rutOpenMessageBox("Info", "okRequestData");
	}

	function create(){
		rutOpenMessageBox("Warning", "Are you sure want to Reject", "<h1>Heder</h1>", cancelRequestData, okRequestData,"Cancel", "Ok", false);
		
	}
	
	function find(){
		 
		rutOpenMessageBox("Warning", "find");
	}
	
	function reset(){
		 
		rutOpenMessageBox("Warning", "reset");
	}
</script>