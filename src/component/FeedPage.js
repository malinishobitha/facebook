import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  const addPost = (newPost) => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = {
      id: storedPosts.length + 1,
      content: newPost,
      user: currentUser.username,
      comments: []
    };
    storedPosts.push(post);
    localStorage.setItem('posts', JSON.stringify(storedPosts));
    setPosts(storedPosts);
  };

  const addComment = (postId) => {
    const comment = prompt('Enter your comment:');
    if (comment) {
      const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
      const post = storedPosts.find(p => p.id === postId);
      if (post) {
        post.comments.push(comment);
        localStorage.setItem('posts', JSON.stringify(storedPosts));
        setPosts(storedPosts);
      }
    }
  };

  return (
    <div>
      <h2>Welcome, {currentUser?.username}</h2>
      <button onClick={() => addPost(prompt('Write a new post'))}>Add Post</button>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <p><strong>{post.user}</strong>: {post.content}</p>
            <button onClick={() => addComment(post.id)}>Comment</button>
            <div>
              {post.comments.map((comment, index) => (
                <p key={index}>{comment}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Link to="/login">Logout</Link>
    </div>
  );
}

export default FeedPage;
