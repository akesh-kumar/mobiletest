<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

<form name="myForm" action="../FormSubmit.jsp" onSubmit="submitValues()" method="POST">
<label>UserName:</label>
<input type="text" name="userName" id="name"><br>
<label>Password</label>
<input type="password" name="password" id="password">
<input type="submit" value="submit">

</form>

</body>
</html>

<script>

function submitValues(){
	
	var name = $("#name").val();
	var password = $("#password").val();
	if(name == ''){
		alert("Enter firstName");
		}
	if(password == ''){
	alert("Enter password");
		}
}
</script>