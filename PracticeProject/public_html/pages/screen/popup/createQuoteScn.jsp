
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>

<%@ taglib prefix="rcl" uri="/WEB-INF/custom.tld"%>
<div id="createQuoteLookupLog" tabindex="-1" role="dialog"
	style="display:none;height: auto; width: 50%; top: 20%; left: 10%;"
	class="ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-dialog-buttons ui-draggable"
	aria-describedby="t99Lookup-dlg">
	<div
		class="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle">
		<span class="ui-dialog-title">Create Quote</span>
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
								<label class="col-sm-6 col-form-label">From Port of Landing</label>
								 <rcl:select id="s0-polCreate" label="" classes="div(col-sm-6)"	>
								 </rcl:select>
								
        
							</div>

							<div class="form-group row mb-0">
								<label class="col-sm-6 col-form-label">To Port of Landing</label>
								 <rcl:select id="s0-podCreate" label="" classes="div(col-sm-6)"	>
								 </rcl:select>
								

							</div>
							<div class="form-group row mb-0">
								<label class="col-sm-6 col-form-label">Shipper</label>
								<rcl:text id="s0-shipperCreate" classes="div(col-sm-6)"
									check="len(10) upc" />

							</div>
							
							
							<div class="form-group row mb-0">
								<label class="col-sm-6 col-form-label">Vessel</label>
								 <rcl:text id="s0-vesselCreate" label="" classes="div(col-sm-6)"
				check="len(5) upc"
				lookup="tbl(VRL_VESSEL)
						rco(CODE)
						rid(s0-vessel)
						sco(CODE*main)
						sva(s0-vessel)
						sop(LIKE)" />

							</div>

							<div class="form-group row mb-0"   >
								<label class="col-sm-6 col-form-label">Voyage</label>
								 <rcl:text id="s0-voyageCreate" label="" classes="div(col-sm-6)"
				check="len(10) upc" icon="fa-search"
				iconClick="lookupVoyage()"/>
							</div>
							
							
							<div class="form-group row mb-0"   >
								<label class="col-sm-6 col-form-label">Weekly volume</label>
								 <rcl:text id="s0-weeklyVolumeCreate" label="" classes="div(col-sm-6)" />		 


							</div>
							
							<div class="form-group row mb-0"   >
								<label class="col-sm-6 col-form-label">Dest  F/T</label>
								 <rcl:text id="s0-freeTimeCreate" label="" classes="div(col-sm-6)" />						 


							</div>
							
							
							<div class="form-group row mb-0"   >
								<label class="col-sm-6 col-form-label">Target Rate</label>
								 <rcl:text id="s0-targetRateCreate" label="" classes="div(col-sm-6)" />						 


							</div>
							
							<div class="form-group row mb-0"   >
								<label class="col-sm-6 col-form-label">Target  etd </label>
								 <rcl:date id="s0-targetEtdCreate" label="" classes="div(col-sm-6)" />						 


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
		<button type="button" class="ui-button" title="Close" onclick="createUserRequest('Create')">Submit	</button>
	</div>
</div>
 <script>
	 
	 	var countryList={"PR":"PUERTO RICO","PT":"PORTUGAL","PW":"PALAU","PY":"PARAGUAY","QA":"QATAR","AD":"ANDORRA","AE":"UNITED ARAB EMIRATES","AF":"AFGHANISTAN","AG":"ANTIGUA AND BARBUDA","AI":"ANGUILLA","AL":"ALBANIA","AM":"ARMENIA","AN":"NETHERLANDS ANTILLES","AO":"ANGOLA","AQ":"ANTARCTICA","AR":"ARGENTINA","AS":"AMERICAN SAMOA","RE":"REUNION","AT":"AUSTRIA","AU":"AUSTRALIA","AW":"ARUBA","AZ":"AZERBAIJAN","RO":"ROMANIA","BA":"BOSNIA  AND HERZEGOVINA","BB":"BARBADOS","RS":"SERBIA","BD":"BANGLADESH","RU":"RUSSIAN FEDERATION","BE":"BELGIUM","BF":"BURKINA FASO","RW":"RWANDA","BG":"BULGARIA","BH":"BAHRAIN","BI":"BURUNDI","BJ":"BENIN","BM":"BERMUDA","BN":"BRUNEI DARUSSALAM","BO":"BOLIVIA","SA":"SAUDI ARABIA","SB":"SOLOMON ISLANDS","SC":"SEYCHELLES","BR":"BRAZIL","SD":"SUDAN","BS":"BAHAMAS","SE":"SWEDEN","BT":"BHUTAN","SG":"SINGAPORE","SH":"SAINT HELENA","BW":"BOTSWANA","SI":"SLOVENIA","SJ":"SVALBARD AND JAN MAYEN","BY":"BELARUS","SK":"SLOVAKIA","BZ":"BELIZE","SL":"SIERRA-LEONE","SM":"SAN MARINO","SN":"SENEGAL","SO":"SOMALIA","CA":"CANADA","SR":"SURINAME","CC":"COCOS ISLANDS","ST":"SAO TOME AND PRINCIPE","CD":"CONGO DEMOCRATIC REPUBLIC","CF":"CENTRAL AFRICAN REPUBLIC","SV":"EL SALVADOR","CG":"CONGO","CH":"SWITZERLAND","SY":"SYRIA","CI":"COTE DIVOIRE","SZ":"SWAZILAND","CK":"COOK ISLANDS","CL":"CHILE","CM":"CAMEROON","CN":"CHINA","CO":"COLOMBIA","CR":"COSTA RICA","TC":"TURKS AND CAICOS ISLANDS","CS":"SERBIA AND MONTENEGRO","TD":"CHAD","CU":"CUBA","TF":"FRENCH SOUTHERN TER","CV":"CAPE VERDE","TG":"TOGO","TH":"THAILAND","CX":"CHRISTMAS ISLAND","TJ":"TAJIKISTAN","CY":"CYPRUS","CZ":"CZECH REPUBLIC","TK":"TOKELAU","TL":"TIMOR LESTE","TM":"TURKMENISTAN","TN":"TUNISIA","TO":"TONGA","TR":"TURKEY","TT":"TRINIDAD AND TOBAGO","DE":"GERMANY","TV":"TUVALU","TW":"TAIWAN","TZ":"TANZANIA","DJ":"DJIBOUTI","DK":"DENMARK","DM":"DOMINICA","DO":"DOMINICAN REPUBLIC","UA":"UKRAINE","UG":"UGANDA","DZ":"ALGERIA","UM":"US MINOR OUTLYING ISLANDS","US":"UNITED STATES OF AMERICA","EC":"ECUADOR","EE":"ESTONIA","EG":"EGYPT","EH":"WESTERN SAHARA","UY":"URUGUAY","UZ":"UZBEKISTAN","ER":"ERITREA","VC":"ST VINCENT AND GRENADINES","ES":"SPAIN","ET":"ETHIOPIA","VE":"VENEZUELA","VG":"VIRGIN ISLANDS BRITISH","VI":"VIRGIN ISLANDS US","VN":"VIETNAM","VU":"VANUATU","FI":"FINLAND","FJ":"FIJI","FK":"FALKLAND ISLANDS","FM":"MICRONESIA","FO":"FAROE ISLANDS","FR":"FRANCE","WF":"WALLIS AND FUTUNA","GA":"GABON","GB":"UNITED KINGDOM","WS":"SAMOA","GD":"GRENADA","GE":"GEORGIA","GF":"FRENCH GUIANA","GG":"GUERNSEY","GH":"GHANA","GI":"GIBRALTAR","GL":"GREENLAND","GM":"GAMBIA","GN":"GUINEA","GP":"GUADELOUPE","GQ":"EQUATORIAL GUINEA","GR":"GREECE","GS":"SOUTH GEORGIA","GT":"GUATEMALA","GU":"GUAM","GW":"GUINEA-BISSAU","GY":"GUYANA","HK":"HONGKONG","HM":"HEARD ISLAND","HN":"HONDURAS","HR":"CROATIA","HT":"HAITI","YE":"YEMEN","HU":"HUNGARY","ID":"INDONESIA","YT":"MAYOTTE","IE":"IRELAND","IL":"ISRAEL","IM":"ISLE OF MAN","IN":"INDIA","IO":"BRITISH INDIAN OCEAN TERR","ZA":"SOUTH AFRICA","IQ":"IRAQ","IR":"ISLAMIC REPUBLIC OF IRAN","IS":"ICELAND","IT":"ITALY","ZM":"ZAMBIA","JE":"JERSEY","ZW":"ZIMBABWE","JM":"JAMAICA","JO":"JORDAN","JP":"JAPAN","KE":"KENYA","KG":"KYRGYZSTAN","KH":"CAMBODIA","KI":"KIRIBATI","KM":"COMOROS","KN":"SAINT KITTS AND NEVIS","KP":"KOREA PEOPLES REPUBLIC","KR":"KOREA","KW":"KUWAIT","KY":"CAYMAN ISLANDS","KZ":"KAZAKHSTAN","LA":"LAO PEOPLE`S DEMOCRATIC R","LB":"LEBANON","LC":"SAINT LUCIA","LI":"LIECHTENSTEIN","LK":"SRI LANKA","LR":"LIBERIA","LS":"LESOTHO","LT":"LITHUANIA","LU":"LUXEMBOURG","LV":"LATVIA","LY":"LIBYAN","MA":"Morocco","MC":"MONACO","MD":"MOLDOVA","ME":"MONTENEGRO","MG":"MADAGASCAR","MH":"MARSHALL ISLANDS","MK":"MACEDONIA","ML":"MALI","MM":"MYANMAR","MN":"MONGOLIA","MO":"MACAO","MP":"NORTHERN MARIANA ISLANDS","MQ":"MARTINIQUE","MR":"MAURITANIA","MS":"MONTSERRAT","MT":"MALTA","MU":"MAURITIUS","MV":"MALDIVES","MW":"MALAWI","MX":"MEXICO","MY":"MALAYSIA","MZ":"MOZAMBIQUE","NA":"NAMIBIA","NC":"NEW CALEDONIA","NE":"NIGER","NF":"NORFOLK ISLAND","NG":"NIGERIA","NI":"NICARAGUA","NL":"NETHERLANDS","NO":"NORWAY","NP":"NEPAL","NR":"NAURU","NU":"NIUE","NZ":"NEW ZEALAND","OM":"OMAN","PA":"PANAMA","PE":"PERU","PF":"FRENCH POLYNESIA","PG":"PAPUA NEW GUINEA","PH":"PHILIPPINES","PK":"PAKISTAN","PL":"POLAND","PM":"SAINT PIERRE AND MIQUELON","PN":"PITCAIRN"};
	 	var podList={"CNAQG":"ANQING","THBKK":"BANGKOK","IDBLW":"BELAWAN","KRPUS":"BUSAN","VNCMT":"CAI MEP","INMAA":"CHENNAI","INCOK":"COCHIN","LKCMB":"COLOMBO","CNDCB":"DA CHAN BAY","CNDLC":"DALIAN","PHDCT":"DAVAO, MINDANAO","CNDGG":"DONGGUAN","JPFKY":"FUKUYAMA","PHGES":"GENERAL SANTOS","VNHPH":"HAIPHONG","INHZR":"HAZIRA PORT","JPHIJ":"HIROSHIMA","VNSGN":"HO CHI MINH CITY","HKHKG":"HONG KONG","JPHSM":"HOSOSHIMA","CNHUA":"HUANGPU","JPIMI":"IMARI","KRICH":"INCHEON","IDJKT":"JAKARTA","AEDXB":"JEBEL ALI, U.A.E","CNJMN":"JIANGMEN","JPKNZ":"KANAZAWA","PKKHI":"KARACHI","INKAT":"KATTUPALLI","TWKEL":"KEELUNG","AEKLF":"KHOR AL FAKKAN","INCCU":"KOLKATA (EX CALCUTTA)","INKRI":"KRISHNAPATNAM","THLCH":"LAEM CHABANG","JPMAI":"MAIZURU","MVMAL":"MALE","PHMNL":"MANILA","JPMKX":"MISHIMA KAWANOE","JPMIZ":"MIZUSHIMA","INMUN":"MUNDRA","CNNAH":"NANHAI","CNNSA":"NANSHA","INNSA":"NHAVA SHEVA","JPKIJ":"NIIGATA","CNNGB":"NINGBO","JPOIT":"OITA","JPOTR":"OTARU","IDPLM":"PALEMBANG","IDPNJ":"PANJANG","INPPT":"PARADIP","MYPGU":"PASIR GUDANG  JOHOR","MYPEN":"PENANG","KHPNH":"PHNOM PENH PORT","INPAV":"PIPAVAV PORT","MYPKG":"PORT KLANG","PKQCT":"QASIM","CNTAO":"QINGDAO","CNQZH":"QINZHOU","JPSMN":"SAKAIMINATO","CNSHA":"SHANGHAI","CNSWA":"SHANTOU","CNSHK":"SHEKOU","JPSBS":"SHIBUSHI","CNSUD":"SHUNDE","KHKOS":"SIHANOUKVILLE","SGSIN":"SINGAPORE","OMSOH":"SOHAR","THSGZ":"SONGKHLA","PHSFS":"SUBIC BAY","IDSUB":"SURABAYA","TWTXG":"TAICHUNG","CNTXG":"TIANJIN XINGANG","JPTOY":"TOYAMA","INTUT":"TUTICORIN","INVTZ":"VISAKHAPATNAM","CNWNZ":"WENZHOU","CNWUH":"WUHAN","CNWHI":"WUHU","CNXMN":"XIAMEN","MMRGN":"YANGON","CNYTN":"YANTIAN","CNZHA":"ZHANJIANG","CNZSN":"ZHONGSHAN"};
	 	
	 	getDisplayCountry=function(code){
	 		 
	 		//console.log(code)
	 		
	 		return polName[code]+" ,"+countryName[code.substring(0,2)];
	 	}
	 	
	 	function lookupVoyage(){
			var rowData = rptGetDataFromSingleArea("s0-header");
			var rco = "SERVICE VESSEL VOYAGE HIDE_DIRECTION";
			var rid = "s0-service s0-vessel s0-voyage s0-direction";
			var sco = "VOYAGE";
			var sva = "s0-voyage";
			var sop = "LIKE";
			if(rowData.service){
				sco += " SERVICE";
				sva += " s0-service";
				sop += " =";
			}
			if(rowData.vessel){
				sco += " VESSEL";
				sva += " s0-vessel";
				sop += " =";
			}

			rutOpenLookupTable('VRL_BKG_BOOKING_CTR_SERV', rco, rid, sco.trim(), sva.trim(), sop.trim(), "Service/Vessel/Voyage/Direction Lookup");
		}
	 	// onload code 
	 	
	 	$(document).ready(function() {
	 		
	 		 
	 		loadPort();
	 		 
							
		});
	 	
	 	function cancelBrowser(){
			 
			$("#createQuoteLookupLog").hide();
			 
			
		}
	 	 
	 	
	 	function loadPort(){
	 		
	 		var options="<option value='-1'>Select Port</option>";
	 		for(var  key in podList){
	 			options+="<option value='"+key+"'>"+key+"</option>"
	 		}
	 		$("#s0-polCreate").html(options);
	 		$("#s0-pol").html(options);
            $("#s0-podCreate").html(options);
	 		$("#s0-pod").html(options);
	 	}
	 	
	 	function createUserRequest() {
			rptClearDisplay('t0-area');
			rptAddData('t0-area', []);
			var url = "/quote/create";
			
			var proprty="";
			 
			var sendData ={};
			sendData["pod"]=$("#s0-podCreate").val();
			sendData["pol"]=$("s0-polCreate").val();
			sendData["shipper"]=$("s0-shipperCreate").val();
			sendData["vessel"]=$("#s0-vesselCreate").val();
			sendData["voyage"]=$("#s0-voyageCreate").val();
			sendData["weeklyVolume"]=$("#s0-weeklyVolumeCreate").val();
			sendData["freeTime"]=$("#s0-freeTimeCreate").val();
			sendData["targetRate"]=$("#targetRateCreate").val();
			sendData["targetEtd"]=$("#s0-targetEtdCreate").val();
			  		 
		 	 
			
			sendPostRequest(url, sendData, function(data) {
				rutOpenMessageBox("Sucess","Role has been assing", null,null, '');
				$("#bookingLookupLog").hide();
				find();
	    	      
			})
		}
	 </script>