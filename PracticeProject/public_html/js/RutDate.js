/*-----------------------------------------------------------------------------------------------------------  
RutDate.js
------------------------------------------------------------------------------------------------------------- 
Copyright RCL Public Co., Ltd. 2007 
-------------------------------------------------------------------------------------------------------------
Author Sopon Dee-udomvongsa 10/10/07
- Change Log ------------------------------------------------------------------------------------------------  
## DD/MM/YY -User-     -TaskRef-      -Short Description  
-----------------------------------------------------------------------------------------------------------*/

//*****************************************************************************//
//************************ Begin: Date Comparison *****************************//
//*****************************************************************************// 

<!-- Original:  Richard Gorremans (RichardG@spiritwolfx.com) -->
<!-- Web Site:  http://www.spiritwolfx.com -->

<!-- This script and many more are available free online at -->
<!-- The JavaScript Source!! http://javascript.internet.com -->

function compareDate(strEffDate,strExpDate,strDateFormat){
    var intStartDate = convertDateToInteger(strEffDate, strDateFormat);
    var intEndDate = convertDateToInteger(strExpDate, strDateFormat);
    var intDiff = intEndDate - intStartDate;
    
    if (intDiff >= 0) {
        return false;
    } else {
        return true;
    }
}

function compareDateRange(strEffDate, strExpDate, strDateFormat, maxRange) {
    var isError = false;
    if (maxRange != 0) {
        var intStartDate = convertDateToDate(strEffDate, strDateFormat);
        var intEndDate = convertDateToDate(strExpDate, strDateFormat);
        
        if (intStartDate == null || intEndDate == null) {
            isError = true;
        } else {
            var diffDay = (intEndDate - intStartDate) / (1000 * 60 * 60 * 24);
            if (diffDay > maxRange) {
                isError = true;    
            }    
        }
    }
    return isError;
}

function convertDateToInteger(strDate, strDateFormat) {
    var retValue = 0;
    try {
        var mm = "";
        var dd = "";
        var yyyyy = "";
        if (strDateFormat == '2') {
            mm = strDate.substring(0,2);
            dd = strDate.substring(3,5);
            yyyyy = strDate.substring(6,10);
	} else if (strDateFormat == '1') {
            dd = strDate.substring(0,2);
            mm = strDate.substring(3,5);
            yyyyy = strDate.substring(6,10);
        } else {
            dd = strDate.substring(8,10);
            mm = strDate.substring(5,7);
            yyyyy = strDate.substring(0,4);
	}
        
        retValue = parseInt(yyyyy + mm + dd);
    } catch(er) { }
    return retValue;
}

function convertDateToDate(strDate, strDateFormat) {
    var retValue = null;
    try {
        var mm = "";
        var dd = "";
        var yyyyy = "";
        if (strDateFormat == '2') {
            mm = strDate.substring(0,2);
            dd = strDate.substring(3,5);
            yyyyy = strDate.substring(6,10);
	} else if (strDateFormat == '1') {
            dd = strDate.substring(0,2);
            mm = strDate.substring(3,5);
            yyyyy = strDate.substring(6,10);
        } else {
            dd = strDate.substring(8,10);
            mm = strDate.substring(5,7);
            yyyyy = strDate.substring(0,4);
	}
        
        retValue = new Date(yyyyy, mm, dd);
    } catch(er) { }
    return retValue;
}

function dateFormatYYYYMM(vDateName, vDateValue, e, dateCheck, dateType, floatMsg) {
    // vDateName = object name
    // vDateValue = value in the field being checked
    // e = event
    // dateCheck
    // True  = Verify that the vDateValue is a valid date
    // False = Format values being entered into vDateValue only
    // vDateType
    // 1 = yyyy/mm
    
    var strSeperator = "/";
    var whichCode = (window.Event) ? e.which : e.keyCode;
    floatMsg.innerHTML = "";
    
    //Eliminate all the ASCII codes that are not valid
    var alphaCheck = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/-";
    if (alphaCheck.indexOf(vDateValue) >= 1) {
        vDateName.value = vDateName.value.substr(0, (vDateValue.length-1));
        floatMsg.innerHTML = "Ready";
        return false;
    }
    
    if (whichCode == 8) //Ignore the Netscape value for backspace. IE has no value
        return false;
    else {
        //Create numeric string values for 0123456789/
        //The codes provided include both keyboard and keypad values
        var strCheck = '47,48,49,50,51,52,53,54,55,56,57,58,59,95,96,97,98,99,100,101,102,103,104,105';
        if (strCheck.indexOf(whichCode) != -1) {
            
            //alert('whichCode = '+whichCode);
            
            // Reformat date to format that can be validated. mm/dd/yyyy
            if (vDateValue.length >= 4) {
                if (dateType == 1) {
                    if (vDateValue.length == 4) {
                        vDateName.value = vDateValue + strSeperator;
                        floatMsg.innerHTML = "Ready";
                        return true;
                    }
                }
            }
            
            if (vDateValue.length == 7 && dateCheck) {
                if (dateType == 1) {
                    var mm = 0;
                    var yyyy = 0;
                    try { mm = parseInt(vDateValue.substring(5,7), 10); } catch(er) { mm = 0; }
                    try { yyyy = parseInt(vDateValue.substring(0,4), 10); } catch(er) { yyyy = 0; }
                    
                    if (!(yyyy >= 1000 && mm >= 1 && mm <= 12)) {
                        floatMsg.innerHTML = "<Font color=red>*Date should be in YYYY/MM format.<\/font>";
                        vDateName.focus();
                        vDateName.select();
                    }
                }
            }
            return false;
            
        } else {
            // If the value is not in the string return the string minus the last
            // key entered.
            vDateName.value = vDateName.value.substr(0, (vDateValue.length-1));
            floatMsg.innerHTML = "Ready";
            return false;
        }
    }
}

//*****************************************************************************//
//************************** End: Date Comparison *****************************//
//*****************************************************************************// 


//*****************************************************************************//
//*************************** Begin: Date Picker ******************************//
//*****************************************************************************// 

var weekend = [0,6];
//sat and sunday
var weekendColor = "white";
var fontface = "Verdana";
var fontsize = 1;

var gNow = new Date();
var ggWinCal;
isNav = (navigator.appName.indexOf("Netscape") != -1) ? true : false;
isIE = (navigator.appName.indexOf("Microsoft") != -1) ? true : false;

calendar.Months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

// Non-Leap year Month days..
calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Leap year Month days..
calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function calendar(p_item, p_WinCal, p_month, p_year, p_format) {
    if ((p_month == null) && (p_year == null))	return;

    if (p_WinCal == null)
    	this.gWinCal = ggWinCal;
    else
    	this.gWinCal = p_WinCal;

    if (p_month == null) {
    	this.gMonthName = null;
    	this.gMonth = null;
    	this.gYearly = true;
    } else {
    	this.gMonthName = calendar.get_month(p_month);
    	this.gMonth = new Number(p_month);
    	this.gYearly = false;
    }

    this.gYear = p_year;
    this.gFormat = p_format;
    this.gBGColor = "white";
    this.gFGColor = "black";
    this.gTextColor = "black";
    this.gHeaderColor = "#000000";
    this.gReturnItem = p_item;
}

calendar.get_month = calendarGetMonth;
calendar.get_daysofmonth = calendar_get_daysofmonth;
calendar.calc_month_year = calendarCalcMonthYear;
calendar.print = calendarPrint;

function calendarGetMonth(monthNo) {
    return calendar.Months[monthNo];
}

function calendar_get_daysofmonth(monthNo, p_year) {
    /*
    Check for leap year ..
    1.Years evenly divisible by four are normally leap years, except for...
    2.Years also evenly divisible by 100 are not leap years, except for...
    3.Years also evenly divisible by 400 are leap years.
    */
    if ((p_year % 4) == 0) {
    	if ((p_year % 100) == 0 && (p_year % 400) != 0)
        	return calendar.DOMonth[monthNo];

		return calendar.lDOMonth[monthNo];
	} else
        	return calendar.DOMonth[monthNo];
}

function calendarCalcMonthYear(p_Month, p_Year, incr) {
    /*
    Will return an 1-D array with 1st element being the calculated month
    and second being the calculated year
    after applying the month increment/decrement as specified by 'incr' parameter.
    'incr' will normally have 1/-1 to navigate thru the months.
    */
    var ret_arr = new Array();

    if (incr == -1) {
        // B A C K W A R D
        if (p_Month == 0) {
        	ret_arr[0] = 11;
        	ret_arr[1] = parseInt(p_Year) - 1;
        }else {
        	ret_arr[0] = parseInt(p_Month) - 1;
        	ret_arr[1] = parseInt(p_Year);
        }
    } else if (incr == 1) {
    	// F O R W A R D
    	if (p_Month == 11) {
		ret_arr[0] = 0;
    		ret_arr[1] = parseInt(p_Year) + 1;
        }else {
        	ret_arr[0] = parseInt(p_Month) + 1;
            	ret_arr[1] = parseInt(p_Year);
        }
    }

    return ret_arr;
}

function calendarPrint() {
    ggWinCal.print();
}

function calendarCalcMonthYear(p_Month, p_Year, incr) {
	/*
	Will return an 1-D array with 1st element being the calculated month
	and second being the calculated year
	after applying the month increment/decrement as specified by 'incr' parameter.
	'incr' will normally have 1/-1 to navigate thru the months.
	*/
	var ret_arr = new Array();

	if (incr == -1) {
        // B A C K W A R D
            if (p_Month == 0) {
            	ret_arr[0] = 11;
            	ret_arr[1] = parseInt(p_Year) - 1;
            }else {
            	ret_arr[0] = parseInt(p_Month) - 1;
            	ret_arr[1] = parseInt(p_Year);
            }
	} else if (incr == 1) {
        // F O R W A R D
            if (p_Month == 11) {
            	ret_arr[0] = 0;
            	ret_arr[1] = parseInt(p_Year) + 1;
            }else {
            	ret_arr[0] = parseInt(p_Month) + 1;
            	ret_arr[1] = parseInt(p_Year);
            }
	}

	return ret_arr;
}

// This is for compatibility with Navigator 3, we have to create and discard one object before the prototype object exists.
new calendar();

calendar.prototype.getMonthlycalendarCode = function() {
    var vCode = "";
    var vHeader_Code = "";
    var vData_Code = "";
    
    // Begin Table Drawing code here..
    //vCode = vCode + "<TABLE BORDER=1 BGCOLOR=\"" + this.gBGColor + "\" cellpadding=0 cellspacing=0>";
    vCode = vCode + "<TABLE width='220' BORDER=1 BGCOLOR=\"" + this.gBGColor + "\" cellpadding=0 cellspacing=0 bordercolor='#CCCCCC'>";

    vHeader_Code = this.cal_header();
    vData_Code = this.cal_data();
    vCode = vCode + vHeader_Code + vData_Code;

    vCode = vCode + "</TABLE>";

    return vCode;
}

calendar.prototype.show = function() {
    var vCode = "";

    this.gWinCal.document.open();

    // Setup the page...
    this.wwrite("<html>");
    this.wwrite("<head><title>:: Calendar ::</title>");
    this.wwrite("<link rel='stylesheet' type='text/css' href='/RCLWebApp/css/calendar.css'>");
    this.wwrite("</head>");

    //this.wwrite("<body bgcolor=#FFFFFF " +
    //	"text=\"" + this.gTextColor + "\" leftmargin=0 topmargin=0 marginwidth=0 marginheight=0>"); 
    this.wwrite("<body bgcolor=#3C3EA2 link='black' vlink='black' alink='black' text='black' leftmargin=0 topmargin=0 marginwidth=0 marginheight=0>");
          
//    this.wwrite("<table width='100%' border='0' cellspacing='0' cellpadding='0' height='10'>");        
//    this.wwrite("<tr>");
//    this.wwrite("<td class='CalendarTitle' height='10'>");
//    this.wwriteA(this.gMonthName + " " + this.gYear);
//    this.wwriteA("</td>");
//    this.wwrite("</tr>");
//    this.wwrite("</table>");

    // Show navigation buttons
    var prevMMYYYY = calendar.calc_month_year(this.gMonth, this.gYear, -1);
    var prevMM = prevMMYYYY[0];
    var prevYYYY = prevMMYYYY[1];

    var nextMMYYYY = calendar.calc_month_year(this.gMonth, this.gYear, 1);
    var nextMM = nextMMYYYY[0];
    var nextYYYY = nextMMYYYY[1];
    
    this.wwrite("<div align='center'>");
    this.wwrite("<TABLE width='220' BORDER=0 CELLPADDING='0' CELLSPACING='0' BGCOLOR='#ffffff'>");
    this.wwrite("<TR>");
    this.wwrite("<TD class=CalendarTitle><div align='center'><A HREF=\"" + "javascript:window.opener.build(" + "'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)-1) + "', '" + this.gFormat + "'" + ");" + "\"><img src='/RCLWebApp/images/btnArrowFirst.gif' width='17' height='14' border='0' align='absmiddle' alt='Prev Year'></A></div></TD>");
    this.wwrite("<TD class=CalendarTitle><div align='center'><A HREF=\"" + "javascript:window.opener.build(" + "'" + this.gReturnItem + "', '" + prevMM + "', '" + prevYYYY + "', '" + this.gFormat + "'" + ");" + "\"><img src='/RCLWebApp/images/btnArrowBack.gif' width='15' height='14' border='0' align='absmiddle' alt='Prev Month'></A></div></TD>");
    this.wwrite("<TD class=CalendarTitle><div align='center'>");
    this.wwriteA(this.gMonthName + " " + this.gYear);
    this.wwriteA("</div></TD>");
    this.wwrite("<TD class=CalendarTitle><div align='center'><A HREF=\"" + "javascript:window.opener.build(" + "'" + this.gReturnItem + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "'" + ");" + "\"><img src='/RCLWebApp/images/btnArrowNext.gif' width='15' height='14' border='0' align='absmiddle' alt='Next Month'></A></div></TD>");
    this.wwrite("<TD class=CalendarTitle><div align='center'><A HREF=\"" + "javascript:window.opener.build(" + "'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) + "', '" + this.gFormat + "'" + ");" + "\"><img src='/RCLWebApp/images/btnArrowEnd.gif' width='17' height='14' border='0' align='absmiddle' alt='Next Year'></A></div></TD>");
    this.wwrite("</TR>");
    this.wwrite("</TABLE>")

//    this.wwrite("<TABLE WIDTH='100%' BORDER=0 CELLSPACING='0' CELLPADDING='0' BGCOLOR='#FFFFFF'><TR><TD ALIGN=center>");
//    this.wwrite("<font size=1>[<A HREF=\"" +
//    	"javascript:window.opener.build(" +
//    	"'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)-1) + "', '" + this.gFormat + "'" +
//    	");" +
//    	"\"><<<\/A>]</font></TD><TD ALIGN=center>");
//    this.wwrite("<font size=1>[<A HREF=\"" +
//    	"javascript:window.opener.build(" +
//    	"'" + this.gReturnItem + "', '" + prevMM + "', '" + prevYYYY + "', '" + this.gFormat + "'" +
//	");" +
//    	"\"><<\/A>]</font></TD><TD ALIGN=center>");
//    this.wwrite("<font size=1>[<A HREF=\"" +
//    	"javascript:window.opener.build(" +
//    	"'" + this.gReturnItem + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "'" +
//    	");" +
//    	"\">><\/A>]</font></TD><TD ALIGN=center>");
//    this.wwrite("<font size=1>[<A HREF=\"" +
//    	"javascript:window.opener.build(" +
//    	"'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) + "', '" + this.gFormat + "'" +
//    	");" +
//    	"\">>><\/A>]</font></TD></TR></TABLE>");
        
	// Get the complete calendar code for the month..
	vCode = this.getMonthlycalendarCode();
    this.wwrite(vCode);
    
    this.wwrite("</div>");
    this.wwrite("</body>");
    this.wwrite("</html>");
    this.gWinCal.document.close();
}

calendar.prototype.showY = function() {
    var vCode = "";
    var i;
    var vr, vc, vx, vy;		        // Row, Column, X-coord, Y-coord
    var vxf = 285;			// X-Factor
    var vyf = 200;			// Y-Factor
    var vxm = 10;			// X-margin
    var vym;				// Y-margin
    if (isIE)	vym = 75;
    else if (isNav)	vym = 25;

    this.gWinCal.document.open();

    this.wwrite("<html>");
    this.wwrite("<head><title>:: Calendar ::</title>");
    this.wwrite("<link rel='stylesheet' type='text/css' href='/RCLWebApp/css/calendar.css'>");
    this.wwrite("<style type='text/css'>\n<!--");
    for (i=0; i<12; i++) {
    	vc = i % 3;
    	if (i>=0 && i<= 2)	vr = 0;
    	if (i>=3 && i<= 5)	vr = 1;
    	if (i>=6 && i<= 8)	vr = 2;
    	if (i>=9 && i<= 11)	vr = 3;

    	vx = parseInt(vxf * vc) + vxm;
    	vy = parseInt(vyf * vr) + vym;

    	this.wwrite(".lclass" + i + " {position:absolute;top:" + vy + ";left:" + vx + ";}");
    }
    this.wwrite("-->\n</style>");
    this.wwrite("</head>");
        
    //this.wwrite("<body bgcolor=#FFFFFF " +
    //	"text=\"" + this.gTextColor + "\" leftmargin=0 topmargin=0 marginwidth=0 marginheight=0>"); 
    this.wwrite("<body bgcolor=#3C3EA2 link='black' vlink='black' alink='black' text='black' leftmargin=0 topmargin=0 marginwidth=0 marginheight=0>");        
          
//    this.wwrite("<table width='100%' border='0' cellspacing='0' cellpadding='0' height='10'>");        
//    this.wwrite("<tr>");
//    this.wwrite("<td class='CalendarTitle' height='10'>");
//    this.wwrite("Year : " + this.gYear);
//    this.wwriteA("</td>");
//    this.wwrite("</tr>");
//    this.wwrite("</table>");     

    // Show navigation buttons
    var prevYYYY = parseInt(this.gYear) - 1;
    var nextYYYY = parseInt(this.gYear) + 1;
    
    this.wwrite("<div align='center'>");
    this.wwrite("<TABLE width='220' BORDER=0 CELLPADDING='0' CELLSPACING='0' BGCOLOR='#ffffff'>");
    this.wwrite("<TR>");
    this.wwrite("<TD class=CalendarTitle><div align='center'><A HREF=\"" + "javascript:window.opener.build(" + "'" + this.gReturnItem + "', null, '" + prevYYYY + "', '" + this.gFormat + "'" + ");" + "\"><img src='/RCLWebApp/images/btnArrowFirst.gif' width='17' height='14' border='0' align='absmiddle' alt='Prev Year'></A></div></TD>");
    this.wwrite("<TD class=CalendarTitle><div align='center'>");
    this.wwrite("Year : " + this.gYear);
    this.wwriteA("</div></TD>");
    this.wwrite("<TD class=CalendarTitle><div align='center'><A HREF=\"" + "javascript:window.opener.build(" + "'" + this.gReturnItem + "', null, '" + nextYYYY + "', '" + this.gFormat + "'" + ");" + "\"><img src='/RCLWebApp/images/btnArrowEnd.gif' width='17' height='14' border='0' align='absmiddle' alt='Next Year'></A></div></TD>");
    this.wwrite("</TR>");
    this.wwrite("</TABLE>")    

//    this.wwrite("<TABLE WIDTH='100%' BORDER=1 CELLSPACING='0' CELLPADDING='0' BGCOLOR='#e0e0e0'><TR><TD ALIGN=center>");
//    this.wwrite("<font size=1>[<A HREF=\"" +
//    	"javascript:window.opener.build(" +
//    	"'" + this.gReturnItem + "', null, '" + prevYYYY + "', '" + this.gFormat + "'" +
//    	");" +
//    	"\" alt='Prev Year' ><<<\/A>]</font></TD><TD ALIGN=center>");
//    this.wwrite("<font size=1>[<A HREF=\"" +
//    	"javascript:window.opener.build(" +
//    	"'" + this.gReturnItem + "', null, '" + nextYYYY + "', '" + this.gFormat + "'" +
//    	");" +
//    	"\">>><\/A>]</font></TD></TR></TABLE>");

    // Get the complete calendar code for each month..
    var j;
    for (i=11; i>=0; i--) {
    	if (isIE)
        	this.wwrite("<DIV ID=\"layer" + i + "\" CLASS=\"lclass" + i + "\">");
    	else if (isNav)
            	this.wwrite("<LAYER ID=\"layer" + i + "\" CLASS=\"lclass" + i + "\">");
                        
    this.gMonth = i;
    this.gMonthName = calendar.get_month(this.gMonth);
    vCode = this.getMonthlycalendarCode();
    //	this.wwrite(this.gMonthName + "/" + this.gYear + "<BR>");
    this.wwrite(this.gMonthName + "/" + this.gYear);
    this.wwrite(vCode);
    
    if (isIE)
         this.wwrite("</DIV>");
    else if (isNav)
        this.wwrite("</LAYER>");
    }
    
    this.wwrite("</font></body></html>");
    this.gWinCal.document.close();
}

calendar.prototype.wwrite = function(wtext) {
    this.gWinCal.document.writeln(wtext);
}

calendar.prototype.wwriteA = function(wtext) {
    this.gWinCal.document.write(wtext);
}

calendar.prototype.cal_header = function() {
    var vCode = "";

    vCode = vCode + "<TR>";
    vCode = vCode + "<TD WIDTH='35' class='CalendarTableLeftTextCalHead' align='center'>Sun</TD>";
    vCode = vCode + "<TD WIDTH='35' class='CalendarTableLeftTextCalHead' align='center'>Mon</TD>";
    vCode = vCode + "<TD WIDTH='35' class='CalendarTableLeftTextCalHead' align='center'>Tue</TD>";
    vCode = vCode + "<TD WIDTH='35' class='CalendarTableLeftTextCalHead' align='center'>Wed</TD>";
    vCode = vCode + "<TD WIDTH='35' class='CalendarTableLeftTextCalHead' align='center'>Thu</TD>";
    vCode = vCode + "<TD WIDTH='35' class='CalendarTableLeftTextCalHead' align='center'>Fri</TD>";
    vCode = vCode + "<TD WIDTH='35' class='CalendarTableLeftTextCalHead' align='center'>Sat</TD>";
    vCode = vCode + "</TR>";

    return vCode;
}

calendar.prototype.cal_data = function() {
    var vDate = new Date();
    vDate.setDate(1);
    vDate.setMonth(this.gMonth);
    vDate.setFullYear(this.gYear);

    var vFirstDay=vDate.getDay();
    var vDay=1;
    var vLastDay=calendar.get_daysofmonth(this.gMonth, this.gYear);
    var vOnLastDay=0;
    var vCode = "";

    /*
    Get day for the 1st of the requested month/year..
    Place as many blank cells before the 1st day of the month as necessary.
    */

    vCode = vCode + "<TR>";
    for (i=0; i<vFirstDay; i++) {
    	vCode = vCode + "<TD class='CalendarTableLeftTextCalBody' " + this.write_weekend_string(i) + "> </TD>";
    }

    // Write rest of the 1st week
    for (j=vFirstDay; j<7; j++) {
    	vCode = vCode + "<TD class='CalendarTableLeftTextCalBody' " + this.write_weekend_string(j) + ">" +
            	"<A HREF='#' " +
    		"onClick=\"self.opener.document." + this.gReturnItem + ".value='" +
    		this.format_data(vDay) +
    		"';window.close();\">" +
    		this.format_day(vDay) +
            	"</A>" +
            	"</TD>";
		vDay=vDay + 1;
	}
	vCode = vCode + "</TR>";

	// Write the rest of the weeks
	for (k=2; k<7; k++) {
            vCode = vCode + "<TR>";

        for (j=0; j<7; j++) {
            vCode = vCode + "<TD class='CalendarTableLeftTextCalBody' " + this.write_weekend_string(j) + ">" +
            		"<A HREF='#' " +
    			"onClick=\"self.opener.document." + this.gReturnItem + ".value='" +
            		this.format_data(vDay) +
    			"';window.close();\">" +
                	this.format_day(vDay) +
                    	"</A>" +
                    	"</TD>";
            vDay=vDay + 1;
                        
            if (vDay > vLastDay) {
                vOnLastDay = 1;
            	break;
            }
        }

            if (j == 6)
                vCode = vCode + "</TR>";
            if (vOnLastDay == 1)
                break;
	}

	// Fill up the rest of last week with proper blanks, so that we get proper square blocks
        for (m=1; m<(7-j); m++) {
            if (this.gYearly)
            	vCode = vCode + "<TD class='CalendarTableLeftTextCalBody' " + this.write_weekend_string(j+m) +
            	"><FONT SIZE='2' FACE='" + fontface + "' COLOR='gray'>�</FONT></TD>";
            else{
        	/* vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j+m) +
            	"><FONT SIZE='2' FACE='" + fontface + "' COLOR='gray'>" + m + "</FONT></TD>";
            	*/
        	 vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j+m) +
            	"><FONT SIZE='2' FACE='" + fontface + "' COLOR='gray'>&nbsp;</FONT></TD>";
            }
	}

	return vCode;
}

calendar.prototype.format_day = function(vday) {
    var vNowDay = gNow.getDate();
    var vNowMonth = gNow.getMonth();
    var vNowYear = gNow.getFullYear();

    if (vday == vNowDay && this.gMonth == vNowMonth && this.gYear == vNowYear)
        return ("<FONT COLOR=\"red\"><B>" + vday + "</B></FONT>");
    else
        return (vday);
}

calendar.prototype.write_weekend_string = function(vday) {
    var i;

    // Return special formatting for the weekend day.
    for (i=0; i<weekend.length; i++) {
    	if (vday == weekend[i])
    		return (" BGCOLOR=\"" + weekendColor + "\"");
    }
    return "";
}

calendar.prototype.format_data = function(p_day) {
    var vData;
    var vMonth = 1 + this.gMonth;
    vMonth = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
    var vMon = calendar.get_month(this.gMonth).substr(0,3).toUpperCase();
    var vFMon = calendar.get_month(this.gMonth).toUpperCase();
    var vY4 = new String(this.gYear);
    var vY2 = new String(this.gYear.substr(2,2));
    var vDD = (p_day.toString().length < 2) ? "0" + p_day : p_day;

    switch (this.gFormat) {
        case "MM\/DD\/YYYY" :
            vData = vMonth + "\/" + vDD + "\/" + vY4;
            break;
        case "MM\/DD\/YY" :
            vData = vMonth + "\/" + vDD + "\/" + vY2;
            break;
        case "MM-DD-YYYY" :
            vData = vMonth + "-" + vDD + "-" + vY4;
            break;
        case "MM-DD-YY" :
            vData = vMonth + "-" + vDD + "-" + vY2;
            break;
            
        case "DD\/MON\/YYYY" :
            vData = vDD + "\/" + vMon + "\/" + vY4;
            break;
        case "DD\/MON\/YY" :
            vData = vDD + "\/" + vMon + "\/" + vY2;
            break;
        case "DD-MON-YYYY" :
            vData = vDD + "-" + vMon + "-" + vY4;
            break;
        case "DD-MON-YY" :
            vData = vDD + "-" + vMon + "-" + vY2;
            break;

        case "DD\/MONTH\/YYYY" :
            vData = vDD + "\/" + vFMon + "\/" + vY4;
            break;
        case "DD\/MONTH\/YY" :
            vData = vDD + "\/" + vFMon + "\/" + vY2;
            break;
        case "DD-MONTH-YYYY" :
            vData = vDD + "-" + vFMon + "-" + vY4;
            break;
        case "DD-MONTH-YY" :
            vData = vDD + "-" + vFMon + "-" + vY2;
            break;

        case "DD\/MM\/YYYY" :
            vData = vDD + "\/" + vMonth + "\/" + vY4;
            break;
        case "YYYY\/MM\/DD" :
            vData =vY4 + "\/" + vMonth + "\/" + vDD;
            break;
        case "DD\/MM\/YY" :
            vData = vDD + "\/" + vMonth + "\/" + vY2;
            break;
        case "DD-MM-YYYY" :
            vData = vDD + "-" + vMonth + "-" + vY4;
            break;
        case "DD-MM-YY" :
            vData = vDD + "-" + vMonth + "-" + vY2;
            break;

        default :
            vData = vMonth + "\/" + vDD + "\/" + vY4;
    }

	return vData;
}

function build(p_item, p_month, p_year, p_format) {
    var p_WinCal = ggWinCal;
    gCal = new calendar(p_item, p_WinCal, p_month, p_year, p_format);

    // Customize your calendar here..
    gCal.gBGColor="white";
    gCal.gLinkColor="black";
    gCal.gTextColor="black";
    gCal.gHeaderColor="white";

    // Choose appropriate show function
    if (gCal.gYearly)	gCal.showY();
    else gCal.show();
}

function showCalendar() {
    /*
    	p_month : 0-11 for Jan-Dec; 12 for All Months.
    	p_year	: 4-digit year
    	p_format: Date format (mm/dd/yyyy, dd/mm/yy, ...)
    	p_item	: Return Item.
    */

    p_item = arguments[0];

    if (arguments[1] == null || arguments[1] == ""){
        p_month = new String(gNow.getMonth());
    }else{
        p_month = arguments[1];
    }
    
    if (arguments[2] == "" || arguments[2] == null){
        p_year = new String(gNow.getFullYear().toString());
    }else{
    	p_year = arguments[2];
    }
	
    if(arguments[3] == "1"){z
    	p_format = "DD/MM/YYYY";
    }else if(arguments[3] == "2"){
    	p_format = "MM/DD/YYYY";
    }else{
        p_format="YYYY/MM/DD";
    }
    
    //vWinCal = window.open("", "calendar", "width=150,height=180,status=no,resizable=no,toolbar=no,top=250,left=450");
    vWinCal = window.open("", "calendar", "width=230,height=170,status=no,resizable=no,toolbar=no,top=400,left=300,screenY=400");
    vWinCal.opener = self;
    ggWinCal = vWinCal;
    vWinCal.focus();
    build(p_item, p_month, p_year, p_format);
}
/*
Yearly calendar Code Starts here
*/
function showYearlyCalendar(p_item, p_year, p_format) {
    // Load the defaults..
    if (p_year == null || p_year == ""){
    	p_year = new String(gNow.getFullYear().toString());
    }
    
    if (p_format == null || p_format == ""){
    	p_format = "YYYY/MM/DD";
    }

    var vWinCal = window.open("", "calendar", "scrollbars=yes");
    vWinCal.opener = self;
    ggWinCal = vWinCal;

    build(p_item, null, p_year, p_format);
}

//*****************************************************************************//
//**************************** End: Date Picker *******************************//
//*****************************************************************************//


//*****************************************************************************//
//**************************** Start Date Format ******************************//
//*****************************************************************************//

<!-- Original:  Richard Gorremans (RichardG@spiritwolfx.com) -->
<!-- Web Site:  http://www.spiritwolfx.com -->

<!-- This script and many more are available free online at -->
<!-- The JavaScript Source!! http://javascript.internet.com -->

<!-- Begin
// Check browser version
var isNav4 = false, isNav5 = false, isIE4 = false
var strSeperator = "/";
// If you are using any Java validation on the back side you will want to use the / because
// Java date validations do not recognize the dash as a valid date separator.
var vDateType = 3; // Global value for type of date format
//                1 = mm/dd/yyyy
//                2 = yyyy/dd/mm  (Unable to do date check at this time)
//                3 = dd/mm/yyyy
var vYearType = 4; //Set to 2 or 4 for number of digits in the year for Netscape
var vYearLength = 2; // Set to 4 if you want to force the user to enter 4 digits for the year before validating.
var err = 0; // Set the error code to a default of zero

if(navigator.appName == "Netscape") {
    if (navigator.appVersion < "5") {
        isNav4 = true;
        isNav5 = false;
    }else if (navigator.appVersion > "4") {
        isNav4 = false;
        isNav5 = true;
    }
}else {
    isIE4 = true;
}

function dateFormat(vDateName, vDateValue, e, dateCheck, dateType, floatMsg) {

//added by louise, being changed to adapt date format specified in java, need to be changed accordingly
//java version - 1 = dd/mm/yyyy
//floatMsg.innerHTML="stanley";
//if(arguments[5]!=null)
//	alert(arguments[5]);

if(dateType == "1") {
    dateType = "3";
}else if(dateType == "2") {
    dateType = "1";
}else{
    dateType = "2";
}


vDateType = dateType;
// vDateName = object name
// vDateValue = value in the field being checked
// e = event
// dateCheck
// True  = Verify that the vDateValue is a valid date
// False = Format values being entered into vDateValue only
// vDateType
// 1 = mm/dd/yyyy
// 2 = yyyy/mm/dd
// 3 = dd/mm/yyyy
//Enter a tilde sign for the first number and you can check the variable information.
if (vDateValue == "~") {
    floatMsg.innerHTML="<Font color=red>AppVersion = "+navigator.appVersion+" \nNav. 4 Version = "+isNav4+" \nNav. 5 Version = "+isNav5+" \nIE Version = "+isIE4+" \nYear Type = "+vYearType+" \nDate Type = "+vDateType+" \nSeparator = "+strSeperator+".</font>";
    //alert("AppVersion = "+navigator.appVersion+" \nNav. 4 Version = "+isNav4+" \nNav. 5 Version = "+isNav5+" \nIE Version = "+isIE4+" \nYear Type = "+vYearType+" \nDate Type = "+vDateType+" \nSeparator = "+strSeperator);
    vDateName.value = "";
    vDateName.focus();
    return true;
}

var whichCode = (window.Event) ? e.which : e.keyCode;

// Check to see if a seperator is already present.
// bypass the date if a seperator is present and the length greater than 8
if (vDateValue.length > 8 && isNav4) {
    if ((vDateValue.indexOf("-") >= 1) || (vDateValue.indexOf("/") >= 1))
        return true;
}

//Eliminate all the ASCII codes that are not valid
var alphaCheck = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/-";
if (alphaCheck.indexOf(vDateValue) >= 1) {
    if (isNav4) {
        vDateName.value = "";
        vDateName.focus();
        vDateName.select();
        return false;
}else {
    vDateName.value = vDateName.value.substr(0, (vDateValue.length-1));
    floatMsg.innerHTML="Ready";
    return false;
   }
}

if (whichCode == 8) //Ignore the Netscape value for backspace. IE has no value
    return false;
else{
        //Create numeric string values for 0123456789/
        //The codes provided include both keyboard and keypad values
        var strCheck = '47,48,49,50,51,52,53,54,55,56,57,58,59,95,96,97,98,99,100,101,102,103,104,105';
        if (strCheck.indexOf(whichCode) != -1) {
            if (isNav4) {
                if (((vDateValue.length < 6 && dateCheck) || (vDateValue.length == 7 && dateCheck)) && (vDateValue.length >=1)) {
                    floatMsg.innerHTML="<Font color=red>*Date  should be in "+getDateFormat(dateType)+" format.</font>";
                    vDateName.value = "";
                    vDateName.focus();
                    vDateName.select();
                    return false;
                }
                
                if (vDateValue.length == 6 && dateCheck) {
                    var mDay = vDateName.value.substr(2,2);
                    var mMonth = vDateName.value.substr(0,2);
                    var mYear = vDateName.value.substr(4,4)
                    //Turn a two digit year into a 4 digit year
                    if (mYear.length == 2 && vYearType == 4) {
                        var mToday = new Date();
                        //If the year is greater than 30 years from now use 19, otherwise use 20
                        var checkYear = mToday.getFullYear() + 30;
                        var mCheckYear = '20' + mYear;
                        
                        if (mCheckYear >= checkYear){
                            mYear = '19' + mYear;
                        }else{
                            mYear = '20' + mYear;
                        }
                    }
                    
                    var vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
                    if (!dateValid(vDateValueCheck)) {
                        floatMsg.innerHTML="<Font color=red>*Date  should be in "+getDateFormat(dateType)+" format.</font>";
                        vDateName.value = "";
                        vDateName.focus();
                        vDateName.select();
                        return false;
                    }
                    return true;
                }else {
                    // Reformat the date for validation and set date type to a 1
                    if (vDateValue.length >= 8  && dateCheck) {
                        if (vDateType == 1) // mmddyyyy
                        {
                            var mDay = vDateName.value.substr(2,2);
                            var mMonth = vDateName.value.substr(0,2);
                            var mYear = vDateName.value.substr(4,4)
                            vDateName.value = mMonth+strSeperator+mDay+strSeperator+mYear;
                            floatMsg.innerHTML="Ready";
                        }
                    
                        if (vDateType == 2) // yyyymmdd
                        {
                            var mYear = vDateName.value.substr(0,4)
                            var mMonth = vDateName.value.substr(4,2);
                            var mDay = vDateName.value.substr(6,2);
                            vDateName.value = mYear+strSeperator+mMonth+strSeperator+mDay;
                            floatMsg.innerHTML="Ready";
                        }
                        
                        if (vDateType == 3) // ddmmyyyy
                        {
                            var mMonth = vDateName.value.substr(2,2);
                            var mDay = vDateName.value.substr(0,2);
                            var mYear = vDateName.value.substr(4,4)
                            vDateName.value = mDay+strSeperator+mMonth+strSeperator+mYear;
                            floatMsg.innerHTML="Ready";
                        }
                        
                        //Create a temporary variable for storing the DateType and change
                        //the DateType to a 1 for validation.
                        var vDateTypeTemp = vDateType;
                        vDateType = 1;
                        var vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
                        
                        if (!dateValid(vDateValueCheck)) {
                            floatMsg.innerHTML="<Font color=red>*Date  should be in "+getDateFormat(dateType)+" format.</font>";
                            vDateType = vDateTypeTemp;
                            vDateName.value = "";
                            vDateName.focus();
                            vDateName.select();
                            return false;
                        }
                        
                        vDateType = vDateTypeTemp;
                        return true;    
                    }else {
                        if (((vDateValue.length < 8 && dateCheck) || (vDateValue.length == 9 && dateCheck)) && (vDateValue.length >=1)) {
                            floatMsg.innerHTML="<Font color=red>*Date  should be in "+getDateFormat(dateType)+" format.</font>";
                            vDateName.value = "";
                            vDateName.focus();
                            vDateName.select();
                            return false;
                        }
                    }
                }
            }else {
                // Non isNav Check
                if (((vDateValue.length < 8 && dateCheck) || (vDateValue.length == 9 && dateCheck)) && (vDateValue.length >=1)) {
                    floatMsg.innerHTML="<Font color=red>*Date  should be in "+getDateFormat(dateType)+" format.</font>";
                    //vDateName.value = "";
                    vDateName.focus();
                    //vDateName.select();
                    return true;
                }
                // Reformat date to format that can be validated. mm/dd/yyyy
                if (vDateValue.length >= 8 && dateCheck) {
                    // Additional date formats can be entered here and parsed out to
                    // a valid date format that the validation routine will recognize.
                    if (vDateType == 1) // mm/dd/yyyy
                    {
                        var mMonth = vDateName.value.substr(0,2);
                        var mDay = vDateName.value.substr(3,2);
                        var mYear = vDateName.value.substr(6,4)
                    }
                    if (vDateType == 2) // yyyy/mm/dd
                    {
                        var mYear = vDateName.value.substr(0,4)
                        var mMonth = vDateName.value.substr(5,2);
                        var mDay = vDateName.value.substr(8,2);
                    }
                    if (vDateType == 3) // dd/mm/yyyy
                    {
                        var mDay = vDateName.value.substr(0,2);
                        var mMonth = vDateName.value.substr(3,2);
                        var mYear = vDateName.value.substr(6,4)
                    }
                    if (vYearLength == 4) {
                        if (mYear.length < 4) {
                            floatMsg.innerHTML="<Font color=red>*Date  should be in "+getDateFormat(dateType)+" format.</font>";
                            vDateName.value = "";
                            vDateName.focus();
                        return true;
                       }
                    }
                    // Create temp. variable for storing the current vDateType
                    var vDateTypeTemp = vDateType;
                    // Change vDateType to a 1 for standard date format for validation
                    // Type will be changed back when validation is completed.
                    vDateType = 1;
                    // Store reformatted date to new variable for validation.
                    var vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
                    if (mYear.length == 2 && vYearType == 4 && dateCheck) {
                        //Turn a two digit year into a 4 digit year
                        var mToday = new Date();
                        //If the year is greater than 30 years from now use 19, otherwise use 20
                        var checkYear = mToday.getFullYear() + 30;
                        var mCheckYear = '20' + mYear;
                        if (mCheckYear >= checkYear)
                            mYear = '19' + mYear;
                        else
                            mYear = '20' + mYear;
                            vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
                        // Store the new value back to the field.  This function will
                        // not work with date type of 2 since the year is entered first.
                        if (vDateTypeTemp == 1){ // mm/dd/yyyy
                            vDateName.value = mMonth+strSeperator+mDay+strSeperator+mYear;
                            floatMsg.innerHTML="Ready";
                        }
                        if (vDateTypeTemp == 3){ // dd/mm/yyyy
                            vDateName.value = mDay+strSeperator+mMonth+strSeperator+mYear;
                            floatMsg.innerHTML="Ready";
                        }
                    }
                    
                    if (!dateValid(vDateValueCheck)) {
                        floatMsg.innerHTML="<Font color=red>*Date  should be in "+getDateFormat(dateType)+" format.</font>";
                        vDateType = vDateTypeTemp;
                        vDateName.value = "";
                        vDateName.focus();
                        return true;
                    }
                    
                    vDateType = vDateTypeTemp;
                    return true;
                }else {
                    if (vDateType == 1) {
                        if (vDateValue.length == 2) {
                            vDateName.value = vDateValue+strSeperator;
                            floatMsg.innerHTML="Ready";
                        }
                        if (vDateValue.length == 5) {
                            vDateName.value = vDateValue+strSeperator;
                            floatMsg.innerHTML="Ready";
                        }
                    }
                    if (vDateType == 2) {
                        if (vDateValue.length == 4) {
                            vDateName.value = vDateValue+strSeperator;
                            floatMsg.innerHTML="Ready";
                        }
                        
                        if (vDateValue.length == 7) {
                            vDateName.value = vDateValue+strSeperator;
                            floatMsg.innerHTML="Ready";
                        }
                    }
                    if (vDateType == 3) {
                        if (vDateValue.length == 2) {
                            vDateName.value = vDateValue+strSeperator;
                            floatMsg.innerHTML="Ready";
                        }
                        if (vDateValue.length == 5) {
                            vDateName.value = vDateValue+strSeperator;
                            floatMsg.innerHTML="Ready";
                        }
                    }
                    return true;
                }
            }
            
            if (vDateValue.length == 10&& dateCheck) {
                if (!dateValid(vDateName)) {
                    // Un-comment the next line of code for debugging the dateValid() function error messages
                    //alert(err);
                    floatMsg.innerHTML="<Font color=red>*Date  should be in "+getDateFormat(dateType)+" format.</font>";
                    vDateName.focus();
                    vDateName.select();
               }
            }
            
            return false;
        }else {
            // If the value is not in the string return the string minus the last
            // key entered.
            if (isNav4) {
                vDateName.value = "";
                vDateName.focus();
                vDateName.select();
                return false;
            }else{
                vDateName.value = vDateName.value.substr(0, (vDateValue.length-1));
                floatMsg.innerHTML="Ready";
                return false;
            }
        }
    }
}


function dateValid(objName) {
var strDate;
var strDateArray;
var strDay;
var strMonth;
var strYear;
var intday;
var intMonth;
var intYear;
var booFound = false;
var datefield = objName;
var strSeparatorArray = new Array("-"," ","/",".");
var intElementNr;
// var err = 0;
var strMonthArray = new Array(12);
strMonthArray[0] = "Jan";
strMonthArray[1] = "Feb";
strMonthArray[2] = "Mar";
strMonthArray[3] = "Apr";
strMonthArray[4] = "May";
strMonthArray[5] = "Jun";
strMonthArray[6] = "Jul";
strMonthArray[7] = "Aug";
strMonthArray[8] = "Sep";
strMonthArray[9] = "Oct";
strMonthArray[10] = "Nov";
strMonthArray[11] = "Dec";
//strDate = datefield.value;
strDate = objName;

    if (strDate.length < 1) {
        return true;
    }
    
    for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
        if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
            strDateArray = strDate.split(strSeparatorArray[intElementNr]);
            if (strDateArray.length != 3) {
                err = 1;
                return false;
            }else {
                strDay = strDateArray[0];
                strMonth = strDateArray[1];
                strYear = strDateArray[2];
            }
            booFound = true;
       }
    }
    
    if (booFound == false) {
        if (strDate.length>5) {
            strDay = strDate.substr(0, 2);
            strMonth = strDate.substr(2, 2);
            strYear = strDate.substr(4);
        }
    }
    
    //Adjustment for short years entered
    if (strYear.length == 2) {
        strYear = '20' + strYear;
    }
    
    strTemp = strDay;
    strDay = strMonth;
    strMonth = strTemp;
    intday = parseInt(strDay, 10);
    
    if (isNaN(intday)) {
        err = 2;
        return false;
    }
    
    intMonth = parseInt(strMonth, 10);
    
    if (isNaN(intMonth)) {
        for (i = 0;i<12;i++) {
        if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
        intMonth = i+1;
        strMonth = strMonthArray[i];
        i = 12;
           }
        }
        if (isNaN(intMonth)) {
            err = 3;
            return false;
        }
    }
    
    intYear = parseInt(strYear, 10);
    if (isNaN(intYear)) {
        err = 4;
        return false;
    }
    
    if (intMonth>12 || intMonth<1) {
        err = 5;
        return false;
    }
    
    if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
        err = 6;
        return false;
    }
    
    if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
        err = 7;
        return false;
    }
    
    if (intMonth == 2) {
        if (intday < 1) {
            err = 8;
            return false;
        }
        if (leapYear(intYear) == true) {
            if (intday > 29) {
                err = 9;
                return false;
           }
        }else {
            if (intday > 28) {
                err = 10;
                return false;
              }
        }
    }
    return true;
}

function leapYear(intYear) {
    if (intYear % 100 == 0) {
        if (intYear % 400 == 0) { return true; }
    }else {
        if ((intYear % 4) == 0) { return true; }
    }
    return false;
}

function getDateFormat(strDateFormat){
	if(strDateFormat=="1")
        return "MM/DD/YYYY";
    else if(strDateFormat=="2")
        return "YYYY/MM/DD";
    else 
		return "DD/MM/YYYY";
}


//*****************************************************************************//
//**************************** End: Date Format *******************************//
//*****************************************************************************//
