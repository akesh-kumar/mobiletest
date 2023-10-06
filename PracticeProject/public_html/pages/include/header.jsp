<!--
---------------------------------------------------------------------------------------------------------
header.jsp
---------------------------------------------------------------------------------------------------------
Copyright RCL Public Co., Ltd. 2009
---------------------------------------------------------------------------------------------------------
Author Thanapong Tienniem 08/10/2018
- Change Log---------------------------------------------------------------------------------------------
## 		DD/MM/YY 		-User- 		-TaskRef-       -ShortDescription
01		04/12/2018		Pichit						Restructure header file
---------------------------------------------------------------------------------------------------------
-->
<%@ taglib prefix="rcl" uri="/WEB-INF/custom.tld"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:set var="userData" value="${sessionScope.userData}" />
<c:set var="authData" value="${sessionScope.user.getAuthority(sessionScope.module)}" />

<%--
<c:set var="icons" value="${fn:length(param.icons) > 0 ? fn:split(param.icons, ',') : []}" />
<c:set var="labels" value="${fn:length(param.labels) > 0 ? fn:split(param.labels, ',') : []}" />
 --%>

<div id="h0-pageheader" class="rcl-standard-page-header container-fluid">
	<div class="row">
		<div class="col-sm-5">
			<label id="h0-title"><c:out value="${param.pageHeader}" /></label>
<!-- 			<label id="h0-title"></label> -->
		</div>
		<div id="h0-userData" class="col-sm-7" style="font-size:10px;text-align:right;">
 			<c:out value="${userDesc} (${userData.userId}) - ${userData.fscCode} - ${userData.line}/${userData.trade}/${userData.agent}" />
		</div>
	</div>
</div>

<div id="h1-pageheader" class="rcl-standard-page-header-2">
	<button id="h1-back" type="button" class="rcl-standard-button-header" onclick="backAccount()" style="display: none;" >
		<i class="fas fa-arrow-left"></i> Back
	</button>
	
	<button id="h1-save" type="button" class="rcl-standard-button-header" onclick="createUser()" style="display: none;" >
		<i class="far fa-save"></i> Save
	</button>
	
	<button id="h1-user" type="button" class="rcl-standard-button-header" onclick="createUser()" style="display: none;">
		<i class="far fa-user"></i> User Management
	</button>
	<button id="h1-help" type="button" class="rcl-standard-button-header"  onclick="help()">
		<i class="far fa-question-circle"></i> Help
	</button>
	<button id="h1-tool" type="button" class="rcl-standard-button-header"  onclick="rutToolMenue()">
		<i class="fas fa-toolbox"></i> Tool
	</button>
	<button id="h1-close" type="button" class="rcl-standard-button-header" onclick="onClickClose()">
		<i class="far fa-times-circle" style="color: red"></i> Close
	</button>
</div>

<div class="rcl-standard-version-header">
	<label id="h2-versionheader" style="margin-bottom: 0px;">V 1.0.2</label>
</div>

<div style="display:none;">
	<rcl:area id="h3-hidden">
		<input type="text" id="h3-userToken" class="dtlField" value="${userData.userToken}" />
		<input type="text" id="h3-userId" class="dtlField" value="${userData.userId}" />
		<input type="text" id="h3-line" class="dtlField" value="${userData.line}" />
		<input type="text" id="h3-trade" class="dtlField" value="${userData.trade}" />
		<input type="text" id="h3-agent" class="dtlField" value="${userData.agent}" />
		<input type="text" id="h3-fscCode" class="dtlField" value="${userData.fscCode}" />
	</rcl:area>
	
	<input type="text" id="publicToken" value="${publicToken}" />
	
</div>

<div style="display:none;">
	<rcl:area id="h4-hidden">	
		<input type="text" id="h4-menuId" class="dtlField" value="${authData.getMenuId()}" />
		<input type="text" id="h4-canCreate" class="dtlField" value="${authData.canCreate() == true ? 'Y' : 'N'}" />
		<input type="text" id="h4-canRead" class="dtlField" value="${authData.canRead() == true ? 'Y' : 'N'}" />
		<input type="text" id="h4-canUpdate" class="dtlField" value="${authData.canUpdate() == true ? 'Y' : 'N'}" />
		<input type="text" id="h4-canDelete" class="dtlField" value="${authData.canDelete() == true ? 'Y' : 'N'}" />
		<input type="text" id="h4-canView" class="dtlField" value="${authData.canView() == true ? 'Y' : 'N'}" />
	</rcl:area>
</div>

<script>
	function help(){
		var page=HELP_URL_Constant["${param.pageHeader}"];
		
		var url = window.location.protocol+"//"+location.hostname+':'+window.location.port+'/BLCWebApp/pages/help/index.htm#t=' + page;
		var rclp = new rutDialogFlow('2Tab' , url);
		rclp.openPage();
	}
</script>

