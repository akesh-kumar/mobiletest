<!--
-------------------------------------------------------------------------------------------------------------  
RcmErrorPage.jsp
-------------------------------------------------------------------------------------------------------------  
Copyright RCL Public Co., Ltd. 2007
-------------------------------------------------------------------------------------------------------------  
Author: Piyapong Ieumwananonthachai 01/10/2007 
- Change Log ------------------------------------------------------------------------------------------------  
## DD/MM/YY -User-     -TaskRef-      -Short Description  
-------------------------------------------------------------------------------------------------------------  
-->

<%@page import="com.rclgroup.dolphin.blc.utils.Constants"%>
<%@ page contentType="text/html; charset=windows-874" language="java" import="java.io.StringWriter,java.io.PrintWriter,com.rclgroup.dolphin.web.common.*" %>
<%@ page isErrorPage="true" %>
<%
    response.setHeader("Cache-Control","no-cache");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader ("Expires", 0);

     
	
    StringWriter sw = new StringWriter();
    PrintWriter pw = new PrintWriter(sw);
    Exception e = (Exception)session.getAttribute("exception");
    if(e != null){
        exception = e;
    }
    exception.printStackTrace(pw);
    session.setAttribute("exception",null);
%>
<html>
<head>
<title>Error Page</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="<%=Constants.RCL_WEB_ROOT %>/css/sealiner.css">
<script>
function showError(){
    if(document.all("btnShowError").value==" + "){
        document.all("spnId").style.visibility="visible";
        document.all("btnShowError").value=" - ";
    }else{
        document.all("spnId").style.visibility="hidden";
        document.all("btnShowError").value=" + ";
    }
}
</script>
</head>

<body bgcolor="White">
<div align="center">
<table cellSpacing="0" cellPadding="10" width="700" border="0">
    <tr>
        <td width="100%" class="TableLeftWhite">
            <table height="264" cellSpacing="1" cellPadding="4" width="100%" bgColor="#7288ac" border="0">
                <tr>
                    <td class="TableLeftText" width="100%" colspan="3">
                        <p align="center">RCL web application has generated error. Click [+] to view the details</p>
                    </td>
                </tr>
                <tr>
                    <td class="TableLeftWhite" width="6%" height="95">
                        <font face="Arial, Helvetica, sans-serif" size="2">
                            <img src="<%=Constants.RCL_WEB_ROOT %>/images/imgError.gif">
                        </font>
                    </td>
                    <td class="TableLeftWhite" width="13%" height="95">
                        <b>
                            <font face="Arial, Helvetica, sans-serif" color="#000000" size="2">Error</font>
                        </b>
                    </td>
                    <td class="TableLeftWhite" width="81%" height="95">
                        <b>
                            <font color="red">
                                <input type="button" name="btnShowError" class="FormBtnClr" value=" + " onClick="showError()"><br>
                            </font>
                        </b>
                    </td>
                </tr>
                <tr>
                    <td class="TableLeftWhite" width="6%" height="31">
                    </td>
                    <td class="TableLeftWhite" width="13%" height="31">
                        <b>
                            <font face="Arial, Helvetica, sans-serif" color="#000000" size="2">
                                Error Details
                            </font>
                        </b>
                    </td>
                    <td class="TableLeftWhite" vAlign="top" align="left" width="81%" height="31">
                        <span id="spnId" style="visibility:hidden">
                            <%
                                out.print(sw);	
                                sw.close();
                                pw.close();
                            %>
                        </span>
                    </td>
                </tr>	
                <tr>
                    <td colspan="3" class="TableLeftWhite">
                        <p align="center">
                            <input type="button" value="Close" name="B45" class="FormBtnClr" onClick="window.close()">
                        </p>
                    </td>
                </tr>	
            </table>
        </td>
    </tr>
</table>
</div>
</body>
</html>
