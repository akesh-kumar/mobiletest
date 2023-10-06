/*-----------------------------------------------------------------------------------------------------------  
RutValidation.js
------------------------------------------------------------------------------------------------------------- 
Copyright RCL Public Co., Ltd. 2007 
-------------------------------------------------------------------------------------------------------------
Author Piyapong Ieumwananonthachai 21/03/08
- Change Log ------------------------------------------------------------------------------------------------  
## DD/MM/YY     -User-     -TaskRef-      -Short Description  
01 17/10/11     DHRPAR                      Added validation check for single/multiple emails.
02 21/12/11     DHRPAR     599              Modified validation to allow only comma seperated emails.
-----------------------------------------------------------------------------------------------------------*/

// =====================================================================================
// Function: checkOnlyNumber(objField)
// Usage   : check whether field is valid number only (0123456789) or not
// Input   : strFieldValue field value
// Output  : true or false
// Example : onChange="checkOnlyNumber(this.value)"
// =====================================================================================
function checkOnlyNumber(strFieldValue) {
    numFormat = /^([0-9]+)$/;
    if((strFieldValue.length > 0)&&(numFormat.test(strFieldValue))){   
    }else{
        return false;
    }
    return true;
}

// =====================================================================================
// Function: checkFloat(objField)
// Usage   : check whether field is valid float number only (0123456789.) or not
// Input   : strFieldValue field value
// Output  : true or false
// Example : onChange="checkFloat(this.value)"
// =====================================================================================
function checkFloat(strFieldValue) {
    numFormat = /^([0-9]*\.?[0-9]+)$/;
    if((strFieldValue.length > 0)&&(numFormat.test(strFieldValue))){   
    }else{
        return false;
    }
    return true;
}

// =====================================================================================
// Function: checkFloat(objField,intBeforeDotDigitNumber,intAfterDotDigitNumber)
// Usage   : check whether field is valid float number only (0123456789.) or not
// Input   : strFieldValue field value	
//           intBeforeDotDigitNumber number of digits before dot
//           intAfterDotDigitNumber number of digits after dot
// Output  : true or false
// Example : onChange="checkFloat(this.value,4,2)"
// =====================================================================================
function checkFloat(strFieldValue,intBeforeDotDigitNumber,intAfterDotDigitNumber) {
    var strNumFormat = "(^([0-9]{1,"+intBeforeDotDigitNumber+"})$)|(^([0-9]{1,"+intBeforeDotDigitNumber+"}\\.[0-9]{1,"+intAfterDotDigitNumber+"})$)";
    numFormat = new RegExp(strNumFormat,"g");
    if((strFieldValue.length > 0)&&(numFormat.test(strFieldValue))){   
    }else{
        return false;
    }
    return true;
}

// =====================================================================================
// Function: checkAlphanumeric(objField)
// Usage   : check whether field is valid alphanumberic characters only (0-9,a-z,A-Z) or not
// Input   : strFieldValue field value	
// Output  : true or false
// Example : onChange="checkAlphanumeric(this.value)"
// =====================================================================================
function checkAlphanumeric(strFieldValue) {
    numFormat = /^([A-Z,a-z,0-9]+)$/;
    if((strFieldValue.length > 0)&&(numFormat.test(strFieldValue))){   
    }else{
        return false;
    }
    return true;
}

// =====================================================================================
// Function: checkEmails(objField)
// Usage   : check whether field is valid email(s) format or not (seperated by ";" or ",")
// Input   : strEmailValue field value	
// Output  : true or false
// Example : onChange="checkEmails(this.value)"
// =====================================================================================
// ##01 - Email Validation
function checkEmails(strEmailValue){
    var emailFilter=/^[A-Z0-9\._%-]+@[A-Z0-9\.-]+\.[A-Z]{2,4}(?:[,][A-Z0-9\._%-]+@[A-Z0-9\.-]+\.[A-Z]{2,4})*$/i; //##02
    
    if((strEmailValue.length > 0)&&(emailFilter.test(strEmailValue))){
    } else{
        return false;
    }    
    return true;
}

// =====================================================================================
// Function: isNumberKeyEvent(objField)
// Usage   : check whether field is valid number only (0123456789) or not
// Input   : strFieldValue field value
// Output  : true or false
// Example : onChange=" return isNumberKeyEvent(event)"
// =====================================================================================
 function isNumberKeyEvent(evt)
           {
                 var charCode = (evt.which) ? evt.which : event.keyCode
                 if (charCode > 31 && (charCode < 48 || charCode > 57)){
                    return false;
                 }
                 return true;
}
// ##01 - Email Validation
