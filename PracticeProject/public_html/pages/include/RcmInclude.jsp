<!--
-------------------------------------------------------------------------------------------------------------  
RcmInclude.jsp
-------------------------------------------------------------------------------------------------------------  
Copyright RCL Public Co., Ltd. 2007
-------------------------------------------------------------------------------------------------------------  
Author Piyapong Ieumwananonthachai 15/10/07
- Change Log ------------------------------------------------------------------------------------------------  
## DD/MM/YY -User-     -TaskRef-      -Short Description  
-------------------------------------------------------------------------------------------------------------  
-->
<meta http-equiv="X-UA-Compatible" content="IE=11" />

<%@ page language="java" contentType="text/html; charset=UTF-8" session="true" autoFlush ="true" errorPage="/pages/error/RcmErrorPage.jsp"%>
<%@page import = "com.rclgroup.dolphin.web.common.*"%>
<%@page import = "com.rclgroup.dolphin.web.util.*"%>
<%@page import = "com.rclgroup.dolphin.web.model.rcm.*"%>
<%
//Get URLs for this jsp file
final String sealinerPageURL = RcmConstant.SEALINER_PAGE_URL;
final String sealinerOraPageURL = RcmConstant.SEALINER_ORA_URL;

int errCode = 0;
String errMsg = ""; 
String msg = "";

response.setHeader("Cache-Control","no-cache"); // HTTP 1.1
response.setHeader("Pragma","no-cache"); // HTTP 1.0
response.setDateHeader ("Expires", 0); // prevent caching at the proxy server

//Begin: Check whether session is null or not, and whether userBean is null or not
if(session == null){ // Check if the session == null or expired, user should relogin.
    System.out.println("[RcmInclude.jsp]: A session is null.");
    response.sendRedirect(sealinerOraPageURL+"/childExpire.jsp");
}else if(session.getAttribute("userBean") == null){
    System.out.println("[RcmInclude.jsp]: A userBean in session is null.");
    response.sendRedirect(sealinerOraPageURL+"/childExpire.jsp");
}
//End: Check whether session is null or not, and whether custbean is null or not
//Begin: get userBean
RcmUserBean userBean = (RcmUserBean)session.getAttribute("userBean");
//End: get userBean

if(session.getAttribute("errMsg") != null){
    errMsg = ((String)session.getAttribute("errMsg")).trim();
}
session.removeAttribute("errMsg");
if(session.getAttribute("msg") != null){
    msg = ((String)session.getAttribute("msg")).trim();
}
session.removeAttribute("msg");	
if(errMsg.equals("")){
    errCode = 0;
}else{
    errCode = 1;
}
%>

<%--@include file="RcmgetUrl.jsp"--%>
<script type="text/javascript">
//GetUrl();
//var referrer = document.referrer;
//if()
var expiryUrl = "<%=sealinerOraPageURL%>/childExpire.jsp";
var unauthorizeUrl = "<%=sealinerOraPageURL%>/nonauthorized.jsp";
</script>
<!-- <script language="Javascript1.2" src="<%//jsURL%>/jquery.js"></script> -->
