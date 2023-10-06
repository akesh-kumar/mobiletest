/*-----------------------------------------------------------------------------------------------------------
rutUtilities.js

-------------------------------------------------------------------------------------------------------------
Copyright RCL Public Co., Ltd. 2018
-------------------------------------------------------------------------------------------------------------
Author Ascan Heydorn 13/08/2018
- Change Log ------------------------------------------------------------------------------------------------
## DD/MM/YY -User-     -TaskRef-  -Short Description
01 29/08/2018 aschey1             Initial PoC
02 19/09/2018 aschey1  #02        Added support for radio button groups
03 02/10/2018 aschey1  #03        Added rutCheckArea
04 04/10/2018 aschey1  #04        Added fieldcheck and initializiation
05 09/10/2018 aschey1  #05        In lookup search field pressing the enter key starts search
06 09/10/2018 aschey1  #06        input type date not recognized in this.type, requires this.getAttribute('type')
07 10/10/2018 aschey1  #07        improved styling of buttons
08 12/10/2018 aschey1             fixed setting text-transform style during initArea
09 13/10/2018 aschey1             added rutOpen/CloseDialog
10 20/10/2018 aschey1             added rptSaveAsCsv to rutOpenLookup, improved rutLookup
11 20/10/2018 aschey1             create rutCheckCodeQuality
12 24/10/2018 aschey1             fixed typo tele in rut getElementValue, fixed undefined display,
13 24/10/2018 aschey1             initArea does not handle tel fields, which had been number fields in Chrome
14 26/10/2018 aschey1             implemented number format setting also for setElementValue
15 29/10/2018 aschey1             added keypress checker for tel and time, simplified event registration
16 30/10/2018 aschey1             Change defaults dates on IE when value is ISO.
17 30/10/2018 aschey1             Format and/or convert numeric, date and time fields on output also for tags other than input
18 31/10/2018 aschey1             added interim ctrl key for send email and check code
19 02/11/2018 aschey1             added rutOpenMessageBox, change element.remove() due to bug in IE
20 03/11/2018 aschey1             lookup and popover, check for typeof return value, fixed bug in number format
21 06/11/2018 aschey1             add browser & locale details to email, add rutGetDate
22 11/11/2018 aschey1             fix bug for null values rutFormatNumberForElement and datePicker
23 16/11/2018 aschey1             Finalized code checker
24 18/11/2018 aschey1             added code to openMessageBox
25 23/11/2018 aschey1             added code to access Office 365
26 07/12/2018 aschey1             created rutToolMenue()
27 12/12/2018 aschey1             improvements to code check, drop down, openTicket and fixes in initArea
28 14/12/2018 aschey1             lookup, added that params are not transferred, if input is empty
29 18/12/2018 aschey1             fixed Firefox issues in input type tel and number keypress event handler
30a 07/01/2019 ESYNERGY1		  fixed rutCheckArea includes template row of Powertable when checking
30 18/12/2018 aschey1             amended codeReview, expanded to button/a ..
31 25/12/2018 aschey1             added Ids to message box buttons, added support for Chrome 71
32 29/12/2018 aschey1             Fixed rutSetElementValue, added check for a tag to code review
33 11/01/2019 aschey1             Fixed issue in codeReview if select tag has no values
34 14/01/2019 aschey1             Added a click listener to cliose the tools menue on click
35 16/01/2019 aschey1             Added support for dialog flow
36 25/01/2019 ESYNERGY1			  Fix rutCheckArea not include <select>, treat empty space as empty string
37 25/01/2019 aschey1             Added rutLookupByKey
38 25/01/2019 aschey1             Handle case where another message is opened while one is already open. Others are appended
39 26/01/2019 aschey1             Let rutUrlParm store windoOpener and sourceUrl
40 26/01/2019 aschey1             Combine all global variables under rut
41 28/01/2019 aschey1             Move uppercase conversion to rutCheckTextKeypress, allow backspace,del,arrows if length exceeded
42 31/01/2019 aschey1             Integrated lookup ws
43 01/02/2019 aschey1             Provide F2,F6,F8,F9 to click find, save,back,close
44 05/02/2019 aschey1             Provide option to force British date format with JQuery date picker ont Chrome/Firefox (rut.browsersuppressOwnDatePicker)
45 08/02/2019 aschey1             do not return false in checkKeypress upon uppercase
46 08/02/2019 aschey1             Add collapse support
47 10/02/2019 ESYNERGY1			  Remove comma when using rutGetElementValue on number or tel type area
48 12/02/2019 aschey1             Fix issue with date in rutOpenLookup
49 13/02/2019 aschey1             expand check number keypress to avoid 0 when min=0 and to check on max
50 16/02/2019 aschey1             made lookup dependen on hostname and improved error handling of lookup
51 16/02/2019 aschey1             added maximum check to rutCheckNumber Keypress and min=1 check
52 20/02/2019 aschey1             added tagId to rutLookupByKey to support autolookup on optional fields
53 22.02.2019 aschey1             introduce autorun funcion
54 26/02/2019 aschey1             version# in tool menue
55 27/02/2019 aschey1             Improve performance for lookup tables, reduce ticket email size, complete redesign of rutOpenLookup
56 01/03/2019 aschey1             Improve rutToTitleCase to consider some abbreviations like FSC,POL,POD,POT,DEL,PLR
56a 11/02/2019 ESYNERGY1		  Check undefined value
56b 11/02/2019 ESYNERGY1		  Add parameter onlyCheckVisible to rutCheckArea method
56c 04/03/2019 ESYNERGY1		  Add support for lookup when result field is inside powertable and using #-RowId-#
56d 04/03/2019 ESYNERGY1		  Fixed CORS issues
56e 05/03/2019 ESYNERGY1		  Adjust lookup size
56f 06/03/2019 ESYNERGY1		  Adjust table in lookup
57 04/03/2019 aschey1             Fix rutCheckTextKeypress since IE11 does not support include
58 08/03/2019 ESYNERGY1			  Fix incompatibility between RCL servlet and dialogflow
59 08/03/2019 ESYNERGY1			  Fix data-check=dec problem at rutFormatNumberForElement , $(selector).find("input") loop and rutGetElementValue
60 12/03/2019 ESYNERGY1			  Add data processor when calling lookup WS (only support option d for date formatting for now)
61 12/03/2019 ESYNERGY1			  Force triggering change event on fields set by lookup
62 13/03/2019 ESYNERGY1			  Add ability to skip data binding in lookup for any column using *
63 13/03/2019 ESYNERGY1			  Add option h to data processor to hide column (data binding must skip this column too)
64 19/03/2019 ESYNERGY1			  Add data processor for sco (option: min, main) in lookup
65 19/03/2019 ESYNERGY1			  Prevent double clicking lookup while waiting for input
66 15/03/2019 ESYNERGY1			  convert input type date in chrome to jquiry.ui datepicker.
67 20/03/2019 ESYNERGY1			  fixed jquery.ui datepicker not display calendar in powertable
68 20/03/2019 ESYNERGY1			  add function to auto fill when blur time element
69 21/03/2019 ESYNERGY1			  fixed comma in number is not deleted.
70 27/03/2019 ESYNERGY1			  fixed cannot key in time properly due to chars limit
71 01/04/2019 ESYNERGY1			  Add activate change event when change data on jquiry.ui datepicker
72 02/04/2019 ESYNERGY1			  fix len(size) is not activate and upc is not activate when attr check not have upc(size)
73 02/04/2019 ESYNERGY1			  Add time conversion for lookup
74 09/04/2019 ESYNERGY1			  Add date auto formatting
75 10/04/2019 ESYNERGY1			  fix rutOpenMessageBox message disappear when opening box twice.
76 10/04/2019 ESYNERGY1			  Change rutOpenMessageBox behavior when specifying function/label. Also remove error code from the box
76a 10/04/2019 ESYNERGY1			  Custom tag rcl:date provides default date in British format. should have ISO-format
77 11/04/2019 ESYNERGY1			  Clean up message when lookup fail. Auto clear return fields if auto lookup fail
78 18/04/2019 ESYNERGY1			  Allow overwrite selection for field with upc
79 29/04/2019 ESYNERGY1			  Add auto date formating in lookup when using *d processor
80 30/04/2019 ESYNERGY1			  add function to input datepicker for check if input is readonly then input will not show datepicker
81 24/06/2019 ESYNERGY1			  Fix vertical scroll off screen in lookup
82 27/06/2019 ESYNERGY1			  Fix sort not working in lookup
83 02/06/2020 PONPIC1			  in case of uppercase, textbox should not automatically move cursor to last position once insert at the middle of textbox.
*/
//### 04 field check and initializiation BEGIN
$(document).ready(function(){
    rutInitPage();
});
//There is really an issue with the sequence of onload and document.ready. Hope this helps.
//I have seen rutInitPage overtaking rutProcessUrl
$(window).on("load", function(){
    $(document).ready(function(){
        rutProcessUrl();
    });
});
/** Release notes for version from 06/11/2018
 * 1) new function rutOpenMessageBox to display error messages etc. without need to create html
 * 2) New function rutGetDate to allow date claculations similar to rcl:date custom tag (today, first|last of previous|this|next month) and
 *    to allow output in numeric formt (20181106) to provide values, which can be compared with DB old date columns
 */
/**Initializes event listeners and date pickers for the whole page
 * Insert styles if required
 * @author Ascan Heydorn
 */
function rutInitPage(){
    $('[data-toggle="tooltip"]').tooltip();
    rutInitArea("body");
} //end function rut initPage

/**Registers for an area or the complete body keypress, change and datepicker events and also sets
 * the style for uppercase. The following is done:<br/>
 * 0) Creates (when applied to the body tag) a global variable rut.browser giving features of the Browser
 * 1) Register keypress events for all text fields (non readonly) which have maxLength set. Purpose: Check on maxLength<br/>
 * 2) Register style uppercase for all tags (non readonly) with upc<br/>
 * 3) Register change event for all text input (non readonly) to convert value to uppercase<br/>
 * 4) Register keypress events for all number fields (non readonly) to check format<br/>
 * 5) Change type of number fields to "tel" for Chrome and Firefox (see below)<br/>
 * 6) Register datepicker for all date fields if browser is not Chrome or firefox
 * 7) Register keypress events for all time fields if browser is not Chrome or firefox
 * 8) Register keypress events for all tel fields, which are not originally numbers (see 5)
 *
 * In case of number fields and Chrome it changes the field type to "tel", since in Chrome "number" does not
 * return the position of the caret. Caret position is required for the format check.
 *
 * @param {String} area Either "body" or the id of an area whose elements shall receive event listeners
 * @author Ascan Heydorn
 */
function rutInitArea(area){
    var selector=area;
    //if ((typeof _rutBrowser)=="undefined"){//###40
    if ((typeof rut)=="undefined"){//###40
        rut = { browser:null, powerTableIndex:[], powerTableInActiveSortSettings:null}; //###40
    }//###40
    if (rut.browser==null){ //###40
        var isChrome = (!!window.chrome && !!window.chrome.webstore)||(/Google Inc/.test(navigator.vendor))?true:false; //###31
        var isFirefox = (typeof InstallTrigger !== 'undefined')?true:false;
        var isModern = (isChrome || isFirefox)? true:false;
        rut.browser = { hasOwnDatePicker : isModern,       //Yes=> suppress JQuery datepicker --> Chrome and Firefox//###40
                       usesIsoDate : isModern,             //NO=> convert iso date to british for defaults --> Chrome and Firefox
                       suppressOwnDatePicker : false,      //  //###44 prepare for forcing text date onto Chrome to have always British date
                       typeConversionNumToTel : isModern,  //Yes=> convert type=number into type=tel to allow keypress support --> Chrome and Firefox
                       checkNumberKeypress : true,         //Yes=> enable keypress check for numbers --> IE and Chrome and Firefox
                       checkTimeKeypress : !isModern,      //Yes=> enable keypress event for type=time --> only IE
                       checkTelKeypress: true,             //Yes=> enable kexpress event for type=tel --> IE and Chrome and Firefox
                       isModern : isModern,                //information only, no practical usage
                       isChrome : isChrome,                //information only, no practical usage
                       isFirefox : isFirefox,              //information only, no practical usage
        }
    }//global variable rut is undefined
    if (area!="body"){
        selector='#'+area;
    }
    else {
        selector="body";
        //document.getElementsByTagName("body")[0].addEventListener("keydown",rutCheckKeydown); //###43 //###51
        document.body.addEventListener("keydown",rutCheckKeydown); //###51
        //###46 BEGIN
        $(".collapse").on('show.bs.collapse', function(event){
            rutHandleCollapseEvent(event);
        });
        $(".collapse").on('hide.bs.collapse', function(event){
            rutHandleCollapseEvent(event);
        });
        //###46 END
    } //endelse body
    var type="";
    var check="";
    var oldType="";
    var scale=NaN;
    $(selector).find("input").each(function(){
        oldType=this.getAttribute('data-type');
        type=this.getAttribute('type');
        if (this.getAttribute('readonly')==true){
            //return true;
        }
        if (this.disabled){
            //return true;
        }
        //if ((type=="text")&&(oldType!="time")){ //###67
        if ((type=="text") && (oldType!="time") && (oldType!="date") ){ //###67
//            if (this.maxLength>0){ //###72
                this.addEventListener("keypress",rutCheckTextKeypress);
//            } //###72
            //check=this.getAttribute('data-check');//###13 type decl moved up //###41
            //if ((check!=null)&&(check.indexOf("upc")>=0)){//###41
                //this.classList.add('text-uppercase'); //###41
                //this.addEventListener("change",function(event){rutChangeText(event);}); //###15
                //this.addEventListener("change",rutChangeText); //###15  //###41
            //} //###41
        } //endif text
        else if ((type=="number")||(oldType=="number")){
            if (rut.browser.isModern){ //Chrome does not support selectionStart/End on type number  //###40
                this.type="tel";
                this.setAttribute("data-type","number"); //keep the original data type
            }
            this.addEventListener("keypress",rutCheckNumberKeypress);
            //Now we insert a "change" event handler to format the decimals
            check=this.getAttribute('data-check');
            if ((check!=null)&&(check.indexOf("dec(")>=0)){
                check=check.substring(p+4);
                var p=check.indexOf(")");
                var b=check.indexOf(",");
                if (p<=b) {return true;} // incorrect format definition
                scale=Number(check.substring(b+1,p)); //becomes NaN when not existing
                if (scale == NaN) {return true;} //incorrect format
                if (scale<0) {return true;} //no decimals
                this.addEventListener("change",function(event){rutChangeDecimal(event);});
            }
        } //end if number
        //else if(type=="date"){ //###66
        else if(type=="date" || (type=="text" && oldType == "date")){ //###66
            //datepicker JQuery
        	//###76a BEGIN
//            if (!rut.browser.usesIsoDate){ //This is IE and we need to convert all defaults to British formats //###40
//                if (this.defaultValue!=null){
//                    this.value=rutConvertDate(this.value, false);
//                    this.defaultValue=this.value;
//                }
//            }
        	//###76a END
            //###66 BEGIN
            //Remove browser check and make all browser to use jquery datepicker
            /*
            if (rut.browser.suppressOwnDatePicker){
                this.type="text";
                this.setAttribute("data-type","date"); //keep the original data type
            }
            if ((!rut.browser.hasOwnDatePicker)||(rut.browser.suppressOwnDatePicker)){ //###44
                $( "#"+this.id).datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    dateFormat: "dd/mm/yy"
                });
            }
            */
            this.type="text";
            this.setAttribute("data-type","date"); //keep the original data type
            $( "#"+this.id).removeClass('hasDatepicker'); //###67
            $( "#"+this.id).datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                dateFormat: "dd/mm/yy",
            	//###
            	onSelect: function() {
            		var event = document.createEvent('Event');
                    event.initEvent('change', true, true);
                    this.dispatchEvent(event)
            	},
            	//###80 BEGIN
            	beforeShow:function(i){
            		if($(i).attr('readonly')){return false;}
            	}
            	//###80 END
            //); //###74
            }).keypress(rutFormatDateFieldOnTyping); //###74
            this.addEventListener("blur", rutValidateDateField); //###74

//            ###76a BEGIN ADD to FIXED
            var dataDefault = $("#"+this.id).attr('data-defaultvalue');
            if (dataDefault!=null){
              this.value=rutConvertDate(dataDefault, false);
            }
//            ###76a END ADD
            //###66 END
        } //end if date
        else if ((type=="tel")&&(oldType!="number")){
            if(rut.browser.checkTelKeypress){ //###40
                this.addEventListener("keypress",rutCheckTelKeypress);
            }
        }
        else if ((type=="time")||(oldType=="time")){
        	//###70 BEGIN
        	// add for change chrome time to jquery time
        	if (this.defaultValue!=null){
                this.value=rutConvertTime(this.value, false);
                this.defaultValue=this.value;
            }
        	this.type="text";
        	this.maxLength=5;
            this.setAttribute("data-type","time"); //keep the original data type
            //if (rut.browser.checkTimeKeypress){ //Chrome has own time picker//###40
                this.addEventListener("keypress",rutCheckTimeKeypress);
                this.addEventListener("blur" , rutFullFillTime); //###68
            //}
            //###70 END
        }
    }); //end $(selector).find("input").each"
} // rutInitArea

//###68 BEGIN
function rutFullFillTime(){
	var enterTime = this.value;
	if(enterTime != ''){
		enterTime = enterTime.replace(':','').padEnd(4,"0");
		this.value=enterTime.substring(0,2) + ':'+enterTime.substring(2,4);
	}
}//end function rutFullFillTime
//###68 END

//###74 BEGIN
function rutFormatDateFieldOnTyping(e){
	if(e.keyCode != '8'){
        if (e.target.value.length == 2) e.target.value = e.target.value + "/";
        if (e.target.value.length == 5) e.target.value = e.target.value + "/";
    }
}

function rutValidateDateField(e){
	if(e.target.value){
		var date = e.target.value.replace(/[^0-9]/g, '')
		if(date.length != 8){
			//rutOpenMessageBox("Warning","Date field should be in DD/MM/YYYY format","rut011-001",'','');
			e.target.focus();
		}else{
			rutSetElementValue(e.target.id, date.substring(0,2) + "/" + date.substring(2,4) + "/"
					+ date.substring(4,8));
		}
	}
}
//###74 END

/**Change event handler to format the right number of decimals
 * @param {ChangeEvent} event
 * @author Ascan Heydorn
 */
function rutChangeDecimal(event){
    //formats to the given number of decimals
    var element=event.target;
    element.value=rutFormatNumberForElement(element, element.value)||'';
} //end function rutCheckDecimalChange
/**Returns an object giving precision and scale of the dec(p,s) settings of an rcl number tag in html
 * @param {element} element The html element whose number settings should be derived
 * @returns {object} with property precision and scale. Returns null, if dec is not set or ill formatted
 * @author Ascan Heydorn
 */
function rutGetNumberSettings(element){
    var check=element.getAttribute("data-check");
    var scale=0;
    var precision=0;
    if (check==null){ return null;} // no format details
    var p=check.indexOf("dec(");
    if (p<0){ return null;} //no decimal format
    check=check.substring(p+4);
    p=check.indexOf(")");
    var b=check.indexOf(",");
    if (p<=b) {return null;} // incorrect format definition
    scale=Number(check.substring(b+1,p)); //becomes NaN when not existing
    precision=Number(check.substring(0,b));
    if (scale == NaN) {return null;} //incorrect format
    if (scale<0) {return null;} //no decimals
    return {precision: precision, scale: scale}
}//end function rutGetNumberSettings
//###49 BEGIN
//This function is not yet used
function rutCheckMinMaxValue(event){
    var element=event.target;
    var value=element.value
    if ((element.min!=null)&&(!isNaN(element.min))&&(element.min!='')&&(Number(value)<element.min)){
        rutOpenMessageBox("Error","Entered value "+value+'<'+element.min+' (expected minimum)',"rut003-003",'','');
        rutSetElementValue(element,element.min);
        event.preventDefault();
        return;
    }//endif minimum check
    else if ((element.max!=null)&&(!isNaN(element.max))&&(element.max!='')&&(Number(value)>element.max)){
        rutOpenMessageBox("Error","Entered value "+value+'>'+element.max+' (expected maximum)',"rut003-004",'','');
        rutSetElementValue(element,element.max);
        event.preventDefault();
        return;
    }//endif maximum check
}//end function rutCheckMinMaxValue
//###49 END
function rutFormatNumberForElement(element, initialValue){
   // console.log('1'+initialValue+"xxx:"+JSON.stringify(event));
    if ((typeof initialValue == 'undefined')||(initialValue==null)){return "";}
    var value=initialValue.toString();
    var numberSettings=rutGetNumberSettings(element);
    var formattedValue="";
    if (!numberSettings) {
        return value;
    }
    value = value.replace(/,/g, '');
    if(value.replace(".","") == ""){
    	return "";
    }
    var p=value.indexOf(".");
    if (p>=0){ //we have a dot
        var decimals=value.substring(p+1,value.length)+"00000000000";
        decimals=decimals.substring(0,numberSettings.scale);

        if(numberSettings.scale == 0){
        	formattedValue=(value.substring(0,p)==''? '0' :  value.substring(0,p)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }else{
        	formattedValue=(value.substring(0,p)==''? '0' :  value.substring(0,p)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"."+decimals;
        }
    }
    else { //no dot
    	if(numberSettings.scale == 0){
    		formattedValue=value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    	}else{
    		formattedValue=value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")+".000000000".substring(0,numberSettings.scale+1);
    	}

    }
    return formattedValue;
}//end function rutFormatNumberForElement
/**Checks after keypress whether the input to a text field dos not exceeds the maximum length
 *
 * @param {KeyEvent} event
 * @author Ascan Heydorn
 */
function rutCheckTextKeypress(event){
    //checks maxlength only
    var maxLength=event.target.maxLength;
    var value=event.target.value;
    var element=event.target;
    var startPos = element.selectionStart;
    var endPos = element.selectionEnd;
    //###72 add && maxlength != -1 in if case. because some textbox not add check="len(size)"
    if ((value.length+startPos-endPos)>= maxLength && maxLength != -1) {
        //when maxlenght exceeded allow only backspace(8),delete(46),leftArrow(37),rightArrow(39)
    	//if (![8,46,37,39].includes(event.keyCode)){ //###41 //###57
        if (0>'8,46,37,39'.indexOf(event.keyCode)){ //###57 //###72  change <(less than) to >(more than)
        event.preventDefault();
        return false;
        } //###41
    }
    //###41 BEGIN convert lowercase characters to uppercase in case of data-check=upc
    if ((event.which >= 97) && (event.which <= 122)){
        let check=element.getAttribute('data-check');
        if ((check!=null)&&(check.indexOf("upc")>=0)){
        	//###78 BEGIN
        	//Trim selection before proceed
        	if(startPos < endPos){
        		value = value.substring(0,startPos) + value.substring(endPos, value.length);
        	}
        	//###78 END
        	event.target.value = value.substring(0,startPos) + String.fromCharCode(event.which-32) + value.substring(endPos, value.length);   // #83
        	event.target.setSelectionRange(startPos+1, startPos+1);  // #83
            event.preventDefault();
            //return false; //###45
        }//endif uppercase required
    } //endif input is a-z
    //###41 END

}//end function rutCheckTextInput
/**Checks number input after a keypress event. Checks whether the input
 * leaves a number with the intended decimals, and scale.
 *
 * @param {Event} event The keypress event object
 * @author Ascan Heydorn
 */
function rutCheckNumberKeypress(event){
    var element=event.target;
    var check=element.getAttribute("data-check");
    var precision=20;
    var scale=0;
    var value=element.value;
    var min=element.min;
    var max=element.max;
    var valueLength=(!value)?0:value.length;
    var startPos = element.selectionStart;
    var endPos = element.selectionEnd;
    /*
    Chrome does not give selectionStart, selectionEnd for input type number,
    therefore we change to "tel" during initilalization with rutInitArea */
    if (check!=null){
        var p=check.indexOf("dec(");
        if (p>=0){
            check=check.substring(p+4);
            check=check.split(")")[0];
            check=check.split(",");
            precision=Number(check[0]); //becomes NaN when not existing
            scale=Number(check[1]); //becomes NaN when not existing
            if (precision == NaN){ precision=20;}
            if (scale == NaN) {scale=0;}
        }
    }
    var positionDot=value.indexOf("."); //position of decimal dot, -1 = no dot
    var hasMinus = ((value.indexOf("-")>=0)||(value=="-"))? true: false; //whether has minus or not
    var decimals=  (positionDot<0) ? 0 : value.length-positionDot-1; //number of decimals
    var integers=  (positionDot<0) ? value.length : positionDot; //number of digits before the dot
    integers = (hasMinus) ? integers-1 : integers;
    //console.log("keypress num: value:"+element.value+" pos:"+startPos+"/"+endPos+" positionDot:"+positionDot+" integers:"+integers+
    //    " decimals:"+decimals+" key:"+event.key+" keyCode:"+event.keyCode+"/"+event.which+"/"+event.charCode);
    //numpad key !!
    if ( (event.charCode<48) && (event.key!='-') && (event.key!='.') ){
        //console.log("control key");
        event.preventDefault();
        return false;
    }
    else if (  (event.charCode>57) ){
        //        console.log("character other than - .");
        event.preventDefault();
        return false;
    }
    //- pressed but after position 1
    else if ( (event.key=="-") && (startPos>0) ) {
    //        console.log("- startPos>0");
        event.preventDefault();
        return false;
    }
//        //- pressed but min is >=0 and defined
    if ( (event.key=="-") && (min >=0) && (element.getAttribute('min')!=null)) {
        //console.log("- min>=0");
        event.preventDefault();
        return false;
    }
    // .dot pressed but scale is 0
    if ( (event.key==".") &&(scale=0) ){
//            console.log(". pressed, but scale is 0");
        event.preventDefault();
        return false;
    }
    //integer exceeds length
    if ( (scale==0) && ( (precision+(hasMinus?1:0)) < (valueLength+1+startPos-endPos) ) ){
//            console.log("integer exceeds lenght:"+(precision+(hasMinus?1:0))+"<"+(valueLength+1+startPos-endPos) );
        event.preventDefault();
        return false;
    }
    // . pressed but cursor is before the dot
    if ( (event.key==".") && (endPos<positionDot) ){
//            console.log(". but cursor before dot")
        event.preventDefault();
        return false;
    }
    // . pressed but cursor is after the dot and there is already a dot
    if ( (event.key==".") && (startPos>positionDot) && (positionDot>=0) ){
//            console.log(". but cursor after dot")
        event.preventDefault();
        return false;
    }
    // too many decimals
    if ( (positionDot>0) && (startPos>positionDot) && (scale < ( startPos-positionDot+startPos-endPos) ) ){
        //console.log("too many decimals:"+scale+"/"+( startPos-positionDot+startPos-endPos));
        event.preventDefault();
        return false;
    }
    // integer part exceeds precision and there is a dot
    if ( (positionDot>=startPos) && ( (precision-scale+(hasMinus?1:0)) < (1+positionDot+startPos-endPos)) ){
//            console.log("too many integers and dot:"+(precision-scale+(hasMinus?1:0))+"/"+(1+positionDot+startPos-endPos));
        event.preventDefault();
        return false;
    }
    // integer part exceeds precision and there is no dot
    if ( (positionDot==-1) && ( (precision-scale+(hasMinus?1:0)) < (1+valueLength+startPos-endPos)) ){
        if ((!hasMinus)&&(event.key=="-")&&(startPos==0)){
            //inserting a minus at start position is still ok
        }
        else {
//                console.log("too many integers and no dot:"+(precision-scale+(hasMinus?1:0))+"/"+(1+valueLength+startPos-endPos));
            event.preventDefault();
            return false;
        }
    }
    // break precision by replacing - with a digit
    if ( hasMinus &&                     // we have '-'
        (startPos==0) && (endPos==1) && //'-' is selected
        ((precision-scale) == integers)
        ){
//            console.log("trying to break precision by replacing '-' with digit");
        event.preventDefault();
        return false;
    }
    //###51 BEGIN Check minimum 1 and maximum
    if ((min==1)&&(startPos==0)&&(event.key=='0')){
        //console.log("minimum is 1, first digit is 0");
        event.preventDefault();
        return false;
    }
    if ((typeof max != 'undefined')&&(max!=null)&&(max!='')&&(!isNaN(max))){
        //console.log('in maximum check:'+max,value,event.key);
        let newValue=Number(value.substring(0,startPos)+event.key+value.substring(endPos));
        //console.log('in maximum check:'+max,value,event.key,startPos,endPos,newValue);
        if (newValue>max){
            //console.log("input exceeds maximum");
            event.preventDefault();
            return false;
        }
    }
    //###51 END Check minimum 1 and maximum
} //end function rutCheckNumberKeypress
/**Checks time input after a keypress event. Checks whether the input is hh:mm.
 *
 * @param {Event} event The keypress event object
 * @author Ascan Heydorn
 */
function rutCheckTimeKeypress(event){
    var element=event.target;
    var value=element.value;
    var startPos = element.selectionStart;
    if (startPos==0){
        if (0>'012'.indexOf(event.key)){
            //console.log("first digit not 012");
            event.preventDefault();
            return false;
        }
    }//end startpos==0
    else if (startPos==1){
        if ((0<='01'.indexOf(value.charAt(0))) &&
            (0>'0123456789'.indexOf(event.key))
           ){
            //console.log("hours can be 00-19");
            event.preventDefault();
            return false;
        }//endif 00-19h
        else if ((value.charAt(0)=='2') &&
                 (0>'0123'.indexOf(event.key))
                ){
            //console.log("hours can be 20-23");
            event.preventDefault();
            return false;
        } //endif 20-23h
        //now :
        element.value=value.charAt(0)+event.key+':'+value.substring(3);
        event.preventDefault();
        return false;
    }//end startpos==1
    else if (startPos==2){
        if (event.key!=':'){
            //console.log("3 key must be :");
            event.preventDefault();
            return false;
        }//endif :
    }//end startpos==2
    else if (startPos==3){
        if (0>'012345'.indexOf(event.key)){
            //console.log("minute can be 00-59");
            event.preventDefault();
            return false;
        }//endif :
    }//end startpos==3
    else if (startPos==4){
        if (0>'0123456789'.indexOf(event.key)){
            //console.log("2 digit of miute must be a number");
            event.preventDefault();
            return false;
        }//endif
    }//end startpos==4
    else {
        //console.log("too long");
        event.preventDefault();
        return false;
    }
}//end function rutCheckTimeKeypress
/**Checks after keypress whether the input to a tel field broadly matches the pattern of phone numbers
 * Tel tags allowonly "0123456789 -." and a leading +, " -." must not be duplicated
 *  *
 * @param {KeyEvent} event
 * @author Ascan Heydorn
 */
function rutCheckTelKeypress(event){
    if (event.which==8){
        return true;
    }
    var value=event.target.value;
    var element=event.target;
    var startPos = element.selectionStart;
    var key=event.key;
    var glue='+ -'; //This is not supported in IE:  const glue = (v)=>(0<='+ -.'.indexOf(v));
    //the characters + -. are also allowed in between, + in front only
    //IE still returns Spacebar instead of ' '
    if ( (key=="+") && (startPos==0) ) {
        //+ only as first character is fine
        return true;
    }
    else if (0>'0123456789 -'.indexOf(key)){
        //other character than digits and space,-,.
        //console.log(key+"/"+event.key+" only 0123456789 -. allowed");
        event.preventDefault();
        return false;
    }
    //Tried to enter + or glue after same  (0<=glue.indexOf(value.charAt(startPos-1)))
    else if ( (0<=glue.indexOf(key)) && (startPos>0) && (0<=glue.indexOf(value.charAt(startPos-1))) ){
        //console.log(event.key+' at pos '+startPos+' and '+value.charAt(startPos-1)+ " at position "+(startPos-1));
        event.preventDefault();
        return false;
    }
    //Tried to enter + or glue before same
    else if ( (0<=glue.indexOf(key)) && (startPos<(value.length-1)) && (0<=glue.indexOf(value.charAt(startPos+1))) ){
        //console.log(event.key+' at pos '+startPos+' and '+value.charAt(startPos+1)+ " at position "+(startPos+1));
        event.preventDefault();
        return false;
    }
}//end function rutCheckTelKeypress
//### 04 field check and initializiation END
/**Checks the input tags of an area for required, min, max
 *
 * @param {String} containerId The html id of the area whose input elements to check
 * @param {Boolean} onlyCheckVisible A flag. If true, this function only check visible element inside the area (##56b)
 * @returns {array} An array of errors with columns htmmlId of field in error, errorNumber, errorDescription
 * @author Ascan Heydorn
 */
//function rutCheckArea(containerId){ //##56b
function rutCheckArea(containerId, onlyCheckVisible){ //##56b
    var errors = [];
    //###30a BEGIN
    var container = $("#"+containerId);
    if(container.attr("class").indexOf("tblArea") > -1){
    	container = container.children(":not(.tblRow)").add(container.children(".tblRow:not(:last)"));
    }
    //container = container.find("input"); //###36
    //container = container.find("input, select"); //###36 ##56b
    //##56b BEGIN
    if(onlyCheckVisible){
    	container = container.find("input:visible, select:visible");
    }else{
    	container = container.find("input, select");
    }
    //##56b END
    container.each(function(){
    //###30a END
    //$("#"+containerId).find("input").each(function(){ //###30a
        if ( (this.required) &&
             //((this.value==null) || (this.value=="")) //###36
        		((this.value==null) || (this.value.trim()=="")) //###36
            ){
            errors.push( [this.id , 'rut001-001' , 'missing value'] );
        }
    });//end input tag
    return errors;
} //end function rutCheckArea
/**Resets all subtags of the tag with the given Id, which have an Id of same 3-character prefix with
the default value.<br>
It supports all input tags where the value is stored in value or checked attribute and
also select and textarea tags.<br>
Example: <br>&lt;div id=s0-area<br>
            &lt;input id="s0-account" ...<br>
            &lt;input id="name"<br>
            &lt;select id="s0-country"<br>
        &lt;/div&gt;<br>
In this example the input with id="s0-account" and the select would be reset to their defaults.
@param {string} containerId The html id of a tag (usually a div tag) whose conaining elements are reset.
@author Ascan Heydorn
*/
function rutResetToDefault(containerId){
    $("#"+containerId).find("input[id^="+containerId.substr(0,2)+"]").each(function(){
        if      (this.type==="checkbox") {
            this.checked=this.defaultChecked;
        }
        else if (this.type==="radio")    {
            this.checked=this.defaultChecked;
        }
        else {
            this.value=this.defaultValue;
        }
    });//end input tag
    $("#"+containerId).find("select[id^="+containerId.substr(0,2)+"]").each(function(){
        $(this).find("option").each(function(){
            this.selected=this.defaultSelected;
        });
    });// end select tag
    $("#"+containerId).find("textarea[id^="+containerId.substr(0,2)+"]").each(function(){
            this.value=this.defaultValue;
    });// end textarea tag
} //end function rutResetToDefault
//function _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators){ //##60
//function _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators, returnCols){ //##60
function _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators, returnCols, forAutoLookup){ //###64
    //var sc=(selectCols)?selectCols.split(' '):[];
	//###64 BEGIN
	var selectProcessors = (selectCols)?selectCols.split(' '):[]; //Store processors for each column
	var sc = [];
	for(var i=0; i<selectProcessors.length; i++){
		var processorIndex = selectProcessors[i].indexOf("*");
		if(processorIndex >= 0){
			sc.push(selectProcessors[i].substring(0,processorIndex));
			selectProcessors[i] = _rutParseLookupSelectProcessor(selectProcessors[i].substring(processorIndex+1));
		}else{
			sc.push(selectProcessors[i]);
			selectProcessors[i] = undefined;
		}
	}
	var scProcessor = null;
	//###64 END
    var sv=(selectValues)?selectValues.split(' '):[];
    var so=(selectOperators)?selectOperators.split(' '):[];
    var select=[];
    var element=null;
    var value=null;
    var operator=null;
    var dataType=null;
    var check=null;
    var index=null;
    var tag=null;
    for (var i=0;i<sv.length;i++){
        if (sc[i]==''){ continue;}
        if (sv[i]==''){ continue;}
        //element=document.getElementById(sv[i]); //###56c
        element=document.getElementById(rutSplitRowID(sv[i])); //###56c
        value=(element==null)?sv[i]: rutGetElementValue(element);
        dataType=null;
        //###64 BEGIN
        scProcessor = selectProcessors[i];
        if(scProcessor && scProcessor.min){
        	//Process min validation
        	if(typeof value === "string" && value.length < scProcessor.min){
        		throw {code:"rut010-001",
        			message: (element == null ? "Value" : _findElementLabel(element.id))
        				+ " requires at least " + scProcessor.min + " character(s)"
        			};
        	}
        }
        //###64 END
        if (element!=null){
            if ((value==null)||(value=='')){ continue;}
            tag=element.nodeName;
            if (tag=='INPUT'){
                dataType=element.type;
                //we may haved changed the type during init like for Chrome number to tel, then the original type is in data-type
                dataType=(element.getAttribute('data-type')==null)?element.type:element.getAttribute('data-type');
                if (dataType=='number'){
                    check=element.getAttribute('data-check');
                    if (check!=null){
                        index=check.indexOf('dec(');
                        if (index>=0) {
                            check=check.substring(index);
                            dataType=check.split(')')[0];
                        }//endif data-check has dec
                    }//endif data-check exists
                }// endif type number
                //###60 BEGIN
                else if (dataType == 'date'){
                	value = value.replace(/\-/g, "");
                	value="'"+value+"'";
                }
                //###60 END
                //###73 BEGIN
                else if (dataType == 'time'){
                	value = rutConvertTime(value,false);
                }
                //###73 END
                else {
                    value="'"+value+"'";
                }
            }//endif input
            else {
                dataType='unknown';
                value="'"+value+"'";
            }
        }
        //###64 BEGIN
        //operator=(i>=so.length)?'=': so[i];
        if(scProcessor && scProcessor.main){
        	//Set operator for main field
        	operator=forAutoLookup ? "=" : "LIKE";
        }else{
        	operator=(i>=so.length)?'=': so[i];
        }
        //###64 END
        if (dataType) {
            select.push({column: sc[i], value:value, operator: operator, dataType : dataType})
        }
        else {
            select.push({column: sc[i], value:value, operator: operator})
        }
    }
    //###42 BEGIN
    var userData = { userToken : rutGetElementValue('h3-userToken')
                    ,userId :    rutGetElementValue('h3-userId')
                    ,line :      rutGetElementValue('h3-line')
                    ,trade :     rutGetElementValue('h3-trade')
                    ,agent :     rutGetElementValue('h3-agent')
                    ,fscCode :   rutGetElementValue('h3-fscCode')
                }
    var userToken=userData.userToken; //temporary until Nuttapol has fixed it
    //###42 END
    /* This is the JSON structure for the webservice
    {   userData : {}},
        table: <tbl>,
        {
            select: [{ column: <selectColumn>, value: <selectValue>, operator: <selectOperator>}]
        },
    }
    */
   //var wsInput = { table: table, //###42

   var wsInput = {  userToken: userToken , userData: userData, table: table}; //###42
   if (select.length>0){
       wsInput.select = select;
   }
   //##60 BEGIN
   if(returnCols){
	   var processor = [];
	   var rco = returnCols.split(' ');
	   for(var i=0; i<rco.length; i++){
		   //Processor exists
		   var processorIndex = rco[i].indexOf("*");
		   if(processorIndex >= 0){
			   var processorType = rco[i].substring(processorIndex+1);
			   processor.push({
				  column: rco[i].substring(0, processorIndex),
				  type: processorType
			   });
		   }
	   }
	   if(processor.length > 0){
		   wsInput.processor = processor;
	   }
   }
   //##60 END
    return wsInput;
}

/**Opens a modal dialog box and displays a list of records for selection
 * After a record is selected by the user it fills certain fields, given bei their Ids., with values
 * from the selected data
 * @param {string} table The name of the table to lookup. This shall be a view.
 * @param {string} returnCols A space separated list of columns which are returned from the selected record
 * @param {string} returnIds A space separated list of element Ids, which receive the value of the corresponfing column
 * @param {string} selectCols  A space separated list of columns which restrict the list
 * @param {string} selectValues A space separated list of values or element Ids, which must match the respective column. I values are empty, then the respective column is suppressedd
 * @param {string} selectOperators A space separated list of comparison operators. may include IN. If this list is not provided, than = is he default
 * @param {string} displayTitle The title of the dialog box. The default title is <table>.substring(3) + " Lookup" converted to titlecase
 * @author Ascan Heydorn
 *
 */
function rutOpenLookupTable(table, returnCols, returnIds, selectCols, selectValues, selectOperators, displayTitle){
    //1 call web service to get the data with table, selectedCols, selectedVals
    //2 when data array is returned analyse first record in array to build the html template
    //3 assign data to settings
    //4 Display dialog box
    //5 Close dialog box, assign return values
    var title=(displayTitle)?displayTitle: rutToTitleCase(table.substring(4)+' Lookup'); //remove the VRL_ from the table name
    //##60 BEGIN
    //var wsInput = _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators);
    	//###64 BEGIN
    //var wsInput = _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators, returnCols);
    var wsInput = null;
    try{
    	wsInput = _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators, returnCols, false);
    }catch(e){
    	rutOpenMessageBox("Warning", e.message, e.code,null,'');
    	return;
    }
    	//###64 END
    returnCols = returnCols.replace(/\*\w*/g, "");
    //##60 END
    $("body").append('<div class="loading"></div>'); //###65
    rutGetLookupData(wsInput, showLookupDialog); //###42
    //showLookupDialog(getTestData()); //only for dry test without server
    return; //###42

    //Inner Function
    function showLookupDialog(lookupResult){
        //###55 BEGIN
        var data=lookupResult.data;
        var metaData=lookupResult.metadata;
        if (data.length<=0){
            //No data found display error message
        	//###77 BEGIN
        	/*
            let errorMessage=(wsInput.select.length==0)?'No data found':'No data found for ';
            for (var i=0; i<wsInput.select.length;i++){
                errorMessage+=wsInput.select[i].column+wsInput.select[i].operator+wsInput.select[i].value+' ';
            }
            rutOpenMessageBox('Error on lookup of '+table.substring(4), errorMessage, 'rut003-001',null,'');
            */
        	rutOpenMessageBox('Warning', 'No row(s) retrieved', '');
        	//###77 END
            return;
        }
        var element=document.getElementById('t99Lookup-dlg');
        if (element!=null){ //another lookup table was not clossed properly but through x button
            element.parentNode.removeChild(element); //element.remove does not work in IE
        }
        var htmlString='';
        var cr='\r\n';
        var tdStyleString='';
        var tdStyleNumber='';
        var tdHideClass="d-none";
        var tdClass='';

        var minDialogWidth = 550; //This is wide enough for paging/dialog buttons //##56e

        var colWidths=[]; //##56f
        var selectColSize = 50; //##56f
        var colSizes=[];
        //var totalColSize=50; //we have already the select button //##56f
        //var totalColSize=selectColSize; //##56f //##81
        var totalColSize=selectColSize*2; //Include seq# width as well //##81
        var numCols=0;
        var colSize=0;
        for (var i=0;i<metaData.length;i++){ //Here we compute the size of the columns
            colSize=Math.min(Math.max(metaData[i].precision,metaData[i].columnName.length)*9,200); //1 char ~ 9px
            colSize = Math.max(colSize, 72); //Need at least space for sort buttons //##56f
            colWidths.push(colSize); //##56f
            colSizes.push(colSize+'px;');
            if (metaData[i].columnName.substring(0,5).toUpperCase()!='HIDE_'){
                numCols++;
                totalColSize+=colSize;
            }
        }
        //var totalAreaWidth=((1+numCols)*8)+totalColSize+1; //each column has 2 x 3px padding and 1px border, 17px for scrollbar //##56f
        var totalAreaWidth=((1+numCols)*8)+totalColSize+17;

        //##56f BEGIN
        if(totalAreaWidth < minDialogWidth){
        	//Redistribute column width using width ratio
        	var oldTotalColSize = totalColSize;
        	totalColSize = 0;
        	//Fix select to 50
        	//var expectedTotalColSize = minDialogWidth - 17 - ((1+numCols)*8);
        	//selectColSize = (50.0/oldTotalColSize) * expectedTotalColSize;
        	var expectedTotalColSize = minDialogWidth - 17 - ((1+numCols)*8) - 50;
        	oldTotalColSize -= 50;
        	for(var i=0; i<colSizes.length; i++){
        		colWidths[i] = (colWidths[i]*1.0/oldTotalColSize) * expectedTotalColSize;
        		colSizes[i] = colWidths[i]+'px;';
        		if (metaData[i].columnName.substring(0,5).toUpperCase()!='HIDE_'){
                    totalColSize+=colWidths[i];
                }
        	}
        	totalAreaWidth=minDialogWidth;
        }
        //##56f END

        htmlString+='<div id="t99Lookup-dlg">';
        var containerId="t99Lookup";
        var buttonIdAsc=null;
        var buttonIdDes=null;
        var buttonColorClass="rclDlgSortDirectionBtn"; //settings are not ready, so we cannot get it from there
        //Display search area
        htmlString+='<div style="padding:2px;"><table>'+
                    '<tr>'+
                        '<td><label class="col-sm1 bt-1" for="'+containerId+'-dlgSearch'+'">Search</label></td>'+
                        '<td colspan=2> <input class="col-sm2" type="text" id="'+containerId+'-dlgSearch'+'" '+
                        ' onkeyup="this.value = this.value.toUpperCase()" ></input></td>'+
                    '</tr>'+
                '</table>';
        htmlString+='</div>';

        //htmlString+= '<div>'; //##56f
        //##81 BEGIN
        //htmlString+= '<div style="overflow-x:auto;">'; //##56f
        htmlString+='<div>';
        htmlString+='<div id="t99LookupHeaderWrapper" style="overflow-x:hidden; padding-right:15px;">' //Start header
        //htmlString+='<div id="t99HeaderRow" class="rcl-lkHeader">';
        htmlString+='<div id="t99HeaderRow" class="rcl-lkHeader" style="min-width:'+totalAreaWidth+'px;width:'+totalAreaWidth+'px">';
        //##81 END
        htmlString+='<p class="rcl-lkHeaderRow">';
        //htmlString+='<span class="rcl-lkHeaderCell" style="flex-basis:50px;max-width:50px;min-width:50px;">Select</span>'; //##56f
        htmlString+='<span class="rcl-lkHeaderCell" style="flex-basis:' + selectColSize + 'px;max-width:' + //##81
    		selectColSize + 'px;min-width:' + selectColSize + 'px; text-align:center;">Seq#</span>'; //##81
        htmlString+='<span class="rcl-lkHeaderCell" style="flex-basis:' + selectColSize + 'px;max-width:' + //##56f
        	selectColSize + 'px;min-width:' + selectColSize + 'px; text-align:center;">Select</span>'; //##56f
        var colHeader=null;
        for (var i=0;i<metaData.length;i++){
            if (metaData[i].columnName.substring(0,5).toUpperCase()=='HIDE_'){
                tdClass='class="rcl-lkHeaderCell '+tdHideClass+'"';
            }
            else {
                tdClass='class="rcl-lkHeaderCell"';
            }
            colHeader=rutToTitleCase(metaData[i].columnName);
            htmlString+=('<span '+tdClass+' style="flex-basis:'+colSizes[i]+'max-width:'+colSizes[i]+'; text-align:center;">'+colHeader+'</span>'); //##81
        }
        htmlString+='</p>';

        //htmlString+='<p class="rcl-lkHeaderRow">'+cr+'<span class="rcl-lkHeaderCell" style="flex-basis:50px;max-width:50px;min-width:50px;"></span>'; //##56f
        htmlString+='<p class="rcl-lkHeaderRow">'+cr+'<span class="rcl-lkHeaderCell" style="flex-basis:' + //##56f
        	selectColSize + 'px;max-width:' + selectColSize + 'px;min-width:' + selectColSize + 'px;"></span>'; //##56f
        htmlString+='<span class="rcl-lkHeaderCell" style="flex-basis:' + //##81
    		selectColSize + 'px;max-width:' + selectColSize + 'px;min-width:' + selectColSize + 'px;"></span>'; //##81
        for (var i=0;i<metaData.length;i++){
            colHeader=rutToTitleCase(metaData[i].columnName);//###42x
            if (metaData[i].columnName.substring(0,5).toUpperCase()=='HIDE_'){//###42x
                tdClass='class="rcl-lkHeaderCell '+tdHideClass+'" ';
            }
            else {
                tdClass='class="rcl-lkHeaderCell"';;
            }
            //##82 BEGIN
            //buttonIdAsc='"'+containerId+"-dlgAsc-"+i+'"';
            //buttonIdDes='"'+containerId+"-dlgDes-"+i+'"';
            //First column (Seq#) is skipped but sorting buttons' index are tied to data order
            buttonIdAsc='"'+containerId+"-dlgAsc-"+(i+1)+'"';
            buttonIdDes='"'+containerId+"-dlgDes-"+(i+1)+'"';
            //##82 END
            htmlString+=('<span '+tdClass+' style="flex-basis:'+colSizes[i]+'max-width:'+colSizes[i]+'"> '
                + '<button id='+buttonIdAsc+' class="'+buttonColorClass
                + '" style="font-size:10px;width:30px;text-align:center;margin:0;"'
                +' data-toggle="tooltip" data-placement="top" title="Sorts by ascending values of '+colHeader+'. Existing sorts are expanded."'
                +' onclick=\'rptInjectSortDef("'+containerId+'", '+buttonIdAsc+', "'+metaData[i].columnName+'", 1); \'>&and;</button>');
            htmlString+=('<button id='+buttonIdDes+' class="'+buttonColorClass
                + '" style="font-size:10px;width:30px;text-align:center;margin:0;"'
                +' data-toggle="tooltip" data-placement="top" title="Sorts by descending values of '+colHeader+'. Existing sorts are expanded."'
                +' onclick=\'rptInjectSortDef("'+containerId+'", '+buttonIdDes+', "'+metaData[i].columnName+'", -1); \'>&or;</button>'
                +'</span>');
        }// end for listOfColumns
        htmlString+='</p>';

        htmlString+='</div>';
        htmlString+='</div>'+cr;
        //##81 BEGIN
        htmlString+='<div id="t99Lookup" class="tblArea">';
        htmlString+='<div id="t99LookupDetailWrapper" class="rcl-lkArea" style="overflow-x:scroll;" '; //Start detail wrapper
        htmlString+='onScroll="';
        htmlString+="var head = document.getElementById('t99LookupHeaderWrapper');";
        htmlString+="var detail = document.getElementById('t99LookupDetailWrapper');";
        htmlString+="head.scrollLeft = detail.scrollLeft;";
        htmlString+="if(head.scrollLeft < detail.scrollLeft) detail.scrollLeft = head.scrollLeft;";
        htmlString+="if(head.scrollLeft > detail.scrollLeft) head.scrollLeft = detail.scrollLeft;";
        htmlString+='" >';
        //htmlString+='<div id="t99Lookup" class="tblArea rcl-lkAre" style="min-width:'+totalAreaWidth+'px;width:'+totalAreaWidth+'px;">';
        htmlString+='<div style="min-width:'+totalAreaWidth+'px;width:'+totalAreaWidth+'px;">';
        //##81 END
        htmlString+='<p id="t99Row" class="tblRow rcl-lkAreaRow" >';
        //##56f BEGIN
        /*
        htmlString+='<span class="rcl-lkAreaCell" style="flex-basis:50px;min-width:50px;max-width:50px;"><button id="t99SelectButton" class="'+buttonColorClass+'" onclick="rutSelectLookupEntry(\'t99Lookup-dlg\',\''+
                    returnCols+'\',\''+returnIds+'\')">select</button></span>';
        */
        //##81 BEGIN
        htmlString +='<span id="t99lkindex" class="tblField rcl-lkAreaCell" style="flex-basis:' + selectColSize + 'px;min-width:' +
				selectColSize + 'px;max-width:' + selectColSize + 'px;"></span>';
        //##81 END
        htmlString+='<span class="rcl-lkAreaCell" style="flex-basis:' + selectColSize + 'px;min-width:' +
        		selectColSize + 'px;max-width:' + selectColSize + 'px;"><button id="t99SelectButton" class="'+buttonColorClass+'" onclick="rutSelectLookupEntry(\'t99Lookup-dlg\',\''+
        		returnCols+'\',\''+returnIds+'\')">select</button></span>';
        //##56f END
        for (var i=0;i<metaData.length;i++){
            tdStyleString=style='style="flex-basis:'+colSizes[i]+'max-width:'+colSizes[i]+'"';
            if (0<='-5,4,5,-6,2,6,8'.indexOf(metaData[i].columnType)){  //integer or decimal
                style='data-type="number" data-check="dec('+metaData[i].precision+','+metaData[i].scale+')" '+tdStyleNumber;
            }
            else if (metaData[i].precision==10){ //check for date
                for (var j=0; j<Math.min(10,data.length);j++){ //check for data
                    value=data[j][metaData[i].columnName];
                    //if (value==null){ //##56a
                    if(!value){ //##56a
                    }
                    else if ((value.length==10)&&(value.charAt(4)=='-') && (value.charAt(7)=='-')){
                        style='data-type="date" '+tdStyleString;
                        break;
                    }
                }
            }
            else {
                style=tdStyleString;
            }
            //###79 BEGIN
            if(style != tdStyleString){
            	tdStyleString += " " + style;
            }
            //###79 END
            if (metaData[i].columnName.substring(0,5).toUpperCase()=='HIDE_'){
                tdClass='class="tblField rcl-lkAreaCell '+tdHideClass;
            }
            else {
                tdClass='class="tblField rcl-lkAreaCell"';
            }
            htmlString+=('<span id="t99'+metaData[i].columnName+'" '+tdClass+' '+tdStyleString+'></span>');
        }// end for listOfColumns
        //htmlString+='</p></div>'; //##56f
        //##81 BEGIN
        //htmlString+='</p></div></div>'; //end table area //##56f
        htmlString+='</p></div>'; //end detail
        htmlString+='</div>'; //end detail wrapper
        if (data.length>50){
            htmlString+='<div id="t99paging" class="container-fluid" data-pageSize="50"></div>';
        }
        htmlString+='</div>'; //end t99Lookup tblArea
        //##81 END

        //htmlString+='</div></div>'; // end modal-body //##56f
        htmlString+='</div>'; //##56f
        $("body").append( htmlString);
        //The below makes RCL PowerTable study the template in the html and build a model
        tableSettings=tableInit("t99Lookup"); //Id of the container, we may have more than one table on the same page
        document.getElementById("t99Lookup"+tableSettings.configuration.sortDialogSearchFieldSuffix).addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                _rptCallSearch("t99Lookup");
            }
        });
        //attaches data to RCL PowerTable
        /*rptAddData("t99Lookup",data);*///Change to avoid focus on firstpage without the dialog open
        //diplays the data by copying the template as many times as the data require and fill it from the data.
       /* rptDisplayTable("t99Lookup");*///Change to avoid focus on firstpage without the dialog open

        //BEGIN ###56e
        var maxDialogWidth = $(window).width() * 0.8;
        var dialogWidth = totalAreaWidth + 52;
        dialogWidth = Math.min(maxDialogWidth, Math.max(minDialogWidth, dialogWidth));
        //END ###56e

        $("#t99Lookup-dlg").dialog({
            autoOpen: false,
            modal: true,
            draggable: true,
            resizable:false,
            //width: "auto", //###56e
            width: dialogWidth, //###56e
            height:"auto",
            title: title,
            buttons: [
                        {
                            text: "Search",
                            click: function() {
                                _rptCallSearch(containerId);
                            },
                            class: "rclLookupDlgBtn"
                        },
                        {
                            text: "Reset Search",     //####TO DO parameterisieren
                            click: function() {
                                rptResetSearch(containerId);
                            },
                            class: "rclLookupDlgBtn"
                        },
                        {
                            text: "Reset Sort",
                            click: function() {
                                rptResetSortDefinitions(containerId);
                            },
                            class: "rclLookupDlgBtn"
                        },
                        {
                            text: "Export to csv",
                            click: function() {
                                rptSaveAsCsv("t99Lookup");
                            },
                            class: "rclLookupDlgBtn"
                        },
                        {
                            text: "Cancel",
                            click: function() {
                                rutCloseDialog("t99Lookup-dlg");
                            },
                            class: "rclLookupDlgBtn"
                        },
                    ],
            open: function(event, ui){ 
            	rptAddData("t99Lookup",data);//Change to avoid focus on firstpage without the dialog open
            	rptDisplayTable("t99Lookup");//Change to avoid focus on firstpage without the dialog open
            	
            	$(this).css("overflow", "hidden"); 
            	}, //##56f
            close: function( event, ui ) {rutCloseLookupPopoverDialog('t99Lookup-dlg','t99Lookup');},// changed from t99Lookup-Dlg
        });
        $("#t99Lookup-dlg").dialog('open');
        //###55 END
    }//end inner function showLookupDialog //###42
}//end function rutOpenLookupTable
/**Retrieves selected data from server. If only one record than return columns are placed into
 * the tags of return ids. Otherwise an error message is displayed.
 * @param {string} table The name of the table to lookup. This shall be a view.
 * @param {string} returnCols A space separated list of columns which are returned from the selected record
 * @param {string} returnIds A space separated list of element Ids, which receive the value of the corresponfing column
 * @param {string} selectCols  A space separated list of columns which restrict the list
 * @param {string} selectValues A space separated list of values or element Ids, which must match the respective column. I values are empty, then the respective column is suppressed
 * @param {string} selectOperators A space separated list of operators
 * @param {string} tagId Optional. The id of a tag, which uses this function as autolookup
 * @author Ascan Heydorn
 *
 */
function rutLookupByKey(table, returnCols, returnIds, selectCols, selectValues,selectOperators, tagId){
    //###52 BEGIN
    //tagId is the id of a field which uses this function for autolookup in an onblur event
    //we now check, whether this field has input
    if (typeof tagId !='undefined' && tagId!=null && tagId!=''){
    	tagId = rutSplitRowID(tagId); //###56c
        let value=rutGetElementValue(tagId);
        if (value==null|| value.trim()==''){
        	//###77 BEGIN
//            if(document.getElementById(tagId).required){
//                let labelText='Field';
//                $("[for="+tagId+"]").each(function(){
//                    labelText=this.textContent;
//                });
//                //rutOpenMessageBox("Input missing",labelText+" field requires input","rut003-005",'',''); //###77
//            }//empty onblur element is required
//            else { // empty all return Id's
//                let returnIdArray=returnIds.split(' ');
//                for (var i=0;i<returnIdArray.length;i++){
//                    console.log("x:"+rutSplitRowID(returnIdArray[i])); //###61
//                    rutSetElementValue(rutSplitRowID(returnIdArray[i]),''); //###61
//                }
//            }
        	//If input is empty, always clear all return targets except the main field itself
        	let returnIdArray=returnIds.split(' ');
        	for (var i=0;i<returnIdArray.length;i++){
        		var elemId = rutSplitRowID(returnIdArray[i]);
        		if(elemId == tagId){
        			continue;
        		}
        		rutSetElementValue(elemId,'');
        	}
            //###77 END
            return;
        }//onblur element is empty
    }//endif check for onblur element
    //###52 END
    //###60 BEGIN
    //var wsInput = _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators);
    	//###64 BEGIN
    //var wsInput = _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators, returnCols);
    var wsInput = null;
    try{
    	wsInput = _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators, returnCols, true);
    }catch(e){
    	return;
    }
    	//###64 END
    returnCols = returnCols.replace(/\*\w*/g, "");
    //###60 END
    /* This is the JSON structure for the webservice
    {   userToken : <userToken>,  //this is now only to make the ws happy
        userData : <userData>,
        table: <tbl>,
        select: [{ column: <selectColumn>, value: <selectValue>, operator: <selectOperator>}]
    }
    */
    rutGetLookupData(wsInput, processLookupByKey);//###42


    function processLookupByKey(lookupResult){//###42
        var data=lookupResult.data;
        var metaData=lookupResult.metadata;//###42
        /*
        {
            data: [{}],
            metadata : [{columnName: String, columnType: Integer, displaySize:Integer, precision: Integer, scale: Integer}]
        }
        */
        var columns=returnCols.split(' ');
        var returnIdList=returnIds.split(' ');
        if (data.length==1){
        	var triggeringElements = [];
            for (var i=0;i<columns.length;i++){
                if (columns[i]!=''){
                    for (var j=0;j<metaData.length;j++){
                    	//if (metaData[j].columnName==columns[i]){ //###62
                        if (metaData[j].columnName==columns[i] && returnIdList[i] && returnIdList[i] != '*'){ //###62
                            //rutSetElementValue(returnIdList[i],data[0][metaData[j].columnName]); //###56c
                        	//###61 BEGIN
                        	//rutSetElementValue(rutSplitRowID(returnIdList[i]),data[0][metaData[j].columnName]); //###56c
                        	var targetId = rutSplitRowID(returnIdList[i]);
                        	rutSetElementValue(targetId,data[0][metaData[j].columnName]);
                        	triggeringElements.push($("#"+targetId)[0]);
                        	/*
                        	var event = document.createEvent('Event');
                            event.initEvent('change', true, true);
                            $("#" + targetId)[0].dispatchEvent(event);
                            */
                        	//###61 END
                            break;
                        }//column names match
                    }//endfor data columns
                }
            }//endfor return columns
            //###61 BEGIN
            for(var i=0; i<triggeringElements.length; i++){
            	//$("#" + targetId).change() //This does not propagate event to parent
                var event = document.createEvent('Event');
                event.initEvent('change', true, true);
                triggeringElements[i].dispatchEvent(event);
            }
            //###61 END
        }
        else {
        	//###77 BEGIN
        	/*
            let errorCode='rut003-'+((data.length==0)?'001':'002');
            let keys=[];
            if (wsInput.select!=null){
                for (var i=0;i<wsInput.select.length; i++){
                    keys.push(wsInput.select[i].value);
                }
            }
            let errorMessage='For '+keys.join('/')+
                            ((data.length==0)?' no data are ':' more than one record is ')+
                            'found in the table '+ rutToTitleCase(wsInput.table.substring(4));
            rutOpenMessageBox('Error on lookup of '+table.substring(4), errorMessage, errorCode,null,''); //###55
            */
        	//Either no data or more than one record : we clear all return fields except main field
        	for (var i=0;i<returnIdList.length;i++){
        		var elemId = rutSplitRowID(returnIdList[i]);
        		if(tagId == elemId){
        			continue;
        		}
        		rutSetElementValue(elemId,'');
        	}
        	//###77 END
            // not unique rut003-002 not unique
        }
    }// end inner function processGetLookupByKey  //###42
}//end function rutLookupByKey
//###37 END
/** Removes a closed lookup or popover dialog from the DOM and also removes the table settings of a lookup
 * from rut.powerTableIndex
 *
 * @param {string} dialogId The html id of the complete dialog, which needs to be removed from the DOM
 * @param {string} tableContainerId The containerId of the table, if the dialog is a lookup, otherwise null
 * @author Ascan Heydorn
 */
function rutCloseLookupPopoverDialog(dialogId, tableContainerId){
    rutCloseDialog(dialogId);
    $("#"+dialogId).remove();
    var element=document.getElementById(dialogId);
    if (element!=null){
        console.log("Lookup "+dialogId+" is still existing after closing");
        element.parentNode.removeChild(element); //element.remove does not work in IE
    }
    //remove the table from the table index
    if (tableContainerId!=null){
        for (var i=0;i<rut.powerTableIndex.length;i++){ //###40
            if (rut.powerTableIndex[i].containerId==tableContainerId){ //###40
                rut.powerTableIndex.splice(i,1);//###40
                break;
            }
        }
    }//endfor
} //enfunction rutClseLookupPopoverDialog
/**
 *
 * @param {*} dialogId
 * @private
 * @author Ascan Heydorn
 */
function rutCloseDialog(dialogId){
    $("#"+dialogId).dialog('close');
}

/**Returns the value or text of an html element depending on its tag.
 * Supported tags are input, textarea, select and everyhting contaiing text. Null is returned in any other case
 * @param { string | DomElement} elementId A html element object or the html id of an element
 * @returns {string} The value or text of the element depending on its tag.
 * @author Ascan Heydorn
 */
function rutGetElementValue(elementId){
    var element=null;
    var value=null;
    var foundRadioButton=false; //this indicates, whether we found at least one radio button, if the id contains an #
    if ((typeof elementId)=="string"){ //the elementId is an id
        element=document.getElementById(elementId);
        if (element==null) {
            //It could still be a radio button with an id like d0-emptyFull#E
            //JQuery has issues with "." and "#" in id's, so we need to work around
            var str=elementId.split('#')[0].split('.')[0];
            $("input").each(function(){
                if (this.type!="radio") {return true;} //not a radio button, continue with next
                if (elementId!=this.id.split('#')[0]) {return true;} //does not belong to this attribute
                foundRadioButton=true; //we found a radio button, so this will not create an error
                if (this.checked) {
                    value=this.value;
                    return false;
                }
            });
            if (foundRadioButton==true) {
                return value;
            }
            else {
                alert('rutGetElementValue: elementId "'+elementId+'" does not exist/does not represents a group of radio buttons');
                return null;
            }
        } //endif element==null
    }
    else { //elementId is an element
        element=elementId;
    } //end if else elementId==string
    if (element==null){
        tag=null;
    }
    else {
        tag=element.nodeName||null;
    }
    if (tag==null){
        alert('rutSetElementValue: element '+JSON.stringify(element)+' of elementId:'+elementId+' is not an html element');
        return null;
    }
    var dataType=element.getAttribute('data-type')||' '; //###66
    if (tag=='INPUT'){
        if (    (element.type=="text")        ||
                //(element.type=="number")      || //###47
                (element.type=="usernamer")   ||
                (element.type=="password")    ||
                (element.type=="date")        ||
                //(element.type=="tel")         || //###47
                (element.type=="email")       ||
                (element.type=="url")         ||
                (element.type=="time")
            )                          {
            value=element.value;
        }
        //BEGIN ##47
        else if (element.type=="number" || element.type=="tel"){
        	value=element.value;
        	if(value){
        		value = value.replace(/,/g, '');
        	}
        }
        //END ##47
        else if (element.type=="radio"){
            value=(element.checked) ? element.value : '';
        }
        else if (element.type=="checkbox"){
            value=(element.checked) ? 'Y' : '';
        }
        //###66 BEGIN
        //BEGIN CONVERT DATATYPE
        if (dataType=='number'){
        	//###69 BEGIN
        	if(element.value){
        		value=element.value.replace(/,/g, '');
        	}
        	//###69 END
        }
        else if (dataType=='date'){
            value=rutConvertDate(value,true)||''; //we need always convert to British format, since this is not a date field
        }
        else if (dataType=='time'){
            value=rutConvertTime(value,true)||'';
        }
        else {
            value=value||'';
        }
        //###66 END
    }
    else if (tag=="TEXTAREA"){
        value=element.value;
    }
    else if (tag=="SELECT"){
        if (element.options.length>0){
        	if(element.selectedIndex !== -1){//Modified by Avanti 8thSep2019
        		value=element.options[element.selectedIndex].value;
        	}
        	else{
        		value=element.options[element.selectedIndex+1].value;
        	}
        }
    }
    else {
        value=element.textContent; //just strip to bare text
    }
    return value;
}//end function rutGetElementValue

/**Sets the value of an html element. Supports input, select, textarea and all elements, which can contain text.
 * For date and time fields the value must be in ISO format
 * for number field the output is fromatted according to the dec(p,s) specification
 * If the element is not an input tag, but something else like a p, span, td tag, this function can still be used.
 * The tag requires an id. If dates or times shall be displayed, the tag requires a data_type attribute.
 * If numbers shall be displayed the tag requires a data-type="number" attraibute and a data-check="dec(p,s)" attribute.
 * Example &lt;p id="d0-num" data-type="number" data-check="dec(7,2)" &gt; with a value of 543 would display as 543.00
 *
 * @param {string | DomElement} elementId The element itself or the id of the element whose value needs to be set.
 * @param {string} value The value to be set.
 * @author Ascan Heydorn
 */
function rutSetElementValue(elementId, value){
    var element=null;
    var tag=null;
    var foundRadioButton=false;
    if ((typeof elementId)=="string"){ //the elementId is an id
        element=document.getElementById(elementId);
        if (element==null) {
            //It could still be a radio button with an id like d0-emptyFull#E
            //JQuery has issues with "." and "#" in id's, so we need to work around
            //var str=elementId.split('#')[0].split('.')[0];
            $("input").each(function(){
                if (this.type!="radio") {return true;} //not a radio button, continue with next
                if (elementId!=this.id.split('#')[0]) {return true;} //does not belong to this attribute
                foundRadioButton=true; //we found a radio button, so this will not create an error
                if (this.value==value) {
                    this.checked=true;
                }
                else {
                    this.checked=false;
                }
            });
            if (foundRadioButton==false) {
                alert('rutSetElementValue: elementId "'+elementId+'" does not exist');
                return null;
            }
            return null;
        }
    }
    else { //elementId is an element
        element=elementId;
    }
    tag=element.nodeName||null;
    var dataType=element.getAttribute('data-type')||' ';
    if (tag==null){
        alert('rutSetElementValue: elementId "'+elementId+'" does not have a tag');
        return null;
    }
    if (tag=='INPUT'){
        if (    (element.type=="text")        ||
                (element.type=="usernamer")   ||
                (element.type=="password")    ||
                (element.type=="date")        ||
                (element.type=="datetime-local")        ||
                (element.type=="email")       ||
                ((element.type=="tel") && (dataType!='number'))        ||
                (element.type=="url")         ||
                (element.type=="time")
            )                          {
                element.value=value||'';
                //###66 BEGIN
                if (dataType=='number'){
                    element.value=rutFormatNumberForElement(element, value)||'';
                }
                else if (dataType=='date'){
                    element.value=rutConvertDate(value,false)||''; //we need always convert to British format, since this is not a date field
                }
                else if (dataType=='time'){
                    element.value=rutConvertTime(value,true)||'';
                }
                else {
                    element.value=value||'';
                }
                //###66 END
        }
        else if ((element.type=='number') || (dataType=='number')){
            element.value=rutFormatNumberForElement(element, value)||'';
        }
        else if (element.type=="radio"){
            if (value==element.value){
                element.checked=true;
            }
            else {
                element.checked=false;
            }

        }
        else if (element.type=="checkbox"){
            if (value=='Y'){
                element.checked=true;
            }
            else {
                element.checked=false;
            }
        }
    }
    else if (tag=="TEXTAREA"){
        element.value=value||'';
    }
    else if (tag=="SELECT"){
        $(element).find("option").each(function(){
            if (value===$(this).val()){
                this.selected=true;
            }
            else {
                this.selected=false;
            }
        });
    }
    else { //all other tags are treated like td, p, div, span etc.
        if (dataType=='number'){
            element.textContent=rutFormatNumberForElement(element, value)||'';
        }
        else if (dataType=='date'){
            element.textContent=rutConvertDate(value,false)||''; //we need always convert to British format, since this is not a date field
        }
        else if (dataType=='time'){
            element.textContent=rutConvertTime(value,true)||'';
        }
        else {
            element.textContent=value||'';
        }
    }
} //end function rutSetElementValue

/**
 *
 * @param {*} dialogId
 * @param {*} returnCols
 * @param {*} returnIds
 * @author Ascan Heydorn
 * @private
 */
function rutSelectLookupEntry(dialogId, returnCols, returnIds ){
    var element=document.activeElement;
    var parents=rptGetParentIds(element);
    var settings=rptGetTableSettings(parents.parentContainerId);
    var prefix=settings.idPrefix;
    var r=parents.parentRowId.split('-');
    var rowSuffix='-'+r[r.length-1];
    // now we have prefix and suffix and are capable to build the elementIds.
    var columns=returnCols.split(' ');
    var returnIdList=returnIds.split(' ');
    var el=null;
    var triggeringElements = []; //###61
    for (var i=0;i<columns.length;i++){
        //if (columns[i]!=''){ //###62
        if (columns[i]!='' && returnIdList[i] && returnIdList[i] != '*'){ //###62
            el=document.getElementById(prefix+columns[i]+rowSuffix);
            fid=prefix+columns[i]+rowSuffix;
            el=document.getElementById(fid);
            //rutSetElementValue(returnIdList[i],rutGetElementValue(el) ); //###56c
            //###61 BEGIN
            //rutSetElementValue(rutSplitRowID(returnIdList[i]),rutGetElementValue(el) ); //###56c
            var targetId = rutSplitRowID(returnIdList[i]);
            rutSetElementValue(targetId, rutGetElementValue(el));
            triggeringElements.push($("#" + targetId)[0]);
            //###61 END
        }
    }
    //###61 BEGIN
    for(var i=0; i<triggeringElements.length; i++){
    	//$("#" + targetId).change() //This does not propagate event to parent
        var event = document.createEvent('Event');
        event.initEvent('change', true, true);
        triggeringElements[i].dispatchEvent(event);
    }
    //###61 END
    rutCloseLookupPopoverDialog(dialogId, parents.parentContainerId);
}//end function rutSelectLookupEntry

/**rutToggle
 * hides or Unhides an element and changes the control which has asked for this message to show 'expand', if the element
 * is hidden  or 'collapse, if it is visible.
 *
 * @param {string} sourceElementId The element which need to change its display from expand to collapse
 * @param {string} targetElementId The element which shall be hidden or displayed
 * @author Ascan Heydorn
 */
function rutToggle(sourceElementId, targetElementId) {
    var isVisible = $('#' + targetElementId).is(":visible");
    $('#' + targetElementId).slideToggle('slow'); //rollup
    if (isVisible === true) {
        $('#'+sourceElementId).text("Expand");
    }
    else {
        $('#'+sourceElementId).text('Collapse');
    }
}

/**Opens a nn modal dialog box and displays one records for review
 * Requires input of all required keys
 * @param table The name of the table for popover. This shall be a view.
 * @param selectCols  A list of columns which restrict the list
 * @param selectValues A list of values or element Ids, which must match the respective column
 * @param selectOperators An optional  list of operators to compare values with select columns
 * @param displayTitle An optional title to display instead of the default title
 * @param elementId The id of a tag, whose label was clicked to get the popove
 * @author Ascan Heydorn
 * @private
 */
function rutOpenPopoverDialog(table, selectCols, selectValues, selectOperators, displayTitle, elementId){
	//1 call web service to get the data with table, selectedCols, selectedVals
    //2 when data array is returned analyse first record in array to bild the html template
    //3 assign data to settings
    //4 Display dialog box
    //5 Close dialog box, assign return values
    if (typeof elementId!='undefined' && elementId!=null && elementId!=''){
        let value= rutGetElementValue(elementId);
        if (value==null || value==''){
            return;
        }
    }
    var title=(displayTitle)?displayTitle: rutToTitleCase(table.substring(4)+' Details'); //remove the VRL_ from the table name
    //###60 BEGIN
    //var wsInput = _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators);
    	//###64 BEGIN
    //var wsInput = _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators, returnCols);
    var wsInput = null;
    try{
    	wsInput = _rutPrepareInputForGetLookupData(table, selectCols, selectValues, selectOperators, returnCols, true);
    }catch(e){
    	return;
    }
    	//###64 END
    returnCols = returnCols.replace(/\*\w*/g, "");
    //###60 END

    rutGetLookupData(wsInput,showPopoverDialog); //###TESTING ONLY
    //showPopoverDialog(getData());
    return;

    function showPopoverDialog(lookupResult){//###42
        if (!lookupResult){
            //"Field has no value. No data found"
            return;
        }
        var data=lookupResult.data;
        var metaData=lookupResult.metadata;
        if (data.length==0){
            rutOpenMessageBox('Lookup Error', 'No data found', 'rut003-001',null,'');
            return;
        }
        if (data.length>1){
            rutOpenMessageBox('Lookup Error', 'More than one record found', 'rut003-001',null,'');
            return;
        }
        //Step 2
        data=(data.length>0)?data[0]:data;
        var listOfColumns=Object.getOwnPropertyNames(data);
        //var bodyElement = document.getElementsByTagName("body")[0]; //###51
        var bodyElement = document.body; //###51
        var htmlArray=[];
        var cr='\r\n';
        var dlgStyle='style="font-size: 10px;  border: #6A7896 1px solid;"';
        var tdStyleString='style="border: #6A7896 1px solid;padding: 6px;"';
        var tdStyleNumber='style="border: #6A7896 1px solid;padding: 6px; text-align:right;"';
        htmlArray.push('<div id="d99Popover-dlg" class="dtlHeader" '+dlgStyle+'>');
        htmlArray.push('<div></div>'); //This should be a bar
        var dataType=null;
        var style=null;

        htmlArray.push('<table id="d99Detail" class="detailArea" >');
        htmlArray.push('<thead><tr>');
        htmlArray.push('<th class="rclPopoverColumnHdr rclPopoverCol1 ">Field</th><th class="rclPopoverColumnHdr rclPopoverCol2">Value</th>');
        htmlArray.push('</tr>');
        htmlArray.push('</thead>');
        htmlArray.push('<tbody>');
        var evenOddStyle=null;
        var evenOddCounter=-1;
        for (var i=0;i<metaData.length;i++){
            if (metaData[i].columnName.substring(0,5).toUpperCase()=='HIDE_'){ //hidden columns are not displayed
                continue;
            }
            evenOddCounter++;
            evenOddStyle=((evenOddCounter%2)==0)?'rclPopoverElementEven':'rclPopoverElementOdd';
            //This piece is now for preparing proper formatting of data depending on the sql data type
            if (0<='-5,4,5,-6,2,6,8'.indexOf(metaData[i].columnType)){  //integer or decimal
                dataType='data-type="number" data-check="dec('+metaData[i].precision+','+metaData[i].scale+')" ';
                style=tdStyleNumber;
            }
            else if (metaData[i].precision==10){ //check for date
                value=data[metaData[i].columnName];
                if ((value.length==10)&&(value.charAt(4)=='-') && (value.charAt(7)=='-')){
                    dataType='data-type="date" ';
                }
                style=tdStyleString;
            }
            else {
                dataType='';
                style=tdStyleString;
            }
            htmlArray.push('<tr><td '+tdStyleString+' class="rclPopoverLabel rclPopoverCol1 '+evenOddStyle+'" >'+rutToTitleCase(metaData[i].columnName)+
                    '</td><td id="d99'+metaData[i].columnName+
                    '" class="dtlField rclPopoverElement rclPopoverCol2 '+evenOddStyle+'" '+dataType+style+' >'+'</td></tr>');
        }// endfor listOfColumns
        htmlArray.push('</tr></tbody></table>');
        htmlArray.push('</div>'); // end modal-body
        bodyElement.insertAdjacentHTML('afterbegin', htmlArray.join(cr));
        //now display the data
        rptDisplayDetailArea('d99Detail', data);

        $("#d99Popover-dlg").dialog({
            autoOpen: false,
            draggable: true,
            minWidth: 20,
            maxWidth: 300,
            minHeight: 50,
            maxHeight: 500,
            title: title,
            buttons: [
                        {
                            text: "Cancel",
                            icon: "ui-icon-heart",
                            click: function() {
                                rutCloseLookupPopoverDialog('d99Popover-dlg');
                            }
                        },
                    ],
            close: function( event, ui ) {rutCloseLookupPopoverDialog('d99Popover-dlg');},
        });
        $("#d99Popover-dlg").dialog('open');
    }// end inner function showPopoverDialog

}//end function rutOpenPopoverDialog
/**Opens a dialog
 * @param {String} dialogId HTML id of the dialog
 * @author Ascan Heydorn
 */
function rutOpenDialog(dialogId){
    $("#"+dialogId).dialog("open");
}
/**Closes a dialog
 * @param {String} dialogId HTML id of the dialog
 * @author Ascan Heydorn
 */
function rutCloseDialog(dialogId){
    $("#"+dialogId).dialog("close");
}
/** Converts a string to title case. Underscore is thereby replaced by spaces. Simple implementation.
 * For an elaborate implementation go for the JavaScript port by John Resig - http://ejohn.org/ - 21 May 2008
 * Original by John Gruber - http://daringfireball.net/ - 10 May 2008
 * License: http://www.opensource.org/licenses/mit-license.php
 *
 * @param {String} title The string to convert
 * @author Ascan Heydorn
 */
function rutToTitleCase(title){
	//var small = "(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)";
    //var punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";
    var abbreviations=";fsc;por;pol;pod;pot;del;plr;rcl;unno;imdg;dg;fcl;lcl;bb;oog;pot1;pot2;pot3;soc;coc;eta;etd;psn;"; //###56
    var workingTitle=title.toLowerCase();
    while (workingTitle.search('_')>=0){
        workingTitle=workingTitle.replace('_',' ');
    }
    var wt=workingTitle.split(' ');
    for (var i=0; i<wt.length; i++){
        if (abbreviations.indexOf(';'+wt[i]+';')>=0){ //###56
            wt[i]=wt[i].toUpperCase();
        }//###56
        else {///###56
            wt[i]=wt[i].substr(0,1).toUpperCase() + wt[i].substr(1);
        }//###56
    }
    return wt.join(' ');
} //end function rutToTitleCase
/**Prepares an email for service desk to open a ticket and includes details about the page in the email
 *
 * @param {Boolean} toServiceDesk Whether the email shall go to service desk
 * @author Ascan Heydorn
 */
function rutSendSupportEmail(toServiceDesk){
    var receiver="itservicedesk@rclgroup.com";
    //var screenId=document.getElementsByTagName("body")[0].id; //###51
    var screenId=document.body.id; //###51
    var errorCode = null;
    if (typeof rut.lastError !== 'undefined'){//###40
        if (typeof rut.lastError !== null){//###40
            errorCode = rut.lastError.code;//###40
        }//###40
    }
    var subject="DCS Issue:"+screenId+" - "+rutGetElementValue("h0-title") + (errorCode?" Last Error Code: "+errorCode : "");
    var screenUrl=window.location.pathname; //window.location.href;
    if (screenUrl.indexOf('#')>=0){
        screenUrl=screenUrl.substring(0,screenUrl.indexOf('#'));
    }
    var cr='\r\n'; //'%0D%0A';
    var body=[];
    var settings=null;
    var changes=null;
    var sort=null;;
    var action=null;
    //browser detection
    var browser=null;
    if (false || !!document.documentMode) browser='IE 6-11';
    else if (!!window.chrome && !!window.chrome.webstore){ browser="Chrome 1+";}
    else if (typeof InstallTrigger !== 'undefined'){browser="Firefox 1.0+";}
    else if (!!window.StyleMedia){browser="Edge 20+";} //end not IE
    else if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0){browser="Opera 8.0+";}
    else if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))){browser="Safari 3.0+";}
    else {browser="other";}
    body.push("TO:Service Desk");
    body.push("I have the following issue with DCS and would kindly ask for help:");
    body.push(".......................");
    body.push(".......................");
    body.push('');//###37

    if (typeof rut.lastError !== 'undefined'){ //###40
        if (typeof rut.lastError !== null){ //###40
            body.push("Last error: "+rut.lastError.code+" - "+rut.lastError.message); //###40
        }//###40
    }
    body.push("");body.push("");body.push("");body.push("");body.push("");
    body.push("ANALYSIS DATA FOR SERVICE DESK");
    body.push("Browser and localisation details");
    body.push("-----------------------------------");
    body.push("URL: "+screenUrl);
    body.push("Browser: "+browser);
    var n=1000.10;
    body.push("Language: "+navigator.language+
            ", Decimal format: "+n.toLocaleString()+
            ", Offset to UTC time zone: "+(new Date()).getTimezoneOffset());
    body.push("");
    body.push("Screen Details:");
    body.push("-----------------------------------");
    body.push("User:"+rutGetElementValue("h0-userData"));
    body.push("Screen: "+screenId+" - "+rutGetElementValue("h0-title"));
    body.push("");
    body.push("Field Values:");
    body.push("-----------------------");
    //$(".searchField,.dtlField").each(function(){ //###55
    $(".searchField").each(function(){ //###55
        body.push("id: "+this.id+", value: "+rutGetElementValue(this.id));
    });
    //###55
    /*
    if (rut.powerTableIndex){ //###40
        body.push("");
        body.push("Table Settings:");
        body.push("-----------------------");
        //for (var i=0;i<rutPowerTableIndex.length;i++){//###40
        for (var i=0;i<rut.powerTableIndex.length;i++){//###40
            //settings=rutPowerTableIndex[i].settings;//###40
            settings=rut.powerTableIndex[i].settings;//###40
            //body.push("Table: "+rutPowerTableIndex[i].containerId+" has "+settings.sortAndSearch.map.length+" rows, sort dialog "+ //###40
            body.push("Table: "+rut.powerTableIndex[i].containerId+" has "+settings.sortAndSearch.map.length+" rows, sort dialog "+ //###40
                ((settings.sortAndSearch.dialogOpen)?'is':'is not')+" open");
            if (settings.paging.hasPaging){
                body.push("...... Paging with page "+settings.paging.activePage+" of "+settings.paging.lastPageNumber+" pages shown");
            }//endif hasPaging
            //else { //###55
                //body.push("...... No paging");//###55
            //}//endelse no paging//###55
            if (settings.sortAndSearch.search){ //###55
                body.push("...... Search is "+((settings.sortAndSearch.search)?settings.sortAndSearch.search:'empty'));
            } //###55
            //now find the sorts
            if (settings.sortAndSearch.sortDefinition.length>0){
                body.push("...... Table sort:");
                for (var j=0;j<settings.sortAndSearch.sortDefinition.length;j++){
                    sort=(settings.sortAndSearch.sortDefinition[j].ascDesc==1)?'ascending':'descending';
                    body.push("...... Sort by column "+settings.sortAndSearch.sortDefinition[j].sortColumn+" "+sort);
                }
            } //endif there is sort
            //else {//###55
                //body.push("...... No table sorts");//###55
            //}   //end else no sort    //###55
            //now find the changes
            //changes=rptGetInsertsAndChanges(rutPowerTableIndex[i].containerId);//###40
            changes=rptGetInsertsAndChanges(rut.powerTableIndex[i].containerId);//###40
            if (changes.length>0){
                body.push("...... Table changes:");
                for (var j=0;j<changes.length;j++){
                    action=(changes[j].action=='i')?'insert': ( (changes[j].action=='u')?'update':'delete');
                    body.push("...... "+action+" of row id:"+changes[j].rowId);
                }
            } //endif there are changes
            //else {//###55
                //body.push("...... No table changes");//###55
            //}//###55
        }// end for each PowerTable
    }//end if there are PowerTables
    */
    var bodyText=encodeURIComponent(body.join(cr));
    window.open("https://outlook.office.com/?path=/mail/action/compose&to="+receiver+"&subject="+subject+"&body="+bodyText);
    //cc, bcc, references
}//end function rutSendSupportEmail
/** Saves a text file.
 *  @param {String} text The text to place into the file
 *  @param {String} fileName The name of the file
 *  @param {String} mimeType The mimeType of the file
 *  @author Ascan Heydorn
 *  @private
 * */
function rutSaveAsFile(text,fileName,mimeType) {
    try {
        var blob = new Blob([text],{type:mimeType});
        saveAs(blob, fileName);
    } catch (exc) {
        window.open("data:"+mimeType+"," + encodeURIComponent(text), '_blank','');
    }
}//end function rutSaveAsFile

/**Does an automatic code review and saves results into a csv file.
 *
 * @author Ascan Heydorn
 */
function rutCheckCodeQuality(){
    var colSep=',';
    var cr='\r\n';
    var element=null;
    var id=null;
    var tag=null;
    var fieldClass=null;
    var areaClass=null;
    var parent=null;
    var found=null;
    var check=null; // content of data-check
    var type=null; // type attribute
    var customTag=null; //content of data-ct
    var originalType=null; //the original tag type as stored in data-type
    var dataField=null; //id.substring(3)
    var fieldLength=0;
    const prefix='rut002-';
    if (0<=navigator.language.indexOf("de")){ colSep=';'} //German separator is ;
    //if (0<=rutGetLanguage().indexOf('de')){colSep=';'} //German column separator is ; ###18 need to improve
    /*Checks and errors
    100 base errors id's missing, classes missing, hierarchy of elements, incorrect types, comments missing
    101 body id missing
    102 id on input,select, textarea missing
    103 id first char must be from sdthf
    104 select tag with no options
    111 classlist empty on input,select,textarea, missing field class
    112 missing field class but classlist not empty (input, select, textarea)
    121 field should be in a parent area
    122 parent area should have id
    123 field and parent area have same id prefix
    180ff comment issues
    200 missing attributes like dec, min
    201 text should have len
    202 number should have dec
    203 number should have min(0)
    300 missing stdSelectTables
    400 missing std custom tags
    401 text but no rcl:text
    411ff missing specialised custom tags
    421ff missing base custom tags
    */
    report=[];
    report.push("Code Quality Issue Report");
    report.push("");
    report.push("Issue#"+colSep+'Id'+colSep+'Description');

    var children=document.childNodes;
    var commentCount=0;
    var commentHasDate = false;
    var commentHasTaskRef=false;
    var commentHasUserRef=false;
    var commentHasShortDesc=false;
    var commentHasCopyright=false;
    var commentHasAuthor=false;
    var commentHasChangeLog=false;
    var isReadOnly=false; //###30
    // Check code
    if (true){ // just to have ability to collapse the code in the editor
        for (var i=0; i<Math.min(children.length,5); i++) {
            if (children[i].nodeType == Node.COMMENT_NODE) {
                commentCount++;
                if (children[i].textContent.indexOf('## DD/MM/YY')>=0) { commentHasDate=true;}
                if (children[i].textContent.indexOf('User')>=0){commentHasUserRef=true;}
                if (children[i].textContent.indexOf('TaskRef')>=0){commentHasTaskRef=true;}
                if (children[i].textContent.indexOf('Short Description')>=0){commentHasShortDesc=true;}
                if (children[i].textContent.indexOf('Copyright RCL Public Co.')>=0){commentHasCopyright=true;}
                if (children[i].textContent.indexOf('Author')>=0){commentHasAuthor=true;}
                if (children[i].textContent.indexOf('Change Log')>=0){commentHasChangeLog=true;}
            }
        }
        if (commentCount==0){
            report.push(prefix+'180'+colSep+colSep+'Initial comment with changelog and copyright missing');
        }
        if (!commentHasCopyright){
            report.push(prefix+'181'+colSep+colSep+'Initial comment has no copyright remark (Copyright RCL Public Co.)');
        }
        if (!commentHasAuthor){
            report.push(prefix+'182'+colSep+colSep+'Initial comment has no author (Author)');
        }
        if (!commentHasChangeLog){
            report.push(prefix+'183'+colSep+colSep+'Initial comment has no change log (Change Log)');
        }
        if (!commentHasDate){
            report.push(prefix+'184'+colSep+colSep+'Initial comment has no date column in change log (## DD/MM/YY)');
        }
        if (!commentHasUserRef){
            report.push(prefix+'185'+colSep+colSep+'Initial comment has no user column in change log (User)');
        }
        if (!commentHasTaskRef){
            report.push(prefix+'186'+colSep+colSep+'Initial comment has no TaskRef column in change log (TaskRef)');
        }
        if (!commentHasShortDesc){
            report.push(prefix+'187'+colSep+colSep+'Initial comment has no description column in change log (Short Description)');
        }
    }// just to have ability to collapse the code in the editor
    //1) Check whether body as id
    //element=document.getElementsByTagName("body");//###30
    //element=document.getElementsByTagName("body")[0];//###30 //###51
    element=document.body;//###51
   //document.getElementsByTagName("body")[0].id;
    //codeReview shortcomings, new Chrome version("X: "+this.id+"/"+JSON.stringify(element));
    //if (!this.id){//###30
    if (!element.id){//###30
        report.push(prefix+'101'+colSep+colSep+'<body> has no id. Should be screen id');
    }
    //2) Step through all input, select, textarea
    var classList=null; //the classlist of a tag
    var excemptedField=false; // indicates, whether a field is excempted from certain rules
    $('div').each(function(){
        element=this;
        customTag=element.getAttribute('data-ct')||' ';
        if (classList){
            if ( classList.contains('rcl-standard-navigation-bar') &&
                 (customTag.indexOf('tabGroup')<0)
               ){
                if (!this.id){ id='<id is missing>';}
                else id=this.id;
                report.push(prefix+'429'+colSep+id+colSep+'<div> Tab groups should use custom tag <rcl:tabGroup>');
            }
            else if ( classList.contains('tab-pane') &&
                      (customTag.indexOf('tabContentPane')<0)
               ){
                if (!this.id){ id='<id is missing>';}
                else id=this.id;
                report.push(prefix+'430'+colSep+id+colSep+'<div> Tab panes should use custom tag <rcl:tabContentPane>');
            }
        }
    }); //end $('div').each.function
    //$('input, select, textarea').each(function(index){//###30
    $('input, select, textarea, button, a').each(function(index){//###30 //###32
        element=this;
        tag=this.nodeName.toLowerCase();
        excemptedField=false;
        //id missing?
        if(!this.id){
            //###32 BEGIN
            var attributeArray=[];
            for (var att, i = 0, atts = this.attributes, n = atts.length; i < n; i++){
                att = atts[i];
                attributeArray.push(att.nodeName+'='+att.nodeValue);
            }
            //###32 END
            report.push(prefix+'102'+colSep+this.nodeName+colSep+'Id missing. Attributes are:'+attributeArray.join(',')+'. Every field with data or potential user action should have an id');
        }
        id=this.id;
        //incorrect 1st char of id?
        //if ('hsdt'.indexOf(id.charAt(0))<0){ //###33
        if ('hsdtm'.indexOf(id.charAt(0))<0){ //###33
            report.push(prefix+'103'+colSep+id+colSep+'Id should start with s, d, t or h');
        }
        //field class missing?
        if (id.charAt(0)=='s') {fieldClass='searchField';areaClass='searchArea';}
        else if (id.charAt(0)=='d') {fieldClass='dtlField';areaClass='dtlArea';}
        else if (id.charAt(0)=='t') {fieldClass='tblField';areaClass='tblArea';}
        else if (id.charAt(0)=='h') {fieldClass='hdrField';areaClass='hdrArea';}
        classList=this.classList||null;
        //defining an excempted field
        if (((id.substring(3)=='pgIndicator') && (id.charAt(0)=='t') ) || //this is from PowerTable paging
            ((id.substring(3)=='pgGotoField') && (id.charAt(0)=='t')) ||  //this is from PowerTable paging
            (id.charAt(0)=='h')     //we allow the header without class
                                || //###33
            (id.charAt(0)=='m') //###33 //we allow the menue without class
            ){
                excemptedField=true;
        }
        //###33 BEGIN
        if ((tag=='select')&&(element.options.length<=0)){
            report.push(prefix+'104'+colSep+id+colSep+'<'+tag+'> should have at least on option');
        }
        //###33 END
        if (tag!='button'&&tag!='a'){ //###30
            if (!classList){
                report.push(prefix+'111'+colSep+id+colSep+'<'+tag+'> has empty classlist. Should have class '+fieldClass);
            }
            //adding a few more exceptions
            else if (classList.contains('searchField') ||
                    classList.contains('dtlField') ||
                    classList.contains('hdrField') ||
                    classList.contains('tblField') ||
                    (excemptedField)
                    ){ /* all ok */
            }
            else {
                report.push(prefix+'112'+colSep+id+colSep+'<'+tag+'> should have class '+fieldClass);
            }
            //field is in an area?
        }//end if not button or a //###30
        parent=element.parentNode;
        found=false;
        while (parent!=null){
            if (parent.classList!=null){
                if (parent.classList.contains(areaClass)) {
                    found=true;
                    break;
                }
            }
            parent=parent.parentNode;
        }
        if (!found){
            if (!excemptedField) {
                report.push(prefix+'121'+colSep+id+colSep+'<'+tag+'> should have parent of class '+areaClass);
            }
        }
        else { //now parent is the area, both should have same prefix
            if (!parent.id){
                report.push(prefix+'122'+colSep+id+colSep+'<'+tag+'> has parent of class '+areaClass+ " but this parent has no id");
            }
            else if (id.substring(0,3)!=parent.id.substring(0,3)){
                report.push(prefix+'123'+colSep+id+colSep+'<'+tag+'> has parent of class '+areaClass+ " but this parent has id "+
                    parent.id+" of different prefix");
            }
        }
        check=element.getAttribute('data-check')||' ';
        fieldLength=0;
        var n1=check.indexOf('len(');
        if (n1>=0){
            var n2=check.substring(n1+4).indexOf(')');
            if (n2>=0){
                fieldLength=check.substring(n1+4,n1+4+n2);
            }
        }
        customTag=element.getAttribute('data-ct')||' ';
        originalType=element.getAttribute('data-type')||' ';
        dataField=id.substring(3).toLowerCase();
        displayList =[]; //An array of display options
        valueList=[]; //An array of select values
        valueString=""; //the valueList joined
        displayString="";//the displayList joined
        isReadOnly= ((true==this.getAttribute('readonly')) || (this.disabled) );//###30
        if (tag=='input'){
            type=element.getAttribute('type');
            if (type=='text' || originalType=='text'){
                //text must have len
                //adding some exceptions
                if ((check.indexOf('len(')>=0) ||
                    (excemptedField)
                    ){ /* all ok */
                }
                //else { //###30
                else if ((!isReadOnly)&&(originalType!='date')) { //###30 //###44
                    report.push(prefix+'201'+colSep+id+colSep+'<'+tag+'> of type text should have len(n) defined');
                }
                //text must come from customTag text
                if ((customTag==' ')&&(!excemptedField)){
                    report.push(prefix+'401'+colSep+id+colSep+'<'+tag+'> of type text should use custom tag rcl:text or more specialised');
                }
                else if ((customTag.indexOf('text')<0)&&(!excemptedField)){
                    report.push(prefix+'401'+colSep+id+colSep+'<'+tag+'> of type text should use custom tag rcl:text or more specialised');
                }
                //no stdTag was used, check for stdTags and incorect base tags (better time, url, date, email)
                if (customTag.indexOf('std')<0){
                    if ((dataField.indexOf('pot')>=0) &&  //pot +len5 + !terminal
                        (fieldLength==5) &&
                        (dataField.indexOf('terminal')<0)
                       ) {
                        report.push(prefix+'411'+colSep+id+colSep+'<'+tag+'> of type text should use special custom tag stdPort');
                    }
                    else if ((dataField.indexOf('pol')>=0) &&
                             (fieldLength==5) &&
                             (dataField.indexOf('terminal')<0)
                            ){
                        report.push(prefix+'412'+colSep+id+colSep+'<'+tag+'> of type text should use special custom tag stdPort');
                    }
                    else if ((dataField.indexOf('pod')>=0) &&
                             (fieldLength==5) &&
                             (dataField.indexOf('terminal')<0)
                            ){
                        report.push(prefix+'413'+colSep+id+colSep+'<'+tag+'> of type text should use special custom tag stdPort');
                    }
                    else if ((dataField.indexOf('vessel')>=0) &&
                             (fieldLength==5)
                            ){
                        report.push(prefix+'414'+colSep+id+colSep+'<'+tag+'> of type text should use special custom tag stdVessel');
                    }
                    else if ((dataField.indexOf('service')>=0) &&
                             (fieldLength==5)
                            ) {
                        report.push(prefix+'415'+colSep+id+colSep+'<'+tag+'> of type text should use special custom tag stdService');
                    }
                    else if ((dataField.indexOf('fsc')>=0) &&
                             (fieldLength==3)
                            ){
                        report.push(prefix+'416'+colSep+id+colSep+'<'+tag+'> of type text should use special custom tag stdFSC');
                    }
                    //should have used tel, email, time or url
                    else if ((0<=dataField.indexOf('email')) &&
                             (fieldLength==80)
                            ){
                        report.push(prefix+'421'+colSep+id+colSep+'<'+tag+'> of type text should be custom tag <rcl:email>');
                    }
                    else if (0<=dataField.indexOf('time')){
                        report.push(prefix+'422'+colSep+id+colSep+'<'+tag+'> of type text should be custom tag <rcl:time>');
                    }
                    else if (0<=dataField.indexOf('web')){
                        report.push(prefix+'423'+colSep+id+colSep+'<'+tag+'> of type text should be custom tag <rcl:url>');
                    }
                    else if (0<=dataField.indexOf('date')){
                        report.push(prefix+'424'+colSep+id+colSep+'<'+tag+'> of type text should be custom tag <rcl:date>');
                    }
                    else if ((0<=dataField.indexOf('fax')) &&
                             (fieldLength==17)
                            ){
                        report.push(prefix+'425'+colSep+id+colSep+'<'+tag+'> of type text should be custom tag <rcl:tel>');
                    }
                    else if ((0<=dataField.indexOf('tel')) &&
                             (fieldLength==17)
                            ){
                        report.push(prefix+'426'+colSep+id+colSep+'<'+tag+'> of type text should be custom tag <rcl:tel>');
                    }
                    else if ((0<=dataField.indexOf('voyage')) &&
                             (fieldLength==10)
                            ){
                        report.push(prefix+'417'+colSep+id+colSep+'<'+tag+'> of type text special custom tag stdVoyage');
                    }
                    else if ((0<=dataField.indexOf('point')) &&
                             (fieldLength==5)
                            ){
                        report.push(prefix+'418'+colSep+id+colSep+'<'+tag+'> of type text special custom tag stdPoint');
                    }
                    else if ((0<=dataField.indexOf('del')) &&
                             (fieldLength==5) &&
                             (dataField.indexOf('haul_loc')<0)
                       ){
                       report.push(prefix+'419'+colSep+id+colSep+'<'+tag+'> of type text special custom tag stdPoint');
                    }
                }//endif no stdTag used
            }//endif type=text
            else if (type=='number' || originalType=='number'){
                //number must have dec, even disabled fields for proper display.
                if (check.indexOf('dec(')<0){
                    report.push(prefix+'202'+colSep+id+colSep+'<'+tag+'> of type number should have dec(n,m) defined');
                }
                //number must come from customTag number
                if ((customTag.indexOf('number')<0)&&(!excemptedField)){
                    report.push(prefix+'427'+colSep+id+colSep+'<'+tag+'> of type number should use custom tag number or more specialised');
                }
                //Check nonnegative numeric fields, but only if not disbled or readonly
                //if ( (0>=check.indexOf("min(0)")) && (true!=this.getAttribute('readonly')) && (!this.disabled)){//###30
                if ( (0>=check.indexOf("min(0)")) && (!isReadOnly)){//###30
                    if ((dataField.indexOf("width")>=0)  ||
                        (dataField.indexOf("height")>=0) ||
                        (dataField.indexOf("weight")>=0) ||
                        (dataField.indexOf("length")>=0) ||
                        (dataField.indexOf("measurement")>=0) ||
                        (dataField.indexOf("pkgs")>=0)      ||
                        (dataField.indexOf("breadth")>=0)   ||
                        (dataField.indexOf("bundle")>=0)    ||
                        (dataField.indexOf("co2")>=0)       ||
                        (dataField.indexOf("days")>=0)      ||
                        (dataField.indexOf("diameter")>=0)  ||
                        (dataField.indexOf("equip_vgm")>=0) ||
                        (dataField.indexOf("humidity")>=0)  ||
                        (dataField.indexOf("nitrogen")>=0)  ||
                        (dataField.indexOf("oxygen")>=0)    ||
                        (dataField.indexOf("percent")>=0)   ||
                        (dataField.indexOf("ton")>=0)       ||
                        (dataField.indexOf("qty")>=0)       ||
                        (dataField.indexOf("age")>=0)       ||
                        (dataField.indexOf("axles")>=0)     ||
                        (dataField.indexOf("extra_back")>=0)    ||
                        (dataField.indexOf("extra_front")>=0)   ||
                        (dataField.indexOf("void_slot")>=0)     ||
                        (dataField.indexOf("gross")>=0)
                    )
                    {
                        report.push(prefix+'203'+colSep+id+colSep+'<'+tag+'> of type number is likely not negative (min(0)). Please verify');
                    }
                }//endif number fields which might be nonnegative
            }//endif type number
            else if (type=='date' || originalType=='date'){
                //date must come from customTag date
                if (customTag.indexOf('date')<0){
                    report.push(prefix+'428'+colSep+id+colSep+'<'+tag+'> of type date should use custom tag date or more specialised');
                }
            }//endif type date
        }//end if <input>
        else if (tag=='select'){
            displayList=[];
            if (0>customTag.indexOf("tb-")){
                $('#'+id).find("option").each(function(){
                    displayList.push(this.text);
                    valueList.push(this.value);
                });
                displayString=';'+displayList.join(';')+';';
                valueString=';'+valueList.join(';')+';'
                if (0<=displayString.indexOf(';BKK;')){
                    report.push(prefix+'301'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable ShipmentType');
                }
                else if (0<=displayString.indexOf(';COC;')){
                    report.push(prefix+'311'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable SocCoc');
                }
                else if (0<=displayString.indexOf(';Farenheit;')){
                    report.push(prefix+'312'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable TemperatureMeasure');
                }
                else if (0<=displayString.indexOf(';Collect;')){
                    report.push(prefix+'313'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable PrepaidCollect');
                }
                else if (0<=displayString.indexOf(';local;')){
                    report.push(prefix+'314'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable PortStatus');
                }
                else if (0<=displayString.indexOf(';Canvas;')){
                    report.push(prefix+'315'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable PackageMaterial');
                }
                else if (0<=displayString.indexOf(';Origin;')){
                    report.push(prefix+'316'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable OriginDestination');
                }
                else if (0<=displayString.indexOf(';Truck;')){
                    report.push(prefix+'317'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable ModeOfTransport');
                }
                else if (0<=displayString.indexOf(';Revenue Ton;')){
                    report.push(prefix+'318'+colSep+id+colSep+'<'+tag+'> LclRateBasis');
                }
                else if (0<=displayString.indexOf(';Laden;')){
                    report.push(prefix+'319'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable LadenEmpty');
                }
                else if (0<=displayString.indexOf(';Haul.Loc;')){
                    report.push(prefix+'302'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable InlandLocationType or InlandLocationTypeWithTruck');
                }
                else if (0<=displayString.indexOf(';Imperial;')){
                    report.push(prefix+'303'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable ImperialMetric');
                }
                else if (0<=displayString.indexOf(';Merchant;')){
                    report.push(prefix+'304'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable Haulage');
                }
                else if (0<=displayString.indexOf(';Under Deck;')){
                    report.push(prefix+'305'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable Handling Instructions');
                }
                else if (0<=valueString.indexOf(';UD;')){
                    report.push(prefix+'305'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable Handling Instructions');
                }
                else if (0<=displayString.indexOf(';Percent;')){
                    report.push(prefix+'306'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable FreightSurchargeBasis');
                }
                else if (0<=valueString.indexOf(';%;')){
                    report.push(prefix+'306'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable FreightSurchargeBasis');
                }
                else if (0<=displayString.indexOf(';40FT;')){
                    report.push(prefix+'307'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable EqSize');
                }
                else if (0<=valueString.indexOf(';40;')){
                    report.push(prefix+'307'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable EqSize');
                }
                else if (0<=displayString.indexOf(';Grade A;')){
                    report.push(prefix+'308'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable EquipmentGrade');
                }
                else if (0<=displayString.indexOf(';North East;')){
                    report.push(prefix+'309'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable Direction');
                }
                else if (0<=valueString.indexOf(';NE;')){
                    report.push(prefix+'309'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable Direction');
                }
                else if (0<=displayString.indexOf(';Contract Party;')){
                    report.push(prefix+'321'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable CustomerFunction');
                }
                else if (0<=displayString.indexOf(';Consignee;')){
                    report.push(prefix+'322'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable CustomerType');
                }
                else if (0<=displayString.indexOf(';Fax;')){
                    report.push(prefix+'323'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable Communication');
                }
                else if (0<=valueString.indexOf(';DA;')){
                    report.push(prefix+'324'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable RateType');
                }
                else if (0<=valueString.indexOf(';WBHFax;')){
                    report.push(prefix+'325'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable SpecialCargo');
                }
                else if (0<=valueString.indexOf(';FN;')){
                    report.push(prefix+'326'+colSep+id+colSep+'<'+tag+'> should use stdSelecTable ContainerLoadingRemarks');
                }
            }//endif select without stdSelectTable
        }//endif <select>
        //Check on dataField
    });//end $("input"....) each
    rutSaveAsFile(report.join(cr),"Code-Review-Report.csv","text/plain;charset=utf-8");
}//end function rutCheckCodeQuality
    /*TODO
    4) Check search area data-ct=searchArea
    5) label should have for
    */

/** Converts a date to ISO (yyyy-mm-ddd) or british (dd/mm/yyyy) date format
 * Format of input date can be both
 * @param {string} input The date string to be converted
 * @param {boolean} toIsoDate true if input to be converted to ISO
 * @author Ascan Heydorn
 */
function rutConvertDate(input,toIsoDate){ //from any to ISO or british
	if (!input){return null;}
    if (input.length<10){return null;}
    if (toIsoDate){
        if (input.charAt(2)=='/'){
            return input.substring(6)+'-'+input.substring(3,5)+'-'+input.substring(0,2);
        }
        else if (input.charAt(4)=='-'){
            return input;
        }
        else {
            return null;
        }
    }// endif to iso date format
    else {
        if (input.charAt(2)=='/'){
            return input;
        }
        else if (input.charAt(4)=='-'){
            return input.substring(8)+'/'+input.substring(5,7)+'/'+input.substring(0,4);
        }
        else {
            return null;
        }
    } //end else to british date format
}//end function rutConvertDate
/** Converts a time to ISO (hh:mm) or numeric (hhmm) time format
 * Format of input date can be both
 * @param {string} input The time string to be converted
 * @param {boolean} toIsoTime true if input to be converted to ISO
 * @author Ascan Heydorn
 */
function rutConvertTime(input,toIsoTime){ //from any to ISO or numeric
    if (input.length<3){return null;}
    if (toIsoTime){
        if (input.charAt(2)==':'){
            return input;
        }
        else if (input.indexOf(':')<0){
            var txt='0000'+input; //01234567
            var l=txt.length;
            txt=txt.substring(l-4);
            return txt.substring(0,2)+':'+txt.substring(2,4);
        }
        else {
            return null;
        }
    }//endif usesIsoTime
    else {//to numeric
        if (input.charAt(2)==':'){
            return input.substring(0,2)+input.substring(3,5);
        }
        else if (input.indexOf(':')<0){
            return input
        }
        else {
            return null;
        }
    }//end else usesIsoTime
} // end function rutConvertTime
function rutOpenDropdownMenue(id, itemList, functionList, connectedElement){
    //class='invisible' 'position-absolute'
    var element=document.getElementById(id);
    if (element!=null){
        element.parentNode.removeChild(element); //The previous message was closed by cross button
    }
    itemArray=itemList.split(' ');
    functionArray=functionList.split(' ');
    html=[];
    boxWidth=0;
    cr='\r\n';

    html.push('\t<div id="'+id+'" class="rcl-dropdown-content">');
    var itemId=null //###31
    for (var i=0;i<itemArray.length;i++){
        itemId=id.substring(0,3)+itemArray[i];//###31
        //html.push('\t\t<a href="javascript:'+functionArray[i]+';">'+rutToTitleCase(itemArray[i])+'</a>');//###31
        html.push('\t\t<a id="'+itemId+'" href="javascript:'+functionArray[i]+';">'+rutToTitleCase(itemArray[i])+'</a>');//###31
        boxWidth= (itemArray[i].length>boxWidth)?itemArray[i].length:boxWidth;
    }
    html.push('\t</div> <!-- end dropdown-content -->');
    $("body").append( html.join(cr));
    element=document.getElementById(id);
    //position it better
    if (connectedElement!=null){
        //Say our longest entry is 20 and button is 5
        //The entry has lenght 5*button
        // so I need to check rect.right - (5*)
        var rectParent=connectedElement.getBoundingClientRect();
        var factor=boxWidth / (rutGetElementValue(connectedElement).trim().length +5); //5 chars for a potential icon
        var n=( rectParent.right -  (factor * (rectParent.right-rectParent.left)));
        if (n<0) {
            n=rectParent.left;
        }
        element.style.left = n+'px';
        element.style.top = (rectParent.bottom+2)+'px';

    }
    element.classList.add("d-block");
    //###34 BEGIN Add istener
    // EventListener to close drop down
    document.addEventListener( 'click', _rutDrpDwnClkListener);
    //this global variable serves to pass the connectedElement to the event handler
    //If the drop down menue was created by a click on the connectedElement, this click would be processed
    //by our event handler _rutDrpDwnClkListener
    //To avoid that it is passed to the event handler and deleted once the event handler is removed
    //_rutDrpDwnConElem = connectedElement;//###40
    rut.drpDwnConElem = connectedElement;//###40
    //###34 END
} //end function rutOpenDropdownMenue
//###34 BEGIN
/**Click event listener to close a drop down menue which was created by rutOpenDropdownMenue
 * It closes the drop down menue on every click (so when you click on an item in the drop down it closes as well). The
 * only cases where it does not close the drop down menue is, when the click was on the connectedElement
 * @private
 * @author Ascan Heydorn
*/
function _rutDrpDwnClkListener(e){
    var button = e.which || e.button;
    if ( button === 1 ) {
        //if ( (e.target!=_rutDrpDwnConElem)||(_rutDrpDwnConElem==null)){//###40
        if ( (e.target!=rut.drpDwnConElem)||(rut.drpDwnConElem==null)){//###40
            rutCloseDropdownMenue();
            document.removeEventListener( 'click', _rutDrpDwnClkListener);
            //_rutDrpDwnConElem=null;//###40
            rut.drpDwnConElem=null;//###40
        }
    }
}  //end function _rutDrpDwnClkListener
//###34 END
function rutCloseDropdownMenue(){
    var dropdowns = document.getElementsByClassName("rcl-dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('d-block')) {
            openDropdown.classList.remove('d-block');
            openDropdown.parentNode.removeChild(openDropdown);
        }
    }
}//end function rutCloseDropdownMenue
/**Checks keydown for F1,F2,F6,F8,F9 and clicks help,find,save,back,close button
 * @param {event} event
 * @author Ascan Heydorn
 */
function rutCheckKeydown(event){
    var id=null;
    //###43### BEGIN
//    debugger;
    switch (event.which){
        case 112: //F1 Help
            id="h1-help";
            fKeyDetected=true;break;
        case 113: //F2 Find
            id='find';
            fKeyDetected=true;break;
        case 117: //F6 Save
            id="h1-save";
            fKeyDetected=true;break;
        case 119: //F8 Back
            id="h1-back";
            fKeyDetected=true;break;
        case 120: //F9 Close
            id="h1-close";
            fKeyDetected=true;break;
        default: return true;
    }//endswitch detect whether F1,F2,F6,F8,F9 are pressed
    if (id!=null){
         return rutClickFKey(id,event);
    }//endif F1,F2,F6,F8,F9 pressed
    //###43 END
}//end function rutCheckKeydown
//###43 BEGIN
/**Clicks one of the Hotkeys
 * @param {h1-help|h1-save|h1-back|h1-close|find} buttonId of the button to click
 * @param {keyboardevent|null} event if function key was pressed
 * @author Ascan Heydorn
 */
function rutClickFKey(buttonId,event){
    var id=buttonId;
//    debugger;
    if (id=='find'){ //find the 'find' button
        id=null;
        var buttons=document.getElementsByTagName('button');
        for (var i=0;i<buttons.length;i++){
            if (buttons[i].id.charAt(0)=='s'&& (buttons[i].id.substring(3)=='find' || buttons[i].id.substring(3) == 'btnFind')){
                id=buttons[i].id;
                break;
            }
        }
    }//endif find the 'find' button
    if (!id) {return;}
    var element=document.getElementById(id);

    if (!element) {return;}
    if (element.style.display == "none"){return;}
    if (element.disabled==true) {return;}
    if (element.readOnly==true) {return;}
    element.click();
    if (event!=null) {event.preventDefault();return false; }
}//end function rutClickFKey
/**Opens a simple message box and displays a message. Depending on input an ok and/or cancel button
 * are displayed and upon pressing these buttons certain functions are called and the box is closed.
 * When messageCode is present it is assumed to be an error and message and messageCode are placed into the global
 * variable rut.lastError={ code:messageCode, message:message}<br>
 * rutUtilities provides the following standard error codes
 * <table>
 * <tr><td>rut003-001</td><td>Data not found</td><td>Used by rutLookupByKey</td></tr>
 * <tr><td>rut003-002</td><td>More then one record found</td><td>Used by rutLookupByKey</td></tr>
 * <tr><td>rut003-003</td><td>Input < minimum</td><td>Used by rutCheckMinMaxValue</td></tr>
 * <tr><td>rut003-004</td><td>Input > maximum</td><td>Used by rutCheckMinMaxValue</td></tr>
 * <tr><td>rut004-nnn</td><td>Input > maximum</td><td>Oracle errors returned by lookup webservice</td></tr>
 * </table>
 *
 * @param {String} title The title of the message box
 * @param {String} message The message being displayed.
 * @param {String} messageCode Optional code for display and emailing
 * @param {String} cancelFunction If present a cancel button is displayed and this function is executed before the box is closed
 * @param {String} okFunction If present an ok button is displayed and this function is executet before the box is closed
 * @author Ascan Heydorn
 * @private
 */
//function rutOpenMessageBox(title, message, cancelFunction, okFunction){
//function rutOpenMessageBox(title, message, messageCode, cancelFunction, okFunction){
function rutOpenMessageBox(title, message, messageCode, cancelFunction, okFunction,
		cancelLabel, okLabel, showCloseButton){ //###76
	//###76 BEGIN
	if(showCloseButton === undefined){
		showCloseButton = true;
	}
	//###76 END
    var html=[];
    var cr='\r\n';
    //###38 Handle case where multiple error messages are displayed
    if ($('#by-area').dialog('isOpen')!=true){ //###38
        var element=document.getElementById('by-message');
        if (element!=null){
//            element.parentNode.removeChild(element); //The previous message was closed by cross button
        	 element.parentNode.remove();//###75
        }
        html.push('<div id="by-area" title="'+title+'" style="display:none;">');
        if ((messageCode!=null)&&(messageCode!='')){
            //html.push('<p id="by-messageCode" class="text-center bg-info lead pb-0 mb-0 text-white" >'+messageCode+'</p>'); //mark //###41
            //html.push('<p id="by-messageCode" class="rcl-messageCode" >'+messageCode+'</p>'); //mark //###41 //###76
            //_rutLastError = {code:messageCode, message:message}; //###40
            rut.lastError = {code:messageCode, message:message}; //###40
        }
        else {
            //_rutLastError=null; //###40
            rut.lastError=null; //###40
        }
        //html.push('<p id="by-message" class="text-center bg-info pt-0 mt-0 pb-0 text-white" >'+message+'</p>');  //mark //###41
        html.push('<p id="by-message" class="rcl-message" >'+message+'</p>');  //mark //###41 //###76
        html.push('</div><!-- end of message dialog by-area -->');
        var buttons=[];
        //if (okFunction!=null){ //###76
        if (okFunction){ //###76
            //buttons.push( { text: "ok", //###76
        	buttons.push( { text: (okLabel ? okLabel : "Ok"), //###76
                            id: "by-pbOk", //###31
                            click: function(){
                                //eval(okFunction); //###76
                        		//###76 END
                                $(this).dialog("close");
                                this.parentNode.removeChild(this);
                                //###76 BEGIN
                        		if(typeof okFunction === 'string'){
                        			eval(okFunction);
                        		}else{
                        			okFunction();
                        		}
                            }
                        });
        } //endif okFunction
        //###76 BEGIN
        else if(okLabel){
        	buttons.push( { text: okLabel,
                id: "by-pbOk", //###31
                click: function(){
                        $(this).dialog("close");
                        this.parentNode.removeChild(this);
                }
            });
        }
        //###76 END
        //if (cancelFunction!=null){ //###76
        if (cancelFunction){
            //buttons.push({  text:"cancel", //###76
        	buttons.push({  text: (cancelLabel ? cancelLabel : "Cancel"), //###76
                            id: "by-pbCancel", //###31
                            click: function(){
                                //eval(cancelFunction); //###76
                                $(this).dialog("close");
                                this.parentNode.removeChild(this);
                                //###76 BEGIN
                        		if(typeof cancelFunction === 'string'){
                        			eval(cancelFunction);
                        		}else{
                        			cancelFunction();
                        		}
                        		//###76 END
                            }
                        });
        } //endif cancel
        //###76 BEGIN
        else if(cancelLabel){
        	buttons.push({  text: cancelLabel, //###76
                id: "by-pbCancel", //###31
                click: function(){
                        $(this).dialog("close");
                        this.parentNode.removeChild(this);
                }
            });
        }

        if(!okFunction && !okLabel && !cancelFunction && !cancelLabel){
        	buttons.push( { text: (okLabel ? okLabel : "Ok"), //###76
                id: "by-pbOk", //###31
                click: function(){
                        $(this).dialog("close");
                        this.parentNode.removeChild(this);
                }
            });
        }
        //###76 END
        $("body").append( html.join(cr));
        $("#by-area").dialog({
            autoOpen: true,
            modal: true,
            draggable: false,
            resizable: false,
            autoResize: true,
            position: {my: "center", at: "center", of: window } ,
            minWidth: 300,
            minHeight: 50,
            buttons: buttons,
            //###76 BEGIN
            open: function(event, ui) {
            	if(!showCloseButton){
//            		$("#dialog-confirm .ui-dialog-titlebar-close").hide();
            		$(".ui-dialog-titlebar-close").hide();
            	}else{
//            		$("#dialog-confirm .ui-dialog-titlebar-close").show();
            		$(".ui-dialog-titlebar-close").show();
            	}
            }
            //###76 END
        });//end $("#by-area").dialog
    //###38 BEGIN
    }//endif dialog is not already open
    else {
        html.push('<p class="rcl-messageCode">----</p>');
        if ((messageCode!=null)&&(messageCode!='')){
            //html.push('<p class="text-center bg-info lead pb-0 mb-0 text-white" >'+messageCode+'</p>'); //mark //###41
            html.push('<p class="rcl-messageCode" >'+messageCode+'</p>'); //mark //###41
            //_rutLastError = {code:messageCode, message:message};  //###40
            rut.lastError = {code:messageCode, message:message};  //###40
        }
        //html.push('<p class="text-center bg-info pt-0 mt-0 pb-0 text-white" >'+message+'</p>');  //mark //###41
        html.push('<p class="rcl-messageCode" >'+message+'</p>');  //mark //###41
        $("#by-message").after(html.join(''));
    }
    //###38 END
}//end function rutOpenMessageBox

function rutGetLookupData(lookupRequest, callbackFunction){
	
    //THIWAT1 ADD 20200228
//    var portUrl = ':8080';
//    if(location.hostname.indexOf('dolphin')>=0){
    	portUrl = '';
//    }
    //THIWAT1 END 20200228
    
    var url=(location.hostname.indexOf('rclgroup')>=0)?
        //(location.hostname + ':8080/HLPWSWebApp/rclws/help/genericHelp') : //###56d
    		
    	('http://' + location.hostname + '/HLPWSWebApp/rclws/help/genericHelp') : //###56d
        'http://marlin-ce9.rclgroup.com/HLPWSWebApp/rclws/help/genericHelp';
    //###60 BEGIN
    var processor = lookupRequest.processor;
    if(processor){
    	delete lookupRequest.processor;
    }
    //###60 END
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(lookupRequest) ,
        complete: function(){ $("body").find('.loading').remove(); }, //###65
        //success: callbackFunction, //###60
        //###60 BEGIN
        success: function(response, status, jqxhr){
        	//###81 BEGIN
        	var data = response.data;
        	if(data){
        		for(var i=0; i<data.length; i++){
        			data[i].lkindex = (i+1);
        			if(processor){
        				//Process each field in returned data
        				for(var j=0; j<processor.length; j++){
                    		if(data[i].hasOwnProperty(processor[j].column)){
                    			//Process depends on type
                    			if(processor[j].type.indexOf('d') >= 0){
                    				var col = processor[j].column;
                    				var dateStr = data[i][col] + "";
                    				data[i][col] = dateStr.substring(0,4) + "-" +
                    					dateStr.substring(4,6) + "-" + dateStr.substring(6,8);
                    			}
                    		}
                    	}
        			}
        		}

        		if(processor){
        			var metadata = response.metadata;

        			//Process metadata
            		if(metadata){
            			for(var i=0; i<metadata.length; i++){
            				for(var j=0; j<processor.length; j++){
            					if(metadata[i].columnName == processor[j].column){
            						//Process depends on type
            						if(processor[j].type.indexOf('d') >= 0){
            							//Framework check precision == 10 for date, also turns its type to VARCHAR2
            							metadata[i].columnType = 12; //###79
            							metadata[i].precision = 10;
            						}
            						//##63 BEGIN
            						if(processor[j].type.indexOf('h') >= 0){
            							metadata[i].columnName = "HIDE_" + metadata[i].columnName;
            						}
            						//##63 END
            					}
            				}
            			}
            		}
        		}
        	}
        	/*
        	if(processor){
        		var data = response.data;
        		var metadata = response.metadata;
        		//Process each field in returned data
        		if(data){
        			for(var i=0; i<data.length; i++){
            			for(var j=0; j<processor.length; j++){
                    		if(data[i].hasOwnProperty(processor[j].column)){
                    			//Process depends on type
                    			if(processor[j].type.indexOf('d') >= 0){
                    				var col = processor[j].column;
                    				var dateStr = data[i][col] + "";
                    				data[i][col] = dateStr.substring(0,4) + "-" +
                    					dateStr.substring(4,6) + "-" + dateStr.substring(6,8);
                    			}
                    		}
                    	}
            		}
        		}
        		//Process metadata
        		if(metadata){
        			for(var i=0; i<metadata.length; i++){
        				for(var j=0; j<processor.length; j++){
        					if(metadata[i].columnName == processor[j].column){
        						//Process depends on type
        						if(processor[j].type.indexOf('d') >= 0){
        							//Framework check precision == 10 for date, also turns its type to VARCHAR2
        							metadata[i].columnType = 12; //###79
        							metadata[i].precision = 10;
        						}
        						//##63 BEGIN
        						if(processor[j].type.indexOf('h') >= 0){
        							metadata[i].columnName = "HIDE_" + metadata[i].columnName;
        						}
        						//##63 END
        					}
        				}
        			}
        		}
        	}
        	*/
        	//###81 END
        	callbackFunction(response, status, jqxhr);
        },
        //###60 END
        error: function(result) {
            rutOpenMessageBox("Lookup Error",result.responseText, 'rut004-'+result.readyState,null,''); //###50
            /*
            {"readyState":4,"responseText":"java.sql.SQLSyntaxErrorException: ORA-00942: table or view does not exist\n","status":200,"statusText":"OK"}
            */
        }
    });
}//end function rutGetLookupData
/** Returns a date in ISO or numeric format after an optional calculation.
 *
 * @param {String|ISODateString} expectedDate An ISO Date | "today" | "first|last of previous|this|next month"
 * @param {integer} offset Number of days to add to expected date. Could be negative
 * @param {String} format  "ISO" (2018-11-06" | "num" (20181106)
 * @author Ascan Heydorn
 */
function rutGetDate(expectedDate, offset, format){
    var result=null;
    var date=null;
    if (expectedDate=="today"){
        date=new Date();
        result=date.toISOString();
    }
    else if (expectedDate.charAt(4)=='-' && expectedDate.charAt(7)=='-'){
        date=new Date(expectedDate);
    }
    else {
        //firsT/last of previous/this/next month
        date=new Date();
        var dayOffset=0;
        var monthOffset = null;
        if (expectedDate.indexOf("first")>=0){monthOffset=0;}  //0
        else if (expectedDate.indexOf("last")>=0){
            monthOffset=1;
            dayOffset=-1;}
        else {return null;}
        if (expectedDate.indexOf("previous")>=0) {
            monthOffset=monthOffset-1;
        }
        else if (expectedDate.indexOf("next")>=0) {
            monthOffset=monthOffset+1;
        }
        else if (expectedDate.indexOf("this")>=0) {}
        else {return null;}
        date.setMonth(date.getMonth()+monthOffset);
        date.setDate(1+dayOffset);
    }
    date.setDate(date.getDate()+(offset||0));
    if ((!format)||(format=='ISO')) {return date.toISOString().substring(0,10);}
    else if (format="num") {return ( (date.getFullYear() * 10000) + ((1+date.getMonth())*100) + date.getDate() );}
}//end function rutGetDate
/** Opens the tool menue for a page. This menue allows to create a ticket or run the self service code review
 *  @author Ascan Heydorn
 */
function rutToolMenue(){
    //attach drop down menue to the tool button
    var toolBtn=document.getElementById('h1-tool');
    //rutOpenDropdownMenue('m0-area', 'Open_ticket Self_service_code_review Cancel', 'rutSendSupportEmail(true) rutCheckCodeQuality() rutCloseDropdownMenue()'); //###43
    //rutOpenDropdownMenue('m0-area', 'Open_ticket Available_Hot_Keys Self_service_code_review Cancel', //###54
    rutOpenDropdownMenue('m0-area', 'Open_ticket Available_Hot_Keys Self_service_code_review '+'<u>Version:</u>_'+rutGetElementValue("h2-versionheader").replace(/ /g,'_')+' Cancel', //###54
                        'rutSendSupportEmail(true) '+
                        'rutShowHotKeys() '+
//                        'rutCheckCodeQuality() rutCloseDropdownMenue()',//###54
                        'rutCheckCodeQuality() rutCloseDropdownMenue()'+ //###54
                        ' ',//###54
                        toolBtn );     //###43
}//end function rutToolMenue
/**Shows defintion of hot keys
 * @author Ascan Heydorn
 * @private
 */
//###43 BEGIN
function rutShowHotKeys(){
    rutOpenDropdownMenue("m0-HotKeys",
        'F1_Help F2_Find F6_Save F8_Back F9_Close',
        "rutClickFKey('h1-help') rutClickFKey('find') rutClickFKey('h1-save') rutClickFKey('h1-back') rutClickFKey('h1-close')",
        document.getElementById('h1-tool'));
}//end function rutShowHotKeys
//###43 END
//###35 BEGIN
//This is the begin of dialog flow support
/**Runs as onload function of a page and
 * <ol>
 * <li>Makes the back button visible unless this is not suppressed by setBackButton=false parameter</li>
 * <li>Protects the source page</li>
 * <li>Registers an event which makes sure, that the source page is again unprotected when this page is left or closed</li>
 * <li>Reads search part of url and turns it into the object rut.urlParms.</li>
 * <li>Parses the value o the rclp parameter. Thereby the characters =;& are recreated</li>
 * <li>Process the list of 'to' instructions in the sequence of their creation</li>
 * </ol>
 * For dialog flows the most important parameter is the parameter rclp, which contains the dialog flow definition.
 * For more details on the structure of rclp see the documentation of rutDialogFlow
 * @parm type {string} goto|2Tab|nTab
 * */
function rutProcessUrl(){
    if (window.location.search==null) {return;}
    if (window.location.search.length==0) {return;}
    var search=decodeURI(window.location.search.substring(1));
    var assArr=search.split(/&;/); //split by & or ; usually & but W3C recommends now ;
    var assignmentArray = [];
    //Step 1 Read URL parameters into memory
    //rut.urlParms has now each parameter as a property.
    //obvious JSON parameters are parsed, others not.
    for (var i=0;i<assArr.length;i++){
        assignmentArray= assArr[i].split('=');
        if (assignmentArray.length<2){
            continue;
        }
        //if (typeof rutUrlParms == 'undefined'){//###40
        if (typeof rut.urlParms == 'undefined'){//###40
            //rutUrlParms=new rutUrlParameter();//###40
            rut.urlParms=new rutUrlParameter();//###40
        }
        if ((assignmentArray[1].charAt(0)=='{') && (assignmentArray[1].charAt(assignmentArray[1].length-1)=='}')){
            let assignmentValue=null;
            //rclp parameter, here we convert special characters back
            if (assignmentArray[0]=='rclp'){
                assignmentValue=assignmentArray[1].replace(/~sc~/g, ';').replace(/~eq~/g, '=').replace(/~am~/g, '&');
            } //endif rclp parameter
            else {
                assignmentValue=assignmentArray[1];
            }
            parmValue=JSON.parse(assignmentValue);
            //eval('rutUrlParms.'+assignmentArray[0]+'=parmValue');//###40
            rut.urlParms[assignmentArray[0]]=parmValue;//###40
        }
        else {
            //eval('rutUrlParms.'+assignmentArray[0]+'="'+assignmentArray[1]+'"');//###40
            //rut.urlParms[assignmentArray[0]]='"'+assignmentArray[1]+'"';//###40
            rut.urlParms[assignmentArray[0]]=assignmentArray[1];//###40

        }
    } //endfor assArr
    //if (typeof rutUrlParms != 'undefined'){//###40
    if (typeof rut.urlParms != 'undefined'){//###40
        //if (typeof rutUrlParms.rclp != 'undefined'){//###40
        if (typeof rut.urlParms.rclp != 'undefined'){//###40
            //rutUrlParms.processTo();//###40
            rut.urlParms.processTo();//###40
            return; //###53
        }
    } //endif rut.urlParms exist
    //###53 BEGIN
    if (typeof autorun == 'function'){
        autorun();
    }
    //###53 END
}//end function rutProcessUrl
/**This function is called by pressing the back button or by program, when the target page shall close and the flow shall return
 * to the source page. It does the following
 * <ol>
 * <li>If available it will call at first a function "prepareBack". If this functions returns false, it will stop.
 * The function "prepareBack" can be used to do 'do you wish to save' checks.</li>
 * <li>After that the backInstructions are executed.</li>
 * <li>Finally it checks, whether a function "postProcessBack" is available and will run it.</li>
 * </ol>
 * @author Ascan Heydorn
 */


function rutBack(){
	
    var prepareResult=false; //could be true, false or 'no back action'
    if (typeof prepareBack == 'function'){
        prepareResult=prepareBack();
        if (prepareResult==false){ return;  }
    }//end if prepareBack exists as a function
    //if (typeof rutUrlParms != 'undefined'){//###40
    if (typeof rut.urlParms != 'undefined'){//###40
        //if (typeof rutUrlParms.rclp != 'undefined'){//###40
        if (typeof rut.urlParms.rclp != 'undefined'){//###40
            //if (rutUrlParms.rclp.flowType.toLowerCase()=='2tab'){//###40
            if (rut.urlParms.rclp.flowType.toLowerCase()=='2tab'){//###40
                // remove the modal blocker from the source page if it is still open
                if (window.opener!=null){
                    var element=window.opener.document.getElementById("d99-modalArea");
                    if (element!=null) {
                        element.parentNode.removeChild( element );
                    }
                }
                if (prepareResult!='no back action'){
                    //rutUrlParms.processBack();//###40
                    rut.urlParms.processBack();//###40
                    if (typeof postProcessBack == 'function'){
                        postProcessBack();
                    }
                }
                
                //film adjust fix exp case
                window.open('','_parent',''); //to trick Firefox see http://csharpdotnetfreak.blogspot.com/2008/11/javascript-windowclose-does-not-work-in.html
                window.close();
                window.opener.focus();
            }//endif 2tab
            else if (rut.urlParms.rclp.flowType.toLowerCase()=='1tab'){
                let dialog=new rutDialogFlow('back',rut.urlParms.rclp.sourceUrl,false);
                dialog.openPage();
          
        }//endif rut.urlParms.rclp defined
    }//endif rut.urlParms defined
	}
}//end function rutBack
/**This object has all parameters passed in the url to a page as a property. All property values are as given in the url but the
 * value of the parameter rclp (which is the rutDialogFlow object) is parsed.
 * The functions of this object are capable to understand the instructions of rutDialogFlow and execute them in the target or
 * source page environment.
 * @author Ascan Heydorn
 */
function rutUrlParameter(){
    /**When a dialog flow opens the 'to' page, this functions process field assignments and actions
     * @author Ascan Heydorn
     */
    this.processTo = function(){
        this.processFlowType();
        //###36 BEGIN
        //flowType back is the return from a 1Tab flow
        //In this case we need to
        //restore the page
        //let the target  page do the back processing
        //close the target page
        if (this.rclp.flowType.toLowerCase()=='back'){
            let prepareBackResult=rut.urlParms.rclp.prepareBackResult; //we need to save it
            //because after rutRestorePage rut.urlParms.rclp is restored as well
            if (window.opener==null){
                return; //this was an incorrect use of this parameter
            }
            rutRestorePage(window.opener);
            if(prepareBackResult!='no back action'){
                window.opener.rut.urlParms.processBack();
                if (typeof window.opener.postProcessBack == 'function'){
                    window.opener.postProcessBack();
                }
            }
            window.opener.close();
            return;
        }
        this.rclp.windowOpener=window.opener;
        this.rclp.sourceUrl=window.opener.location.href.split('?')[0];
        if (this.rclp.flowType.toLowerCase()=='1tab'){
            this.saveSourcePage();
        }
        this.processAllInstructions(this.rclp.to);
        if (this.rclp.flowType.toLowerCase()=='1tab'){
            window.opener.open(null,'_self'); //this tricks the source window to believe, that it was created by js, otherwise we could not close it.
            try {
                window.opener.close();
            }
            catch (err){
                console.log("too fast");
            }
            //we need a timer here

        } //###36 END
    } //end function processTo
    /**A function of rutUrlParameter. When a dialog flow closes the 'to' page, this functions process field assignments and actions on the oriinating page
     * @author Ascan Heydorn
     */
    this.processBack = function(){
        this.processAllInstructions(this.rclp.back);
    }//end function process back
    /**A function of rutUrlParameter. Process all 'to' or 'back' instructions.
     * @param {array} insructionArray
     * @author Ascan Heydorn
     */
    this.processAllInstructions = function(instructionArray){
        if (typeof instructionArray == 'undefined'){
            return;
        }
        for (var i=0;i<instructionArray.length;i++){
            this.processFlowInstruction(instructionArray[i]);
        }
    }//end function processAllInstructions
    /**A function of rutUrlParameter. Processes one instruction. An instruction could be a field, action or table
     * @param {window} win The window in whose context the instructions shall be executed
     * @param {field|action|table} flowInstruction
     * @author Ascan Heydorn
     */
    this.processFlowInstruction = function(flowInstruction){
        var windowOpener=this.rclp.windowOpener;
        if (flowInstruction.class=='field'){
            eval(this.convertInstrToStatement(flowInstruction));
        }//end if field instruction
        else if (flowInstruction.class=='action'){ //should better work with src-clk, trg-jsx
            var expression=flowInstruction.expr;
            var type=flowInstruction.type.substring(4,7);
            var win= (flowInstruction.type.substring(0,3)=='src')?window.opener:window;//###39
            //var win= (flowInstruction.type.substring(0,3)=='src')?windowOpener:window;//###39
            if (type=='clk'){
                win.document.getElementById(expression).click();
            }
            else if (type=='jsx'){
                win.eval(expression);
            }
        }//end else if action instruction
        else if (flowInstruction.class=='table'){ //src
            var id=null;
            var sort=[];
            id=flowInstruction.id;
            sort=flowInstruction.sort;
            //var win= (flowInstruction.type.substring(0,4)=='src')?window.opener:window; //###39
            var win= (flowInstruction.type.substring(0,4)=='src')?windowOpener:window; //###39
            if (flowInstruction.search!=null){
                win.rptSetSearchString(id, flowInstruction.search);
                win.rptSearch(id);
            }
            if (sort!=null){
                for (var i=0;i<sort.length;i++){
                    win.rptAddSingleSortDefinition(id, sort[i].columnName,sort[i].ascDesc);
                }
                win.rptSortPowerTable(id, false);
            }
            if (flowInstruction.page!=null){
                win.rptGotoPage(id, flowInstruction.page);
            }
        }//end else if table
        else if (flowInstruction.class=='setting'){
            //Dialog flow does not let you add a setting to the back array
            //var win= (flowInstruction.type=='src')?window.opener:window;  //###39
            var win= (flowInstruction.type=='src')?windowOpener:window;  //###39
            var id=flowInstruction.tabGroupId;
            var tabName=flowInstruction.activeTabName;
            var tag=null;
            var found=false; //wether we found the desired tab
            var activeNavLink=null;//the actually active nav-link
            var activeTabPane=null;//the actually-active tab-pane
            var newActiveTabId=id.substring(0,3)+tabName.replace(/[^a-zA-Z0-9]/g, '');
            win.$('#'+id).find('.tab-pane,.nav-link').each(function(){
                tag=this.nodeName.toLowerCase();
                if (tag=='a'){
                    if (this.classList.contains('active')){
                        activeNavLink=this;
                    }
                    if(tabName==rutGetElementValue(this)){
                        found=true;
                        this.classList.add('active');
                    }
                    else {
                        this.classList.remove('active');
                    }
                }//enddif <a> tag
                else if (tag=='div'){
                    if (this.classList.contains('active')){
                        activeTabPane=this;
                    }
                    if(this.id==newActiveTabId){
                        found=true;
                        this.classList.add('active');
                    }
                    else {
                        this.classList.remove('active');
                    }
                }//endif <div> tag
            });
            if (!found){ //if the new tab was not found, then we take reinsert the existing activ tab
                activeNavLink.classList.add('active');
                activeTabPane.classList.add('active');
            }
        }//endif flowInstruction setting
    }//end function processFlowInstruction
    /**A function of rutUrlParameter. Converts a flowInstruction of class field into an executable js expression
     * @param {flowInstruction} flowInstruction
     * @author Ascan Heydorn
     */
    this.convertInstrToStatement =function(flowInstruction){
        //setWindow=(flowInstruction.type.substring(0,3)=='src')?'window.opener':'window';//###39
        setWindow=(flowInstruction.type.substring(0,3)=='src')?'windowOpener':'window';//###39
        setObject=flowInstruction.type.substring(4,7);
        //valueWindow=(flowInstruction.type.substring(8,11)=='src')?'window.opener':'window';//###39
        valueWindow=(flowInstruction.type.substring(8,11)=='src')?'windowOpener':'window';//###39
        valueObject=flowInstruction.type.substring(12,15);
        var constantValue=null;
        let id=(flowInstruction.id.charAt(0)=='&')?flowInstruction.id.substring(1): '"'+flowInstruction.id+'"';
        let lRow=null;
        if (flowInstruction.lRow!=null){
            lRow=(flowInstruction.lRow.charAt(0)=='&')?flowInstruction.lRow.substring(1): '"'+flowInstruction.lRow+'"';

        }
        let rRow=null;
        if (flowInstruction.rRow!=null){
            rRow=(flowInstruction.rRow.charAt(0)=='&')?flowInstruction.rRow.substring(1): '"'+flowInstruction.rRow+'"';
        }
        let value=(flowInstruction.value.charAt(0)=='&')?flowInstruction.value.substring(1): '"'+flowInstruction.value+'"';

        //evaluate a constant. If it is enclosed in "" or {} or if its !isNaN or null, true,false, then it  is taken as is
        //Otherwise it is enclosed in ""
        if (valueObject=='con'){
            let val=flowInstruction.value;
            let l=val.length-1;
            if ((val.charAt(0)=='"')&&(val.charAt(l)=='"')) {constantValue=val;}
            else if (!isNaN(val)) {constantValue=val;}
            else if ("false;true;null".indexOf(val)>=0) {constantValue=val;}
            else if ((val.charAt(0)=='{')&&(val.charAt(l)=='}')) {constantValue='JSON.parse('+val+')';}
            else {
                constantValue='"'+val+'"';
            }
        } //endif valueObject is constant
        let leftMapObj={ pse:setWindow+'.rutSetElementValue('+id+'',
                         psa:setWindow+'.rptSetSingleAreaValues('+id+'',
                         pre:setWindow+'.rptSetRowElementValue('+lRow+','+id+'',
                         pra: (lRow!='end')?
                                //setWindow+'.rptReplOneRowOfData('+id+','+lRow +'':
                                setWindow+'.rptReplOneRowOfData(null,'+id +'':
                                setWindow+'.rptReplLastRowOfData('+id+'',
                         var:setWindow+'.'+flowInstruction.id
                        }
        let rightMapObj={ pse:valueWindow+'.rutGetElementValue('+value+')',
                          psa:valueWindow+'.rptGetDataFromSingleArea('+value+')',
                          pre:valueWindow+'.rptGetRowElementValue('+rRow+','+value+')',
                          pra:valueWindow+'.rptGetModelDataOfRowId(null,'+value+')',
                          var:valueWindow+'.'+flowInstruction.value,
                          con:constantValue
                        }
        if (setObject=='var'){separator="=";}
        else separator=',';
        if ('var;con'.indexOf(setObject)>=0){closingPiece='';}
        else if (setObject=='pra'){closingPiece=',true)';}
        else {closingPiece=')';}
        let instruction=leftMapObj[setObject]+separator+rightMapObj[valueObject]+closingPiece;
        return instruction;
    }// end convertInstrToStatement
    /**A function of rutUrlParameter. Ensures that after a new page is opened as result of a flow the old page
     * is protected (in case of flowType 2Tab) and
     * displays the back button on the new page, unless the parameter setBackButton is false..
     *  @author Ascan Heydorn
     */
    this.processFlowType = function(){
        //Make the source page modal
        if (this.rclp.flowType.toLowerCase() =='2tab'){
            let bodyElement; //the element of the body tag of the window.opener
            let htmlStr='<div id="d99-modalArea" class="rcl-modal"></div>';
            //protect window.opener
            if ((window.opener!=null)&&(window.opener!==window)){
                bodyElement=window.opener.document.getElementsByTagName("body")[0];
                bodyElement.insertAdjacentHTML('afterbegin', htmlStr);
            }
            //register a beforeunload event which frees window.opener on leave
            window.addEventListener("beforeunload", function (event) {
                // remove the modal blocker from opener
                var element=window.opener.document.getElementById("d99-modalArea");
                if (element!=null) {
                    element.parentNode.removeChild( element );
                }
            });
        } //endif 2Tab to protect/unprotect window.opener
        //Make back button visible for link flows
        if ('1tab;2tab;ntab'.indexOf(this.rclp.flowType.toLowerCase() )>=0){
            let setBackButton = true; // = make back button available
            if (typeof this.rclp.setBackButton != 'undefined'){
                setBackButton =this.rclp.setBackButton;
            }
            if (setBackButton){
                document.getElementById('h1-back').style.display = 'inline';
            } //end else setBackButton is not defined or true
        }//end if we are on a link flow
    }//end function processFlowType
    this.saveSourcePage = function(){
        let bodyId=window.opener.document.body.id;
        if (rut.browser.isChrome||rut.browser.isFirefox){ //Chrome, firefox et al. can work with DOM node.cloe
            rut.sourceModel = { dom:'', appGlobVars:{}};//every save overwrites the previous one
            rut.sourceModel.dom=window.opener.$('#'+bodyId).clone(true,true);
        }
        else { //IE has problems with cloned nodes
            rut.sourceModel = { html:'', appGlobVars:{}, scrollTops:[], headerData:[]};
            rut.sourceModel.html=window.opener.document.body.innerHTML;
            //We save the header data of the new page. They should be identical to the old page but the session id may have changed
            rut.sourceModel.headerData.push({id:'h0-title',value:rutGetElementValue('h0-title')});
            rut.sourceModel.headerData.push({id:'h0-userData',value:rutGetElementValue('h0-userData')});
            rut.sourceModel.headerData.push({id:'h2-versionheader',value:rutGetElementValue('h2-versionheader')});
            //only default values
            rut.sourceModel.headerData.push({id:'h3-userToken',value:document.getElementById('h3-userToken').defaultValue});
            rut.sourceModel.headerData.push({id:'h3-userId',value:document.getElementById('h3-line').defaultValue});
            rut.sourceModel.headerData.push({id:'h3-trade',value:document.getElementById('h3-trade').defaultValue});
            rut.sourceModel.headerData.push({id:'h3-agent',value:document.getElementById('h3-agent').defaultValue});
            rut.sourceModel.headerData.push({id:'h3-fscCode',value:document.getElementById('h3-fscCode').defaultValue});
            //Saving detail data into rut
            window.opener.$('.searchArea, .dtlArea').each(function(){
                window.opener.rptGetDataFromSingleArea(this.id);
                console.log("saving "+this.id);
            });
            //TODO Now we need to get the data from the changed rows of tables
            //TODO Get the scroll bar positions
        }
        //Save the global variables
        let globsArray=window.opener.rutGetGlobalVariables();
        for (let i=0;i<globsArray.length;i++){
            rut.sourceModel.appGlobVars[globsArray[i]]=window.opener[globsArray[i]];
        }
    }//end function saveSourcePage
    //###36 END
    //###36 BEGIN
    //This function is called from the new page and reloads the page from the data saved in the old page
    function rutRestorePage(fromWindow){
        //restore DOM
        let bodyId=document.body.id;
        if (rut.browser.isChrome||rut.browser.isFirefox){ //Chrome, firefox et al. can work with DOM node.clone
            $('#'+bodyId).replaceWith(fromWindow.rut.sourceModel.dom);
        }
        else { //IE
            document.body.innerHTML=fromWindow.rut.sourceModel.html;
        }
        //Restore global variables
        for (let globalVariable in fromWindow.rut.sourceModel.appGlobVars){
            window[globalVariable]=fromWindow.rut.sourceModel.appGlobVars[globalVariable];
        }
        //In case of IE we need restore the data and also the scrollbar
        if (!(rut.browser.isChrome||rut.browser.isFirefox)){
            //Now we need to reload the data
            if (typeof rut.powerDetails!= 'undefined'){
                if (typeof rut.powerDetails.length!= 'undefined')  {
                    for (var ix=0; ix<rut.powerDetails.length;ix++){
                        rptDisplayDetailArea(rut.powerDetails[ix].id,rut.powerDetails[ix].object);
                    }
                }//endif powerDetails is an array
            }//endif powerDetails exist
            if (typeof rut.powerTableIndex!= 'undefined'){
                if (typeof rut.powerTableIndex.length!= 'undefined')  {
                    for (var i=0; i<rut.powerTableIndex.length;i++){
                        rptClearDisplay(rut.powerTableIndex[i].containerId);
                        rptDisplayTable(rut.powerTableIndex[i].containerId);
                    }
                } //endif powerTableIndex is an array
            }//endif powerTableIndex exists
        } //endif IE
        rutInitArea('body'); //Now we init all events
        //now we attach the search and sort events to the power tables
        if (typeof rut.powerTableIndex!= 'undefined'){
            if (typeof rut.powerTableIndex.length!= 'undefined')  {
                let containerId=null;
                for (var i=0; i<rut.powerTableIndex.length;i++){
                    containerId=rut.powerTableIndex[i].containerId;
                    if (containerId!="t99Lookup") {
                        document.getElementById(containerId).addEventListener(
                                'contextmenu',
                                function(e) {
                                    rptShowSortControl(containerId);
                                    e.preventDefault();
                                },
                                false);
                    } //endif not a lookup
                } //endfor each powerTable
            } //endif powerTableIndex is an array
        }//endif powerTableIndex exists
        return;
    }//end function rutRestorePage
}//end object rutUrlParameter
/**Creates an array of global variables. System variables of Chome, Firefox, IE and Bootstrap are excluded
 * Also a number of variables from this program are excluded.
 * @author Ascan Heydorn
 */
function rutGetGlobalVariables(){
    return Object.keys(window).filter(checkRelevantGlobalVariable);

    function checkRelevantGlobalVariable(variableName){
        //IE polyfill for Object.entries
        if (!Object.entries) {
            Object.entries = function( obj ){
                var ownProps = Object.keys( obj ),
                    i = ownProps.length,
                    resArray = new Array(i); // preallocate the Array
                while (i--)
                resArray[i] = [ownProps[i], obj[ownProps[i]]];
                return resArray;
            };
        }
        if (typeof window[variableName] === 'function'){ return false;}
        //exclude a number of chrome variables + bootstrap
        //exclude IE variables
        else if (variableName.substring(0,15)=='__BROWSERTOOLS_'){return false;}
        else if (variableName.charAt(0)=='$'){return false;} //"$0","$1","$2","$3","$4"
        else if(variableName=='console'){return false;}
        //exclude a number of chrome variables + bootstrap
        else if ('bootstrap,parent,opener,length,frames,location,self,chrome,ietab,'.indexOf(variableName+',')>=0)
            {return false;}
        else if ('fromWindow,domJSON,tableSettings,data,parmValue,setWindow,setObject,element,trgWindow,'.indexOf(variableName+',')>=0)
            {return false;}
        else if ('valueWindow,valueObject,separator,closingPiece,tag,hasParentArea,hasParentRow,'.indexOf(variableName+',')>=0)
            {return false;}
        else if (Object.entries(
            Object.getOwnPropertyDescriptor(window, variableName)).filter(
                function(e){ //we want only usual variables
                    if (('writable,enumerable,'.indexOf(e[0])>=0) && e[1]) {return true;}
                    else {return false;}
                    }).length===2)
            {return true;}
        else {return false;}
    }//end inner function checkRelevantGlobalVariable
} //end function rutGetGlobalVariables
/**A programmed flow from a source page to a target (to) page. Such a flow can <br>
 * <ul>
 * <li>Set html elements and js variables on the target page</li>
 * <li>Click buttons or execute js code on the target page</li>
 * <li>Let the target page assign values to elements and js variable on the source page (back) upon return</li>
 * <li>Let the target page click on buttons on the source page or execute js code on the source page.</li>
 * </ul>
 * <br>
 * In order to create a dialog flot the following needs to be done:<br>
 * <ul>
 * <li>Create a new rutDialogFlow object with flowType and url</li>
 * <li>Add to it instructions which shall be exceuted on the target page after the target page is opened ("to" instructions)</li>
 * <li>Add to it instructions which shall be exceuted on the siurce page after the return from the target page ("back" instructions)</li>
 * <li>Open the page</li>
 * </ul><br>
 * There are 3 types of instructions
 * <ul>
 * <li>Field instructions. These instruct to set the values of tags or js variables to fixed values, values of other tags or expressions</li>
 * <li>Action instrucions. They instruct the execution of a js statement or clicking on a button.</li>
 * <li>Table instructions. They define the display settings of tables like displayed page, search, sort</li>
 * </ul><br>
 * Field instructions describes essentially an assignment like a = b.
 * Each of both parts is described by 4 pieces:<br>
 * <table>
 * <tr><td>Whether the data is on the source or target page</td><td>src|trg</td></tr>
 * <tr><td>What type of object it is</td><td>element|row|area|rowElement|rowArea|variable|constant</td></tr>
 * <tr><td>The row the object is on (if any)</td><td>rowId|null</td></tr>
 * <tr><td>The id (object on the left side of equation) or value 8object on the right side of equation) object</td><td>Left side: id|variable name, rightSide:id| expression | constant</td></tr>
 * </table><br>
 *

 * Structure of dialog flow object definition<br>
 * -----------------------------------------------------
 * <ul>
 * <li>&lt;dialogFlowDefinition&gt; ::= "{" &lt;flowType&gt; [ "," &lt;setBackButton&gt;] [ "," &lt;to&gt;] [ "," &lt;back&gt; ] "}".</li>
 * <li>&lt;flowType&gt; ::= "goto" | "2Tab" | "nTab".</li>
 * <li>&lt;setBackButton&gt; ::= "true" | "false".</li>
 * <li>&lt;to&gt; ::= "[" &lt;instructions&gt; "]".</li>
 * <li>&lt;from&gt; ::= "[" &lt;instructions&gt; "]".</li>
 * <li>&lt;instructions&gt; ::= &lt;instruction&gt; | &lt;instruction&gt; "," &lt;instructions&gt;.</li>
 * <li>&lt;instruction&gt; ::= &lt;field&gt; | &lt;action&gt; | &lt;table&gt; | &lt;setting&gt;.</li>
 * <li>&lt;field&gt; ::= "{ class: field ," &lt;fieldType&gt; "," &lt;id&gt; ["," &lt;leftRow&gt; ] "," &lt;value&gt;  [ "," &lt;rightRow&gt; ] "}".</li>
 * <li>&lt;fieldType&gt; ::= "type:" &lt;leftPage&gt; "-" &lt;leftObjectType&gt; "-" &lt;rightPage&gt; "-" &lt;rightObjectType&gt;.</li>
 * <li>&lt;leftPage&gt; ::= &lt;page&gt;.</li>
 * <li>&lt;rightPage&gt; ::= &lt;page&gt;.</li>
 * <li>&lt;page&gt; ::= "src" | "trg".</li>
 * <li>&lt;leftObjectType&gt; := "pse" | "psa" | "pre" | "pra" | "var".</li>
 * <li>&lt;rightObjectType&gt; ::= "con" | &lt;leftObjectType&gt;.</li>
 * <li>&lt;id&gt; ::= "id:" &lt;idValue&gt;.</li>
 * <li>&lt;leftRow&gt; ::= "lRow:" &lt;rowValue&gt;.</li>
 * <li>&lt;rightRow&gt; ::= "rRow:" &lt;rowValue&gt;.</li>
 * <li>&lt;value&gt; ::= "value:" &lt;valueText&gt;.</li>
 * <li>&lt;action&gt; ::= "{ class: action ," &lt;actionType&gt; "," &lt;expression&gt; "}".</li>
 * <li>&lt;actionType&gt; ::= "type:" &lt;page&gt; "-" &lt;kindOfAction&gt;.</li>
 * <li>&lt;kindOfAction&gt; ::= "clk" | "jsx".</li>
 * <li>&lt;table&gt; ::= "{ class:table" ["," search:&lt;search&gt;] ["," sort: &lt;sortList&gt;] ["," page: &lt;pageNumber&gt; ] "}".</li>
 * <li>&lt;search&gt; ::= &lt;string&gt;.</li>
 * <li>&lt;sortList&gt; ::= &lt;sort&gt; | &lt;sort&gt; "," &lt;sortList&gt;</li>
 * <li>&lt;sort&gt; ::= "{" &lt;column&gt; "," &lt;sortDirection&gt; "}".</li>
 * <li>&lt;column&gt; ::= "{ columnName:" &lt;string&gt; ", ascDesc:" &lt;ascDesc&gt; "}".</li>
 * <li>&lt;ascDesc&gt; ::= "1"|"-1".</li>
 * <li>&lt;pageNumber&gt; ::= &lt;number&gt;.</li>
 * <li>&lt;idValue&gt; ::= &lt;htmlId&gt; | &lt;jsVariablename&gt;.</li>
 * <li>&lt;rowValue&gt; ::= &lt;htmlId&gt;.</li>
 * <li>&lt;valueText&gt; ::= &lt;htmlId&gt; | &lt;jsExpession&gt;.</li>
 * </ul>
 *
 * @param {string} url The url of the target page
 * @param {'goto'|'2Tab'|'nTab'|'back'} flowType '2Tab' or 'nTab'. '2Tab' protects the source page until the target page is closed. 'nTab' leaves
 * the source page unprotected so that the same dialog can be done many times.
 * @param {true|false|null} setBackButton Indicates whether on 2Tab or nTab flow the back button of the target page should be activated by the flow or not. Default is true.
 * @author Ascan Heydorn
 */
function rutDialogFlow(flowType, url,setBackButton){
    this.flowType = flowType;
    this.url      = url;
    this.setBackButton = setBackButton;
    this.to       = [];
    this.back     = [];
    this.settings = null;
    /**A function of rutDialogFlow. Adds a definition to a dialog flow, which values shall be set after the new page was opened
     * @param {'src'|'trg'} lPage Whether the object to set is on the source or target page
     * @param {'element'|'variable'|'area'|'rowElement'|'rowAre'} lObjType The kind of object to set
     * @param {string|null} lRow The row in a table on which the object to set is placed
     * @param {string} id   The id of a html element or the name of a js variable to receive a value.
     * @param {'src'|'trg'} rPage Whether the object containing the value is on the source or target page
     * @param {'element'|'variable'|'area'|'rowElement'|'rowArea'|'constant'} rObjType The kind of object containing the value
     * @param {string|null} rRow The row in a table on which the object containing the value is placed
     * @param {string} value    The value to be assigned
     * @param {string } type Consists of 4 parts: <setWindow>-<setObject>-<fromWindow>-<fromObject>
     * @author Ascan Heydorn
     */
    this.addToField = function(lPage, lObjType, lRow, id, rPage, rObjType, rRow, value){
        this.to.push(this.convertField(lPage, lObjType, lRow, id, rPage, rObjType, rRow, value));
    }
    this.addBackField = function(lPage, lObjType, lRow, id, rPage, rObjType, rRow, value){
        this.back.push(this.convertField(lPage, lObjType, lRow, id, rPage, rObjType, rRow, value));
    }
    this.convertField = function (lPage, lObjType, lRow, id, rPage, rObjType, rRow, value){
        if (';src;trg;'.indexOf(';'+lPage+';')<0){ alert("addTo/BackField: Parameter lPage must be src|trg");return;}
        if (';src;trg;'.indexOf(';'+rPage+';')<0){ alert("addTo/BackField: Parameter rPage must be src|trg");return;}
        if (';element;variable;area;rowElement;rowArea;'.indexOf(';'+lObjType+';')<0){ alert("addBackField: Parameter lObjType must be element|variable|area|rowElement|rowArea");return;}
        if (';element;variable;area;rowElement;rowArea;constant;'.indexOf(';'+rObjType+';')<0){ alert("addBackField: Parameter rObjType must be element|variable|area|rowElement|rowArea|constant");return;}
        const t={element:'pse',variable:'var',area:'psa',rowElement:'pre',rowArea:'pra',constant:'con'};
        let type=lPage+'-'+t[lObjType]+'-'+rPage+'-'+t[rObjType];
        let r = {class:'field',type:type,id:id,value:value};
        if (lRow!=null){r.lRow=lRow;}
        if (rRow!=null){r.rRow=rRow;}
        return r;
    }
    this.convertAction = function(page,actionType,expression){
        if (';src;trg;'.indexOf(';'+page+';')<0){ alert("addAction: Parameter page must be src|trg");return;}
        if (';click;expression;'.indexOf(';'+actionType+';')<0){ alert("addAction: Parameter actionType must be click|expression");return;}
        const t={click:'clk',expression:'jsx'};
        return {class:'action', type:page+'-'+t[actionType],expr:expression};
    }
    /**A function of rutDialogFlow. Adds a definition to the dialog flow, which button on the target page shall be clicked (or js code shall be executed) after the link.
     * @param {'src'|'trg'} page Whether the action shall be exceuted on the source or target page
     * @param {'click' | 'expression' } actionType Whether id is an html tag ('click'/default) or js code
     * @param {string} expression   The id of a html element or the name of a js variable to receive a value.
     * @author Ascan Heydorn
     */
    this.addToAction = function(page,actionType,expression){
        this.to.push(this.convertAction(page,actionType,expression));
    }
    /**A function of rutDialogFlow. Adds a definition to the dialog flow, which button on the source page shall be clicked
     * (or js code shall be executed) after returning from the flow back to the source page.
     * @param {'src'|'trg'} page Whether the action shall be exceuted on the source or target page
     * @param {'click' | 'expression' } actionType Whether id is an html tag ('click'/default) or js code
     * @param {string} expression   The id of a html element or the name of a js variable to receive a value.
     * @author Ascan Heydorn
     */
        this.addBackAction = function(page,actionType,expression){
        this.back.push(this.convertAction(page,actionType,expression));
    }
    /**A function of rutDialogFlow. Adds a table setting to the dialog flow. It will search and/or sort the given table in the targe page and will potentially show a certain page number
     * @param {string} id   The id of the table area
     * @param {string} search A search string which should be applied to the table
     * @param {array} sort An array of sort definitions to be applied. A single sort definition is {columnName, ascDesc} where ascDesc is 1/-1
     * @param {number} page A page which should be displayed
     * @author Ascan Heydorn
     */
    this.addToTable = function(type,id, search, sort, page){
        //id:= <src|trg> := in which page the table settings shall be set
        this.to.push({class:"table",type:type,id:id,search:search,sort:sort,page:page});
        /*
        sort is an array of objects {columnName, ascDesc}
        */
    }
    this.addBackTable = function(type,id, search, sort, page){
        //id:= <src|trg> := in which page the table settings shall be set
        this.back.push({class:"table",type:type,id:id,search:search,sort:sort,page:page});
        /*
        sort is an array of objects {columnName, ascDesc}
        */
    }
    /**Adds display parameters for the target page
     * settings := { tabGroupId, activeTabName}
     * tabGroupId:= The id of the tab group
     * activeTabName:= The name of the active tab
     * @param {settings} settings
     * @author Ascan Heydorn
     */
    this.addToSettings = function(settings){
        this.to.push({class:"setting", type:"trg", tabGroupId:settings.tabGroupId, activeTabName:settings.activeTabName});
    }
    /**Adds display parameters for the souce page
     * settings := { tabGroupId, activeTabName}
     * tabGroupId:= The id of the tab group
     * activeTabName:= The name of the active tab
     * @param {settings} settings
     * @author Ascan Heydorn
     */
    this.addBackSettings = function(settings){
        this.back.push({class:"setting", type:"src", tabGroupId:settings.tabGroupId, activeTabName:settings.activeTabName});
    }
    /**A function of rutDialogFlow. Starts the dialog flows by opening the target page and passing the dialog flow
     * defintion to it as a JSON object in the parameter rclp. In order to avoid interference with the rest of the
     * url the characters =;& are replaced within the JSON by ~eq~,~sc~,~am~.
     * @author Ascan Heydorn
     */
    this.openPage = function(){
        var rclp={flowType: this.flowType};
        if ('goto,2tab,ntab'.indexOf(this.flowType.toLowerCase())<0){
            alert('Flow type '+this.flowType+' not supported');
            return;
        }
        if (this.setBackButton!=null){
            rclp.setBackButton=this.setBackButton;
        }
        var name=null;
        if (this.to.length>0){
            rclp.to=this.to;
        }
        if (this.back.length>0){
            rclp.back=this.back;
        }
        if (this.settings){
            rclp.settings = this.settings;
        }
        if (this.flowType=='nTab'){ name='_blank';}
        var expr=encodeURI(JSON.stringify(rclp)).replace(/;/g,'~sc~').replace(/=/g,'~eq~').replace(/&/g, '~am~');
        var targetUrl = this.prepareUrl(url, expr); //###58
        if (name==null){
            //window.open(this.url+'?rclp='+expr);//###39
            //trgWindow=window.open(this.url+'?rclp='+expr);//###39 //###58
            trgWindow=window.open(targetUrl); //###58
        }
        else {
            //window.open(this.url+'?rclp='+expr,name);  //###39
            //trgWindow=window.open(this.url+'?rclp='+expr,name);  //###39 //###58
            trgWindow=window.open(targetUrl, name); //###58
        }
       return trgWindow; //###39
    }//end function openPage



    //###58 BEGIN
    var rclServletReservedParams = ['service', 'select', 'target', 'pageAction', 'moduleCd', 'linkPage', 'passThrough', 'userId'];
    function isRclServletReservedParam(key){
    	for(var j=0; j<rclServletReservedParams.length; j++){
			if(key === rclServletReservedParams[j]){
				return true;
			}
		}
    	return false;
    }//end function isRclServletReservedParam

    this.packForRclServlet = true;
    this.rclServletPackedParamKey = 'params';
    this.rclServletParamDelimiter = '$$$';
    this.rclServletEqDelimiter = '~~';
    /**
     * Prepare dialogFlow url based on setting. If packForRclServlet is set, url will be packed
     * so that only parameters known to Rcl servlet architecture and packed parameter key exist
     * in the url. IMPORTANT: target srv/svc must also unpack parameters and append them
     * to the target url on server side to make thing work properly.
     */
    this.prepareUrl = function(url, dialogFlowExpr){
    	if(url.indexOf('?') < 0){
        	url = url+'?rclp='+dialogFlowExpr;
        }else{
        	url = url+'&rclp='+dialogFlowExpr;
        }
    	if(this.packForRclServlet){
    		var paramStartIndex = url.indexOf('?');
    		var urlWithoutParams = url.substring(0, paramStartIndex);
    		var paramPairs = url.substr(paramStartIndex + 1).split('&');
    		//Build up url again
    		url = urlWithoutParams + '?';
    		var alreadyAppendParam = false;
    		var packingParams = '';
    		for(var i=0; i<paramPairs.length; i++){
    			//Skip malformed param pairs
    			var assignOpIndex = paramPairs[i].indexOf('=');
    			if(assignOpIndex < 0){
    				continue;
    			}
    			//Append reserved param to url immediately
    			var paramKey = paramPairs[i].substring(0, assignOpIndex);
    			if(isRclServletReservedParam(paramKey)){
    				if(alreadyAppendParam){
    					url += '&';
    				}
    				url += paramPairs[i];
    				alreadyAppendParam = true;
    				continue;
    			}
    			var paramValue = paramPairs[i].substring(assignOpIndex+1);
    			if(packingParams.length > 0){
    				packingParams += this.rclServletParamDelimiter;
    			}
    			packingParams += paramKey + this.rclServletEqDelimiter + paramValue;
    		}
    		//Append packed params
    		if(alreadyAppendParam){
				url += '&';
			}
    		url += this.rclServletPackedParamKey + '=' + packingParams;
    	}
    	return url;
    }//end function prepareUrl
    //###58 END

}//end object dialogFlow
    //###35 END
    //###46 BEGIN
/**Event handler for all collapse events. It is applied during initialization to all elements of class 'collapse' and searches for
 * the next tblArea below. It then expands this tblArea by the height of the collapsed element.
 * @param {event} event
 * @author Ascan Heydorn
 */
function rutHandleCollapseEvent(event){
    var searchArea=event.target;
    var tblArea=null;
    var tRect=null;
    var newHeight=0;
    if (event.type=='hide'){
        searchArea.setAttribute('data-originalHeight',searchArea.clientHeight);
        //Now find the tblArea to expand
        tblArea=getNextTableArea(searchArea);
        if (tblArea==null) {event.stopPropagation();return;}
        tRect=tblArea.getBoundingClientRect();
        newHeight=Math.round(tRect.bottom-tRect.top+searchArea.clientHeight);
        tblArea.style.height=newHeight+'px';
        console.log('hide:'+tblArea.id+"/"+tblArea.style.height+' originalHeight:'+searchArea.getAttribute('data-originalHeight'));
    }//end if hide
    if (event.type=='show'){
        let originalHeight=searchArea.getAttribute('data-originalHeight');
        if (isNaN(originalHeight)){originalHeight=0;}
        //Now find the tblArea to expand
        tblArea=getNextTableArea(searchArea);
        if (tblArea==null) {event.stopPropagation();return;}
        tRect=tblArea.getBoundingClientRect();
        newHeight=Math.round(tRect.bottom-tRect.top-originalHeight);
        tblArea.style.height=newHeight+'px';
        console.log('show:'+tblArea.id+"/"+tblArea.style.height+' originalHeight:'+searchArea.getAttribute('data-originalHeight'));
    }//end else if 'show'

    function getNextTableArea(searchArea){
        var searchBottom=searchArea.getBoundingClientRect().bottom;
        var bestTop=100000;
        var tblAreaArray=document.getElementsByClassName('tblArea');
        var rect=null;
        var tblArea=null;
        //We now look for the next table area below of our collapsed area
        for (var i=0;i<tblAreaArray.length;i++){
            rect=tblAreaArray[i].getBoundingClientRect();
            if (rect.top<searchBottom){continue;}
            else if (rect.top<bestTop){
                bestTop=rect.top;
                tblArea=tblAreaArray[i];
            }
        }//end for all tblAreas
        console.log("found:"+tblArea.id);
        return tblArea;
    }
}// end function rutHandleCollapseEvent
//###46 END


//###56c BEGIN
/**
 * Convert provided id (format: {elementName}#-RowId-#) of powertable row's element into actual element id
 */
function rutSplitRowID(id){
	var idAll = id.split(id.substring(0,3));
	if(idAll.length > 2){
		return id.substring(0,3) + idAll[1] + '-' + idAll[2].split('-')[1];
	}
	else{
		return id;
	}
}
//###56c END

//###64 BEGIN

function _findElementLabel(elementId){
	var label = $('#' + elementId).prev().html();
	if(!label){
		label =  $('#' + elementId).prop('name');
	}
	if(!label){
		label =  $('#' + elementId).parent().parent().parent()[0].firstElementChild.innerText;
	}
	return label;
}

//var svaProcessorDelimiter = "*|";
var svaProcessorMin = /^min\[\d+\]/;

//Parse sco processor and return object storing processor information
//Returned object can contain following fields:
//main:true indicates that this is key column (requires LIKE for lookup and = for autolookup)
//min:Number indicates minimum value length for this column
function _rutParseLookupSelectProcessor(processors){
	processors = processors.split(',');
	var result = {};
	for(var i=0; i<processors.length; i++){
		var processor = processors[i];
		if(svaProcessorMin.test(processor)){
			var min = parseInt( processor.substring(4, processor.indexOf(']')) );
			result.min = min;
		}else if(processor.indexOf("main") >= 0){
			result.main = true;
		}
	}
	return result;
}

function validateDateField(elementId) {  //###111
	
	var inputText=document.getElementById(elementId);
	
	var messageInvalidDate = "Invalid input date!";

    var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    // Match the date format through regular expression
    if(inputText.value.match(dateformat)){
    	//  document.form1.text1.focus();
    	//Test which seperator is used '/' or '-'
	    var opera1 = inputText.value.split('/');
	    var opera2 = inputText.value.split('-');
	    lopera1 = opera1.length;
	    lopera2 = opera2.length;
	    // Extract the string into month, date and year
	    if (lopera1 > 1){
	    	var pdate = inputText.value.split('/');
	    }
	    else if (lopera2 > 1){
	    	var pdate = inputText.value.split('-');
	    }
	    var dd = parseInt(pdate[0]);
	    var mm  = parseInt(pdate[1]);
	    var yy = parseInt(pdate[2]);
	    // Create list of days of a month [assume there is no leap year by default]
	    var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
	    if (mm==1 || mm>2){
	    	if (dd>ListofDays[mm-1]){
	    		dialogFadeout(messageInvalidDate);
	    		$(inputText).val("");
  
	    	}
	    }
	    if (mm==2){
	    	var lyear = false;
	    	
		    if ( (!(yy % 4) && yy % 100) || !(yy % 400)) {
		    	lyear = true;
		    }
		    if ((lyear==false) && (dd>=29)){
		    	dialogFadeout(messageInvalidDate);
		  	  	$(inputText).val("");
		    }
		    if ((lyear==true) && (dd>29)){
		  	  dialogFadeout(messageInvalidDate);
		  	  $(inputText).val("");
		    }
	    }
    }
    else{
    	if(inputText.value != "") {
	  	  	$(inputText).val("");
	  	  	dialogFadeout(messageInvalidDate);
    	}
  	}
    return true;
}

/**
 * Validate if lookup webservice is allowed to be called with provided input or not.
 * If not, show message box to notify user
 * @param input sva from lookup input
 * @param {boolean} suppressMessageBox If true, message box will not show when validation fail
 * @returns boolean indicating if input passes validation or not
 */
/*
function rutValidateInputForLookup(input, suppressMessageBox){
	var sva = input.split(' ');
	var element=null;
    var value=null;
    var arg;
	for(var i=0; i<sva.length; i++){
		var processorIndex = sva[i].indexOf(svaProcessorDelimiter);
		if(processorIndex >= 0){
			var processor = rco[i].substring(processorIndex+1);
			if(svaProcessorMin.test(processor)){
				arg = parseInt( processor.substring(4, processor.indexOf(')')) );
				element = document.getElementById(rutSplitRowID(sva[i]));
		        value = (element==null)?sva[i]: rutGetElementValue(element);
		        if(value.length < arg){
		        	if(!suppressMessageBox){
		        		rutOpenMessageBox("Warning","The field required at least "+arg+" characters to lookup","rut010-001",'','');
		        	}
		        	return false;
		        }
			}
		}
	}
}

function _cleanSvaProcessor(svaInput){
	var index = svaInput.lastIndexOf(svaProcessorDelimiter);
	if(index >= 0){
		svaInput = svaInput.substring(0,index);
	}
	return svaInput;
}
*/
//###64 END