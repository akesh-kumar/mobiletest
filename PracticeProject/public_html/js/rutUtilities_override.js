/*
This file is used to override rutUtilities.js. For prevent affecting occur on other modules.

*/
//See below marked Javadoc (/**) comments on what it does and how to apply
/*-----------------------------------------------------------------------------------------------------------  
rutUtilities_override.js
-------------------------------------------------------------------------------------------------------------
Author Pongsathorn Pichetsilp 23/06/2020
- Change Log ------------------------------------------------------------------------------------------------  
## DD/MM/YY   -User-     -TaskRef-      -Short Description
01 23/06/2020 PONPIC1                   Override rutOpenMessageBox
*/
function rutOpenMessageBox(title, message, messageCode, cancelFunction, okFunction,
		cancelLabel, okLabel, showCloseButton){ //###76
	
	if(showCloseButton === undefined){
		showCloseButton = true;
	}
	
    var html=[];
    var cr='\r\n';
    
    var myDialog = $( "#by-area" ).dialog({
        autoOpen : false,
    });
    
    if (myDialog.dialog('isOpen') != true){
       /* var element=document.getElementById('by-message');

        if (element!=null){
            element.parentNode.removeChild(element); //was removed by ###75, no back with ###101, The previous message was closed by cross button
        }*/
        var elementArea=document.getElementById('by-area');
        if (elementArea!=null){
        	elementArea.parentNode.removeChild(elementArea);
        }
        
        html.push('<div id="by-area" title="'+title+'" style="display:none;">');
        
        if ( ((messageCode!=null)&&(messageCode!=''))){
            html.push('<p id="by-messageCode" class="rcl-messageCode" >'+messageCode+'</p>');
            rut.lastError = {code:messageCode, message:message};
        }
        else {
            rut.lastError=null;
        }
        
        html.push('<p id="by-message" class="rcl-message" >'+message+'</p>');
        html.push('</div><!-- end of message dialog by-area -->');
        var buttons=[];
        
        if (okFunction){ 
        
        	buttons.push( { text: (okLabel ? okLabel : "Ok"),
                            id: "by-pbOk", 
                            click: function(){
                                $(this).dialog("close");
                                this.parentNode.removeChild(this);
                                
                        		if(typeof okFunction === 'string'){
                        			eval(okFunction);
                        		}else{
                        			okFunction();
                        		}
                            }
                        });
        }
        else if(okLabel){
        	buttons.push( { text: okLabel,
                id: "by-pbOk", 
                click: function(){
                        $(this).dialog("close");
                        this.parentNode.removeChild(this);
                }
            });
        }
        if (cancelFunction){   
        	buttons.push({  text: (cancelLabel ? cancelLabel : "Cancel"), 
                            id: "by-pbCancel", 
                            click: function(){
                                $(this).dialog("close");
                                this.parentNode.removeChild(this);
                                
                        		if(typeof cancelFunction === 'string'){
                        			eval(cancelFunction);
                        		}else{
                        			cancelFunction();
                        		}
                        		
                            }
                        });
        } 
        else if(cancelLabel){
        	buttons.push({  text: cancelLabel, 
                id: "by-pbCancel", 
                click: function(){
                        $(this).dialog("close");
                        this.parentNode.removeChild(this);
                }
            });
        }

        if(!okFunction && !okLabel && !cancelFunction && !cancelLabel){
        	buttons.push( { text: (okLabel ? okLabel : "Ok"), 
                id: "by-pbOk", 
                click: function(){
                        $(this).dialog("close");
                        this.parentNode.removeChild(this);
                }
            });
        }
        
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
            open: function(event, ui) {
            	if(!showCloseButton){
            		$("#dialog-confirm .ui-dialog-titlebar-close").hide();
            	}else{
            		$("#dialog-confirm .ui-dialog-titlebar-close").show();
            	}
            }
        });
    }
    else {
        html.push('<p class="rcl-messageCode">----</p>');
        if ((messageCode!=null)&&(messageCode!='')){
            html.push('<p class="rcl-messageCode" >'+messageCode+'</p>'); 
            rut.lastError = {code:messageCode, message:message}; 
        }
        
        html.push('<p class="rcl-messageCode" >'+message+'</p>'); 
        $("#by-message").after(html.join(''));
    }
}