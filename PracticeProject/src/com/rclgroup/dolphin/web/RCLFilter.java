package com.rclgroup.dolphin.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.rclgroup.dolphin.blc.utils.Constants;

/**
 * Servlet Filter implementation class RCLFilter
 */
public class RCLFilter implements Filter {
	private List<String> urlsNeedignore= new ArrayList<>();  
    /**
     * Default constructor. 
     */
    public RCLFilter() {
    	urlsNeedignore.add("/RCLWebApp/LoginServet");
    	urlsNeedignore.add("/RCLWebApp/pages/screen/LocUsersSearchScn.jsp");
    	urlsNeedignore.add("/RCLWebApp/pages/screen/QuoteSearchScn.jsp");
    	urlsNeedignore.add("/RCLWebApp/pages/screen/SendWhatsUpMessage.jsp");
    	
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		System.out.println("i am in RCLFilter");
		if(request instanceof HttpServletRequest) {
			HttpServletRequest req =(HttpServletRequest)request;
			System.out.println(req.getRequestURI());
			
			// If you want to use filter un-comments this code and try
			/*if(req.getSession().getAttribute(Constants.EMP_BEAN)==null && !urlsNeedignore.contains(req.getRequestURI()) && 
					!(req.getRequestURI().lastIndexOf(".js")!=-1 
						|| req.getRequestURI().lastIndexOf(".css")!=-1
						|| req.getRequestURI().lastIndexOf(".ttf")!=-1
						|| req.getRequestURI().lastIndexOf(".woff2")!=-1
						
							)
					) {
				RequestDispatcher dis = request.getRequestDispatcher("index.jsp");
				dis.forward(request, response);
				return;
			}*/
			
		}
		// TODO Auto-generated method stub
		// place your code here

		// pass the request along the filter chain
		chain.doFilter(request, response);
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
