import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, likePost, dislikePost, addComment, deletePost } from "../redux/postSlice";
import "./Feed.css";
import Untitled from "./images/Untitled.jpeg";  
import sampleImage from './images/download (1).jpeg';
import sampleImage1 from './images/download (4).jpeg';
import sampleImage2 from './images/download (5).jpeg';
const Feed = () => {
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [postComments, setPostComments] = useState({});
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const user = JSON.parse(localStorage.getItem("user"));

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
      text: "Have fun exploring!",
      likes: 3,
      dislikes: 1,
      image: sampleImage,  
      comments: ["Awesome!", "Really cool!"],
     
    },
    {
      text: "Have fun exploring!",
      likes: 5,
      dislikes: 1,
      image: sampleImage1,  
      comments: ["Awesome!", "Really cool!"],
     
    },
    {
      text: "Have fun exploring!",
      likes: 13,
      dislikes: 1,
      image: sampleImage2,  
      comments: ["Awesome!", "Really cool!"],
     
    },
  ];

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts"));
    if (!posts.length) {
      if (storedPosts) {
        storedPosts.forEach((post) => {
          dispatch(addPost(post));
        });
      } else {
        samplePosts.forEach((post) => {
          dispatch(addPost(post));
        });
      }
    }
  }, [dispatch, posts.length]);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); 
        console.log("Image URL:", reader.result);  
      };
      reader.readAsDataURL(file);  
    }
  };

  const handleAddPost = () => {
    if (!newPost.trim()) {
      alert("Post content cannot be empty!");
      return;
    }

    const newPostData = {
      text: newPost,
      likes: 0,
      dislikes: 0,
      image, 
      comments: [],
      userName: user?.name || "Anonymous",
      isStored: false,  // New post
    };

    dispatch(addPost(newPostData));

    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    storedPosts.push(newPostData);
    localStorage.setItem("posts", JSON.stringify(storedPosts));

    setNewPost("");
    setImage(null);
  };

  const handleLikePost = (index) => {
    dispatch(likePost(index)); 
  };

  const handleDislikePost = (index) => {
    dispatch(dislikePost(index)); 
  };

  const handleAddComment = (index) => {
    const comment = postComments[index];
    if (comment && comment.trim()) {
      dispatch(addComment({ index, comment }));
      setPostComments({ ...postComments, [index]: "" });
    } else {
      alert("Comment cannot be empty!");
    }
  };

  const handleCommentChange = (e, index) => {
    setPostComments({ ...postComments, [index]: e.target.value });
  };

  const handleDeletePost = (index) => {
    const post = posts[index];
    
    // Check if the post is stored (fetched from localStorage)
    if (post && post.isStored) { 
      alert("Cannot delete stored posts!");
      return;
    }

    dispatch(deletePost(index));
    const updatedPosts = posts.filter((_, i) => i !== index);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };


  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">Facebook Clone</div>
        <div className="navbar-menu">
          <button onClick={() => (window.location.href = "/Feed")}>Home</button>
          <button onClick={() => (window.location.href = "/profile")}>Profile</button>
          <button onClick={() => {
            localStorage.removeItem("user"); 
            window.location.href = "/SignupPage"; 
          }}>Logout</button>
        </div>
      </nav>

      <div className="feed">
        <div className="new-post">
          <input
            type="text"
            id="newPostText"
            name="newPostText"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            required
          />
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button onClick={handleAddPost}>Post</button>
        </div>

        {/* Display Sample Posts */}
        {samplePosts.map((post, index) => (
          <div key={index} className="post">
            <p><strong>{post.text}</strong></p>
            {post.image && <img src={post.image} alt="Post" className="post-image" />}
            <div className="post-actions">
              <button onClick={() => handleLikePost(index)}>
                <i className={`fa ${post.likes > 0 ? "fa-thumbs-up" : "fa-thumbs-o-up"}`}></i>
                {post.likes} Likes
              </button>
              <button onClick={() => handleDislikePost(index)}>
                <i className="fa fa-thumbs-down"></i> {post.dislikes} Dislikes
              </button>
              <button onClick={() => handleDeletePost(index)}>Delete</button>
            </div>
            <div className="comments-section">
              <input
                type="text"
                id={`comment-${index}`}
                name={`comment-${index}`}
                value={postComments[index] || ""}
                onChange={(e) => handleCommentChange(e, index)} 
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

        {/* Display User Posts */}
        {posts.map((post, index) => (
          <div className="post" key={index}>
            <p><strong>{post.userName}</strong></p>
            <p>{post.text}</p>
            {post.image && (
              <>
                <img src={post.image} alt="Post" className="post-image" />
              </>
            )}
            <div className="post-actions">
              <button onClick={() => handleLikePost(index)}>
                <i className={`fa ${post.likes > 0 ? "fa-thumbs-up" : "fa-thumbs-o-up"}`}></i>
                {post.likes} Likes
              </button>
              <button onClick={() => handleDislikePost(index)}>
                <i className="fa fa-thumbs-down"></i> {post.dislikes} Dislikes
              </button>
              <button onClick={() => handleDeletePost(index)}>Delete</button>
            </div>
            <div className="comments-section">
              <input
                type="text"
                id={`comment-${index}`}
                name={`comment-${index}`}
                value={postComments[index] || ""}
                onChange={(e) => handleCommentChange(e, index)} 
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
    </div>
  );
};

export default Feed;
