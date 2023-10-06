package com.rclgroup.dolphin.web.servelt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.rclgroup.dolphin.blc.utils.Constants;
import com.rclgroup.dolphin.web.Employee;

/**
 * Servlet implementation class LoginServet
 */
public class LoginServet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("login");
		String name = request.getParameter("name");
		String password = request.getParameter("password");
		UUID uuid = UUID.randomUUID();
		request.setAttribute("random", uuid);
		
		List<Employee> employees  = new ArrayList<>();
		for(int i=0;i<10;i++) {
			uuid = UUID.randomUUID();
			employees.add(new Employee(name+i, i*10, uuid.toString().split("-")[0]));
		}
		request.setAttribute("employees", employees);
		HttpSession session = request.getSession();
		session.setAttribute(Constants.EMP_BEAN, new Employee(name, 12, password));
		RequestDispatcher dis = request.getRequestDispatcher("pages/indexResponse.jsp");
		dis.forward(request, response);
		
	}

}
