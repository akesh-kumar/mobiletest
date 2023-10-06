
<div id="editUserDialog" tabindex="-1" role="dialog"
	style="display:none;height: auto; width: 60%; top: 20%; left: 10%;"
	class="ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-dialog-buttons ui-draggable"
	aria-describedby="t99Lookup-dlg">
	<div
		class="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle">
		<span class="ui-dialog-title">Edit User Role assingment</span>
		<button type="button"
			class="ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close"
			title="Close" onclick="cancelBrowser()">
			<span class="ui-button-icon ui-icon ui-icon-closethick"></span> <span
				class="ui-button-icon-space"> </span>Close
		</button>
	</div>
	<div id="t78Lookup-dlg" class="ui-dialog-content ui-widget-content"
		style="width: auto; min-height: 63px; max-height: none; height: auto; overflow: hidden;">
		 
		<div style="margin:10px;">
			<div class="row">

			<div class="col-md-12 outerDiv" style="margin-left:2%">
				<div class="leftDiv">
					 
					<div class="row">
						<div class="col-2"></div>
						<div class="col-8">  
							 

							<div class="form-group row mb-0">
								<label class="col-sm-6 col-form-label">Login Id</label>
								 <rcl:text id="s0-loginIdEdit"  classes="div(col-sm-6)" check="len(10) upc" />
								
							</div>
							
							<div class="form-group row mb-0">
								<label class="col-sm-6 col-form-label">User Name</label>
								 <rcl:text id="s0-userName"  classes="div(col-sm-6)" check="len(10) upc" />
								
							</div>

							<div class="form-group row mb-0">
								<label class="col-sm-6 col-form-label">Mobile</label>
								<rcl:text id="s0-mobileEdit" classes="div(col-sm-6)" check="len(10) upc" />

							</div>
							
							<div class="form-group row mb-0">
								<label class="col-sm-6 col-form-label">Email</label>
								<rcl:text id="s0-emailEdit" classes="div(col-sm-6)"
									check="len(10) upc" />

							</div>
							
							
							<div class="form-group row mb-0">
								<label class="col-sm-6 col-form-label">User Role</label>
								<rcl:select id="s0-roleEdit" label="" classes="div(col-sm-6)"	>
								 </rcl:select>

							</div>

							<div class="form-group row mb-0" id="locationAreaEdit"  >
								<label class="col-sm-6 col-form-label">Location</label>
								<rcl:select id="s0-locationEdit" label="" classes="div(col-sm-6)"
										optionsList="LocationUser LocationHead RegionHead SuperUser  " valueList="LocationUser LocationHead RegionHead SuperUser"
										defaultValue="LocationUser">
									</rcl:select>


							</div>
							
							<div class="form-group row mb-0" id="headLocationAreaEdit" style="display: none;" >
								
								 
								 
								 
							<div class="form-group row mb-0" style="width:100%;">
								<div class="col-sm-6 col-form-label">Location</div>
								 <div class="col-sm-6 col-form-label"> SaveLocation</div>
								

							</div>

							 
								<div class="form-group row mb-0">
									<div class=" col-sm-5" style="margin-left: 0%">
										 
									 <select multiple="multiple" id="s0-location-for-headEdit"  style="height:200px;width:100%;border:solid 1px blue;overflow:scroll;overflow-x:hidden;overflow-y:scroll;margin-top:5%;">						 
										<option>Select All Equipment </option>							 
										</select>
								 
									</div>
									
									<div class=" col-sm-2">
										<div style="margin-top:80px;">
										  <button onclick="moveEdit()" >>></button>
										  <button style="margin-top:10px;" onclick="removeEdit()">Remove </button>
										</div>
									</div>
									<div class=" col-sm-5">
										 
									 <select multiple="multiple" id="s0-location-for-headEditSave" name="selectRight"  classes="div(col-sm-6)"
										style="height:200px;width:100%;border:solid 1px blue;overflow:scroll;overflow-x:hidden;overflow-y:scroll;margin-top:5%;">						 
																 
										</select>
								 
									</div>
								</div>

							</div>

							<div class="form-group row mb-0" id="reionLocationAreaEdit" style="display: none;" >
								<label class="col-sm-6 col-form-label">Location</label>
								<rcl:select id="s0-location-regionEdit" label="" classes="div(col-sm-6)"
										optionsList="All&nbsp;Location" valueList="AllLocation"
										defaultValue="AllLocation">
									</rcl:select>

							</div>
							</div>
						<div class="col-2"></div>
					</div>

					 

				</div>
				

			</div>
		</div> 
			 
		</div>
	</div>
	
	<div
		class="ui-helper-clearfix" style="margin:10px;margin-left:40%;">
		 
		<button type="button" 	class="ui-button" 	title="Close" onclick="cancelEdit()">Close 	</button>
		<button type="button" class="ui-button" title="Close" onclick="createUserRequest('Edit')">Submit	</button>
	</div>
</div>
 <script>
	  	
	 	// onload code 
	 	
	 	$(document).ready(function() {
	 		
	 		loadEditRole();
	  						
		});
	 	
	 	function cancelEdit(){
			 
			$("#editUserDialog").hide();
			
		}
	 	
	 	function moveEdit(){
	 		var options="";
	 		var right=$("#s0-location-for-headEditSave").val();
	 		var left=$("#s0-location-for-headEdit").val()
	 		for(var i=0;i<left.length;i++){
	 				var flag =false
	 			for(var j=0;j<right.length;j++){
	 					if(left[i]==right[j]){
	 						flag=true;
	 						break;
	 					}
	 			}
	 			if(flag==false){
	 				options+="<option value='"+left[i]+"'>"+countryList[left[i]]+"</option>";
	 			}
	 		}
	 		$("#s0-location-for-headEditSave").append(options);
	 	}
	 	
	 	function removeEdit(){
	 		var options="";
	 		var all =$("#s0-location-for-headEditSave option");
	 		var selected=$("#s0-location-for-headEditSave").val();
	 		if(selected.length==0){
	 			return;
	 		}
	 		for(var i=0;i<all.length;i++){
	 			var flag =false
	 			var val=$(all[i]).val();
	 			for(var j=0;j<selected.length;j++){
	 					if(val==selected[j]){
	 						flag=true;
	 						break;
	 					}
	 			}
	 			if(flag==false){
	 				options+="<option value='"+val+"'>"+countryList[val]+"</option>";
	 			}
	 		}
	 		$("#s0-location-for-headEditSave").html(options);
	 	}
	 	function loadEditRole(){
	 		 
		 			
	 				$('#s0-roleEdit').change(function(val,e) {
	 					 //reionLocationArea
	 					 console.log(val,e)
	 					 
	 					 switch($('#s0-roleEdit').val()){
	 						 case "1":
		 						$("#headLocationAreaEdit").hide();
		 						$("#regionLocationAreaEdit").hide();
		 						$("#locationAreaEdit").show();
		 						break;
	 						 case "2":
	 							$("#reionLocationAreaEdit").hide();
		 						$("#locationAreaEdit").hide();	
		 						$("#headLocationAreaEdit").show();
		 						break;
	 						 case "3":  case "4":
		 							$("#reionLocationAreaEdit").show();
		 							$("#headLocationAreaEdit").hide();
			 						$("#locationAreaEdit").hide();		 						 
			 						break;
	 					 }
	 				});
	 				
	 	}
	 	 
	 	
	 	 
	 </script>