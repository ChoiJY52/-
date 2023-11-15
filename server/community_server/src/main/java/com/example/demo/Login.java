package com.example.demo;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Properties;
import java.sql.Connection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Login {
	
	private String db_url = "jdbc:mysql://127.0.0.1:3306/user_info";
	private Properties props = new Properties();
	private PreparedStatement psmt = null;
	private Connection conn = null;
	private String sql = "";
	
	@Autowired
	public Login() {
		props.put("user", "root");
		props.put("password", "Wjddyd@0215");
	}
	
	public boolean signUp(String userId, String password) {
		sql = "insert into userinfo values(?,?)";
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
//			props.put("user", "root");
//			props.put("password", "Wjddyd@0215");
			conn = DriverManager.getConnection(db_url, props);
			psmt = conn.prepareStatement(sql);
			psmt.setString(1, userId);
			psmt.setString(2, password);
			psmt.executeUpdate();
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		} finally {
		    try {
		        if (conn != null) {
		            conn.close();
		        }
		        if (psmt != null) {
		            psmt.close();
		        }
		    } catch (Exception e) {
		        e.printStackTrace();
		        return false;
		    }
		}
		return true;
	}
	
	public String login(String userId, String password) {
		String returnValue;
		sql = "select userid from userinfo where userid=? and password=?";
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(db_url, props);
			psmt = conn.prepareStatement(sql);
			psmt.setString(1, userId);
			psmt.setString(2, password);
			ResultSet result = psmt.executeQuery();
			result.next();
			returnValue = '"'+ result.getString(1) + '"';
		} catch(Exception e) {
			e.printStackTrace();
			return "false";
		} finally {
			try {
				if(conn != null) {
					conn.close();
				}
				if(psmt != null) {
					psmt.close();
				}
			} catch(Exception e) {
				e.printStackTrace();
			}
		}
		return returnValue;
	}
}
