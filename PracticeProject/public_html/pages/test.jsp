 <%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
 <c:set var="var1" value="zyz"/>
 
 ${var1} 
 <br>
 <c:out value="${ var1}"/>
 
  <jsp:include page="header.jsp"></jsp:include>
 ${sessionScope.income}
 