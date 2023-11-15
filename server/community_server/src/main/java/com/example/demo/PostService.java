package com.example.demo;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

	private PostsRepository postsRepository;
	
	@Autowired
	public PostService(PostsRepository postsRepository) {
		this.postsRepository = postsRepository;
	}
	
	public Optional<Post> posting(Post posts) {
		postsRepository.save(posts);
		return postsRepository.findById(posts.getPostId());
	}
	
	public List<Post> getBoard(String board) {
		return postsRepository.findByBoard(board);
	}
	
	public Optional<Post> getPostId(String postId) {
		return postsRepository.findById(postId);
	}
	
	public void deletePost(String postId) {
		postsRepository.deleteById(postId);
	}
}
