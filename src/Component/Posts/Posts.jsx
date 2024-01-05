import React from "react";
import "./Posts.css";
import Post from "../Post/Post";

const Posts = ({ post }) => {
  return (
    <div className="posts">
      {post.map((p) => (
        <Post post={p}/>
      ))}
    </div>
  );
};

export default Posts;
