import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Write.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Write = () => {
  const user = useSelector((state) => state?.user?.user?.Db);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const submitHanlder = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user?.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photos = filename;
      try {
        await axios.post("http://localhost:5000/api/upload/",data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.post("http://localhost:5000/api/post/",newPost);
      navigate(`/post/${res.data._id}`);
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
    toast.success("Post Created Successfully");
  };

  return (
    <>
      <div className="Write">
        {file && (
          <img className="WriteImg" src={URL.createObjectURL(file)} alt="" />
        )}
        <form className="writeForm" onSubmit={submitHanlder}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <FontAwesomeIcon className="writeIcon" icon={faPlus} />
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter Title..."
              className="writeInput"
              autoFocus={true}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Tell Your Anything..."
              type="text"
              className="writeInput WriteText"
            ></textarea>
          </div>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Write;
