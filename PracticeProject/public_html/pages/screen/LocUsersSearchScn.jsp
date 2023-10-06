<!--
-----------------------------------------------------------------------------------------------------------
BookingSearchScn.jsp
-------------------------------------------------------------------------------------------------------------
Copyright RCL Public Co., Ltd. 2018
-------------------------------------------------------------------------------------------------------------
Author Author Cognis Solution 1/04/2020
- Change Log ------------------------------------------------------------------------------------------------
## DD/MM/YY -User-     -TaskRef-      -Short Description
1  29/09/2020       chandrabhan harode         Initial Version
-----------------------------------------------------------------------------------------------------------
-->
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" session="true" autoFlush="true"
	errorPage="/pages/error/RcmErrorPage.jsp"%>
<%@ taglib prefix="rcl" uri="/WEB-INF/custom.tld"%>
<!DOCTYPE html>
<html>
<meta http-equiv="X-UA-Compatible" content="IE=11" />

  
<jsp:include page="../include/commonInclude.jsp"></jsp:include>
<head>

<title>Create User</title>


</head>
<style type="text/css">
 
.col-0x35 {
	flex: 0 0 2.8%;
	max-width: 2.8%;
}

.listsearch-Browser {
	margin-bottom: 0px;
	font-weight: 500;
	word-wrap: break-word;
}


#show {
  display: none;
}


.col-form-label {
    
    font-weight: bold;
}
</style>

<body id="amd200">
	<jsp:include page='../include/header.jsp'>
		<jsp:param name="pageHeader" value="Search User" />
	</jsp:include>
	<c:set var="userData" value="${sessionScope.userData}" />
	 
	 
	<rcl:area id="s0-header" title="Search Criteria" areaMode="search"
		collapsible="true" buttonList="Role&nbsp;Assignment Find Reset" onClickList="newUser find reset">
		<div class="row mx-auto">
			<!--start row 1 -->

 
		 <rcl:text id="s0-userId" label="User Id" classes="div(col-2)" check="len(10) upc"  lookup="tbl(V_QUOTE_ESM_USER) rco(USER_ID) rid(s0-name) sop(LIKE)"/>		 

			<rcl:text id="s0-emailId" label="Email" classes="div(col-sm-2)" check="len(5) upc"  />


			<rcl:text id="s0-phoneNumber" label="Phone Number" classes="div(col-sm-2)"  />

			<rcl:text id="s0-companyName" label="Company Name" classes="div(col-sm-2)" 	check="len(10) upc"  />

		</div>
		<div class="row mx-auto">

 			<rcl:select id="s0-roleSearch" label="" classes="div(col-2)"	>
			</rcl:select>			
			<rcl:date id="s0-fromDate" label="Created From" name="submitDateTo" classes="div(col-2)">
			</rcl:date>
			
			<rcl:date id="s0-toDate" label="Created To"  name="submitDateTo" classes="div(col-2)">
			</rcl:date>
					
					
	  </div>


		 
		
		 
		<!-- end row  -->
	</rcl:area>
	<rcl:area id="t0-area" title=" List of Quotes" areaMode="table"
		collapsible="true" useHeader="true">
			<div class="row border">
			<div  id="t-seq" class="col-0x5 mr-0"
				style="font-weight: bold; text-align: center;">Seq#</div>
			<div id="t-fsc" class="col-1 mr-0" style="font-weight: bold;">User Id</div>
			 
			<div id="t-bookingNo" class="col-1x25 mr-0" style="font-weight: bold;">User name.</div>
			<div id="t-statusAsString" class="col-1x25 mr-0" style="font-weight: bold;">Phone Number</div>
			 
			<div id="t-service" class="col-1x25 mr-0" style="font-weight: bold;">Email</div>
			<div id="t-vessel" class="col-1x25 mr-0" style="font-weight: bold;">Company Name</div>
			<div id="t-voyage" class="col-1x25 mr-0" style="font-weight: bold;">Country</div>
			<div id="t-eta" class="col-1 mr-0" style="font-weight: bold;">Role</div>
			<div id="t-submitDate"  class="col-1 mr-0" style="font-weight: bold;">Created Date</div>
			<div id="t-bookingAmendmentStatusAsString" class="col-1x75 mr-0" style="font-weight: bold;">Created By</div>
		</div>
		<div class='tblArea' style="padding-left:0px">
			<div id="t0-row" class="tblRow  row pt-1">
				<div class="container-fluid">
					<div class="row gridRow selectData">
						<!-- start table row -->
						<div class="col-0x5 mr-0" style="text-align: center;">
							<p id="t0-seq" class="listsearch"></p>
						</div>
						<div class="col-1 mr-0">
							<p id="t0-userId" class="listsearch"></p>
						</div>
						 
						<div class="col-1x25 mr-0">
							<p id="t0-userName" class="listsearch"></p>
						</div>
						<div class="col-1x25 mr-0">
							<p id="t0-phoneNumber" class="listsearch"></p>
						</div>
						 
						<div class="col-1x25 mr-0">
							<p id="t0-emailId" class="listsearch"></p>
						</div>
						<div class="col-1x25 mr-0">
							<p id="t0-companyName" class="listsearch"></p>
						</div>
						<div class="col-1x25 mr-0">
							<p id="t0-countryName" class="listsearch"></p>
						</div>
						<div class="col-1 mr-0">
							<p id="t0-role" class="listsearch"></p>
						</div>
						<div class="col-1 mr-0">
							<p id="t0-fromDate" class="listsearch"></p>
						</div>
						<div class="col-1x75 mr-0">
							<p id="t0-loginUserId" class="listsearch"></p>
						</div>
						<div>
							<i class="selectChild fas fa-edit" id="t0-element"
								style="padding-top: 3px;" onclick="viewList(this.id);"></i> <i
								class="selectChild fas fa-trash " style="margin-left: 10px;"
								" id="t0-element" style="padding-top: 3px;"
								onclick="deleteBL(this.id);"></i>
						</div>

						<!-- end table row -->
					</div>
				</div>
			</div>
		</div>

	</rcl:area>
	<!-- end table area -->
	<div id="t0-paging" class="container-fluid pl-0 pr-0"
		data-pageSize="15"></div>

	<script>
	var dataReponse =[];
	 
		$(document).ready(function() {
			
			$("#h1-back").show();	
			$("#s0-btn1").show();
			
			$('.listsearch').addClass('rcl-standard-form-control rcl-standard-textbox rcl-standard-font tblField')
			rptTableInit('t0-area');		 					
			
		});
		
		 

		 
				

	   

		function find() {
			rptClearDisplay('t0-area');
			rptAddData('t0-area', []);
			var url = "/user/searchData";
			var sendData = getDataAreaToObject("s0-header");
			sendData["userId"]=$("#s0-userId").val();
			sendData["emailId"]=$("#s0-emailId").val();
			sendData["phoneNumber"]=$("#s0-phoneNumber").val();
			sendData["companyName"]=$("#s0-companyName").val();
			sendData["fromDate"]=$("#s0-fromDate").val();
			sendData["fromDate"]=$("#s0-toDate").val();
			sendData["toDate"]=$("#s0-fromDate").val();
			sendData["role"]=$("#s0-roleSearch").val();
			settingTable('t0-area');
			sendPostRequest(url, sendData, function(data) {
				dataReponse = data;
				 rptAddData('t0-area', data);
	    	     rptDisplayTable('t0-area');

	    	      
			})
		}

		
		 
		 
		function reset() {

			 $("#s0-userId").val('');
			 $("#s0-emailId").val('');
			 $("#s0-phoneNumber").val('');
			 $("#s0-companyName").val('');
			 $("#s0-fromDate").val('');
			 $("#s0-toDate").val('');
			 $("#s0-fromDate").val('');
			 $("#s0-roleSearch").val('');
		}

		function settingTable(isvalue) {
			var settings = getTableSettings(isvalue);
			settings.paging.pageSize = 15;
		}

		
		 
		function viewList(argId) {
			var url = "/user/getById";
			argId=argId.split("-")[argId.split("-").length-1];
			argId=parseInt(argId);
			sendPostRequest(url, dataReponse[argId], function(data) {				 
				console.log(data);
				data = data[0]
				$("#editUserDialog").show();
				$("#s0-loginIdEdit").val(data.userId);				 
				$("#s0-mobileEdit").val(data.phoneNumber)
				$("#s0-emailEdit").val(data.emailId);
				$("#s0-userName").val(data.userName);
				$("#s0-roleEdit").val(data.roleId);
				$("#s0-location-for-headEditSave").html("")
				if(data.propertyName){
				var saveLocation =data.propertyName.split(",");
				var options="";
				for(var i=0;i<saveLocation.length;i++){
					options+="<option value='"+saveLocation[i]+"'>"+countryList[saveLocation[i]]+"</option>";
				}
				}
				$("#s0-location-for-headEditSave").html(options);
				$("#s0-loginIdEdit").attr("disabled","disabled")
				$("#s0-mobileEdit").attr("disabled","disabled")
				$("#s0-emailEdit").attr("disabled","disabled");
				$("#s0-userName").attr("disabled","disabled");
			});

		}
		
		function backProcessUrl() {
			 
		}
		var  deleteArgId;
		function deleteBL(id) {
			deleteArgId = id;
			rutOpenMessageBox("Warning", "Are you sure want to delete", null, null, deleteRole,"Cancel", "Ok", true);
		}
		
		
		function deleteRole(){
			debugger;
			 
			var argId=deleteArgId.split("-")[deleteArgId.split("-").length-1];
			argId=parseInt(argId);			
			var url = "/user/deleteUserData";
			var sendData = {"userId" : dataReponse[argId].userId}
			sendPostRequest(url, sendData, function(data) {
				rutOpenMessageBox("Message", "Selected Record Deleted successfully",	null, null, null);
				find();
				});
		}
		
		function newUser() {
			 
			 
			$("#bookingLookupLog").show();
		}
		
	function backAccount(){
		
		 
		window.close();
			
		}
	</script>
<%@ include file="../screen/popup/createUserScn.jsp" %>
<%@ include file="../screen/popup/EditUserScn.jsp" %>
</body>

</html>