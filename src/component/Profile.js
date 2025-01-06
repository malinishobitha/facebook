import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  // Load user data from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
    }
  }, []);

  // Get posts from localStorage or Redux
  const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  const userPosts = storedPosts.filter((post) => post.userName === userData.name);

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsEditing(false);
    alert("Profile updated successfully!");
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
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-details">
        {isEditing ? (
          <>
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Email"
            />
            <textarea
              value={userData.bio}
              onChange={(e) =>
                setUserData({ ...userData, bio: e.target.value })
              }
              placeholder="Bio"
            />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Bio:</strong> {userData.bio || "No bio added."}
            </p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>

      <div className="user-posts">
        <h3>Your Posts</h3>
        {userPosts.length > 0 ? (
          userPosts.map((post, index) => (
            <div key={index} className="post">
              <p>{post.text}</p>
              {post.image && (
                <img src={post.image} alt="Post" className="post-image" />
              )}
            </div>
          ))
        ) : (
          <p>No posts yet!</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;
