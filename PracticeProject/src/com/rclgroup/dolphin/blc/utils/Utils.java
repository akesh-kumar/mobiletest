/*Copyright (c) 2020 RCL| All Rights Reserved  */
package com.rclgroup.dolphin.blc.utils;

/* ------------------------- Change Log ---------------------------------------
##   DD/MM/YY       -User-              -TaskRef-            -ShortDescription-
1    13/03/20       Chandu               Initial Version
-------------------------------------------------------------------------------
*/
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class Utils {

	public static String encodeParamter(String url) {
		try {
			return URLEncoder.encode( url, "UTF-8" );
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
	}
}
