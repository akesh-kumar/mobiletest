<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" session="true" autoFlush="true"
	errorPage="/pages/error/RcmErrorPage.jsp"%>
<%@ taglib prefix="rcl" uri="/WEB-INF/custom.tld"%>
<!DOCTYPE html>
<html>
<meta http-equiv="X-UA-Compatible" content="IE=11" />

<%-- 
<%@include file="../include/RcmInclude.jsp"%> --%>
<jsp:include page="../include/commonInclude.jsp"></jsp:include>
<head>
<c:set var="userData" value="${sessionScope.userData}" />
<title>Send Whats up Message</title>

</head>
<body id="dim204">
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
</style><body id="amd200">
	<jsp:include page='../include/header.jsp'>
		<jsp:param name="pageHeader" value="Send What's Message " />
	</jsp:include>
	<form enctype="multipart/form-data" id="fileUploadForm">
		<rcl:area id="s0-header" title="Message Detail" areaMode="search" 
			collapsible="true" buttonList="SendMessage Rest">
			 
			 
				<!--start row 1    -->
			<div class="mt-3" >
				  
                  <rcl:text id="s0-phone" label="Enter the Phone Number" classes="div(col-sm-4)"/>
            </div>
            
              	<div class="ml-3 mt-3">
              		 <div for="file"><strong>Enter the message</strong></div>
              		 <textarea id="message" name="message" rows="5" cols="100"></textarea>
              	</div>
              	<br>
              <div class="ml-3 mt-0 mb-4" >
					
				   <label for="file"><strong>File Upload :</strong></label>
                		<input type="file" id="file" name="file" >
			  
			</div>
			
			<!-- end row  -->
	
	</rcl:area>
	</form>
		
	<!-- end container -->
	

</body>
<script> 

//
$(document).ready(function () {
	$("#s0-find").html("Send Message");
	
});

function rutResetToDefault(){
	$("#message").val("");
	$("#file").val("");
	$("#s0-phone").val("")
}
function find(){
		 	 
	if( $("#message").val()==""){
		rutOpenMessageBox("Message","Please Enter message", null,null, '');
		return;
	}
	if( $("#message").val().length>50){
		rutOpenMessageBox("Message","Please Enter message Of max length 50", null,null, '');
		return;
	}
	if( $("#s0-phone").val()==""){
	rutOpenMessageBox("Message","Please Phone Number", null,null, '');
	return;
	}
	
	if( $("#s0-phone").val().indexOf("+")==-1){
		rutOpenMessageBox("Message","Please Phone Number with Country Code", null,null, '');
		return;
		}


	if( $("#s0-phone").val().split(",").length>10){
	rutOpenMessageBox("Message","Max 10 Phone Number is allowed seprate with comma ", null,null, '');
	return;
	}

	var form = $('#fileUploadForm')[0];

			var data = new FormData(form);
			data.append("message", $("#message").val());
			data.append("phone", $("#s0-phone").val());
			data.append("userId", getUserDataFromHeader().userId);
			
			
			$( "body" ).append('<div class="loading"></div>');
			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url: "/ChatWSWebApp/rclws/whatsUp/sendMessage",
				data: data,
				processData: false, //prevent jQuery from automatically transforming the data into a query string
				contentType: false,
				cache: false,
				timeout: 600000,
				success: function (data) {
					  $("body").find('.loading').remove();
					  console.log(data);
					  if(data.status){
						  rutOpenMessageBox("Message","Message Send successfully", null,null, '');
					  }else{
						  rutOpenMessageBox("Error",data.responseMessage, null,null, '');
					  }
					  
				},
				error: function (e) {
					$("body").find('.loading').remove();

				}
			});


	 		 
  	                 
 }

</script>

</html>