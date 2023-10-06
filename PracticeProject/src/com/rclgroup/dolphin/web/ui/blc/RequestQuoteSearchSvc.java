/*Copyright (c) 2020 RCL| All Rights Reserved  */
package com.rclgroup.dolphin.web.ui.blc;
/* ------------------------- Change Log ---------------------------------------
##   DD/MM/YY       -User-              -TaskRef-            -ShortDescription-
1    25/08/21       Chandu               Initial Version
-------------------------------------------------------------------------------
*/

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.rclgroup.dolphin.blc.utils.Constants;
import com.rclgroup.dolphin.web.common.RrcStandardSvc;

public class RequestQuoteSearchSvc extends RrcStandardSvc {
	public void execute(HttpServletRequest request, HttpServletResponse response, ServletContext context)
			throws Exception {
		try {
			String strTarget = Constants.BLC_QUOTE_SEARCh_SCN;
			request.setAttribute("target", strTarget);
		} catch (Exception exc) {
			exc.printStackTrace();
		}
	}
}
