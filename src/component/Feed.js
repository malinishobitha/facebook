import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, likePost, addComment, deletePost, deleteComment } from '../redux/postSlice';
import './Feed.css';

const Feed = () => {
  const [newPost, setNewPost] = useState('');
  const [image, setImage] = useState(null);  // Store the image as a base64 string
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  // Step 1: Load posts from localStorage if any
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
      // If there are posts in localStorage, dispatch them to Redux
      storedPosts.forEach(post => {
        dispatch(addPost(post));  // Dispatch each post into Redux
      });
    }
  }, [dispatch]);

  // Step 2: Save posts to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('posts', JSON.stringify(posts));  
    }
  }, [posts]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);  
      };
      reader.readAsDataURL(file);  
    }
  };

  const handleAddPost = () => {
    if (!newPost.trim()) {
      alert('Post content cannot be empty!');
      return;
    }

    // Create new post object with image data
    const newPostData = { text: newPost, likes: 0, image, comments: [] };
    dispatch(addPost(newPostData));  // Add post to Redux

    // Reset input fields
    setNewPost('');
    setImage(null);
  };

  const handleLikePost = (index) => {
    dispatch(likePost(index));  // Like the post
  };

  const handleAddComment = (index) => {
    if (comment.trim()) {
      dispatch(addComment({ index, comment }));  // Add comment to post
      setComment('');
    } else {
      alert('Comment cannot be empty!');
    }
  };

  const handleDeletePost = (index) => {
    // Dispatch action to remove the post from Redux
    dispatch(deletePost(index));

    // Update localStorage after post is deleted
    const updatedPosts = posts.filter((_, i) => i !== index);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));  // Update posts in localStorage
  };

  return (
    <div className="feed">
      <div className="new-post">
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
        />
        {/* Image file input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button onClick={handleAddPost}>Post</button>
      </div>

      {/* Display the posts */}
      {posts.map((post, index) => (
        <div className="post" key={index}>
          <p>{post.text}</p>
          
          {/* Display image if available */}
          {post.image && <img src={post.image} alt="Post" className="post-image" />}
          
          {/* Like button */}
          <button onClick={() => handleLikePost(index)}>
            <i className={`fa ${post.likes > 0 ? 'fa-thumbs-up' : 'fa-thumbs-o-up'}`} aria-hidden="true"></i>
            {post.likes} Likes
          </button>

          {/* Delete button */}
          <button onClick={() => handleDeletePost(index)}>Delete</button>

          {/* Comments section */}
          <div className="comments-section">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={() => handleAddComment(index)}>Comment</button>
            {post.comments.length > 0 && (
              <ul>
                {post.comments.map((com, i) => (
                  <li key={i}>{com}</li>
                ))}
               
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
