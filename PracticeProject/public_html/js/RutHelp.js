/*-----------------------------------------------------------------------------------------------------------  
RutHelp.js
------------------------------------------------------------------------------------------------------------- 
Copyright RCL Public Co., Ltd. 2007 
-------------------------------------------------------------------------------------------------------------
Author Piyapong Ieumwananonthachai 05/11/07
- Change Log ------------------------------------------------------------------------------------------------  
## DD/MM/YY -User-     -TaskRef-      -Short Description
01 19/08/09 WUT                       Added function for using Ajax with jQuery
02 09/10/09 KIT                       Re-submit imbalance page
03 09/11/09 KIT                       Set scrollbar of help page
04 28/08/12 NIP                       if check null of parent and parent.opener
00 03/05/13 SUJ                       set value for addition value example A,B if choose C = A,B,C
-----------------------------------------------------------------------------------------------------------*/

function checkParent() {
    if(parent && parent.opener && parent.opener.closed) {//04
        alert("Parent window is closed, no more operations are allowed.");
        parent.close();
    }
}

var curSelRowId;
function highlightRadioTD(rowId) {
    //get the TR Object
    objRow = document.all(rowId);

    objOldRow = document.all(curSelRowId);
    if (objOldRow != null) {
        objOldRow.style.backgroundColor ="#FFFFFF";
    }

    if (objRow != null) {
        curSelRowId=rowId;
        objRow.style.backgroundColor= "#ADC3E7";
    }
    objRow.style.backgroundColor= "#ADC3E7";
}

function clickReset() {
    document.frmHelp.txtFind.value = "";
    document.frmHelp.cmbSearch.value = "Select one ...";
    document.frmHelp.chkWild.checked = true;
}

function search(action){
    var strFind = document.frmHelp.txtFind.value;
    var strSearch = document.frmHelp.cmbSearch.value;
    var strWild = "";
    var strErrMsg = "";
    var intErrCode = 1;

    if(document.frmHelp.chkWild.checked) {
        strWild = "ON";
    } else {
        strWild = "OFF";
    }
    document.frmHelp.chkWild.value = strWild;
    
    if((strSearch != "Select one ...") && (strFind.length == 0)) {
        strErrMsg = "*Find criteria cannot be left blank";
    }
    
    if(strSearch == "Select one ..." && strFind.length != 0 && strWild == "ON") {
        strErrMsg = "*Select 'in' criteria at least one value";
    }
    
    if(strSearch == "Select one ..." && strFind.length != 0 && strWild == "OFF") {
        strErrMsg = "*Select 'in' criteria at least one value";
    }
    
    if(strErrMsg == ""){ 
        document.frmHelp.action = action;
        document.frmHelp.submit();
    }else{
        showBarMessage('messagetd',strErrMsg,intErrCode)
    }
}

function setValue(formName,retName,retFunc) {
    var strVal = "";
    if(document.frmHelp.optSelect.length==null){
        strVal = document.frmHelp.optSelect.value;
    }else{
        for(var i=0; i<document.frmHelp.optSelect.length; i++) {
            if(document.frmHelp.optSelect[i].checked) {
                strVal=document.frmHelp.optSelect[i].value;
            }
        }
    }    
    
    var strSplitVal = strVal.split("|");
    var strSplitRetName = retName.split("|");
    
    for(i = 0; i < strSplitVal.length; i++){ 
        
        if (strSplitRetName[i] != "") {
            
              if(strSplitRetName[i].indexOf("[,]")>0){
                    var  filedRetValueName = strSplitRetName[i].split("[,]")[0];
//                    var objRetName = eval("parent.opener.document."+formName+"."+filedRetValueName);
                    
//                    if(objRetName !=null && objRetName.value !=''){
//                        objRetName.value = objRetName.value +","+strSplitVal[i];
//                    }else{
//                        objRetName.value = strSplitVal[i];
//                    }
                    
                    var objRetName = parent.opener.$("#" + filedRetValueName);
                    if(objRetName !=null && $(objRetName).val() !=''){
                    	$(objRetName).val($(objRetName).val() +","+strSplitVal[i]);
                    }else{
                    	$(objRetName).val(strSplitVal[i]);
                    }
             }else{
        
//                    var objRetName = eval("parent.opener.document."+formName+"."+strSplitRetName[i]);
//               	  objRetName.value = strSplitVal[i];
                    var objRetName = parent.opener.$("#" + strSplitRetName[i]);
                    $(objRetName).val(strSplitVal[i]);
             }
        }
    }
    
    if (retFunc != "" && retFunc != undefined) {
        try {
            eval("parent.opener."+retFunc);
        } catch(er) {}
    }
   
    /* ##BEGIN 02*/
    if(eval("parent.opener.document."+formName+".pageAction") != undefined 
        && eval("parent.opener.document."+formName+".pageAction.value") != ""
        && eval("parent.opener.document."+formName+".pageAction.value") == 'SRHDAY')
    {
        window.close();
        parent.opener.document.frmBsa.submit();
    } else {
        parent.close();
    }
    /* ##END 02*/
    
}

function openHelpList(strUrl,intWidth,intHeight,scrollbar) {
    var intWidthDefault = 560;
    var intHeightDefault = 430; 
    
    /* ##BEGIN 03*/
    if (scrollbar == 'undefined') {
        scrollbar = 'auto';
    }
    /* ##END 03*/
    
    if (intWidth == null || intHeight == null) {
        w = window.open(strUrl, 'HelpWindow', 'width='+intWidthDefault+', height='+intHeightDefault+', resizable=yes, scrollbars='+scrollbar+', toolbar=no'); // ##03
    } else {
        w = window.open(strUrl, 'HelpWindow', 'width='+intWidth+', height='+intHeight+', resizable=yes, scrollbars='+scrollbar+', toolbar=no'); // ##03
    }
    w.focus();
}

// #01 BEGIN
function openHelpForAjax(strUrl, strType, strFind, strFrmName, strRetField, strRetFunction) {
    var url = createUrlForHelp(strUrl, strType, strFind, strFrmName, strRetField, strRetFunction);
    
    $.post(url, function(retValue) {
        setValueForHelp(strFrmName, strRetField, retValue, strRetFunction);
    });
}

function openDropdownForAjax(strUrl, strType, strFind, strFrmName, strRetId, strRetFunction, strRetName, strRetExtra, strFindExtra) {
    var url = createUrlForHelp(strUrl, strType, strFind, strFrmName, "", strRetFunction);
    
    if (strFindExtra !== undefined && strFindExtra != "") {
        url = url + "&" + strFindExtra;
    }
    
    if (strRetId != "") {
        $.post(url, function(retValue) {
            setDropdownForHelp(strFrmName, strRetId, retValue, strRetFunction, strRetName, strRetExtra);
        });
    }
}

function createUrlForHelp(strUrl, strType, strFind, strFrmName, strRetField, strRetFunction) {
    var param = "";
    if (strType != "") {
        param += "&type=" + strType;
    }
    if (strFind != "") {
        param += "&find=" + strFind;
    }
    if (strFrmName != "") {
        param += "&frmName=" + strFrmName;
    }
    if (strRetField != "") {
        param += "&retField=" + strRetField;
    }
    if (strRetFunction != "") {
        param += "&retFunction=" + strRetFunction;
    }

    return strUrl + param;
}

function setValueForHelp(strFrmName, strRetField, strRetValue, strRetFunction) {
    var strSplitRetField = strRetField.split("|");
    var strSplitRetVal = strRetValue.split("|");
    for (i = 0; i < strSplitRetVal.length; i++) { 
        if (strSplitRetField[i] != "") {
        
             if(strSplitRetField[i].indexOf("[,]")>0){
                var  filedRetValueName = strSplitRetField[i].split("[,]")[0];
                var objRetName = eval("document."+strFrmName+"."+filedRetValueName);
                
                if(objRetName !=null && objRetName.value !=''){
                    objRetName.value = objRetName.value +","+strSplitRetVal[i];
                }else{
                    objRetName.value = strSplitRetVal[i];
                }
           }else{
                var objRetName = eval("document."+strFrmName+"."+strSplitRetField[i]);
                objRetName.value = strSplitRetVal[i];
            }
        }
    }
	
    if (strRetFunction != "" && strRetFunction != undefined) {
        try {
            eval(strRetFunction);
        } catch(er) {}
    }
}

function setDropdownForHelp(strFrmName, strRetId, strRetValue, strRetFunction, strRetName, strRetExtra) {
    if (strRetValue != "") {
        try {
            var strHtml = "<select size='1' name='"+strRetName+"' "+strRetExtra+">";
            
            var objRet = eval("document.getElementById('"+strRetId+"')");
            objRet.innerHTML = strHtml + strRetValue + "</select>";
        } catch(er) {}
    }
    
    if (strRetFunction != "" && strRetFunction != undefined) {
        try {
            eval(strRetFunction);
        } catch(er) {}
    }
}
// #01 END

function getObject(formName, strName) {
    var objName = null;
    try {
        if (strName != "" && formName != "") {
            objName = eval("document."+formName+"."+strName);
        }
    } catch(er) {}
    return objName;
}
