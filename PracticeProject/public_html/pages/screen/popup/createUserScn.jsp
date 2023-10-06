
<div id="bookingLookupLog" tabindex="-1" role="dialog"
	style="display:none;height: auto; width: 60%; top: 20%; left: 10%;"
	class="ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-dialog-buttons ui-draggable"
	aria-describedby="t99Lookup-dlg">
	<div
		class="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle">
		<span class="ui-dialog-title">User Role assingment</span>
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
								 <rcl:text id="s0-loginIdCreate" label="Location" classes="div(col-sm-6)" check="len(10) upc"
						 lookup="tbl(V_QUOTE_ESM_USER) rco(USER_ID) rid(s0-name) sop(LIKE)"/>
								
        
							</div>

							<div class="form-group row mb-0">
								<label class="col-sm-6 col-form-label">Mobile</label>
								<rcl:text id="s0-fsc" classes="div(col-sm-6)"
									check="len(10) upc" />

							</div>
							
							<div class="form-group row mb-0">
								<label class="col-sm-6 col-form-label">Email</label>
								<rcl:text id="s0-fsc" classes="div(col-sm-6)"
									check="len(10) upc" />

							</div>
							
							
							<div class="form-group row mb-0">
								<label class="col-sm-6 col-form-label">User Role</label>
								<rcl:select id="s0-roleCreate" label="" classes="div(col-sm-6)"	>
								 </rcl:select>

							</div>

							<div class="form-group row mb-0" id="locationArea"  >
								<label class="col-sm-6 col-form-label">Location</label>
								<rcl:select id="s0-location" label="" classes="div(col-sm-6)"
										optionsList="LocationUser LocationHead RegionHead SuperUser  " valueList="LocationUser LocationHead RegionHead SuperUser"
										defaultValue="LocationUser">
									</rcl:select>


							</div>
							
							<div class="form-group row mb-0" id="headLocationArea" style="display: none;" >
								<label class="col-sm-6 col-form-label">Location</label>
								<div class=" col-sm-6">
								 <select multiple="multiple" id="s0-location-for-headCreate" name="selectRight"  classes="div(col-sm-6)"
									style="height:200px;width:100%;border:solid 1px blue;overflow:scroll;overflow-x:hidden;overflow-y:scroll;margin-top:5%;">						 
									<option>Select All Equipment </option>							 
									</select>
							 
								</div>

							</div>

							<div class="form-group row mb-0" id="reionLocationArea" style="display: none;" >
								<label class="col-sm-6 col-form-label">Location</label>
								<rcl:select id="s0-location-regionCreate" label="" classes="div(col-sm-6)"
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
		 
		<button type="button" 	class="ui-button" 	title="Close" onclick="cancelBrowser()">Close 	</button>
		<button type="button" class="ui-button" title="Close" onclick="createUserRequest('create')">Submit	</button>
	</div>
</div>
 <script>
	 
	 	var countryList={"PR":"PUERTO RICO","PT":"PORTUGAL","PW":"PALAU","PY":"PARAGUAY","QA":"QATAR","AD":"ANDORRA","AE":"UNITED ARAB EMIRATES","AF":"AFGHANISTAN","AG":"ANTIGUA AND BARBUDA","AI":"ANGUILLA","AL":"ALBANIA","AM":"ARMENIA","AN":"NETHERLANDS ANTILLES","AO":"ANGOLA","AQ":"ANTARCTICA","AR":"ARGENTINA","AS":"AMERICAN SAMOA","RE":"REUNION","AT":"AUSTRIA","AU":"AUSTRALIA","AW":"ARUBA","AZ":"AZERBAIJAN","RO":"ROMANIA","BA":"BOSNIA  AND HERZEGOVINA","BB":"BARBADOS","RS":"SERBIA","BD":"BANGLADESH","RU":"RUSSIAN FEDERATION","BE":"BELGIUM","BF":"BURKINA FASO","RW":"RWANDA","BG":"BULGARIA","BH":"BAHRAIN","BI":"BURUNDI","BJ":"BENIN","BM":"BERMUDA","BN":"BRUNEI DARUSSALAM","BO":"BOLIVIA","SA":"SAUDI ARABIA","SB":"SOLOMON ISLANDS","SC":"SEYCHELLES","BR":"BRAZIL","SD":"SUDAN","BS":"BAHAMAS","SE":"SWEDEN","BT":"BHUTAN","SG":"SINGAPORE","SH":"SAINT HELENA","BW":"BOTSWANA","SI":"SLOVENIA","SJ":"SVALBARD AND JAN MAYEN","BY":"BELARUS","SK":"SLOVAKIA","BZ":"BELIZE","SL":"SIERRA-LEONE","SM":"SAN MARINO","SN":"SENEGAL","SO":"SOMALIA","CA":"CANADA","SR":"SURINAME","CC":"COCOS ISLANDS","ST":"SAO TOME AND PRINCIPE","CD":"CONGO DEMOCRATIC REPUBLIC","CF":"CENTRAL AFRICAN REPUBLIC","SV":"EL SALVADOR","CG":"CONGO","CH":"SWITZERLAND","SY":"SYRIA","CI":"COTE DIVOIRE","SZ":"SWAZILAND","CK":"COOK ISLANDS","CL":"CHILE","CM":"CAMEROON","CN":"CHINA","CO":"COLOMBIA","CR":"COSTA RICA","TC":"TURKS AND CAICOS ISLANDS","CS":"SERBIA AND MONTENEGRO","TD":"CHAD","CU":"CUBA","TF":"FRENCH SOUTHERN TER","CV":"CAPE VERDE","TG":"TOGO","TH":"THAILAND","CX":"CHRISTMAS ISLAND","TJ":"TAJIKISTAN","CY":"CYPRUS","CZ":"CZECH REPUBLIC","TK":"TOKELAU","TL":"TIMOR LESTE","TM":"TURKMENISTAN","TN":"TUNISIA","TO":"TONGA","TR":"TURKEY","TT":"TRINIDAD AND TOBAGO","DE":"GERMANY","TV":"TUVALU","TW":"TAIWAN","TZ":"TANZANIA","DJ":"DJIBOUTI","DK":"DENMARK","DM":"DOMINICA","DO":"DOMINICAN REPUBLIC","UA":"UKRAINE","UG":"UGANDA","DZ":"ALGERIA","UM":"US MINOR OUTLYING ISLANDS","US":"UNITED STATES OF AMERICA","EC":"ECUADOR","EE":"ESTONIA","EG":"EGYPT","EH":"WESTERN SAHARA","UY":"URUGUAY","UZ":"UZBEKISTAN","ER":"ERITREA","VC":"ST VINCENT AND GRENADINES","ES":"SPAIN","ET":"ETHIOPIA","VE":"VENEZUELA","VG":"VIRGIN ISLANDS BRITISH","VI":"VIRGIN ISLANDS US","VN":"VIETNAM","VU":"VANUATU","FI":"FINLAND","FJ":"FIJI","FK":"FALKLAND ISLANDS","FM":"MICRONESIA","FO":"FAROE ISLANDS","FR":"FRANCE","WF":"WALLIS AND FUTUNA","GA":"GABON","GB":"UNITED KINGDOM","WS":"SAMOA","GD":"GRENADA","GE":"GEORGIA","GF":"FRENCH GUIANA","GG":"GUERNSEY","GH":"GHANA","GI":"GIBRALTAR","GL":"GREENLAND","GM":"GAMBIA","GN":"GUINEA","GP":"GUADELOUPE","GQ":"EQUATORIAL GUINEA","GR":"GREECE","GS":"SOUTH GEORGIA","GT":"GUATEMALA","GU":"GUAM","GW":"GUINEA-BISSAU","GY":"GUYANA","HK":"HONGKONG","HM":"HEARD ISLAND","HN":"HONDURAS","HR":"CROATIA","HT":"HAITI","YE":"YEMEN","HU":"HUNGARY","ID":"INDONESIA","YT":"MAYOTTE","IE":"IRELAND","IL":"ISRAEL","IM":"ISLE OF MAN","IN":"INDIA","IO":"BRITISH INDIAN OCEAN TERR","ZA":"SOUTH AFRICA","IQ":"IRAQ","IR":"ISLAMIC REPUBLIC OF IRAN","IS":"ICELAND","IT":"ITALY","ZM":"ZAMBIA","JE":"JERSEY","ZW":"ZIMBABWE","JM":"JAMAICA","JO":"JORDAN","JP":"JAPAN","KE":"KENYA","KG":"KYRGYZSTAN","KH":"CAMBODIA","KI":"KIRIBATI","KM":"COMOROS","KN":"SAINT KITTS AND NEVIS","KP":"KOREA PEOPLES REPUBLIC","KR":"KOREA","KW":"KUWAIT","KY":"CAYMAN ISLANDS","KZ":"KAZAKHSTAN","LA":"LAO PEOPLE`S DEMOCRATIC R","LB":"LEBANON","LC":"SAINT LUCIA","LI":"LIECHTENSTEIN","LK":"SRI LANKA","LR":"LIBERIA","LS":"LESOTHO","LT":"LITHUANIA","LU":"LUXEMBOURG","LV":"LATVIA","LY":"LIBYAN","MA":"Morocco","MC":"MONACO","MD":"MOLDOVA","ME":"MONTENEGRO","MG":"MADAGASCAR","MH":"MARSHALL ISLANDS","MK":"MACEDONIA","ML":"MALI","MM":"MYANMAR","MN":"MONGOLIA","MO":"MACAO","MP":"NORTHERN MARIANA ISLANDS","MQ":"MARTINIQUE","MR":"MAURITANIA","MS":"MONTSERRAT","MT":"MALTA","MU":"MAURITIUS","MV":"MALDIVES","MW":"MALAWI","MX":"MEXICO","MY":"MALAYSIA","MZ":"MOZAMBIQUE","NA":"NAMIBIA","NC":"NEW CALEDONIA","NE":"NIGER","NF":"NORFOLK ISLAND","NG":"NIGERIA","NI":"NICARAGUA","NL":"NETHERLANDS","NO":"NORWAY","NP":"NEPAL","NR":"NAURU","NU":"NIUE","NZ":"NEW ZEALAND","OM":"OMAN","PA":"PANAMA","PE":"PERU","PF":"FRENCH POLYNESIA","PG":"PAPUA NEW GUINEA","PH":"PHILIPPINES","PK":"PAKISTAN","PL":"POLAND","PM":"SAINT PIERRE AND MIQUELON","PN":"PITCAIRN"};
	 	
	 	// onload code 
	 	
	 	$(document).ready(function() {
	 		
	 		 
	 		loadCounty();
	 		loadRole();
							
		});
	 	
	 	function cancelBrowser(){
			 
			$("#bookingLookupLog").hide();
			$("#editUserDialog").hide();
			
		}
	 	function loadRole(){
	 		 
				
					var options="<option value='-1'>Select Role</option>";
					options+="<option value='1'>Location User</option>";
	 				options+="<option value='2'>Location Head</option>";
	 				options+="<option value='3'>Region Head</option>";
	 				options+="<option value='4'>SuperUser</option>";
	 				$("#s0-roleCreate").html(options);	
	 				$("#s0-roleSearch").html(options);	
	 				$("#s0-roleEdit").html(options);	
	 				
	 				$('#s0-roleCreate').change(function(val,e) {
	 					 //reionLocationArea
	 					 console.log(val,e)
	 					 
	 					 switch($('#s0-roleCreate').val()){
	 						 case "1":
		 						$("#headLocationArea").hide();
		 						$("#regionLocationArea").hide();
		 						$("#locationArea").show();
		 						break;
	 						 case "2":
	 							$("#reionLocationArea").hide();
		 						$("#locationArea").hide();	
		 						$("#headLocationArea").show();
		 						break;
	 						 case "3":  case "4":
		 							$("#reionLocationArea").show();
		 							$("#headLocationArea").hide();
			 						$("#locationArea").hide();		 						 
			 						break;
	 					 }
	 				});
	 				
	 	}
	 	
	 	function loadCounty(){
	 		
	 		var options="<option value='-1'>Select Country</option>";
	 		for(var  key in countryList){
	 			options+="<option value='"+key+"'>"+countryList[key]+"</option>"
	 		}
	 		$("#s0-location").html(options);
	 		$("#s0-locationEdit").html(options);
	 		$("#s0-location-for-headCreate").html(options);
	 		$("#s0-location-for-headEdit").html(options);
	 		$("#s0-location-regionCreate").html("<option value='1'>All Location</option>");
	 		$("#s0-location-regionEdit").html("<option value='1'>All Location</option>");
	 		
	 		
	 	}
	 	
	 	function createUserRequest(type) {
			rptClearDisplay('t0-area');
			rptAddData('t0-area', []);
			var url = "/user/createUserData";
			if(type=='Edit'){
				 url = "/user/update";
			}
			var proprty="";
			 switch($('#s0-role'+type).val()){
				 case "1":
					 proprty=$("#s0-location"+type).val();
					 if(proprty=="-1"){
							rutOpenMessageBox("Message","Please Select Locaton", null,null, '');
							return;
					 }
					break;
				 case "2":
					 proprty=$("#s0-location-for-head"+type).val().join(",")
					 if(proprty.length==0){
							rutOpenMessageBox("Message","Please Select Locaton", null,null, '');
							return;
					 }
					break;
				 case "3":  case "4":
					 proprty=1;
						break;
			 }
			 if($("#s0-loginId"+type).val()==""){
					rutOpenMessageBox("Message","Please enter user id", null,null, '');
					return;
			 }
			var sendData = getDataAreaToObject("s0-header");
			sendData["userId"]=$("#s0-loginId"+type).val();			 
			sendData["propertyName"]=proprty;
			sendData["toDate"]=$("#s0-fromDate").val();
			sendData["roleId"]=$("#s0-role"+type).val();
			
			settingTable('t0-area');
			sendPostRequest(url, sendData, function(data) {
				rutOpenMessageBox("Sucess","Role has been assing", null,null, '');
				$("#bookingLookupLog").hide();
				find();
	    	      
			})
		}
	 </script>