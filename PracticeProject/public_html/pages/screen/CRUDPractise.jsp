<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>CRUD Practise</title>
</head>
<jsp:include page="../include/commonInclude.jsp"></jsp:include>
<jsp:include page='../include/header.jsp'>
	<jsp:param name="pageHeader" value="Sample Page" />
</jsp:include>
<body>
<div class="container">

<label>Name: </label>
<input type="text" class=col-md-3 name="name" id="name"><br><br>
<label>Phone No:</label>
<input type="number" class=col-md-3 name="phoneNo" id="phoneNo" ><br><br>
<label>Location: </label>
<input type="text" class=col-md-3 name="location" id="location"><br><br>
<button onclick="submitData()" class="btn btn-primary" >Submit</button>
</div>
</body>
</html>

<script>
function submitData(){
	// alert("data");
	var name= $("#name").val();
	var phoneNo = $("#phoneNo").val();
	var location = $("#location").val();

	sendData = {};
	sendData['name'] = name;
	sendData['phoneNo'] = phoneNo;
	sendData['location'] = location;

	var url = "/crud/saveData";

	sendPostRequest(url, sendData, function(data) {
		 debugger;	
		 var result = data[0];		
		 if(result == 1){
				alert('Data inserted successfully')
					}
	});
	
}
</script>