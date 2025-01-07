import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, likePost, dislikePost, addComment } from "../redux/postSlice";
import "./css/Feed.css";
import Untitled from "./images/Untitled.jpeg";
import sampleImage from "./images/download (1).jpeg";
import sampleImage1 from "./images/download (4).jpeg";
import sampleImage2 from "./images/download (5).jpeg";

const Feed = () => {
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [postComments, setPostComments] = useState({});
  const [visibleComments, setVisibleComments] = useState({});

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  // Load initial sample posts into Redux state if empty
  useEffect(() => {
    const samplePosts = [
      {
        text: "Adventure",
        likes: 5,
        dislikes: 2,
        image: "https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg",
        comments: ["Great platform!", "Nice interface!"],
      },
      {
        text: "Have fun exploring!",
        likes: 3,
        dislikes: 1,
        image: Untitled,
        comments: ["Awesome!", "Really cool!"],
      },
      {
        text: "Nature beauty!",
        likes: 7,
        dislikes: 0,
        image: sampleImage,
        comments: ["Amazing!", "Lovely view!"],
      },
      {
        text: "Adventure vibes!",
        likes: 2,
        dislikes: 1,
        image: sampleImage1,
        comments: ["So cool!", "Awesome!"],
      },
      {
        text: "Peaceful scenery!",
        likes: 9,
        dislikes: 0,
        image: sampleImage2,
        comments: ["Wow!", "Fantastic!"],
      },
    ];

    const storedPosts = JSON.parse(localStorage.getItem("posts"));
    if (!posts.length && storedPosts) {
      storedPosts.forEach((post) => dispatch(addPost(post)));
    } else if (!posts.length) {
      samplePosts.forEach((post) => dispatch(addPost(post)));
    }
  }, [dispatch, posts.length]);

  // Update localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = () => {
    if (!newPost.trim()) {
      alert("Post content cannot be empty!");
      return;
    }

    // Get the username from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user ? user.name : "Guest"; // Default to "Guest" if no username

    const newPostData = {
      username, // Add username here
      text: newPost,
      likes: 0,
      dislikes: 0,
      image,
      comments: [],
    };

    // Add new post to Redux state
    dispatch(addPost(newPostData));

    // Also add it to localStorage directly for persistence
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    storedPosts.push(newPostData);
    localStorage.setItem("posts", JSON.stringify(storedPosts));

    setNewPost("");
    setImage(null);
  };

  const handleLike = (index) => {
    dispatch(likePost(index));
  };

  const handleDislike = (index) => {
    dispatch(dislikePost(index));
  };

  const handleAddComment = (index) => {
    const comment = postComments[index];
    if (comment && comment.trim()) {
      dispatch(addComment({ index, comment }));
      setPostComments({ ...postComments, [index]: "" });
      setVisibleComments((prev) => ({ ...prev, [index]: true }));
    } else {
      alert("Comment cannot be empty!");
    }
  };

  const toggleComments = (index) => {
    setVisibleComments((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCommentChange = (e, index) => {
    setPostComments({ ...postComments, [index]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Base64 encoded image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="Facebook Logo"
            className="facebook-logo"
          />
        </div>
        <div className="navbar-menu" id="navbarMenu">
          <button onClick={() => (window.location.href = "/Feed")}>Home</button>
          <button onClick={() => (window.location.href = "/profile")}>
            Profile
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/SignUp";
            }}
          >
            Logout
          </button>
        </div>
        <button className="hamburger">&#9776;</button>
      </nav>

      <div className="feed">
        <div className="new-post">
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
          />
          <label htmlFor="fileInput" className="custom-button">
            Choose Image <i className="bi bi-images"></i>
          </label>
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <button onClick={handleAddPost}>Post</button>
        </div>

        {posts.map((post, index) => (
          <div key={index} className="post">
            <p><strong>{post.username}</strong></p> {/* Display the username */}
            <p>
              <strong>{post.text}</strong>
            </p>
            {post.image && (
              <img src={post.image} alt="Post" className="post-image" />
            )}
            <div className="post-actions">
              <button onClick={() => handleLike(index)}>
                <i className="fa fa-thumbs-up"></i> {post.likes} Likes
              </button>
              <button onClick={() => handleDislike(index)}>
                <i className="fa fa-thumbs-down"></i> {post.dislikes} Dislikes
              </button>
            </div>
            <div className="comments-section">
              <input
                type="text"
                value={postComments[index] || ""}
                onChange={(e) => handleCommentChange(e, index)}
                placeholder="Add a comment..."
              />
              <button onClick={() => handleAddComment(index)}>Comment</button>
              <button onClick={() => toggleComments(index)}>
                {visibleComments[index] ? "Hide Comments" : "Show Comments"}
              </button>
              {visibleComments[index] && post.comments.length > 0 && (
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
    </div>
  );
};

export default Feed;
