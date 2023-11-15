package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
	
	private CommentRepository commentRepository;
	
	@Autowired
	public CommentService(CommentRepository commentRepository) {
		this.commentRepository = commentRepository;
	}
	
	public List<Comment> getComment(String postId) {
		return commentRepository.findByPostId(postId);
	}
	
	public void postComment(Comment comment) {
		commentRepository.save(comment);
	}
	
	public void deleteAllComment(String postId) {
		commentRepository.deleteByPostId(postId);
	}
	public void deleteComment(String commentId) {
		commentRepository.deleteById(commentId);
	}
}
