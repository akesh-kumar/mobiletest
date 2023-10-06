<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Procedure Practise</title>
</head>
<jsp:include page="../include/commonInclude.jsp"></jsp:include>
<jsp:include page='../include/header.jsp'>
	<jsp:param name="pageHeader" value="Sample Page" />
</jsp:include>
<body>
<div class="container">
<h3>Insert Data Here</h3>
<label>Name: </label>
<input type="text" class=col-md-3 name="studentName" id="studentName"><br><br>
<label>Subject1 Marks:</label>
<input type="number" class=col-md-3 name="sub1Marks" id="sub1Marks" ><br><br>
<label>Subject2 Marks:</label>
<input type="number" class=col-md-3 name="sub2Marks" id="sub2Marks" ><br><br>
<label>Subject3 Marks:</label>
<input type="number" class=col-md-3 name="sub3Marks" id="sub3Marks" ><br><br>
<button onclick="submitData()" class="btn btn-primary" >Submit</button>
</div>

<div class="container">
<h3>Update Data Here</h3>
<label>Student Id: </label>
<input type="number" class=col-md-3 name="studentId" id="studentId"><br><br>
<label>Subject1 Marks:</label>
<input type="number" class=col-md-3 name="sub1Marks" id="sub1Marks1" ><br><br>
<label>Subject2 Marks:</label>
<input type="number" class=col-md-3 name="sub2Marks" id="sub2Marks1" ><br><br>
<label>Subject3 Marks:</label>
<input type="number" class=col-md-3 name="sub3Marks" id="sub3Marks1" ><br><br>
<button onclick="updateData()" class="btn btn-primary" >Update</button>
</div>
</body>
</html>

<script>
function submitData(){
	debugger;
	var studentName= $("#studentName").val();
	var sub1Marks = $("#sub1Marks").val();
	var sub2Marks = $("#sub2Marks").val();
	var sub3Marks = $("#sub3Marks").val();

	sendData = {};
	sendData['studentName'] = studentName;
	sendData['sub1Marks'] = sub1Marks;
	sendData['sub2Marks'] = sub2Marks;
	sendData['sub3Marks'] = sub3Marks;

	var url = "/student/insertData";

	sendPostRequest(url, sendData, function(data) {
		 debugger;	
		 var result = data[0];		
		 if(result == 1){
				alert('Data inserted successfully')
					}
	});
	
}

function updateData(){
	debugger;
	var studentId= $("#studentId").val();
	var sub1Marks = $("#sub1Marks1").val();
	var sub2Marks = $("#sub2Marks1").val();
	var sub3Marks = $("#sub3Marks1").val();

	sendData = {};
	sendData['studentId'] = studentId;
	sendData['sub1Marks'] = sub1Marks;
	sendData['sub2Marks'] = sub2Marks;
	sendData['sub3Marks'] = sub3Marks;

	var url = "/student/updateData";

	sendPostRequest(url, sendData, function(data) {
		 debugger;	
		 var result = data[0];		
		 if(result == 1){
				alert('Data updated successfully')
					}
			if(result == 0){
				alert('there is no record with this ID');
						}
	});
	
}
</script>