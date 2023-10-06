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

<title>Quote DashBoard</title>


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
		<jsp:param name="pageHeader" value="Quote Request" />
	</jsp:include>
	<c:set var="userData" value="${sessionScope.userData}" />
	 
	<c:if test="${userData.fscCode=='R'}">
		 <script>
		 $(document).ready(function() {
		 	$("#s0-btn1").hide();
		 });
		 </script>
	</c:if>
	<rcl:area id="s0-header" title="Quote Search Criteria" areaMode="search"
		collapsible="true" buttonList="Create Find Reset" onClickList="create find reset">
		<div class="row mx-auto">
			<!--start row 1 -->

 

 			<rcl:select id="s0-pol" label="Pol" classes="div(col-2)"	> </rcl:select>			
 			<rcl:select id="s0-pod" label="Pod" classes="div(col-2)"	></rcl:select>


			<rcl:text id="s0-vessel" label="Created By" classes="div(col-sm-2)"
				check="len(10) upc" icon="fa-search" iconClick="lookupVessel()" />

			 <rcl:date id="s0-submitDate" label="Submit Data From"
				name="submitDateFrom" classes="div(col-2)">
			</rcl:date>

<rcl:text id="s0-location" label="Approved By" classes="div(col-sm-2)" check="len(10) upc"
						 lookup="tbl(VRL_BKG_PORT) rco(PORT_CODE) rid(s0-location) sop(LIKE)"/>
		</div>
		<div class="row mx-auto">


				<rcl:text id="s0-location" label="Request Id" classes="div(col-sm-2)" check="len(10) upc" />
								
        


			 <rcl:text id="s0-bookingNo" label="Approved ID" classes="div(col-sm-2)"
					check="len(17) upc" icon="fa-search"
					iconClick="onClickLookupBooking()" />
					
				<rcl:text id="s0-equipmentNo"
						  label="Shpper."
						  classes="div(col-sm-2)"
						  check="len(17) upc"
						 lookup="tbl(VRL_BKG_BOOKING_EQUIPMENT) rco(CONTAINER_NO) rid(s0-equipmentNo) sop(LIKE)"
								/>

			
					<rcl:select id="s0-statusId" label="Status" classes="div(col-2)" 
					optionsList="Submited&nbspLH&nbspapproval Approved Rejected Opened " valueList="ALL W A R O"
					defaultValue="ALL">
				</rcl:select>	


		</div>


		 
		
		
		 
		<!-- end row  -->
	</rcl:area>
	<rcl:area id="t0-area" title=" List of Quotes" areaMode="table"
		collapsible="true" useHeader="true">
			<div class="row border">
			<div  id="t-seq" class="col-0x5 mr-0"
				style="font-weight: bold; text-align: center;">Seq#</div>
			<div id="t-pol" class="col-0x5 mr-0" style="font-weight: bold;">Pol</div>
			 
			<div id="t-pod" class="col-0x5 mr-0" style="font-weight: bold;">Pod.</div>
			<div id="t-pod" class="col-0x5 mr-0" style="font-weight: bold;">Request Id.</div>
			<div id="t-pod" class="col-0x5 mr-0" style="font-weight: bold;">Approved Id.</div>
			<div id="t-createdBy" class="col-1 mr-0" style="font-weight: bold;">Created BY</div>
			 
			<div id="t-service" class="col-1 mr-0" style="font-weight: bold;">Shipper</div>
			<div id="t-vessel" class="col-1 mr-0" style="font-weight: bold;">Vessel</div>
			<div id="t-voyage" class="col-1 mr-0" style="font-weight: bold;">Voyage</div>
			<div id="t-weeklyVolume" class="col-1 mr-0" style="font-weight: bold;">Weekly volume</div>
			<div id="t-submitDate"  class="col-1 mr-0" style="font-weight: bold;">Dest F/T</div>
			<div id="t-submitDate"  class="col-1 mr-0" style="font-weight: bold;">Target Rate</div>
			<div id="t-submitDate"  class="col-1 mr-0" style="font-weight: bold;">Target etd</div>
			<div id="t-statusAsString" class="col-1 mr-0" style="font-weight: bold;">Status</div>
		</div>
		<div class='tblArea' style="padding-left:0px">
			<div id="t0-row" class="tblRow  row pt-1">
				<div class="container-fluid">
					<div class="row gridRow selectData">
						<!-- start table row -->
						<div class="col-0x5 mr-0" style="text-align: center;">
							<p id="t0-seq" class="listsearch"></p>
						</div>
						<div class="col-0x5 mr-0">
							<p id="t0-pol" class="listsearch"></p>
						</div>
						 
						<div class="col-0x5 mr-0">
							<p id="t0-pod" class="listsearch"></p>
						</div>
						<div class="col-0x5 mr-0">
							<p id="t0-requestId" class="listsearch"></p>
						</div>
						<div class="col-0x5 mr-0">
							<p id="t0-approvedId" class="listsearch"></p>
						</div>
						<div class="col-1 mr-0">
							<p id="t0-createdBy" class="listsearch"></p>
						</div> 
						<div class="col-1 mr-0">
							<p id="t0-shipper" class="listsearch"></p>
						</div>
						<div class="col-1 mr-0">
							<p id="t0-vessel" class="listsearch"></p>
						</div>
						<div class="col-1 mr-0">
							<p id="t0-voyage" class="listsearch"></p>
						</div>
						<div class="col-1 mr-0">
							<p id="t0-weeklyVolume" class="listsearch"></p>
						</div>
						<div class="col-1 mr-0">
							<p id="t0-freeTime" class="listsearch"></p>
						</div>
						<div class="col-1 mr-0">
							<p id="t0-targetRate" class="listsearch"></p>
						</div>
						<div class="col-1 mr-0">
							<p id="t0-targetEtd" class="listsearch"></p>
						</div>
						<div class="col-1 mr-0">
							<p id="t0-stausAsString" class="listsearch bookingAmendmentStatusAsString"></p>
						</div>
						<div>
					
							<i class="selectChild1 fas fa-thumbs-up" id="t0-element"
								style="padding-top: 3px;" onclick="approvedRequest(this.id);" title="Approve"></i>
							 <i title="Reject"
								class="selectChild2 fas fa-ban" style="margin-left: 10px;"	 id="t0-element" style="padding-top: 3px;"
								onclick="cancelRequest(this.id);"></i>
								
							 
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
	var roleName= null;
	var deleteArgId = null;
		$(document).ready(function() {			 
			 
			
	 		
			var options="<option value='-1'>Select Status</option>";
			options+="<option value='S'>Submited</option>";
				options+="<option value='A'>Approve</option>";
				options+="<option value='R'>Rejected</option>";
				 
				$("#s0-statusId").html(options);
				
			 
				$('.listsearch').addClass('rcl-standard-form-control rcl-standard-textbox rcl-standard-font tblField')
				rptTableInit('t0-area');	
				
				//getRole();
							
		});
		

		 
		
		function setColur(){
			 
			     
				 
			     $.each($(".selectChild1"), function( index, value ) {
			    	 //console.log($(this.id).attr("id"))
			    	 var id =this.id;
		    	     	 var argId=id.split("-")[id.split("-").length-1];
						argId=parseInt(argId);	
						 console.log(argId)
						 if(dataReponse[argId]){
							 
							 switch( dataReponse[argId].statusId){
			    	     		case "S":
			    	     			$(this).parent("div").parent("div").css('background-color','#FAFFCC')
			    	     				break;
			    	     		 
			    	     		case "A":
			    	     			$(this).parent("div").parent("div").css('background-color','#D1f9cd')
			    	     				break;
			    	     				
			    	     		case "R":
			    	     			$(this).parent("div").parent("div").css('background-color','#F9D2D5')
			    	     				break;
			    	     				
			    	     				
			    	     	}
							 
							if( dataReponse[argId].statusId!="S"){
								$(this).hide();
							}
						 }
						//console.log( dataReponse[argId])
		    	      
		    	     });
			 
			     $.each($(".selectChild2"), function( index, value ) {
			    	 //console.log($(this.id).attr("id"))
			    	 var id =this.id;
		    	     	 var argId=id.split("-")[id.split("-").length-1];
						argId=parseInt(argId);	
						 console.log(argId)
						 if(dataReponse[argId]){
							if( dataReponse[argId].statusId!="S"){
								$(this).hide();
							}
						 }
						//console.log( dataReponse[argId])
		    	      
		    	     });
			 
			 
			 
		}

		 
		

		function getRole() {	
			$(".selectChild1").hide();
	 		$(".selectChild2").hide();
			var url = "/user/role";
			var sendData ={};
			sendData["userId"]=getUserDataFromHeader().userId;			 
			sendPostRequest(url, sendData, function(data) {
				 if(data){
					 roleName=data[0].roleId;
					 switch(roleName){
					 	case "4":
					 		$("#h1-user").show();
					 		$(".selectChild1").show();
					 		$(".selectChild2").show();
					 		break;
					 	case "3":
					 		$(".selectChild1").show();
					 		$(".selectChild2").show();
					 		$("#s0-btn0").hide();
					 		break;
					 	case "1": case "2":
					 		$("#s0-btn0").show();
					 		$(".selectChild1").hide();
					 		$(".selectChild2").hide();
					 		break;	
					 		
					 }
					  
				 }	    	      
			})
		}


		

		function find() {
			rptClearDisplay('t0-area');
			rptAddData('t0-area', []);
			var url = "/quote/searchData";
			var sendData = getDataAreaToObject("s0-header");
			if(sendData["pod"]=="-1"){
				sendData["pod"]= "";
			}
			if(sendData["pol"]=="-1"){
				sendData["pol"]= "";
			}
			if(sendData["statusId"]=="-1"){
				sendData["statusId"]= "";
			}
			settingTable('t0-area');
			sendPostRequest(url, sendData, function(data) {
				dataReponse = data;
				 rptAddData('t0-area', data);
	    	     rptDisplayTable('t0-area');
	    	     setColur();

	    	    
			})
		}

		function settingTable(isvalue) {
			var settings = getTableSettings(isvalue);
			settings.paging.pageSize = 15;
		}

		
	 
		
		 function reset() {
			$("#s0-fsc").val("");
			$("#s0-vessel").val("");
			$("#s0-voyage").val("");
			$("#s0-vessel").val("");
			$("#s0-service").val("");
			$("#s0-bookingNo").val("");
			$("#s0-vessel").val("");
			$("#s0-service").val("");
			$("#s0-bookingNo").val("");
			$("#s0-equipmentNo").val("");
			$("#s0-status").val("");
			$("#s0-SubmitDataFrom").val("");
			$("#s0-SubmitDataTo").val("");
			$("#s0-etdFrom").val("");
			$("#s0-etdTo").val("");
			$("#s0-etdTo").val("");
			$("#s0-submitDateFrom").val("");
			$("#s0-submitDateTo").val("");
			$("#s0-etaFrom").val("");
			$("#s0-etaTo").val("");

		}

		 

		
		 
		
		function cancelRequest(id) {
			deleteArgId=id;
			rutOpenMessageBox("Warning", "Are you sure want to Reject", null, null, cancelRequestData,"Cancel", "Ok", true);
		}
		
		function approvedRequest(id) {
			deleteArgId =id;
			rutOpenMessageBox("Warning", "Are you sure want to Approve", null, null, approvedRequestData,"Cancel", "Ok", true);
		}
		
		
		function cancelRequestData(){
			debugger;
			 
			var argId=deleteArgId.split("-")[deleteArgId.split("-").length-1];
			argId=parseInt(argId);			
			var url = "/quote/reject";
			var sendData = {"id" : dataReponse[argId].id}
			sendPostRequest(url, sendData, function(data) {
				rutOpenMessageBox("Message", "This Quote Request Rejected successfully",	null, null, null);
				find();
				});
		}
		
		function approvedRequestData(){
			debugger;
			 
			var argId=deleteArgId.split("-")[deleteArgId.split("-").length-1];
			argId=parseInt(argId);			
			var url = "/quote/approve";
			var sendData = {"id" : dataReponse[argId].id}
			sendPostRequest(url, sendData, function(data) {
				rutOpenMessageBox("Message", "This Quote Request Approved successfully",	null, null, null);
				find();
				});
		}
		
		
		function createUser() {			 
			 var href=  window.location.protocol+"//"+location.hostname+':'+window.location.port+"/MobileWebApp/pages/screen/LocUsersSearchScn.jsp"
				console.log("href "+ href);
				var type = '2Tab';
				var rclp = new rutDialogFlow(type , href);
				rclp.packForRclServlet = true;
				rclp.addToField('trg' , 'variable' ,null , '',
						'src','variable' , null , {});
				rclp.openPage();
		
		}
		
		function create(){
			$("#createQuoteLookupLog").show();
		}
	</script>
 <jsp:include page="../screen/popup/createQuoteScn.jsp"></jsp:include>
</body>

</html>