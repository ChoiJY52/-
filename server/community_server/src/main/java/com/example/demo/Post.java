package com.example.demo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="posts")
public class Post {
	@Id
	private String postId;
	private String title;
	private String content;
	private String board;
	private String userId;
	
	public void setPostId(String postId) {
		this.postId = postId;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public void setBoard(String board) {
		this.board = board;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getPostId() {
		return this.postId;
	}
	public String getTitle() {
		return this.title;
	}
	public String getContent() {
		return this.content;
	}
	public String getBoard() {
		return this.board;
	}
	public String getUserId() {
		return this.userId;
	}
	public Map<String, String> getAll() {
		Map<String, String> result = new HashMap<>();
		result.put("post_id", this.postId);
		result.put("content", this.content);
		result.put("board", this.board);
		result.put("title", this.title);
		return result;
	}
	
}
