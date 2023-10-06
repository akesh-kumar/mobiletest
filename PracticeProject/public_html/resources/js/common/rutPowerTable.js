    /*-----------------------------------------------------------------------------------------------------------
    qtnPowerTable.js
    -------------------------------------------------------------------------------------------------------------
    Copyright RCL Public Co., Ltd. 2018
    -------------------------------------------------------------------------------------------------------------
    Author nawrat1 25/09/2019
    - Change Log ------------------------------------------------------------------------------------------------
    ## DD/MM/YY   -User-     -TaskRef-      -Short Description
    01 25/09/2019 nawrat1                   Duplicate from rutPowerTable.js
    */

    /**
     * RCL Power Table - ConceptionalOverview<br>
     * This Javascript provides a generic facility for creating lists of records in an html page and fill it with data.
     * The tool requires a &lt;div&gt; (or any other suitable tag) of class "tblArea" (Bootstrap also need "container") to contain the whole list.
     * It must have an html ID and this id must have a 3-character prefix and all id's within the container shall have same prefix.<br>

     * Inside this containers it requires  at some place one &lt;div&gt; (or any other suitable tag) of class "tblRow"
     * (Bootstrap also requires "row" or "form-row") to keep the template of one row of data. The row must also have an html ID with same prefix.
     * Within this template row each tag with data must have class "tblField" and an id of this format "&lt;prefix&gt;&lt;attributeNameOfDataInClass&gt;".<br>

     * After intitializing the tool with the function rptTableInit one can add the data to it with addData.
     * The data would consist of an array of classes. The attribute names within the class must correspond to the IDs of the tblField's (minus prefix).
     * So if there is a tblField with ID "t0-booking" there should be an attribute named "booking".<br>

     * The tool supports &lt;input&gt;,&lt;p&gt;,&lt;span&gt;,&lt;td&gt;,&lt;textarea&gt;,&lt;select&gt; and any tag which contains text. For select the data value must be in the html attribute value of each option.
     * So when data is added it compares the it looks at &lt;option value=CN"&gt; China &lt;option&gt; it would select this option only, if the value in
     * the data is "CN".<br>

     * The PowerTable tool uses a global variable named rutPowerTableIndex<br>
     * It also uses a temporary global variable rutPowerTableInActiveSortSettings to store the settings of the PowerTable, which at this very moment is being sorted.
     * The tool will suppress display of the template row and will create copies of it for each row in the data array. Any html ID in the
     * template will be replaced in the copy with same ID-index, so ID="t0-booking" would become ID="t0-booking-0" ...
     * The new rows are inserted before the template row. So all elements of the container other than the template row will remain untouched.<br>
     * A special topic are id's. Since these must be unique the id's in the template receive a suffix with a running number per row. So id="t0-container" becomes
     * id="t0-container-4". RCL Power table creates an inventory of all Id's in a row and adds number suffixes. Since these id's can be used in other attributes of the row as well, it will also replace
     * any other ocurrence of thes id's with the suffixes version, provided taht this occurence is isolated by double quotes. Thereby a prefix of '#' is considered<br>
     * Example: for="d0-container" becomes for="d0-container-4", data-toggle="#d0-fsc" becomes data-toggle="#d0-fsc-4". But data-id-list="d0-customer d0-fsc" is not touched.
     * Also the special pattern #-RowId-# is replaced by the present row id.
     *
     * The data of the table is kept at two places
     * settings.data is an array of the original data. all new records are appended. No row is deleted. The sequence is retained
     * settings.sortAndSearchMap.[index][0] is a reference to the data which are displayed at position index. map is resorted as required.
     * If a single data record is replaced with diferent data, then both places (settings.data and sortAndSearch.map) need to be udated.
     * If only single properties are updated, an update in data is sufficient
     *
     * Every displayed row as a unique row id. The id typically looks like t0-row-43 where t0- is the table prefix and 43 is the index of
     * the the rows data in settings.data. The row id is kept in settings.sortAndSearch.map[index][4]
     *
     * The below function is a dummy to keep this documentation. Do not use it.
    * @author Ascan Heydorn
    */
    function aRCLPowerTable_ConceptionalOverview(){}
    /**RCL PowerTable - Paging Concept<br>
     * In order to have paging support, there must be a divider (or other area) of id="t0-paging" (in general <prefix>paging)
     * PowerTable will put into it another divider of flex-layout which itself contains 3 areas:<b>
     * The paging indicator on the left side, which shows "Page n of m"<br>
     * A Goto button with an input field in the middle, where users can enter a pager number and press the button to see the data<br>
     * A button area on the right side with 9 buttons.<br>
     * These buttons comprise<br>
     * 2 buttons which allow to move to the next or previos page<br>
     * 2 buttons showing the first and last page number<br>
     * 5 buttons showing page numbers in between.<br>
     * The format of these controls uses the following classes, whose styling is left to the developer:<br>
     * rptPgIndicator<br>
     * rptPgGotoLabel<br>
     * rptPgGotoField<br>
     * rptPgBtn<br>
     *
     * @author Ascan Heydorn
     */
    function aRCLPowerTable_PagingFacility(){}
    if ((typeof rut)=="undefined"){//###30
        rut = { browser:null, powerTableIndex:[], powerTableInActiveSortSettings:null}; //###30
        //powerTableIndex := An array of { containerId, settings} of all power tables
        //powerTableInActiveSortSettings set to settings once a sort is started. Sort interferes with map
    }//###30
    //var rutPowerTableIndex = []; //###30
    /**Keeps the settings of the sort which is just running. Required, since we cannot pass this as a parameter to the compare
     * functions and there could be morethan one table on the page.
     * After the sort has finished it is reset to null
     * @private
     */
    //var _rutPowerTableInActiveSortSettings = null; //set to settings once a sort is started. //###30
    /**Deprecated
     * @private
     */
    function tableInit(containerId, options){
        return rptTableInit(containerId, options);
    }
    /** Initializes the settings of a table based on the HTML. The functions scans the children of containerId and looks for
    tags of the classes tblRow, tblField and their id's. From that it creates a table of columns and related tags.
     * @author Ascan Heydorn
     * @param {string} containerId The ID attribute of the container in the html, which comprises the table
     * @return the settings
    */
    function rptTableInit(containerId, options){
        if (!options) {
            options = {};
        }
        //Check whether containerId is unique
        var l= $('#'+containerId).length;
        if (l>1){
            alert('rptTableInit: containerId '+containerId+' exists '+l+' times');
            return;
        }
        var parents=rptGetParentIds(containerId);
        if (parents.elementId==null){
            alert('rptTableInit: containerId '+containerId+' does not exists');
            return;
        }
        //Safety TO DO: we should check, that we have this id only once
        var s=getTableSettings(containerId);
        if (s!==null) {
            alert('rptTableInit: Settings for table with id "'+containerId+'" are already set');
            return null;
        }

        var settings = {
            containerId : containerId,
            //fields describing the template of the row header
            rowId : rowId, //this is the id of the row template, new rows get indexed ids rowId-0, rowId-1 ...
            idPrefix: "", //the prefix of the id of each field, after which the column name is show
            rowOuterHtml :"", //this is the html of one row
            columns: [],  //name, tag, type, potential values of tag "input", //select, p, td, textarea
                        // potential values of type: radio, text, checkbox, number, ""=not applicable
                        //fields are name, tag, type, conversionTable = am 2dim string array of name=date/value=display
                        //type=10 input other, 11=input text 12 input numeric 13 input checkbox, 14 input/radio
                        //type=50 SELECT
                        //99 anything other than the above. These will be treated like text
                        //0 undefined, will not be used
                        //conversionTable: [],  // optional feature table of {dataValue, displayValue}. Can translate data to display and vice versa
            idList:[], //a list of all ids in a row. these Ids we must replace with indexed Ids before inersting into html
            data: [], // an array of classes, each class provides data for one row. The field names of the class must match the columns names
            insertsAndChanges: [], //an array of row ids, which have been updated or inserted since las delete of this list
                      //in case of update the prefix i 'u', otherwise 'i'. Example 'ut2-row-33', it0-row-12'
            // ###09 this gives a safe new row-id index number. It start with map.lenght but when rows are deleted it stays
            //without that inserting, deleting and inserting again might create duplicates
            nextRowIndex: 0, //
            requireChangeEvent: false, //if true it indicates, that we must and have registered a chane event on the area
            configuration: {
                prefixLength: 3,   //can be adjusted atRuntime by subtables
                classTableHeader: "tblHeader", //the class indicating a table header
                classTableArea: "tblArea",
                classTableRow: "tblRow",
                classTableField: "tblField",
                rowIdReplacementTag: "#-RowId-#", //when this is present in the tblRow, it will be replaced with the id of the row
                                            //Example: onclick='put("#-ID-#")' is replaced by onclick='put("t0-container-3")'
                sortDialogSuffix: "-dlg",
                sortDialogBtnAscSuffix: "-dlgAsc-",
                sortDialogBtnDescSuffix: "-dlgDes-",
                sortDialogSearchFieldSuffix: "-dlgSearch",
                sortDialogSearchFieldCountSuffix: "-dlgSearchCount",
            },  // configuration
            sortAndSearch: {
                map:[],   // an array of classes {htmlRowId, originalSortKey, wasFound=true if search has found it, row-id} //###17
                            //map[0,0] = data[0]
                            //map[0,1] = original sortKey is the index of the data. Inserted data become a decimal between the predecessor and successor
                            //map[0,2] = true/false depending on whether search has found it (true) or not (false)
                            //map[0,3] = page number, default 0 ###02 Paging
                            //map[0,4] = rowId
                sortDefinition: [], //an array of classes {sortColumnName, ascDesc}     asc=1, desc=-1
//                  search: "", //a text field with the actual search
//                  foundHits: null, //when search was done thiscontainers the number of hits
                dialogOpen: false, //whether the sortAndSearchDialog is opened or not
            }, //end sortAndSearch
            // paging introduced with ###02 Paging
            paging: {
                hasPaging: false, //set to true is sarch area has a paging area with id prefix-paging (e.g. "t0-paging")
                activePage: 1, //The present page being displayed
                lastPageNumber: 1, //the las page number
                pageSize: 50, //the number of rows on a page
                buttonClass: "rptPgBtn", //the css class of each page button
                gotoLabelClass: "rptPgGotoLabel",
                gotoFieldClass: "rptPgGotoField",
                indicatorClass: "rptPgIndicator",
            }, //end insert ###02 Paging
            displayConfiguration:{
                sortBtnColorClass: "rptSortBtnColor",
                sortBtnHighlightClass: "rptSortBtnHighlight",
                //oddClassList: null,    //###35 //a space separated list of classes to be attached to any visible odd entry, to remove from the others.
                oddClassList: "rptOddRow",    //###35 This class is attached to any odd row (index based 0) in a power table (the tblRow itself) and removed from even rows
                //evenClassList: rclPtEvenRow"bg-light",    //###35 // presently on one class is supported TO DO bg-light
                evenClassList: "rptEvenRow",    //###35 This class is attached to any even row (index based 0) in a power table (the tblRow itself) and removed from odd rows
            }, // end displayConfiguration
            disabledSortControl: options.disabledSortControl
        };
        var rowId=null;
        //We need to find the innermost tblRow
        $("#"+containerId).find("."+settings.configuration.classTableRow).each(function(){
            parents=rptGetParentIds(this);
            if(containerId!=parents.parentContainerId){
                return; //This was the wrong one, we are seeking another tblRow
            }
            rowId=this.id;
        });
        settings.rowId=rowId;
        if (!rowId) {
            alert('rptTableInit: Table container of id "'+containerId+'" does not have a row template of class "'+settings.configuration.classTableRow+'".');
                return null;
        }
        settings.rowOuterHtml=document.getElementById(rowId).outerHTML;
        //Find column definitions
        var columnName="", tag="",type="";
        var prefixLength=settings.configuration.prefixLength;
        settings.idPrefix = containerId.substr(0,prefixLength);
        $("#"+settings.rowId).find("."+settings.configuration.classTableField).each(function(){
            //Check whether tblField belongs has this rowId as innermost tblRow
            parents=rptGetParentIds(this);
            if (settings.rowId!=parents.parentRowId){
                return; //this tblField does not belong to our row, move on with the next
            }
            columnName=this.id.substring(prefixLength);
            tag=this.nodeName;
            type=(tag=== "INPUT") ? this.type : "";

            if (tag==="INPUT"){
                if (!this.readonly){ settings.requireChangeEvent=true;} //we need a change event
                if      (this.type==="checkbox") { type=13;}
                else if (this.type==="radio")    { type=14;}
                else if (this.type==="text")     { type=11;}
                //else if (this.type==="number")   { type=11;} //assign to value; //##37b
                else if (this.type==="number")   { type=12;} //##37b
                else if (this.type==="usernamer"){ type=11;} //assign to value;
                else if (this.type==="password") { type=11;} //assign to value;
                //###20 BEGIN
                else if (this.type=="date")    { type=11;} //assign to value;
                else if (this.type=="time")    { type=11;} //assign to value;
                //else if (this.type=="tel")     { type=11;} //assign to value; //##37b
                else if (this.type=="tel")     { type=12;} //##37b
                else if (this.type=="email")   { type=11;} //assign to value;
                else if (this.type=="url")     { type=11;} //assign to value;
                //###20 END
                else {type=0;}  //undefined, do not assign
            }
            else if (tag==="SELECT") {
                if (!this.readonly){ settings.requireChangeEvent=true;} //we need a change event
                type=50;} //compare with values in options
            else if (tag==="TEXTAREA") {
                if (!this.readonly){ settings.requireChangeEvent=true;}//we need a change event
                type=99;} //assign to text
            else if (tag==="SPAN") { type=99;}
            else if (tag==="P") { type=99;}
            else if (tag==="TD") { type=99;}
            else { type=0;}

            settings.columns.push ({
                "name": columnName,
                "tag" : tag.toLowerCase(),
                "type": type
                }
            );
        });
        //Create a list of all ids of the row, so that we can replace them with indexed ids, once we create new entries
        var id="";
        settings.idList.push ( settings.rowId); // for easy programming we put the row id on top of the list
        $("#"+rowId).find("*").each(function(){
            if (this.id !=="") {
                settings.idList.push ( this.id );
            }
        });
        //Check whether we need a change event and register it
        if( settings.requireChangeEvent){
            document.getElementById(containerId).addEventListener("change",
                function(event){_rptHandleRowChangeEvent(settings, event);});
        }
        //Check whether we have a paging area and inserts the tags ###02 paging
        //###23 BEGIN
        var pagingElement=document.getElementById(settings.idPrefix+"paging");
        //if (document.getElementById(settings.idPrefix+"paging")!=null){
        if (pagingElement!=null){
            settings.paging.hasPaging=true;
            var pgSize = pagingElement.getAttribute('data-pageSize');
            if (!isNaN(pgSize)){
                settings.paging.pageSize = pgSize;
            }
        //###23 END
        }
        //Add settings to tableIndex
        //rutPowerTableIndex.push({containerId: containerId, settings: settings});//###30
        rut.powerTableIndex.push({containerId: containerId, settings: settings});//###30
        //Make the template invisible
        $('#'+rowId).hide();

        //add rightClickEventListener
        //but only if it is not a lookup dialog
        if (containerId!="t99Lookup" && !settings.disabledSortControl) { //###05
            document.getElementById(containerId).addEventListener(
                    'contextmenu',
                    function(e) {
                        //rptShowSortControl(containerId); //###41
                    	//###41 BEGIN
                    	if(_exceptsSortTable.indexOf(containerId) === -1){
                    		rptShowSortControl(containerId);
                    	}
                    	//###41 END
                        e.preventDefault();
                    },
                    false);
        }
        //build the paging area ###02, only now the table is in rut.powerTableIndex
        if (settings.paging.hasPaging==true){
            rptInsertPagingTags(containerId);
        }
        return settings;
    } //end function rptTableInit
    /**Finds the inner most tblRow and tblArea of an element. The element does not need to have an idea or belong to a table.
     * @param {string | object} source must be event object or a HTML Id
     * @return {object} An object with this properties: elementId, parentRowId, parentContainerId
     * @author Ascan Heydorn
     */
    function rptGetParentIds(source){
        var node=null;
        var elementId=null;
        if (typeof source =="string"){
            node=document.getElementById(source);
            elementId=source;
        }
        else if (source instanceof Event) { //Source is an event
            node=source.currentTarget;
            elementId=node.id;
        }
        else if (source instanceof Element){
            node=source;
            elementId=source.id;
        }

        else {
            alert('Function rptGetParentIds was called with '+JSON.stringify(source)+" It should be Element, Event or a string")
        }
        var parentRow=null;
        var parentContainer=null;
        while(true){
            node=node.parentNode;
            tag=node.tagName;
            if (tag=='BODY') break;

            if (node.classList.contains("tblRow")&&(!parentRow)){
                parentRow=node.id;
                hasParentRow=true;
            }
            if (node.classList.contains("tblArea")&&(!parentContainer)){
                parentContainer=node.id;
                hasParentArea=true;
            }
        }
        return {elementId:elementId, parentRowId: parentRow, parentContainerId: parentContainer};
    }//end function rptGetParentIds
    /** Finds settings for a table in the rut.powerTableIndex. Requires that rptTableInit was run before.
     * @author Ascan Heydorn
     * @param containerId The html id of the container comprising the table
     * @return the settings or null if nothing found
    */
    function rptGetTableSettings(containerId){
        return getTableSettings(containerId);
    }
    /**
     *
     * @private
     */
    function getTableSettings(containerId){
        var settings=null;
        //for (var i=0;i<rutPowerTableIndex.length;i++){//###30
        for (var i=0;i<rut.powerTableIndex.length;i++){//###30
        //if (rutPowerTableIndex[i].containerId === containerId) {settings=rutPowerTableIndex[i].settings;}//###30
            if (rut.powerTableIndex[i].containerId === containerId) {settings=rut.powerTableIndex[i].settings;}//###30
        }
        return settings;
    } //end function getTableSettings
    /** Adds the data to a table. Requires that rptTableInit was run before.
     * @author Ascan Heydorn
     * @param containerId The html id of the container comprising the table
     * @param data An array of classes. The match between data and html is through the id of tags of class "tblField".
     * This id must be after the prefix identical to a attribute name of the class.
     * If the tag has id t0-containerNumber then the class should have an attribute containerNumber.
    */
    function rptAddData(containerId, data){
        var settings=getTableSettings(containerId) || null;
        var pageNumber=(settings.paging.hasPaging)? 0:1; //###02 paging
        if (!settings) {
            alert( 'adData: Settings for table with id "'+containerId+'" are not created. Run initTableSettings first');
            return null;
        }
        settings.data = data;
        settings.nextRowIndex=data.length;
        settings.sortAndSearch.map=[];
        settings.sortAndSearch.sortDefinition=[];
        settings.sortAndSearch.search="";
        settings.sortAndSearch.foundHits=null;
        if (settings.sortAndSearch.dialogOpen) {
            rptCloseSortControl(containerId);
        }
        for (var i=0;i<data.length;i++){
            //increment page number
            if ( (settings.paging.hasPaging) && ( ( i% settings.paging.pageSize)==0) ){
                pageNumber++;
            }
            //settings.sortAndSearch.map.push([data[i],i,true,pageNumber]); //dataRecord, originalSort, withinSearch, page# ###17
            settings.sortAndSearch.map.push([data[i],i,true,pageNumber,settings.rowId+'-'+i]); //dataRecord, originalSort, withinSearch, page#, rowId ###17
            //#####we need to have the row-id in map as well, should become map[4]
        }
        if (settings.paging.hasPaging){
            //settings.paging.activePage=1;//###34
            settings.paging.activePage=(data.length>0)?1:0;//###34
            settings.paging.lastPageNumber=pageNumber;
            rptResetPagingValues(containerId);
        }
        return null;
    }// end function rptAddData
    /**
     * @private
     */
    function addData(containerId, data){
        return rptAddData(containerId, data);
    } //end function addData
    /**deprecated
     * @private
     */
    function displayTable(containerId){
        return rptDisplayTable(containerId);
    }
    /** Builds html and display it after settings and data are ready. Requires rptTableInit and addData to be run before.
     * @param {string} containerId The html id of the container comprising the table
    */
    function rptDisplayTable(containerId){
        var settings=getTableSettings(containerId) || null;
        if (!settings) {
            alert( 'rptDisplayTable: Settings for table with id "'+containerId+'" are not created. Run initTableSettings first');
            return null;
        }
        var displayedRow=0; //###36
        var element=null;//###36
        for (var i=0;i<settings.sortAndSearch.map.length;i++) {
            if ( settings.sortAndSearch.map[i][2] &&  //record is search hit //###36
                (settings.sortAndSearch.map[i][3]==settings.paging.activePage) //###36
                ) { //record is a search hit at the active page //###36
                rptCreateNewTableRow(settings,i);
                rptDisplayDetailArea(settings.sortAndSearch.map[i][4], settings.sortAndSearch.map[i][0]);
                //###36 BEGIN
                //Now apply even/odd class
                displayedRow++;
                element=document.getElementById(settings.sortAndSearch.map[i][4]);
                if(displayedRow & 1){ //odd
                    _rptSwapCssClasses(element,
                        settings.displayConfiguration.evenClassList||null,
                        settings.displayConfiguration.oddClassList||null);
                }
                else  { //even
                    _rptSwapCssClasses(element,
                        settings.displayConfiguration.oddClassList||null,
                        settings.displayConfiguration.evenClassList||null);
                }
                //###36 END
            } //to be displayed //###36
        } //end for length of search
        //rptHideAndMarkDataOnDisplay(containerId); //###36
    } //end function rptDisplayTable
    /**
     * @private
     */
    function testOutput(containerId){
        var settings=getTableSettings(containerId) || null;
        var column=settings.columns[0].name;
        console.log("Settings And Search Map");
        if (i<5){console.log(i+" / "+JSON.stringify(settings.sortAndSearch.map[i][0]));}

        for (var i=0;i<settings.sortAndSearch.map.length;i++){
            if (i<5){console.log(i+" / "+JSON.stringify(settings.sortAndSearch.map[i][0]));}
            /*
            console.log('testOutput map:'+i+":"+settings.sortAndSearch.map[i][0][column]+
            "/"+settings.sortAndSearch.map[i][1]+
            ":"+settings.sortAndSearch.map[i][2]+
            ":"+settings.sortAndSearch.map[i][3]+
            ":"+settings.sortAndSearch.map[i][4]);
            */
        }

        //console.log("Rows");
        $(".tblRow").each(function(){
            //console.log("testOutput rowId:"+this.id);
        });
        console.log("data");
        for (var i=0;i<settings.data.length;i++){
            if (i>40){console.log(i+" / "+JSON.stringify(settings.data[i]));}
            //console.log('testOutput data :'+i+":"+eval('settings.data['+i+'].'+column));
        }
    }//end function testOutput
    /**Deprecated
     * @private
     */
    function createNewTableRow(settings,index){
        return rptCreateNewTableRow(settings, index);
    }
    //Replaces all id's in the inner html of a row with new index ids
    /**Creates html for a new row and the given index and returns it.
     * It is used to initially build up the display of the table, after
     * the data has been added.
     *
     * @param {object} settings The settings object of the table
     * @param {integer} index The index of the data for which to create a row.
     * @returns {string} The html code of the new row to insert nito the DOM
     * @private
     * @author Ascan Heydorn
     */
     function rptCreateNewTableRow(settings, index){
        var html=settings.rowOuterHtml;
        var toBeReplaced=null; //###11
        var replaceWith=null; //###11
        var rex=null; //it shall keep the regexp //###38
        //add index to all ids
        //we need to use the index of the row Id
        var newIndex=settings.sortAndSearch.map[index][4].substring(settings.rowId.length); //###17
        for (var i=0;i<settings.idList.length;i++){
            //###11 BEGIN  Ids can show up more than one time in a row, e.g. as <label for="s0-container">
            toBeReplaced='"'+settings.idList[i]+'"';
            //replaceWith=('"'+settings.idList[i]+"-"+index+'"');//###17
            replaceWith=('"'+settings.idList[i]+newIndex+'"');//###17
            rex= new RegExp(toBeReplaced, "g");//###38
            html=html.replace(rex,replaceWith); //###38
            //html=html.replace(
            //    '"'+settings.idList[i]+'"',('"'+settings.idList[i]+"-"+index+'"') );
            //while (-1<html.search(toBeReplaced)){ //###38
            //    html=html.replace(toBeReplaced,replaceWith); //###38
            //} //###38
            // They can also show up with prefix # like in data-toggle="#so-container"
            toBeReplaced='"#'+settings.idList[i]+'"';
            //replaceWith=('"#'+settings.idList[i]+"-"+index+'"');//###17
            replaceWith=('"#'+settings.idList[i]+newIndex+'"');//###17
            rex= new RegExp(toBeReplaced, "g");//###38
            html=html.replace(rex,replaceWith); //###38
            //while (-1<html.search(toBeReplaced)){ //###38
            //    html=html.replace(toBeReplaced,replaceWith); //###38
            //} //###38
            //###11 END
        }
        //replace the idReplacementTag with the true rowIdReplacementTag
        //var rowId=settings.rowId+'-'+index; //###17
        var rowId=settings.sortAndSearch.map[index][4]; //###17
        rex= new RegExp(settings.configuration.rowIdReplacementTag, "g");//###38
        html=html.replace(rex,rowId); //###38
        //while (-1<html.search(settings.configuration.rowIdReplacementTag)){ //###38
        //    html=html.replace(settings.configuration.rowIdReplacementTag,rowId); //###38
        //} //###38
        //we insert the row before the template row. By this any additional controls within the container, which shall not repeat are preserved.

        $("#"+settings.rowId).before(html);
        rutInitArea(rowId); //###14 initialize event handlers
        return html;
    }
    //####03
    /**Inserts a row and an empty data record before the given place.<br>
     * If index is a number, the new row is inserted before the row of that index.
     * If it is 'end', the new row is inserted as last row
     * Otherwise index is considered to be a rowId
     *
     * @param {String} containerId Html id of the table area
     * @param {String|Number|'end'} index Either index number or rowId or 'end'
     * @param {object|null} newData
     * @author Ascan Heydorn
     */
    function rptInsertNewRowBefore(containerId, index, newData){
    //function rptInsertNewRowBefore(containerId, index){  //index=numeric index, rowId or end
        /* This is the strategy
        1) The new index and rowId is always nextRowIndex, this value becomes bigger and bigger because id's of deleted rows are not reused.
        2) Sort numbers
        2.1 if the row is inserted at the beginning, the sort number is -map.length
        2.2 if it is at the end then always +map.length
        2.3 in between and we have a sort active: -map.length => with sort reset it jumps to the start
        2.4 in between but original sort (sortNumber[predecessor]+sortNumber[successor])/2
        */
        var idType=(isNaN(index))?"htmlId":"index";
        idType = (index=='end')?"end":"htmlId";
        var settings=rptGetTableSettings(containerId);
        var newIndexNumber=settings.nextRowIndex;
        settings.nextRowIndex++;
        var newRowId=settings.rowId+"-"+newIndexNumber; //this is the index in settings.data
        var html=settings.rowOuterHtml;
        var toBeReplaced=null;
        var replaceWith=null;
        var rex=null; //to keep regular expressions //###38
        //add index to all ids
        for (var i=0;i<settings.idList.length;i++){
            //Ids can show up more than one time in a row, e.g. as <label for="s0-container">
            toBeReplaced='"'+settings.idList[i]+'"';
            replaceWith=('"'+settings.idList[i]+"-"+newIndexNumber+'"');
            rex=new RegExp(toBeReplaced,'g');//###38
            html=html.replace(rex,replaceWith);//###38
            //while (-1<html.search(toBeReplaced)){//###38
            //    html=html.replace(toBeReplaced,replaceWith);//###38
            //}//###38
            // They can also show up with prefix # like in data-toggle="#so-container"
            toBeReplaced='"#'+settings.idList[i]+'"';
            replaceWith=('"#'+settings.idList[i]+"-"+newIndexNumber+'"');
            rex=new RegExp(toBeReplaced,'g');//###38
            html=html.replace(rex,replaceWith);//###38
            //while (-1<html.search(toBeReplaced)){//###38
            //    html=html.replace(toBeReplaced,replaceWith);//###38
            //}//###38
        }//end for settings.idList
        //replace the idReplacementTag with the true rowIdReplacementTag
        rex=new RegExp(settings.configuration.rowIdReplacementTag,'g');//###38
        html=html.replace(rex,newRowId);//###38
        //while (-1<html.search(settings.configuration.rowIdReplacementTag)){ //###38
            //html=html.replace(settings.configuration.rowIdReplacementTag,rowId);//###17
        //    html=html.replace(settings.configuration.rowIdReplacementTag,newRowId);//###17//###38
        //}//###38
        //Now we need to find the row id where to insert the row.
        var data=(!newData)?{}:newData;
        var rowId="";
        var count=-1; //count is actually the index in map after which the record is inserted.
        var sortNumber=0;
        var newIndexInMap=null;
        if (index=='end') {
            count=settings.sortAndSearch.map.length-1;//###28
            newIndexInMap=settings.sortAndSearch.map.length; //###28
            rowId=settings.rowId;
            //we insert an empty data with sort index lenght of arry and considered as found and last page number
            //settings.sortAndSearch.map.push([data,settings.sortAndSearch.map.length,true,settings.paging.lastPageNumber] );//###17
            settings.sortAndSearch.map.push([data,settings.sortAndSearch.map.length,true,settings.paging.lastPageNumber,newRowId] );//###17
            settings.data.push(data); //###17  The new data are inserted into data at the place of newRowId, so that they can be retrieved later even after a deletion
            $("#"+rowId).before(html);

            rutInitArea(newRowId);
        } //end 'atEnd'
        else { //Now we need to step through rows of the table and count
            //###36 BEGIN
            if (idType=='index') {
                rowId=settings.sortAndSearch.map[index][4];
                count=index;
            }
            else {
                rowId=index;
                for (var i=0;i<settings.sortAndSearch.map.length;i++){
                    if (rowId==settings.sortAndSearch.map[i][4]){
                        count=i;
                        break;
                    }
                }
                if (count<0){
                    alert('rptInserNewRowBefore index '+index+' max length is '+settings.sortAndSearch.map.length);
                    return;
                }
            }
            settings.sortAndSearch.map.splice(count, 0,[data,sortNumber,true,settings.sortAndSearch.map[count][3],newRowId] );//###17
            newIndexInMap=count; //###28
            settings.data.push(data); //###17  The new data are inserted into data at the place of newRowId, so that they can be retrieved later even after a deletion
            $("#"+rowId).before(html);
            rutInitArea(newRowId); //###14 initialize event handlers
            /*
            $("#"+containerId).find(".tblRow").each(function(){
                rowId=this.id;
                if (rowId==settings.rowId) { //This is the template row, it does not count
                    return true;
                }
                count++; //we increment the counter and compare with index
                if  ( ((idType=='index')&&(count<index)) ||
                    ((idType=='htmlId')&&(rowId!=index))
                    ) {  //next row please
                    return true;
                }
                else if ( ((idType=='index')&&(count==index)) ||
                          ((idType=='htmlId')&&(rowId==index))
                        ) { //This is now the hit
                    if ( (count==0) ||//when you insert at beginning or special sort, we put the record at the start
                         (settings.sortAndSearch.sortDefinition.length>0) ) {
                             sortNumber=-1*settings.sortAndSearch.map.length;
                    }
                    else { //now we are in between and still have the original sort. So we divide sort numbers by half
                        sortNumber= (settings.sortAndSearch.map[count  ][1]+
                                     settings.sortAndSearch.map[count-1][1] ) / 2;
                    }
                    //settings.sortAndSearch.map.splice(count, 0,[data,sortNumber,true,settings.sortAndSearch.map[count][3]] );//###17
                    settings.sortAndSearch.map.splice(count, 0,[data,sortNumber,true,settings.sortAndSearch.map[count][3],newRowId] );//###17
                    newIndexInMap=count; //###28
                    settings.data.push(data); //###17  The new data are inserted into data at the place of newRowId, so that they can be retrieved later even after a deletion
                    $("#"+rowId).before(html);
                    rutInitArea(newRowId); //###14 initialize event handlers
                    return false;
                }
                else {return false;} //too much advanced
            });
            */
            //###36 END
        } //end else = index i s not 'end'
        //display data if we have some
        if (newData!=null){
            rptMoveDataToDisplay(settings, newIndexInMap);
        }
        //add row to list of inserts and changes marked as an insert.
        settings.insertsAndChanges.push('i-'+newRowId);
        return newRowId; //###43
    }//end function rptInsertNewRow
    /**Deprecated
     * @private
     */
    function moveDataToDisplay(settings, index){
        return rptMoveDataToDisplay(settings, index);
    }
    /**Moves the data for a row to the screen
     *
     * @param {object} settings The settings of the table
     * @param {integer} index The index in the array of data of the record to move.
     * @author Ascan Heydorn
     */
    function rptMoveDataToDisplay(settings, index ){
        //make display visible or not depending on whether it is in search result or not
        //###36   we will only move data, which should be visible (record is on active page and a search hit)
        if  ( settings.sortAndSearch.map[index][2]&&
            (settings.sortAndSearch.map[index][3]==settings.paging.activePage)){ //record is a search hit
            //$("#"+settings.rowId+"-"+index).show();//###36
                //} //###36
                //else {//###36
                //    $("#"+settings.rowId+"-"+index).hide();  //###36
                //} //###36
        //Fill the display fields with the data
        rptDisplayDetailArea(settings.sortAndSearch.map[index][4], settings.sortAndSearch.map[index][0]);
    }//###36
    }//end function rptMoveDataToDisplay
    /**Adds a conversion table to a column in the settings
     * Not used. Was thoughtto do code translation in the table
     * @author Ascan Heydorn
     * @private
    */
    function rptAddConversionTable(containerId,fieldId,table){
        var settings=getTableSettings(containerId) || null;
        if (!settings) {
            alert( 'addConversionTable: Settings for table with id "'+containerId+'" are not created. Run initTableSettings first');
            return null;
        }
        var found=false;
        for (var i=0;i<settings.columns.length;i++){
            if ( (settings.idPrefix+settings.columns[i].name)===fieldId) {
                settings.columns[i].conversionTable=table;
                found=true;
                break;
            }
        }
        if (!found) {
            alert('addConversionTable: fieldId "'+fieldId+'" not found in settings');
        }
        return null;
    } //end function addConversionTable
    /**Removes the display of a table (but not the data).
     * @private
     */
    function clearDisplay(containerId){
        return rptClearDisplay(containerId);
    }
    /**Removes the display of all records (but not the data).
     * @param {string} containerId The id of the table area wose diplay shall be removed
     * @author Ascan Heydorn
    */
    function rptClearDisplay(containerId){
        var settings=getTableSettings(containerId) || null;
        rptSyncTag2Data(containerId); //###20 before we remove the display we sync it
        $('#'+containerId).find('.tblRow').each(function(){
            if (this.getAttribute('id')!==settings.rowId){
                $(this).remove();
            }
        });
        return null;
    } //end function rptClearDisplay
    /**Returns the data class for the indicated display row as the user has edited it.
     * @param {string} containerId The html Id of the table area
     * @param {integer | object} id considered to be an index if numeric, otherwise cnsidered to be a rowId
     * @return the data object which was initially given to the tool with the changed data.
     * @author Ascan Heydorn
     */
    function rptGetDataFromDisplay(containerId, id){
        rptSyncTag2Data(containerId); //###20
        idType="index";
        if (isNaN(id) ){ idType="htmlId";}
        //###20 BEGIN
        if (idType=="htmlId"){
        	return rptGetModelDataOfRowId(containerId,id);
        }
        else {
        	var settings=getTableSettings(containerId); //issues should have been occured during init or display
            return settings.sortAndSearch.map[id][0];
        }
    } // end function rptGetDataFromDisplay
    /**Removes a row from display and data. The row is identified by the index in the display (not considering any search) or the row id
     * @param {string} containerId The html Id of the table area
     * @param {integer | object} id considered to be an index if numeric, otherwise cnsidered to be a rowId
     * @author Ascan Heydorn
     */
    function rptRemoveRow(containerId, id){
        idType="index";
        //if (isNaN(id) ){ idType="htmlId";} //###36
        var settings=getTableSettings(containerId); //issues should have been occured during init or display
        var deletedRowId; //###10
        //###36 BEGIN
        var index=-1;
        if (isNaN(id) ){ //id is a rowID, now we need to find the index in map
            deletedRowId=id;
            for (var i=0;i<settings.sortAndSearch.map.length;i++){
                if (settings.sortAndSearch.map[i][4]==deletedRowId){
                    index=i;
                    break;
                }
            }
            if(index==-1) {
                alert( 'rptRemoveRow: sortAndSearch.map was not initialized');
            }
        }
        else {
            if(id>settings.sortAndSearch.map.length) {
                alert( 'rptRemoveRow: sortAndSearch.map was not initialized');
            }
            deletedRowId=settings.sortAndSearch.map[id][4];
            index=id;
        }
        rptSyncTag2Data(containerId);
        $("#"+deletedRowId).remove();
        settings.sortAndSearch.map.splice(index,1); //remove row from sortAndSearchMap as well
        /*
        index=-1;
        $("#"+containerId).find("."+settings.configuration.classTableRow).each(function(){
            if (this.getAttribute('id')!==settings.rowId){
                index++;
                if ( ((idType=="index")&&(index==id)) || ((idType=="htmlId")&&(this.id==id)) ){
                    deletedRowId=this.id; //###10
                    rptSyncTag2Data(containerId);//###20 before deleting the row we sync all data
                    $(this).remove();
                    if(index>settings.sortAndSearch.map.length) {
                        alert( 'rptRemoveRow: sortAndSearch.map was not initialized');
                    }
                    else {
                        settings.sortAndSearch.map.splice(index,1); //remove row from sortAndsearchMap as well
                    }
                    return false;
                }
            }
        });
        */
        //###36 END
        settings.insertsAndChanges.push('d-'+deletedRowId);  //###10
    }//end function rptRemoveRow
    /**Is applied in sorting data by the search criteria. It will swap settings.sortAndSearch.map accordingly
     * It requires settings.sortAndSearch.sortDefinition being set for at least one column
     * It requires the global variable rutPowerTableInActiveSortSettings to keep the settings of the PowerTable, which at this time shall be sorted.
     * @author Ascan Heydorn
     * @private
    */
    function _rptSortCompare(data1, data2){
        //var settings=_rutPowerTableInActiveSortSettings;//###30
        var settings=rut.powerTableInActiveSortSettings;//###30
        var sortDef=null;

        var1=null; var2=null;
        result=0;
        for(var i=0;i<settings.sortAndSearch.sortDefinition.length;i++){
            sortDef=settings.sortAndSearch.sortDefinition[i];
            //get the column value
            //var1=eval('data1[0].'+sortDef.sortColumn);//###31
            var1=data1[0][sortDef.sortColumn];//###31
            //var2=eval('data2[0].'+sortDef.sortColumn);//###31
            var2=data2[0][sortDef.sortColumn];//###31

            if (var1<var2) { return (-1*sortDef.ascDesc);}
            else if (var1>var2) { return sortDef.ascDesc;}
        }
        return result;
    }//end functions sortCompare
    /**Is applied in reset the sorting to the original state. It will swap settings.sortAndSearch.map accordingly
     * It requires settings.sortAndSearch.sortDefinition being set for at least one column
     * It requires the global variable rutPowerTableInActiveSortSettings to keep the settings of the PowerTable, which at this time shall be sorted.
     * @author Ascan Heydorn
     * @private
    */
    function _rptResetSortCompare(data1, data2){
        return (data1[1]-data2[1]);
    }//end functions _rptResetSortCompare
    /**Deprecated
     * @private
     */
    function addSingleSortDefinition(containerId, columnName, ascDesc){
        return rptAddSingleSortDefinition(containerId, columnName, ascDesc);
    }
    /**Adds a single sort Definition to the settings
     * @param {string} containerId The html Id of the PowerTable to be used.
     * @param {string} sortColumn  The columnName of the column which shall be sorted
     * @param {string} ascDesc     Whether this column shall be sorted ascending (1) or descending (-1)
     * @author Ascan Heydorn
     */
    function rptAddSingleSortDefinition(containerId, columnName, ascDesc){
        var settings=getTableSettings(containerId); //If this is a problem it should have occurred at time of addData already
        settings.sortAndSearch.sortDefinition.push({sortColumn: columnName, ascDesc: ascDesc});
    } //end function rptAddSingleSortDefinition
    /**Sorts the PowerTable according to the sort definitions which have been one by one added with rptAddSingleSortDefinition
     * The sequence of these call determines the sequence of sorts.
     * @param {string} containerId The html Id of the container comprising the table to be sorted.
     * @param {boolean} isReset Whether data sort shall be made undone
     * @author Ascan Heydorn
     * */
    function rptSortPowerTable(containerId,isReset){
        rut.powerTableInActiveSortSettings=getTableSettings(containerId);
        settings=rut.powerTableInActiveSortSettings;
        if(!isReset){
            settings.sortAndSearch.map.sort(_rptSortCompare);
        }
        else {
            settings.sortAndSearch.map.sort(_rptResetSortCompare);
        }
        if (settings.paging.hasPaging){
            var count=-1;//###37
            for (var i=0;i<settings.sortAndSearch.map.length;i++){
                if ( settings.sortAndSearch.map[i][2]) {  //record is search hit //###36
                    count++; //###36
                    //settings.sortAndSearch.map[i][3]=Math.floor(i/settings.paging.pageSize)+1; //###36
                    settings.sortAndSearch.map[i][3]=Math.floor(count/settings.paging.pageSize)+1; //###36
                } //endif this record fits search
            }//emdfor map index
        }//endif hasPaging
        rptHideAndMarkDataOnDisplay(containerId); //###36
        //rptClearDisplay(containerId);
        //rptDisplayTable(containerId);
        rut.powerTableInActiveSortSettings=null;
    }//end function sortPowerTable
    /**Finds the index of a column by name in the columns array
     * @param settings The settings to use
     * @param columnName The name of the column to find
     * @return The index of the column or null
     * @author Ascan Heydorn
     * @private
     */
    function _rptGetIndexOfColumn(settings, columnName){
        var index=null;
        for (var i=0; i<settings.columns.length;i++){
            if (columnName===settings.columns[i].name) {
                index=i;
                break;
            }
        }
        return index;
    } //end function _rptGetIndexOfColumn
    /**Function used internally by the sort and search control to set the search definitions and puts colors
     * and markings to the dialog.
     * @param {string} containerId The html Id of the container comprising the table
     * @param {string} buttonId The html of the button which was clicked to set this sort
     * @param {string} columnName The name of the column which was asked to be sorted
     * @param {int} ascDesc Whene the sort shall be ascending(1) or descending (-1)
     * @author Ascan Heydorn
     */
    function rptInjectSortDef(containerId, buttonId, columnName, ascDesc){
        var settings=getTableSettings(containerId);//if this is not present, then we would have found out much earlier
        rptAddSingleSortDefinition(containerId, columnName,ascDesc);
        //and now paint the button
        var button=document.getElementById(buttonId);
        button.classList.remove(settings.displayConfiguration.sortBtnColorClass);
        button.classList.add(settings.displayConfiguration.sortBtnHighlightClass);
        button.textContent=settings.sortAndSearch.sortDefinition.length;
        rptSortPowerTable(containerId);
    }//end function rutInjectSortDef
    /**Resets the sortDefinitions and also the display of the dialog
     * @param {string} containerId
     * @author Ascan Heydorn
     */
    function rptResetSortDefinitions(containerId){
        var settings=getTableSettings(containerId); //if this is not present, then we would have found out much earlier
        var element=document.getElementById(containerId+"-dlg")||null;
        var id=null;
        if (element!==null){
            for (var i=0;i<settings.sortAndSearch.sortDefinition.length;i++){
                id=containerId+'-dlgAsc-'+ _rptGetIndexOfColumn(settings, settings.sortAndSearch.sortDefinition[i].sortColumn);
                element=document.getElementById(id);
                if (element!==null){
                    element.classList.remove(settings.displayConfiguration.sortBtnHighlightClass);
                    element.classList.add(settings.displayConfiguration.sortBtnColorClass);
                    element.innerHTML="&and;"; //##06
                }
                id=containerId+'-dlgDes-'+ _rptGetIndexOfColumn(settings, settings.sortAndSearch.sortDefinition[i].sortColumn);
                element=document.getElementById(id);
                if (element!==null){
                    element.classList.remove(settings.displayConfiguration.sortBtnHighlightClass);
                    element.classList.add(settings.displayConfiguration.sortBtnColorClass);
                    element.innerHTML="&or;"; //##02
                }
            }
        }
        settings.sortAndSearch.sortDefinition=[];
        rptSortPowerTable(containerId,true);
    } //end function rptResetSortDefinitions
    /**Sets the search string for a table. This string is used for searching in the function call of rptSearch
     *
     * @param {string} containerId
     * @param {string} searchString
     */
    function rptSetSearchString(containerId, searchString){
        var settings=getTableSettings(containerId); //if this is not present, then we would have found out much earlier
        settings.sortAndSearch.search=searchString;
        return null;
    }
    /**Searches the data for the given string
     *
     * @author Ascan Heydorn
     * @private
     */
    function _rptCallSearch(containerId){
        var settings=getTableSettings(containerId); //if this is not present, then we would have found out much earlier
        var searchString=document.getElementById(containerId+settings.configuration.sortDialogSearchFieldSuffix).value;
        settings.sortAndSearch.search=searchString;
        //###04 empty search string causes abort
        if ((!searchString) || (searchString=="")){
            return;
        }
        rptSearch(containerId);
        //###05 bug fix, the lookup table does not display the count, such a field is not required
        var element=document.getElementById(containerId+settings.configuration.sortDialogSearchFieldCountSuffix);
        if (element!=null){
            element.textContent='found '+
                settings.sortAndSearch.foundHits+
                ' of '+
                settings.sortAndSearch.map.length;
        }
    } //end function _rptCallSearch
    /**Searches the data for the search string, which was set by rptSetSearchString
     *
     * @param {string} containerId
     * @author Ascan Heydorn
     */
    function rptSearch(containerId){
        var settings=getTableSettings(containerId); //if this is not present, then we would have found out much earlier
        searchString=settings.sortAndSearch.search.toLowerCase();
        var value=null;
        settings.sortAndSearch.foundHits=0;
        settings.paging.activePage=1;
        var hasPaging=settings.paging.hasPaging;
        var page=(hasPaging)?0:1;
        var pageSize=settings.paging.pageSize;
        var hitNumber=0;

        for (var i=0;i<settings.sortAndSearch.map.length;i++){
            for (var j=0;j<settings.columns.length;j++){
                //value=eval('settings.sortAndSearch.map['+i+'][0].'+settings.columns[j].name);//###32
                value=settings.sortAndSearch.map[i][0][settings.columns[j].name];//###32
                if ((typeof value)==="number") { //convert numbers to strings
                    value=String(value);
                }
                if ((typeof value)==="string") {  //TO DO check against conversion table diplay values.
                    //if (value.search(searchString)>-1){ //###19
                    //if (value.indexOf(searchString)>-1){ //###19 //###27
                    if (value.toLowerCase().indexOf(searchString)>-1){ //###27
                        settings.sortAndSearch.map[i][2]=true;
                        settings.sortAndSearch.foundHits++;
                        break; //once we found a hit no more search on further fields
                    }
                    else {
                        settings.sortAndSearch.map[i][2]=false;
                    }//end else
                }//end if typeof string
            } //endfor j columns
            //#### we count and set pages only if they are a hit.
            hitNumber=settings.sortAndSearch.foundHits-1;
            if ( (hasPaging) && (settings.sortAndSearch.map[i][2]==true )){
                if ((hitNumber%pageSize)==0) {
                    page++;
                }
                settings.sortAndSearch.map[i][3]=page;
            }
        }  //endfor i map
        //###02 Paging
        //reset the page number to 1
        if (hasPaging){
            settings.paging.activePage=1;
            settings.paging.lastPageNumber = page;
            rptResetPagingValues(containerId);
        }
        rptHideAndMarkDataOnDisplay(containerId);
    }//end function rptSearch
    /**
     *
     * @param {string} containerId
     * @private
     * @author Ascan Heydorn
     */
    function showSortControl(containerId){
        return rptShowSortControl(containerId);
    }
    /**Opens a sort and search control. this control displays buttons for sort and searching
     * @param {string} containerId The html Id of the container comprising the table
     * @author Ascan Heydorn
     */
    function rptShowSortControl(containerId){
        var settings=getTableSettings(containerId); //if this is not present, then we would have found out much earlier
        if (settings.sortAndSearch.dialogOpen){
            alert("Sort and Search dialog already open");}
        else {settings.sortAndSearch.dialogOpen=true;}
        var dialogHtml= '<div id="'+containerId+settings.configuration.sortDialogSuffix+'" style="font-size:10px;">'
            +'<table>'
            +'<tr>';
        var buttonIdAsc=null;
        var buttonIdDes=null;
        var buttonColorClass=settings.displayConfiguration.sortBtnColorClass;
        var displayName=null;
        for (var i=0;i<settings.columns.length;i++){
            //We do not show columns, which are not displayed
            if (null==document.getElementById(settings.idPrefix+settings.columns[i].name)){
                continue;
            }
            //if the field has a name attribute, then we take that, otherwise we take the column name
            displayName=document.getElementById(settings.idPrefix+settings.columns[i].name).getAttribute('name')
                    ||settings.columns[i].name;
            buttonIdAsc='"'+containerId+settings.configuration.sortDialogBtnAscSuffix+i+'"';
            buttonIdDes='"'+containerId+settings.configuration.sortDialogBtnDescSuffix+i+'"';
            dialogHtml+='<td><span class="col-sm-1">'+displayName+'</span></td>'
                +'<td><button id='+buttonIdAsc+' class="btn btn-sm '+buttonColorClass+'" style="font-size:9px;width:30px;text-align:center;margin:0;"' //###06
                +' data-toggle="tooltip" data-placement="top" title="Sorts by ascending values of '+displayName+'. Existing sorts are expanded."'
                +' onclick=\'rptInjectSortDef("'+containerId+'", '+buttonIdAsc+', "'+settings.columns[i].name+'", 1); \'>&and;</button></td>'

                +'<td><button id='+buttonIdDes+' class="btn btn-sm '+buttonColorClass+'" style="font-size:9px;width:30px;text-align:center;margin:0;"' //###06
                +' data-toggle="tooltip" data-placement="top" title="Sorts descending values of '+displayName+'. Existing sorts are expanded."'
                +' onclick=\'rptInjectSortDef("'+containerId+'", '+buttonIdDes+', "'+settings.columns[i].name+'", -1); \'>&or;</button></td>'
                +'</tr>';
        }
        dialogHtml+='</table>';
        //Display search area and count
        //Display number of hits only it there was a search text
        var hitsText =((settings.sortAndSearch.search==null)||(settings.sortAndSearch.search=='')) ? '' :  //###15 added ==''
                        ('found '+settings.sortAndSearch.foundHits+' of '+settings.sortAndSearch.map.length);
        dialogHtml+='<table class="mt-1">'+  //###15 added mt-1
                        '<tr>'+
                            '<td><span class="col-sm1 bt-1">Search</span></td>'+
                            '<td colspan=2> <input class="col-sm2" type="text" id="'+containerId+settings.configuration.sortDialogSearchFieldSuffix+'" '+
                            'value="'+(settings.sortAndSearch.search||'')+'"></input></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan=3><span id="'+containerId+settings.configuration.sortDialogSearchFieldCountSuffix+'">'+
                            hitsText+'</span></td>'+
                        '</tr>'+
                    '</table>';
        dialogHtml+='</div>';

        $("#"+containerId).append(dialogHtml);

        //if the container has a name it becomes part of the title <name> - Sort and Search
        displayName=document.getElementById(settings.containerId).getAttribute('name')||null;
        if (!displayName) {
            displayName="Sort and Search";
        }
        else {
            displayName+=" - Sort and Search";
        }
        $("#"+containerId+settings.configuration.sortDialogSuffix).dialog({
            autoOpen: false,
            draggable: true,
            title: displayName, //####TO DO parameterisieren
            buttons: [
                        {
                            text: "Search",     //####TO DO parameterisieren
                            id: containerId+'-btnSearch', //###24
                            click: function() {
                                _rptCallSearch(containerId);
                            },
                            class: "rclLookupDlgBtn"
                        },
                        {
                            text: "Reset Search",     //####TO DO parameterisieren
                            id: containerId+'-btnResetSearch', //###24
                            click: function() {
                                rptResetSearch(containerId);
                            },
                            class: "rclLookupDlgBtn"

                        },
                        {
                            text: "Reset Sort",
                            id: containerId+'-btnResetSort', //###24
                            click: function() {
                                rptResetSortDefinitions(containerId);
                            },
                            class: "rclLookupDlgBtn"
                        },
                        { //###13 BEGIN
                            text: "Export to csv",
                            id: containerId+'-btnExportToCsv', //###24
                            click: function() {
                                rptSaveAsCsv(containerId);
                            },
                            class: "rclLookupDlgBtn"
                        },//###13 END
                    ],
            close: function( event, ui ) {rptCloseSortControl(containerId);},
        });
        //We make Search the default once you press enter
        document.getElementById(containerId+settings.configuration.sortDialogSearchFieldSuffix).addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                _rptCallSearch(containerId);
            }
        });
        $("#"+containerId+settings.configuration.sortDialogSuffix).dialog("open");
        // If sort definitions exist (the dialog was closed without reset) then
        // 1) paint them again
        // 2) sort again, because someone may af inserted something in between
        if (0<settings.sortAndSearch.sortDefinition.length){
            var searchColumnIndex=null;
            var buttonId=null;
            var button=null;
            for (var i=0;i<settings.sortAndSearch.sortDefinition.length;i++){
                searchColumnIndex=_rptGetIndexOfColumn(settings, settings.sortAndSearch.sortDefinition[i].sortColumn);
                if (1===settings.sortAndSearch.sortDefinition[i].ascDesc){ //ascending
                    buttonId=containerId+settings.configuration.sortDialogBtnAscSuffix+searchColumnIndex;
                }
                else {
                    buttonId=containerId+settings.configuration.sortDialogBtnDescSuffix+searchColumnIndex;
                }
                button=document.getElementById(buttonId);
                button.classList.remove(settings.displayConfiguration.sortBtnColorClass);
                button.classList.add(settings.displayConfiguration.sortBtnHighlightClass);
                button.textContent=(i+1); //show the number of the sort definiton
            }
        }
        // sort again
        rptSortPowerTable(containerId);
    }//end function rptShowSortControl
    /**Close the sort dialog
     * @param {string} containerId The html id of the tble area
     * @author Ascan Heydorn
     */
    function rptCloseSortControl(containerId){
        var settings=getTableSettings(containerId); //if this is not present, then we would have found out much earlier
        settings.sortAndSearch.dialogOpen=false;
        $("#"+containerId+settings.configuration.sortDialogSuffix).remove();
    }
    /**Reset Search. Will set the search value to null, set all data to visible and displays all data again
     * @param containerId The html id of the tble area
     * @author Ascan Heydorn
     */
    function rptResetSearch(containerId){
        var settings=getTableSettings(containerId); //if this is not present, then we would have found out much earlier
        settings.sortAndSearch.search=null;
        settings.sortAndSearch.foundHits=null;
        //make everything visible
        //###02 Paging
        settings.paging.activePage=1;
        var hasPaging=settings.paging.hasPaging;
        var page=(hasPaging)?0:1;
        var pageSize=settings.paging.pageSize;
        for (var i=0; i<settings.sortAndSearch.map.length;i++){
            settings.sortAndSearch.map[i][2]=true;
            if ( (hasPaging) && ((i%pageSize)==0) ){
                page++;
            }
            settings.sortAndSearch.map[i][3]=page;
        }
        if (hasPaging){
            settings.paging.activePage=1;
            settings.paging.lastPageNumber=page;
            rptResetPagingValues(containerId)
        }
        rptHideAndMarkDataOnDisplay(containerId);
        //now display empty search screen on the dialog, if the dialog is open
        var element=null;
        element=document.getElementById(containerId+settings.configuration.sortDialogSearchFieldSuffix);
        if (element){
            element.value='';
        }
        element=document.getElementById(containerId+settings.configuration.sortDialogSearchFieldCountSuffix);
        if (element){
            element.textContent='';
        }
    } //end function rptResetSearch
    /**Adjust the display of the table in the following ways:
     * Hides/displays rows which are or 'are not' part of the search result or active page
     * Adjust the css classList depending on whether the row to display is even/odd numbered
     * @param {string} containerId The html id of the tble area
     * @author Ascan Heydorn
     */
    function rptHideAndMarkDataOnDisplay(containerId){
    //###36 BEGIN
    rptClearDisplay(containerId);
    rptDisplayTable(containerId);
    /*
    var settings=getTableSettings(containerId); //if this is not present, then we would have found out much earlier
    var i=-1; //the counter of rows
    var displayedRow=0;
    //var evenOddClassList ###35
    $("#"+containerId).find('.'+settings.configuration.classTableRow).each(function(){
        if(this.id==settings.rowId){ //do not display the template
            return true;
        }
        i++;
        // ###02 paging BEGIN
        if ( settings.sortAndSearch.map[i][2] &&
            (settings.sortAndSearch.map[i][3]==settings.paging.activePage)
            ) { //record is a search hit
            displayedRow++;
            $(this).show();
        }
        else {
            this.style.display='none';        //$("#"+settings.rowId+"-"+index).hide();
        }
        //Now apply even/odd class
        if(displayedRow & 1){ //odd
            _rptSwapCssClasses(this,
                settings.displayConfiguration.evenClassList||null,
                settings.displayConfiguration.oddClassList||null);
        }
        else  { //even
            _rptSwapCssClasses(this,
                settings.displayConfiguration.oddClassList||null,
                settings.displayConfiguration.evenClassList||null);
        }
    });
    */
    //###36 END
    } //end function rptHideAndMarkDataOnDisplay
    /**Removes a list of classes from an HTML element and attaches a different list
     * @param element The HTML element where styles should be swapped
     * @param oldClassList List of classes to remove
     * @param newClassList List of classes to add
     * @author Ascan Heydorn
     * @private
     */
    function _rptSwapCssClasses(element,oldClassList, newClassList){
        var classList=null;
        if (oldClassList!=null){
            classList=oldClassList.split(" ");
            for (var i=0;i<classList.length;i++){
                element.classList.remove(classList[i]);
            }
        }
        if (newClassList!=null){
            classList=newClassList.split(" ");
            for (var i=0;i<classList.length;i++){
                element.classList.add(classList[i]);
            }
        }
    }// end function _rptSwapCssClasse
    /**Display data in the html tags of the area of the indicated html id.<br>
     * Does the same as rptDisplayDetailArea
     *
     * @param {string} containerId HTML id of the search or detail area, where the data shall be displayed
     * @param {object} data
     * @author Ascan Heydorn
     */
    function rptSetSingleAreaValues(containerId, data){
        rptDisplayDetailArea(containerId, data);
    }
    /**Displays the properties of the data in the tags within the container given by containerId.
     * The first 3 characters of containerId are considered the prefix.
     * The property of name <property1> is displayed int the tag of id <prefix><property1>
     * Example: containerID=d0-DetailArea, so prefix is d0-
     * then the property data.amount is shown in the tag of id d0-amount
     * If data has no property for a tag, the default for this tag is taken. If no default exists, the tag is set to null.
     * Does the same as rptSetSingleAreaValue
     *
     * @param {*} containerId The id oof the area containing the fields to be displayed.
     * @param {*} data An object having all properties (and potentially more),
     * which shall be displayed. The tags must have class dtlField
     * @author Ascan Heydorn
     */
    function rptDisplayDetailArea(containerId, data){
        if (containerId==null) {
            alert("rptDisplayDetailArea: containerId is missing");
            return;
        }
        if (data==null){
            alert("rptDisplayDetailArea: data is missing");
            return;
        }
        var prefix=containerId.substr(0,2);
        if (prefix==null){
            alert("rptDisplayDetailArea: prefix is missing");
            return;
        }
        //####12 BEGIN reuse this function also for power table and search
        var fieldClass="dtlField";
        if (prefix.charAt(0)=='s'){
                fieldClass='searchField';//###32 was SearchField
        }
        else if (prefix.charAt(0)=='t'){
                fieldClass='tblField'; //should come from settings.configuration.classTableField but we may not have a table here
        }
        // ###12 END
        //Now save data for reuse
        //if (prefix.charAt(0)!='t') { //###12 save only if not table //###36
            //if (typeof _rutPowerDetails== "undefined"){//###30
            //if (typeof rut.powerDetails== "undefined"){//###30 //###36
                //_rutPowerDetails = []; //###30
                //rut.powerDetails = []; //###30 //###36
            //} //###36
            //_rutPowerDetails.push({id:containerId, object: data});//###30
            //rut.powerDetails.push({id:containerId, object: data});//###30 //###36
        //} //###12 //###36
        //check whether containerId is searchArea or detailArea and set the subsequent each accordingly
        //get list of porperties
//        var propertyList=Object.getOwnPropertyNames(data);
        var value=null;
        var id=null;
        var property=null;
//        var index=-1;
        $("#"+containerId).find('.'+fieldClass).each(function(){ //####12
        //$("#"+containerId).find('.dtlField').each(function(){ //####12 settings for details
            element=this;
            tag=this.nodeName.toLowerCase();
            id=this.id;
            if (id==null) {return true;} //continue
            if (id.substr(0,2)!=prefix) {return true;}
            property=id.substr(3);
            //12 END BEGIN
            if (prefix.charAt(0)=='t') {
                property=property.substring(0,property.lastIndexOf('-'));
            }
            //###12 END
            //###25 BEGIN if no data then take default
            var idx=property.indexOf('#');
            if (idx>=0){
                property=property.substring(0,idx);
            }
            //value=eval('data.'+property); //get the data value//###32
            //value=data[property]; //get the data value//###32 //##37a
            //##37a BEGIN
            if(property.indexOf(".") !== -1){ //add condition in case the property have another level that can be split by "."
            	let splitProperty = property.split(".");
            	value = data[splitProperty[0]][splitProperty[1]];
            }
            else{
            	value=data[property];
            }
            //##37a END
            if (value==null){
                if ((tag=='input')&&(this.type==="checkbox")){
                   if (this.defaultChecked){
                        value='Y';
                    }
                    else {
                        value='N';
                    }
                }
                else if ((tag=='input')&&(this.type==="radio")){
                    if (this.defaultChecked){
                        value=this.value;
                    }
                    else {
                        value='';
                    }
                }
                else if ((tag=='input')||(tag=='textarea')){
                    value=this.defaultValue;
                }
                else if (tag="select"){
                    $("#"+containerId).find("select[id^="+containerId.substr(0,2)+"]").each(function(){
                        $(this).find("option").each(function(){
                            if (this.defaultSelected){
                                value=this.value;
                                return false;
                            }
                        });
                    });// end select tag
                }
            }
            //###25 END
            rutSetElementValue(id, value); //###12
        });
    } //end function rptDisplayDetailArea
    /**Returns data from a search- or detail area to an object.<br>
     * The search or detail area must have received data before by rptDisplayDetailArea or rptSetSingleAreaValue
     * Any property in the data, which is not displayed is not touched but again returned.<br>
     * Does the same as rptGetDataFromDetailArea.
     *
     * @param {string} containerId The html id of the area where we want the data from
     * @returns {object} the data from the area
     * @author Ascan Heydorn
     * @private
     */
    function getDataFromSingleArea(containerId){
        return rptGetDataFromSingleArea(containerId);
    }
    /**Returns data from the tags within the container given by containerId.
     * The first 3 characters of containerId are considered the prefix.
     * The property of name [property1] is displayed int the tag of id [prefix][property1]
     * Example: containerID=d0-DetailArea, so prefix is d0-
     * then the property data.amount is shown in the tag of id d0-amount.<
     *
     * @param {string} containerId The id oof the area containing the fields to be displayed.
     * @return {object} data An object having all properties which were displayed in a tag including
     * those properties, which have been in data at time if rptDisplayDetailArea.
     * Only tags with class dtlField are considered.
     * @author Ascan Heydorn
     */
    function rptGetDataFromSingleArea(containerId){
        if (containerId==null) {
            alert("rptGetDataFromDetailArea: containerId is missing");
            return;
        }
        var prefix=containerId.substr(0,2);
        if (prefix==null){
            alert("rptGetDataFromDetailArea: prefix is missing");
            return;
        }
        var foundIndex=-1; //the index of data in rut.powerDetails
        //var data=null;// ###07 empty object
        var data={};// ###07 empty object
        //if ((typeof _rutPowerDetails)== "undefined"){//###30
        if ((typeof rut.powerDetails)== "undefined"){//###30
            //_rutPowerDetails=[];//###30
            rut.powerDetails=[];//###30
        }
        //if (_rutPowerDetails!=null){//###30
        if (typeof rut.powerDetails!= "undefined"){//###30
            //if (typeof _rutPowerDetails!= "undefined"){//###30
            if (rut.powerDetails!=null){//###30
                //for (var i=0;i<_rutPowerDetails.length;i++){//###30
                for (var i=0;i<rut.powerDetails.length;i++){//###30
                    //if (_rutPowerDetails[i].id==containerId){//###30
                    if (rut.powerDetails[i].id==containerId){//###30
                        //data=_rutPowerDetails[i].object;//###30
                        data=rut.powerDetails[i].object;//###30
                        foundIndex=i;
                        break;
                    }
                }
            }
        }
        else {
            //_rutPowerDetails=[];//###30
            rut.powerDetails=[];//###30
        }
        //    rut.powerDetails.push({id:containerId, object:data});//###36
        //check whether containerId is searchArea or detailArea and set the subsequent each accordingly
        //get list of porperties
        var tag=null;
        var value=null;
        var id=null;
        var property=null;
        var radioButtonGroups=[]; //an array of all radio button groups in the area
                // it is build on the fly whenever we find a new group
                //each element has 4 properties property, id, name, value
                //The name is the name attribute from html and all elemenets with same property should have same name
                //Property is the key to the array.
                //When the first button is found, the entry is created with the value of the button
                //Only non '' values will overwrite the value in the array
        var searchClass=(containerId.charAt(0)=='s')?'searchField':'dtlField'; //###32
        //$("#"+containerId).find('.dtlField').each(function(){ //#### settings for details //###32
        $("#"+containerId).find('.'+searchClass).each(function(){ //#### settings for details //###32
            element=this;
            tag=this.nodeName;
            id=this.id;
            var foundBtnGrp=false; //indicator used in the find for radio button groups
            if (id==null) {return true;} //continue
            if (id.substr(0,2)!=prefix) {return true;}
            property=id.substr(3).split('#')[0];
            // 02 support for radio button groups
            value=rutGetElementValue(id); //element); //in case of radio button this is a single button
            // plan if radio button, put the found value to a list by group
            // then at the end we go through this list
            if (tag=='INPUT' && this.type == 'radio'){
                foundBtnGrp=false;
                for (var i=0;i<radioButtonGroups.length;i++){
                    if (radioButtonGroups[i].property==property){
                        foundBtnGrp=true;
                        //This radio button group is already present in the group
                        //if (radioButtonGroups[i].property[i].name!= this.name){ //##37c
                        if (radioButtonGroups[i].name!= this.name){ //##37c
                            alert ("rptGetDataFromSingleArea: property:"+
                                property+' is used with name:'+
                                //radioButtonGroups[i].property[i].name+' but id:'+ //##37c
                                radioButtonGroups[i].name+' but id:'+ //##37c
                                id+' has name:'+this.name);
                                return null;
                        }
                        //if (radioButtonGroups[i].value!=null){ //##37c
                        if(value){ //##37c
                            radioButtonGroups[i].value=value;
                        }
                    }
                }
                //if (foundBtnGrp=false){ //##37c
                if(!foundBtnGrp){ //##37c
                    radioButtonGroups.push({'property': property,
                                            'id:': this.id,
                                            'name': this.name,
                                            'value': value });
                }
                return true; //In this case we just store the valuse and set them later
            }
            else{
                if (data!=null){
                	//###29 BEGIN
                    //eval('data.'+property+'=\"'+value+"\"");
                    var escapedValue = value.replace(/"/g, "\\\"");
                	//###37d BEGIN
                	if(property.indexOf(".") !== -1){
                		var splitProperties = property.split(".");
                		data[splitProperties[0]] = {};
                	}
                	//###37d END
                	var strToEval = 'data.'+property+'=\"'+escapedValue+"\"";
                    eval(strToEval);
                    //###29 END
                }
                else {
                    alert()
                }
                return true;
            }

        });
        //No we have set all values except radio button groups
        for (var i=0;i<radioButtonGroups.length;i++){
            eval('data.'+radioButtonGroups[i].property+'=\"'+radioButtonGroups[i].value+"\"");//### candidate for 32
        }
        //finally we check, wehter we need to push the data to the storage
        if (foundIndex>-1){
            //_rutPowerDetails[foundIndex].object=data;//###30
            rut.powerDetails[foundIndex].object=data;//###30
        }
        else {
            //_rutPowerDetails.push({id:containerId, object:data});//###30
            rut.powerDetails.push({id:containerId, object:data});//###30
        }
        return data;
    } //end function rptGetDataFromDetailArea
    /**Displays the given page of the table.
     *
     * @param {String} containerId The id of the area of the table
     * @param {String|Number} pageNumber The page number to display if numeric or first, last, goto, previous, next
     * @author Ascan Heydorn
     */
    function rptGotoPage(containerId, pageNumber){
        var settings=rptGetTableSettings(containerId);
        var previousActivePage=settings.paging.activePage; //###27??
        var newPageNumber=pageNumber;
        var prefix=settings.idPrefix;
        if (pageNumber=='first'){
            newPageNumber=1;
        }
        else if (pageNumber=='last'){
            newPageNumber=settings.paging.lastPageNumber;
        }
        else if (pageNumber=='previous'){
            newPageNumber=settings.paging.activePage-1;
        }
        else if (pageNumber=='next'){
            newPageNumber=settings.paging.activePage+1;
        }
        else if (pageNumber == 'goto'){
            newPageNumber=Number(rutGetElementValue(prefix+'pgGotoField'));
            if (newPageNumber==NaN) {
                newPageNumber=1;}
            //###34 BEGIN
            else if (newPageNumber>settings.paging.lastPageNumber){
                newPageNumber=settings.paging.lastPageNumber;
            }
            else if (newPageNumber<1){
                newPageNumber=1;
            }
            rutSetElementValue(prefix+'pgGotoField',newPageNumber);
            //###34 END
        }
        //###26 BEGIN
        else if (!isNaN(pageNumber)){
            newPageNumber = pageNumber+1;
        }//###26 END
        else {
            //newPageNumber=1+Number(pageNumber);//###22
            newPageNumber=Number(rutGetElementValue(prefix+'pg'+pageNumber));//###22
            if (newPageNumber<1) {return;} //###22   disabled button pressed
        }
        var lastPage=settings.paging.lastPageNumber;
        var btnValue;
        var btnReadOnly;
        if (newPageNumber<1) {
            newPageNumber=1;
        }
        if (newPageNumber>lastPage){
            newPageNumber=lastPage;
        }
        settings.paging.activePage=newPageNumber;
        rutSetElementValue(prefix+'pgFirst',1);
        rutSetElementValue(prefix+'pgLast',lastPage);
        //###22 BEGIN
        //Shift the numbers pn the pgBtn buttons
        //Usually the numbering starts with the highest number divisible by 4 which is lower than the (activePage - 2)
        //Clicking 3-6 gives 2 3 4 5 6, 7-9 gives 6 7 8 9 10, 11-13 gives 10 11 12 13 14
        //however the minimum start is 2 and the maximum start is (last-5)
        var baseOffset=2;
        if ('goto;first;last'.indexOf(pageNumber)>=0) {
            baseOffset=2;
        }
        else if (previousActivePage>settings.paging.activePage){
            baseOffset=3;
        }
        //Renumber the page buttons
        var basePage=(Math.floor((settings.paging.activePage-baseOffset) / 4)* 4)+1 ;
        if ((pageNumber=='first')||(settings.paging.activePage==1)){
            basePage=1;
        }
        else if ((settings.paging.activePage==2)&&(previousActivePage>2)){
            basePage=1;
        }
        //###33 BEGIN
        else if (settings.paging.activePage>=lastPage-5){
            basePage=Math.max(lastPage-6,1);
        }//###33 END
        for (var i=1;i<=5;i++){
            btnValue=basePage+i;
            rutSetElementValue(prefix+'pg'+i,(btnValue<lastPage)?btnValue:' ');
            $('#'+prefix+'pg'+i).attr('onclick' , 'rptGotoPage(\'' + containerId + '\','+(basePage+i-1)+')'); //###40
            if (btnValue<lastPage){document.getElementById(prefix+'pg'+i).classList.remove("noPointer");}
            else {document.getElementById(prefix+'pg'+i).classList.add("noPointer");}
        }
        //Now set the focus
        if (settings.paging.activePage==Number(rutGetElementValue(prefix+'pgFirst'))){
            document.getElementById(prefix+'pgFirst').focus();
        }
        else if (settings.paging.activePage==Number(rutGetElementValue(prefix+'pgLast'))){
            document.getElementById(prefix+'pgLast').focus();
        }
        else {
            for (var i=1;i<=5;i++){
                if (settings.paging.activePage==Number(rutGetElementValue(prefix+'pg'+i))){
                    document.getElementById(prefix+'pg'+i).focus();
                    break;
                }
            }
        }
        //###22 END
        rptHideAndMarkDataOnDisplay(containerId);
        //now we need to change the button numbers
        rutSetElementValue(prefix+'pgIndicator','Page '+settings.paging.activePage+' of '+lastPage);
        return true;
    } //end function rptGotoPage
    /**Sets the values of the paging buttons and the paging indicator to their initial state
     *
     * @param {String} containerId Id of table area
     * @author Ascan Heydorn
     */
    function rptResetPagingValues(containerId){
        var settings=rptGetTableSettings(containerId);
        var prefix=settings.idPrefix;
        var lastPage=settings.paging.lastPageNumber;
        //rutSetElementValue(prefix+'pgFirst',1);//###34
        rutSetElementValue(prefix+'pgFirst',(lastPage>0)?1:0);//###34
        rutSetElementValue(prefix+'pgLast',lastPage);
        var btnValue=1;
        //var btnReadOnly; //###27
        for (var i=0;i<5;i++){
            btnValue++;
            rutSetElementValue(prefix+'pg'+(1+i),(btnValue<lastPage)?btnValue:' ');
            if (btnValue==' '){document.getElementById(prefix+'pg'+(1+i)).classList.add("d-none");}//###34
            //btnReadOnly=(btnValue<lastPage)? true: false; //###27
            if (btnValue<lastPage){
                document.getElementById(prefix+'pg'+(1+i)).classList.remove("noPointer");
                document.getElementById(prefix+'pg'+(1+i)).classList.remove("d-none");//###34
            } //###27
            else {
                document.getElementById(prefix+'pg'+(1+i)).classList.add("noPointer");
                document.getElementById(prefix+'pg'+(1+i)).classList.add("d-none");//###34
            } //###27
            //document.getElementById(prefix+'pg'+(1+i)).readonly=btnReadOnly;//###27
        }
        //###34 BEGIN
        if (lastPage<=1){
            document.getElementById(prefix+'pgLast').classList.add("d-none");
            document.getElementById(prefix+'pgPrevious').classList.add("d-none");
            document.getElementById(prefix+'pgNext').classList.add("d-none");
            document.getElementById(prefix+'pgGotoLabel').classList.add("d-none");
            document.getElementById(prefix+'pgGotoField').classList.add("d-none");
        }
        else {
            document.getElementById(prefix+'pgLast').classList.remove("d-none");
            document.getElementById(prefix+'pgPrevious').classList.remove("d-none");
            document.getElementById(prefix+'pgNext').classList.remove("d-none");
            document.getElementById(prefix+'pgGotoLabel').classList.remove("d-none");
            document.getElementById(prefix+'pgGotoField').classList.remove("d-none");
        }
        if (lastPage==0){
            document.getElementById(prefix+'pgFirst').classList.add("d-none");
        }
        else {document.getElementById(prefix+'pgFirst').classList.remove("d-none");}
        document.getElementById(prefix+'pgFirst').focus(); //###27
        rutSetElementValue(prefix+'pgIndicator','Page '+settings.paging.activePage+' of '+lastPage);
        //###34 BEGIN
        var gotoElement=document.getElementById(prefix+'pgGotoField');
        gotoElement.min=1;
        gotoElement.max=lastPage;
        //###34 END
    } //end function rptResetPagingValues
    /** Inserts the paging tags into the paging area
     *  @param {String} containerId The html Id of the table area
     *  @author Ascan Heydorn
     */
    function rptInsertPagingTags(containerId){
        var settings=rptGetTableSettings(containerId);
        var prefix=settings.idPrefix;
        var html='<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<input id="'+prefix+'pgIndicator" class="'+settings.paging.indicatorClass+'" type="text" readonly="true">' +
            '<div style="display:flex;justify-content:flex-start;align-items:center;">' +
            '<button id="'+prefix+'pgGotoLabel" class="'+settings.paging.gotoLabelClass+'" onclick="rptGotoPage(\''+containerId+'\',\'goto\');">Goto</button>' +
            '<input id="'+prefix+'pgGotoField" class="'+settings.paging.gotoFieldClass+'" type="number" size="2"'
                //+' data-check="dec(3,0)" min="0" onkeypress="rutCheckNumberKeypress(event);">' + //###34
                +' data-check="dec(4,0)" min="0" onkeypress="rutCheckNumberKeypress(event);" onblur="rutCheckMinMaxValue(event)">' + //###34
                '</div>' +
            '<div style="display:flex;justify-content:flex-end">' +
            '<button id="'+prefix+'pgPrevious" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',\'previous\');">&lt;</button>' +
            //###33 BEGIN
            '<button id="'+prefix+'pgFirst" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',\'first\');"> </button>'  +
            '<button id="'+prefix+'pg1" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',1);"> </button>' +
            '<button id="'+prefix+'pg2" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',2);"> </button>' +
            '<button id="'+prefix+'pg3" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',3);"> </button>' +
            '<button id="'+prefix+'pg4" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',4);"> </button>' +
            '<button id="'+prefix+'pg5" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',5);"> </button>' +
            '<button id="'+prefix+'pgLast" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',\'last\');"> </button>' +
            /*
            '<button id="'+prefix+'pgFirst" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',\'first\');">1</button>'  +
            '<button id="'+prefix+'pg1" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',1);">2</button>' +
            '<button id="'+prefix+'pg2" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',2);">3</button>' +
            '<button id="'+prefix+'pg3" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',3);">4</button>' +
            '<button id="'+prefix+'pg4" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',4);">5</button>' +
            '<button id="'+prefix+'pg5" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',5);">6</button>' +
            '<button id="'+prefix+'pgLast" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',\'last\');">7</button>' +
            */ //###33 END
            '<button id="'+prefix+'pgNext" class="'+settings.paging.buttonClass+'" onclick="rptGotoPage(\''+containerId+'\',\'next\');">&gt;</button>' +
            '</div>' +
            '</div>';
        $("#"+prefix+"paging").append(html);
    }//end function rptInsertPagingTags
    /**Returns a list of actions and row id's. If action is true the existing list is
     * cleaned after returning it.
     *
     * @param {String} containerId The html id of the table area.
     * @param {Boolean} action True or false depending on whether the list shall be cleared or not
     * @returns {Array} An array of objects, each having two properties action, which is 'u','d' or 'i'
     * depending on whether this was an update, delete or insert and rowId, which is the inserted/changed id of
     * the row.
     * @author Ascan Heydorn
     */
    function rptGetInsertsAndChanges(containerId, action){
        var settings=rptGetTableSettings(containerId);

        var changeRows=[];
        changeRows.length=settings.insertsAndChanges.length;
        for (var i=0;i<settings.insertsAndChanges.length;i++){
            changeRows[i]={'action': settings.insertsAndChanges[i].charAt(0),
                            'rowId': settings.insertsAndChanges[i].substring(2)
                        }
        }//end for
        if (action){
            rptSyncTag2Data(containerId); //###20 before we remove the log we sync the data
            settings.insertsAndChanges.length=0;
        }
        return changeRows;
    }//end function rptGetInsertsAndChanges
    /**Change event handler on the area to put updated rows into the list settings.insertsAndChanges
     * @param {Object} settings The settings object of the table area
     * @param {Event} event The change event
     * @author Ascan Heydorn
     * @private
     */
    function _rptHandleRowChangeEvent(settings, event){
        var element=event.target;
        if(!element.id) return; //###23a
        var parents=rptGetParentIds(element.id);
        var found=false; //whether we found the row already
        //array.find is not supported in IE11 and earlier
        for (var i=0;i<settings.insertsAndChanges.length;i++){
            if (settings.insertsAndChanges[i]==('u-'+parents.parentRowId)){
                found=true;
                break;
            }
            else if (settings.insertsAndChanges[i]==('i-'+parents.parentRowId)){
                found=true;
                break;
            }
        }
        if (!found){
            settings.insertsAndChanges.push('u-'+parents.parentRowId);
        }
    }//end function rptHandleRowChangeEvent
    /** Saves a table as csv file. The searched data are stored as csv in the order of the sort.
     *  The filename is RCL-PowerTableExport.csv
     *  @param {String} containerId The html id of the table
     *  @author Ascan Heydorn
     * */
    function rptSaveAsCsv(containerId, fileName){
        var settings=rptGetTableSettings(containerId);
        var rows=[];
        var columns=[];
        var colSep=',';
        var rowSep='\r\n';
        var column="";
        var displayName="";
        var file= fileName || "RCL-PowerTableExport.csv";

        if (0<=navigator.language.indexOf("de")){ colSep=';'} //German separator is ;
        for (var j=0; j<settings.columns.length;j++){
                column=settings.columns[j];
                displayName=document.getElementById(settings.idPrefix+settings.columns[j].name).getAttribute('name')
                            ||settings.columns[j].name;
                columns.push(displayName);
        }
        rows.push(columns.map(function(each) { return '"' + each + '"' }).join(colSep));
        columns=[];
        for (var i=0; i<settings.sortAndSearch.map.length;i++){
            if (!settings.sortAndSearch.map[i][2]){ //this is not part of search
                continue;
            }
            for (var j=0; j<settings.columns.length;j++){
                column=settings.columns[j];
                //columns.push(eval("settings.sortAndSearch.map["+i+"][0]."+column.name));//###32
                columns.push(settings.sortAndSearch.map[i][0][column.name]);//###32
            }//endfor j
            rows.push(columns.map(function(each) { return '"' + each + '"' }).join(colSep));
            columns=[];
        }//endfor i
        rutSaveAsFile(rows.join(rowSep),file,"text/plain;charset=utf-8");
    }//end function rptSaveAsCsv
    //###18 BEGIN
    /**Returns the data which have been displayed in a row of given rowId. The containerId can be null
     * and will then be derived from the rowId.
     * Deleted rows have still their model data. The data are uniquely identified by rowId.
     * Note that if users change the data of the screen, it does not update the model data automatically.
     * Model data for a row are update only by the function rptGetDataFromDisplay
     * If the rowId does not exist, null is returned
     *
     * @param {String|null} containerId
     * @param {String} rowId
     * @author Ascan Heydorn
     */
    function rptGetModelDataOfRowId(containerId,rowId){
        //###28 BEGIN
        var settings=null;
        if (containerId!=null){
            settings=rptGetTableSettings(containerId);
        }
        else {
            settings=_rptGetSettingsByRowId(rowId);
        }
        //###28 END
        //var settings=rptGetTableSettings(containerId); //###28
        var dataIndex=rowId.substring(rowId.lastIndexOf('-')+1);
        if (dataIndex<0) {return;}
        if (dataIndex>=settings.data.length){return;}
        if (isNaN(dataIndex)){return;}
        return settings.data[dataIndex];
    }//end function rptGetModelDataOfRowId
    //###18 END
    //###20 BEGIN
    /**Synchronizes the inserts, updates and deletions from the tags to data. All rows which have been inserted, updated
     * or deleted since the last sync where synchronized.
     *
     * @param {*} containerId
     * @author Ascan Heydorn
     */
    function rptSyncTag2Data(containerId){
        var settings=rptGetTableSettings(containerId);
        //we step through the list of changes and update
        //The list of changes has every changed record only once.
        //Therefore we need to step through it always from the very beginning
        //Sync point would be useless
        var changes=settings.insertsAndChanges;
        for (var i=0;i<changes.length;i++){
            rptSyncOneRow2Data(containerId, changes[i].substring(2));
        }
    } //end function rptSyncTag2Data
    /**Synchronizes one row of screen from tags to data
     *
     * @param {*} containerId
     * @param {*} rowId The htmlId of the row to synchronize
     * @author Ascan Heydorn
     */
    function rptSyncOneRow2Data(containerId, rowId){
        var settings=getTableSettings(containerId); //issues should have been occured during init or display
        var dataIndex=rowId.substring(rowId.lastIndexOf('-')+1);
        //Now we move the data from display to the data store
        var fieldValue="";
        var j=0;
        var column=null;
        //var statement=null; //###36
        $("#"+rowId).find("."+settings.configuration.classTableField).each(function(){
            //for the time being we believe that the sequence is same as in columns array
            column=settings.columns[j];
            switch (column.type){
                case 11: //###42 BEGIN
                	//fieldValue=this.value; break;
                	//when data is textbox use rutGetElementValue for get original format data
                		fieldValue=	rutGetElementValue(this.id);
                		break;
                	//###42 END
                //##37b BEGIN
                case 12:
                	fieldValue=this.value;
                	//Clear format if number
                	if(fieldValue/* && fieldValue.match(/^\d{1,3}(,\d{3})*(.\d+)?$/g)*/){
                		fieldValue=fieldValue.replace(',','');
                	}
                	break;
                //##37b END
                case 13:
                case 14:
                    fieldValue=(this.checked) ? 'Y' : '';
                    break;
                case 50:
                    fieldValue=this.options[this.selectedIndex].value;
                    break;
                case 99: fieldValue=$(this).val(fieldValue); break;
            }  //endswitch
            //###36 BEGIN
            if (typeof fieldValue == "number"){
               statement="settings.data["+dataIndex+"]."+column.name+"="+fieldValue;
            }
            else {
                statement="settings.data["+dataIndex+"]."+column.name+"="+'"'+fieldValue+'"';
            }
            //eval(statement); //###36
            settings.data[dataIndex][column.name]=fieldValue;   //###36
            //###36 END
            j++;
        });
        return settings.data[dataIndex];
    } // end function rptSyncOneRow2Data
    //###28 BEGIN
    /**Finds id of tableform rowId
     *
     * @param {*} rowId
     * @private
     * @author Ascan Heydorn
     */
    function _rptGetSettingsByRowId(rowId){
        var settings=null;
        let prefixEnd=0;
        //for (var i=0;i<rutPowerTableIndex.length;i++){//###30
        for (var i=0;i<rut.powerTableIndex.length;i++){//###30
            //prefixEnd=rutPowerTableIndex[i].settings.configuration.prefixLength-1;//###30
            prefixEnd=rut.powerTableIndex[i].settings.configuration.prefixLength-1;//###30
            //if (rutPowerTableIndex[i].containerId.substring(0,prefixEnd) ==//###30
            if (rut.powerTableIndex[i].containerId.substring(0,prefixEnd) ==//###30
                rowId.substring(0,prefixEnd))
                //settings=rutPowerTableIndex[i].settings;//###30
                settings=rut.powerTableIndex[i].settings;//###30
                break;
        }
        if (!settings) {alert("rowId does not exist as part of a table"); return;}
        return settings;
    }//end function _rptGetSettingsByRowId
    //###28 END
    //###20 END
    //###27 BEGIN
    /**Replaces for one existing rowId the table data with the given record and optionally update also screen display
     *
     * @param {String} containerId
     * @param {String} rowIdString the rowId or "end" which means the rowId of the last record in map
     * @param {Object} dataRecord
     * @param {boolean} updateDisplay
     * @author Ascan Heydorn
     */
    function rptReplOneRowOfData(containerId, rowIdString, dataRecord, updateDisplay){
       //###28 BEGIN
        var settings=null;
        if (containerId!=null){
            settings=rptGetTableSettings(containerId);
        }
        else {
            settings=_rptGetSettingsByRowId(rowIdString);
        }
        if (!settings) {alert("rowId does not exist as part of a table"); return;}
        //###28 END
        //var settings=getTableSettings(containerId); //###28 //issues should have been occured during init or display
        var rowId=rowIdString;
        if (rowIdString=='end'){
            rowId=settings.sortAndSearch.map[settings.sortAndSearch.map.length-1][4];
        }
        var dataIndex=rowId.substring(rowId.lastIndexOf('-')+1);
        settings.data[dataIndex]=dataRecord;
        var idx=rptGetIndexOfRowId(settings.containerId, rowId) //we need to find the index in settings.sortAndSearch.map
        if (idx>=0){
            //we need to set data there as well
            settings.sortAndSearch.map[idx][0]=settings.data[dataIndex];
            if (updateDisplay&&(idx>=0)){
                if (idx>=0){
                    rptMoveDataToDisplay(settings, idx);
                }
            } //end if new data shall be displayed
        }//end if data is not deleted
    }//end function rptUpdateOneRowOfData
    /**Returns rowId and rowIndex of a row of data basd on the index of the data in the data table
     *
     * @param {string} containerId
     * @param {string} rowId The index of the data row in settings.data array
     * @returns { number} The index of the rowId in settings.sortAndSearch.map
     *  If not found then rowIndex is -1 and rowId is null
     * @author Ascan Heydorn
     */
    function rptGetIndexOfRowId(containerId, rowId){
        var settings=getTableSettings(containerId); //issues should have been occured during init or display
        var rowIndex=-1;
        for (var i=0; i<settings.sortAndSearch.map.length;i++){
            if (settings.sortAndSearch.map[i][4]==rowId){
                rowIndex=i;
                break;
            }
        }
        return rowIndex;
    }//end function rptGetRowIdOfDataIndex
    /**Sets the value of a html element which is part a PowerTable row by indicating the rowId and the id of the element from the row template.
     * In PowerTable one row is defined with proper field id's like t0-vessel. This is the template id.
     * When data is added to the table and true data rows are created, the tags receive a row number as suffix like t0-vessel-25. t0-vessel-25
     * would be part of the row whith id t0-row-25.
     * This function allows to set a value based on row id and template id. So it would take t0-row-25 and t0-vessel as input and would
     * set the value of the element with id t0-vessel-25.
     *
     * @param {string} rowId
     * @param {string} elementTplId
     * @param {string} value
     * @author Ascan Heydorn
     */
    function rptSetRowElementValue(rowId, elementTplId, value){
        var rowSuffix=rowId.substring(rowId.lastIndexOf('-'));
        rutSetElementValue(elementTplId+rowSuffix, value);
    }// end function rptSetRowElementValue
    /**Gets the value of a html element which is part a PowerTable row by indicating the rowId and the id of the element from the row template.
     * In PowerTable one row is defined with proper field id's like t0-vessel. This is the template id.
     * When data is added to the table and true data rows are created, the tags receive a row number as suffix like t0-vessel-25. t0-vessel-25
     * would be part of the row whith id t0-row-25.
     * This function allows to get a value based on row id and template id. So it would take t0-row-25 and t0-vessel as input and would
     * return the value of the element with id t0-vessel-25.
     *
     * @param {*} rowId
     * @param {*} elementTplId The id of the element as given in the template row
     * @author Ascan Heydorn
     */
    function rptGetRowElementValue(rowId, elementTplId){
        var rowSuffix=rowId.substring(rowId.lastIndexOf('-'));
        return rutGetElementValue(elementTplId+rowSuffix);
    }// end function rptGetRowElementValue
    //###27 END
    //###31
    /**Removes a table definition from the table index. Required to support lookup
     * @param {string} containerId
     * @author Ascan Heydorn
     */
    function rptRemoveTableSettings(containerId){
        var newIndex=rut.powerTableIndex;
        for (var i=0;i<rut.powerTableIndex.length;i++){
            if (rut.powerTableIndex[i].containerId==containerId){
                newIndex=rut.powerTableIndex.splice(i,1);
                break;
            }
        }
        rut.powerTableIndex=newIndex;
    }//end function rptRemoveTableSettings
    //###31

    function rptFindNextRow(rowId, returnAsIndex){
    	var settings=getTableSettings(containerId); //issues should have been occured during init or display
        var rowIndex=-1;
        for (var i=0; i<settings.sortAndSearch.map.length;i++){
            if (settings.sortAndSearch.map[i][4]==rowId){
                rowIndex=i;
                break;
            }
        }
        return rowIndex;
    }

    //###43 BEGIN
    function rptInsertNewRowAfter(containerId, index, newData){
    	var rowIndex = index;
    	if(isNaN(index)){
    		//index is htmlId
    		rowIndex = rptGetIndexOfRowId(containerId, index);
    	}
    	rowIndex += 1;
    	var settings=getTableSettings(containerId);
    	if(rowIndex >= settings.sortAndSearch.map.length-1){
    		//The row is the last row
    		return rptInsertNewRowBefore(containerId, 'end', newData);
    	}else{
    		return rptInsertNewRowBefore(containerId, rowIndex, newData);
    	}
    }
    //###43 END

    //###41 BEGIN
    var _exceptsSortTable = [];
    function addExceptsSortTable(containerId){
    	if(containerId instanceof Array){
    		for(id in containerId){
    			removeExceptsSortTable(containerId[id]);
    		}
    	}else{
    		if(_exceptsSortTable.indexOf(containerId) === -1){
        		_exceptsSortTable.push(containerId);
        	}
    	}
    }
    function removeExceptsSortTable(containerId){
    	if(containerId instanceof Array){
    		for(id in containerId){
    			removeExceptsSortTable(containerId[id]);
    		}
    	}else{
    		if(_exceptsSortTable.indexOf(containerId)!=1){
    			_exceptsSortTable = _exceptsSortTable.splice(
    					_exceptsSortTable.indexOf(containerId)
    					,1
    				);
        	}
    	}
    }
    function resetExceptsSortTable(){
    	_exceptsSortTable = [];
    }
    //###41 END