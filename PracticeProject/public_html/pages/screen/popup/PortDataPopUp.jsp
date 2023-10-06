<%@ taglib prefix="rcl" uri="/WEB-INF/custom.tld"%>
<div id="portDataEditScreenPopUp" tabindex="-1" role="dialog"
	style="display: none; height: auto; width: 70%; top: 20%; left: 10%;"
	class="ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-dialog-buttons ui-draggable"
	aria-describedby="t99Lookup-dlg">
	<div
		class="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle">
		<span class="ui-dialog-title">Port Data Edit Screen PopUp</span>
		<button type="button"
			class="ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close"
			title="Close" onclick="cancel()">
			<span class="ui-button-icon ui-icon ui-icon-closethick"></span> <span
				class="ui-button-icon-space"> </span>Close
		</button>
	</div>
	<div style="margin: 10px;">
		<div id="t78Lookup-dlg" class="ui-dialog-content ui-widget-content"
			style="width: auto; min-height: 63px; max-height: none; height: auto; overflow: hidden;">
			<div class="col-12">
				<div class="row mb-4">
					<label class="col-sm-2">Port</label>
					<rcl:select id="s1-port" classes="div(col-sm-4)"
						check="req len(10) upc " />

					<label class="col-sm-2">Terminal</label>
					<rcl:select id="s1-terminal" classes="div(col-sm-4)"
						check=" req len(10) upc" />
				</div>
				<div class="row mb-4">
					<label class="col-sm-2">Situation/Event</label>
					<rcl:select id="s1-situation" classes="div(col-sm-4)" check="req" />
				</div>
				<div class="row mb-4">
					<label class="col-sm-2">Start Event (Date & Time)</label>
					<rcl:date id="s1-startEvent" classes="div(col-sm-4)" check=" req"
						defaultValue="+1" />
					<label class="col-sm-2">End Event (Date & Time)</label>
					<rcl:date id="s1-endEvent" classes="div(col-sm-4)" check=" req"
						defaultValue="today" />
				</div>
				<div class="row mb-4">
					<label class="col-sm-2">Start Effected (Effected)</label>
					<rcl:date id="s1-startEffected" classes="div(col-sm-4)"
						check=" req" />
					<label class="col-sm-2">End Effected (Effected)</label>
					<rcl:date id="s1-endEffected" classes="div(col-sm-4)" check=" req" />
				</div>
				<div class="row mb-4">
					<label class="col-sm-2">Max Crane</label>
					<rcl:number id="s1-maxCrane" classes="div(col-sm-4)"
						check=" req len(10) upc" />
					<label class="col-sm-2">Operating Crane</label>
					<rcl:number id="s1-operatingCrane" classes="div(col-sm-4)"
						check=" req len(10) upc" />
				</div>
			</div>
		</div>
		<hr>


		<div class="ui-helper-clearfix"
			style="margin: 10px; margin-left: 40%;">
			<button type="button" id="submit1" class="ui-button" title="reset"
				onclick="submit()">Submit</button>
			<button type="button" class="ui-button" title="clear"
				onclick="clearData()">Clear</button>
			<button type="button" class="ui-button" title="Close"
				onclick="cancel()">Cancel</button>
		</div>
	</div>
</div>

<script>
	$(document).ready(function() {
		var portOptions = "<option value='-1'>Please Select One</option>";
		portOptions += "<option>ERYMJI</option>";
		portOptions += "<option>CHISTI</option>";
		portOptions += "<option>GTERYJ</option>";

		$("#s1-port").html(portOptions);

		var terminalOptions = "<option value='-1'>Please Select One</option>";
		terminalOptions += "<option>TDEFFD</option>";
		terminalOptions += "<option>SERFVC</option>";
		terminalOptions += "<option>OJRRDE</option>";

		$("#s1-terminal").html(terminalOptions);

		var options = "<option value='-1'>Please select One</option>";
		options += "<option>Crane Down</option>";
		options += "<option>Truck Movement</option>";

		$("#s1-situation").html(options);
	});

	function cancel() {
		$("#portDataEditScreenPopUp").hide();
	}

	function submit() {
		/* var startEvent = $("#s1-startEvent").val();
		var endEvent = $("#s1-endEvent").val();
		if (endEvent < startEvent) {
			rutOpenMessageBox("Warning",
					"End Date should not be less than start Date", "cancel",
					"ok", true); */


		var fromDate = moment($("#s1-startEvent").val(), 'DD/MM/YYYY', true).toDate();
		var toDate = moment($("#s1-endEvent").val(), 'DD/MM/YYYY', true).toDate();
		if(fromDate>toDate){
			//alert("is greter");
			rutOpenMessageBox("Message"," From date should not greater than to date  ", null,null, '');
 			return false;
		}

	}
	function clearData() {
		var today = moment().format('DD/MM/YYYY');
		var tomorrow  = moment().add(1, 'days').format('DD/MM/YYYY');
		$("#s1-port").val("-1");
		$("#s1-terminal").val("-1");
		$("#s1-situation").val("-1");
		$("#s1-startEvent").val(tomorrow);
		$("#s1-endEvent").val(today);
		$("#s1-startEffected").val('');
		$("#s1-endEffected").val('');
		$("#s1-maxCrane").val('');
		$("#s1-operatingCrane").val('');
	}
</script>