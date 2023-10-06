/*-----------------------------------------------------------------------------------------------------------  
RutString.js
------------------------------------------------------------------------------------------------------------- 
Copyright RCL Public Co., Ltd. 2007 
-------------------------------------------------------------------------------------------------------------
Author Piyapong Ieumwananonthachai 03/04/08
- Change Log ------------------------------------------------------------------------------------------------  
## DD/MM/YY -User-     -TaskRef-      -Short Description  
-----------------------------------------------------------------------------------------------------------*/

function trim(strText) {
    try {
        strText = jQuery.trim(strText);
    } catch(er) { 
        // trim leading spaces
        while (strText.substring(0,1) == ' ') {
            strText = strText.substring(1, strText.length);
        }
        // trim trailing spaces
        while (strText.substring(strText.length-1,strText.length) == ' ') {
            strText = strText.substring(0, strText.length-1);
        }    
    }
    return strText;
}

function UpperCase(obj){
    var objStr = obj.value.toUpperCase();            
    obj.value = objStr;
}

function radioValue(obj) {
    var retValue = "";
    if (obj !== undefined && obj != null) {
        try {
            if (obj.length !== undefined && obj.length > 0) {
                for (var i=0;i<obj.length;i++) {
                    if (obj[i].checked) {
                        retValue = obj[i].value;
                    }
                }
            } else {
                retValue = (obj.value !== undefined && obj.value != "") ? obj.value : "";
            }
        } catch(er) {
            retValue = (obj.value !== undefined && obj.value != "") ? obj.value : "";
        }
    }
    return trim(retValue);
}

function selectValue(obj) {
    var retValue = "";
    if (obj !== undefined && obj != null) {
        try {
            if (obj.length !== undefined && obj.length > 0) {
                for (var i=0;i<obj.length;i++) {
                    if (obj[i].selected) {
                        retValue = obj[i].value;
                    }
                }
            } else {
                retValue = (obj.value !== undefined && obj.value != "") ? obj.value : "";
            }
        } catch(er) { 
            retValue = (obj.value !== undefined && obj.value != "") ? obj.value : "";
        }
    }
    return trim(retValue);
}

function countSelectObject(obj) {
    var retCount = 0;
    if (obj !== undefined && obj != null) {
        try {
            if (obj.length !== undefined && obj.length > 0) {
                retCount = obj.length;
            } else {
                if (obj.value !== undefined && obj.value != "") {
                    retCount = 1;
                } else {
                    retCount = 0;
                }
            }
        } catch(er) { 
            retCount = 0;
        }
    }
    
    return retCount;
}

function validateSelectObject(obj) {
    var strErrMsg = "";
    var intRow = countSelectObject(obj);
    var count = 0;
    
    if (intRow == 1) {
        if (obj.checked) {
            count++;
        }
    } else {
        for (var i=0; i < intRow;i++) {
            var chkDelete = obj[i];
            if (chkDelete.checked) {
                count++;
            }
        }
    }
    
    if (count == 0) {
        strErrMsg = "* At least one checkbox should be checked";
    }
    return strErrMsg;
}
