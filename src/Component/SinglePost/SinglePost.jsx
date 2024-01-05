import React, { useEffect, useState } from "react";
import "./SinglePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const SinglePost = () => {
  const user = useSelector((state) => state?.user?.user?.Db);
  const location = useLocation();
  // console.log(location.pathname.split('/')[2]);
  const postId = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const PF = "http://localhost:5000/images/";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`http://localhost:5000/api/post/${postId}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    fetchPost();
  }, [postId]);
  // console.log(post);

  const handleDelete = async () => {
    console.log(handleDelete, "=>>chal raha hy");
    try {
      await axios.delete(`http://localhost:5000/api/post/${post._id}`, {
        data: { username: user?.username },
      });
      toast.success("Post deleted successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting!");
    }
  };

  const updateHandler = async () => {
    console.log(updateHandler, "chal raha");
    try {
      await axios.put(`http://localhost:5000/api/post/${post._id}`, {
          username: user?.username,
          title,
          desc
      });
      toast.success("Successfully updated");
      // setUpdateMode(false);
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.log(error);
      toast.error("Error updating!");
    }
  };

  return (
    <>
      <div className="SinglePost">
        <div className="singlePostWrapper">
          {post?.photos && (
            <img className="singlePostImg" src={PF + post?.photos} alt="IMG" />
          )}
          {updateMode ? (
            <input
              type="text"
              autoFocus
              className="singlePostTitleInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">
              {post?.title}
              <div className="signlePostEdit">
                <FontAwesomeIcon
                  className="singlePostIcon"
                  onClick={() => setUpdateMode(true)}
                  icon={faEdit}
                />
                <FontAwesomeIcon
                  className="singlePostIcon"
                  onClick={handleDelete}
                  icon={faTrash}
                />
              </div>
            </h1>
          )}
          <div className="singlePostInfo">
            <Link className="link" to={`/?user=${post?.username}`}>
              <span className="singlePostAuthor">
                Author: <b>{post?.username}</b>
              </span>
            </Link>
            <span className="singlePostDate">
              Date: <b>{new Date(post?.createdAt).toDateString()}</b>
            </span>
          </div>
          {updateMode ? (
            <>
              <textarea
                className="singlePostDescInput"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </>
          ) : (
            <p className="singlePostDesc">{desc}</p>
          )}
          {updateMode && (
            <button className="singlePostUpdateBtn" onClick={updateHandler}>
              Update It
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SinglePost;
