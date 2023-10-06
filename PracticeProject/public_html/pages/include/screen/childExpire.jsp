<%-- --------------------------------------------------------------------------------------------------------
QtnSearchScn.jsp
-------------------------------------------------------------------------------------------------------------
Copyright RCL Public Co., Ltd. 2007
-------------------------------------------------------------------------------------------------------------
Author Sarawut Anuckwattana 02/07/2019
- Change Log ------------------------------------------------------------------------------------------------
##  DD/MM/YY       -User-              -TaskRef-            -ShortDescription-
-------------------------------------------------------------------------------------------------------- --%>
<meta http-equiv="X-UA-Compatible" content="IE=11" />
<%@ page language="java" contentType="text/html; charset=UTF-8"
	session="true" autoFlush="true"
	errorPage="/pages/error/RcmErrorPage.jsp"%>
<%@ taglib prefix="rcl" uri="/WEB-INF/custom.tld"%>


 <jsp:include page="../../include/commonInclude.jsp"></jsp:include>
<script type="text/javascript">
	//window.location.replace("http://"+sessionStorage.getItem("urlchildExpire")+"/SealinerRCL/childExpire.jsp");
	var userData = JSON.parse(sessionStorage.getItem("userData"));
	
	console.log("setDataHaeder :: " + sessionStorage.getItem("urlchildExpire"));
	if(userData != null || userData != undefined){
		getResultAjaxUploadFile("WS_QTN_DELETE_SESSION", {
				userData : userData,
				userToken : userData.userToken,
				userId : userData.userId
			}).done(handleExpire);
		
			function handleExpire(response) {
				//if (response.Success) {
					//if (response.resultContent == 'true') {
						window.location.replace("http://"
								+ sessionStorage.getItem("urlchildExpire")
								+ "/SealinerRCL/childExpire.jsp");
								
					//}
				//}
				//console.log("setDataHaeder :: " + JSON.stringify(response));
			}
		}else{
		window.location.replace("http://"
					+ sessionStorage.getItem("urlchildExpire")
					+ "/SealinerRCL/childExpire.jsp");
	}
</script>
