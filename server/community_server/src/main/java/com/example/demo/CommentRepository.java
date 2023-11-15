package com.example.demo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, String> {
	List<Comment> findByPostId(String postId);
	
	void deleteByPostId(String postId);
}
