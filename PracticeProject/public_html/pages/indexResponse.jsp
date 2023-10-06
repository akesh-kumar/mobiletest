<%@page import="java.util.UUID"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "p" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Login or index response</title>
</head>
<body>


user infor <jsp:include page="header.jsp"></jsp:include><br>
------ all three ways from request attribute-----------
<%
UUID uid= (UUID)request.getAttribute("random");
out.print(uid);
%>
<br>

<c:out value="${random}"/> <br>${random }

-------------------------
<br>
${param.name }<%=request.getParameter("name") %>

<br>
------swtch

<c:if test="${param.name=='admin' }">

	Your are admin
	<script>
		alert('admin')
	</script>
	
	<form action="TestServlet">
		<input type="hidden" name="random" value="${random }">
		<input type="submit" />
	</form>
</c:if>

<c:if test="${param.name!='admin' }">

	Your are not admin
</c:if>

<c:set var="income" scope="session" value="${4000*4}"/>  
<p>Your income is : <c:out value="${income}"/></p>  
<p:choose>  
    <p:when test="${income <= 1000}">  
       <b>Income is not good.</b>  
    </p:when>  
    <p:when test="${income > 10000}">  
        Income is very good.  
    </p:when>  
    <p:otherwise>  
       Income is undetermined...  
    </p:otherwise>  
</p:choose>  
<br>
----------------------For each---------------
<select>
	<c:forEach items="${employees}" var="emp">
	<option>${emp.name}</option>
	</c:forEach>
</select>
<table>
	<thead>
		<th>Name</th>
		<th>age</th>
		<th>Sex</th>
	</thead>
<tbody>
<c:forEach items="${employees}" var="emp">
	<tr>
	${emp }
		<td>${emp.name}</td>
		<td>${emp.age}</td>
		<td>${emp.address}</td>
	</tr>
		
</c:forEach>
</tbody>
</table>
<a href="LogOutServlet">Logout</a>
</body>
</html>