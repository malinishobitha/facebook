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
  const [samplePosts, setSamplePosts] = useState([
    {
      text: "Adventure",
      likes: 5,
      dislikes: 2,
      image: "https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg",
      comments: ["Great platform!", "Nice interface!"],
      userName: "John Doe",
    },
    {
      text: "Have fun exploring!",
      likes: 3,
      dislikes: 1,
      image: Untitled,
      comments: ["Awesome!", "Really cool!"],
      userName: "Jane Smith",
    },
    {
      text: "Nature beauty!",
      likes: 7,
      dislikes: 0,
      image: sampleImage,
      comments: ["Amazing!", "Lovely view!"],
      userName: "Robert Brown",
    },
    {
      text: "Adventure vibes!",
      likes: 2,
      dislikes: 1,
      image: sampleImage1,
      comments: ["So cool!", "Awesome!"],
      userName: "Alice Johnson",
    },
    {
      text: "Peaceful scenery!",
      likes: 9,
      dislikes: 0,
      image: sampleImage2,
      comments: ["Wow!", "Fantastic!"],
      userName: "Michael Lee",
    },
  ]);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts"));
    if (storedPosts) {
      storedPosts.forEach((post) => {
        if (!posts.find((existingPost) => existingPost.text === post.text)) {
          dispatch(addPost(post));
        }
      });
    }
  }, [dispatch, posts]);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts]);

  const handleAddComment = (index, isSample) => {
    const comment = postComments[index];
    if (comment && comment.trim()) {
      if (isSample) {
        const updatedSamplePosts = [...samplePosts];
        updatedSamplePosts[index].comments.push(comment);
        setSamplePosts(updatedSamplePosts);
      } else {
        dispatch(addComment({ index, comment }));
      }
      setPostComments({ ...postComments, [index]: "" });
      setVisibleComments((prev) => ({
        ...prev,
        [index]: true,
      }));
    } else {
      alert("Comment cannot be empty!");
    }
  };

  const toggleComments = (index) => {
    setVisibleComments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCommentChange = (e, index) => {
    setPostComments({ ...postComments, [index]: e.target.value });
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
    };

    dispatch(addPost(newPostData));

    const updatedPosts = [...posts, newPostData];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    setNewPost("");
    setImage(null);
  };

  const handleLike = (index, isSample) => {
    if (isSample) {
      const updatedSamplePosts = [...samplePosts];
     
      if (updatedSamplePosts[index]) {
        updatedSamplePosts[index].likes += 1;
        setSamplePosts(updatedSamplePosts);
      }
    } else {
      
      if (posts[index]) {
        dispatch(likePost(index));
      }
    }
  };

  const handleDislike = (index, isSample) => {
    if (isSample) {
      const updatedSamplePosts = [...samplePosts];
    
      if (updatedSamplePosts[index]) {
        updatedSamplePosts[index].dislikes += 1;
        setSamplePosts(updatedSamplePosts);
      }
    } else {
     
      if (posts[index]) {
        dispatch(dislikePost(index));
      }
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
            onChange={(e) =>
              setImage(URL.createObjectURL(e.target.files[0])) 
            }
          />
          <button onClick={handleAddPost}>Post</button>
        </div>

        {[...samplePosts, ...posts].map((post, index) => (
          <div key={index} className="post">
            <p>
              <strong>{post.userName}</strong>: {post.text}
            </p>
            {post.image && (
              <img src={post.image} alt="Post" className="post-image" />
            )}
            <div className="post-actions">
              <button onClick={() => handleLike(index, posts.includes(post))}>
                <i className="fa fa-thumbs-up"></i> {post.likes} Likes
              </button>
              <button onClick={() => handleDislike(index, posts.includes(post))}>
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
              <button onClick={() => handleAddComment(index, posts.includes(post))}>
                Comment
              </button>
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
