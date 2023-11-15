package com.example.demo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {
	
	@Autowired
	private PostService postService;
	@Autowired
	private CommentService commentService;
	@Autowired
	private Login login;
	
	@GetMapping("/")
	public Optional<Post> home() {
		Post newPost = new Post();
		newPost.setTitle("테스트");
		newPost.setContent("테스트 중입니다.");
		newPost.setBoard("React");
		return postService.posting(newPost);
	}
	@GetMapping("/board/{board}")
	public ResponseEntity<?> getBoard(@PathVariable String board) {
		List<Post> posts = postService.getBoard(board);
		return ResponseEntity.ok(posts);
	}
	
	@GetMapping("/post/{postId}")
	public ResponseEntity<?> getPost(@PathVariable String postId) {
		Optional<Post> optionalPost = postService.getPostId(postId);
		Post post = optionalPost.get();
		Map<String, String> result = new HashMap<>();
		result.put("postId", post.getPostId());
		result.put("title", post.getTitle());
		result.put("board", post.getBoard());
		result.put("content", post.getContent());
		result.put("userId", post.getUserId());
		return ResponseEntity.ok(result);
	}
	@PostMapping("/post")
	public ResponseEntity<String> posting(
			@RequestParam("board") String board,
			@RequestParam("title") String title,
			@RequestParam("content") String content,
			@RequestParam("userId") String userId) {
		Post newPost = new Post();
		newPost.setPostId(UUID.randomUUID().toString());
		newPost.setTitle(title);
		newPost.setContent(content);
		newPost.setBoard(board);
		newPost.setUserId(userId);
		postService.posting(newPost);
		return ResponseEntity.ok("success");
	}
	@DeleteMapping("/post/{postId}")
	public ResponseEntity<String> deletePost(@PathVariable String postId) {
		postService.deletePost(postId);
		commentService.deleteAllComment(postId);
		return ResponseEntity.ok("success");
	}
	
	@GetMapping("/comment/{postId}")
	public ResponseEntity<?> getComment(@PathVariable String postId) {
		return ResponseEntity.ok(commentService.getComment(postId));
	}
	@PostMapping("/comment")
	public ResponseEntity<String> postComment(
			@RequestParam("content") String content,
			@RequestParam("postId") String postId,
			@RequestParam("userId") String userId) {
		Comment newComment = new Comment();
		newComment.setCommentId(UUID.randomUUID().toString());
		newComment.setContent(content);
		newComment.setPostId(postId);
		newComment.setUserId(userId);
		commentService.postComment(newComment);
		return ResponseEntity.ok("success");
	}
	@DeleteMapping("/comment/{commentId}")
	public void deleteComment(@PathVariable String commentId) {
		commentService.deleteComment(commentId);
	}
	
	@PostMapping("/signup")
	public ResponseEntity<Object> signUp(
			@RequestParam("userId") String userId,
			@RequestParam("password") String password) {
		if(login.signUp(userId, password) == false) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 실패했습니다.");
		}
		else {
			return ResponseEntity.ok("success");
		}
	}
	@PostMapping("/login")
	public ResponseEntity<Object> login(
			@RequestParam("userId") String userId,
			@RequestParam("password") String password){
		String result = login.login(userId, password);
		if(result == "false") {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		else {
			return ResponseEntity.ok().body(result);
		}
	}
}