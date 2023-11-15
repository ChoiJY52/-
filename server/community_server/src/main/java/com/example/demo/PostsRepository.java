package com.example.demo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostsRepository extends MongoRepository<Post, String> {
	
	List<Post> findByBoard(String board);
	
}
