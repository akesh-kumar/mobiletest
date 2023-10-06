<%@ taglib prefix="rcl" uri="/WEB-INF/custom.tld"%>
							
							<rcl:text id="s0-service" label="Service" classes="div(col-sm-2)"
				check="len(5) upc" icon="fa-search" 
				iconClick="lookupService()" />
				
			
<%
	if("req".equals(request.getParameter("req")))
	{
%>
							<rcl:text id="s0-vessel" label="Vessel" classes="div(col-sm-2)"
				check="req len(10) upc" icon="fa-search" 
				iconClick="lookupVessel()"/>
							
							
							<rcl:text id="s0-voyage" label="Voyage" classes="div(col-sm-2)"
				check="req len(10) upc" icon="fa-search" 
				iconClick="lookupVoyage()"/>
<%
}else {
	%>
	           <rcl:text id="s0-vessel" label="Vessel" classes="div(col-sm-2)"
				check="len(10) upc" icon="fa-search"
				iconClick="lookupVessel()"/>
				
					<rcl:text id="s0-voyage" label="Voyage" classes="div(col-sm-2)"
				check="len(10) upc" icon="fa-search" 
				iconClick="lookupVoyage()"/>
	
				
	<%
}
%>