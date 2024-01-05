import React, { useState } from "react";
import "./Setting.css";
import Sidebar from "../../Component/Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const Setting = () => {
  const user = useSelector((state) => state?.user?.user?.Db);
  const [file, setfile] = useState(null);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [success, setsuccess] = useState("");
  const PF = "http://localhost:5000/images/";
  // const navigate = useNavigate();

  const updateHanlder = async (e) => {
    e.preventDefault();
    const updateUser = {
      userId: user?._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profilePic = filename;
      try {
        await axios.post("http://localhost:5000/api/upload/", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.put(`http://localhost:5000/api/user/${user._id}`, updateUser);
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
    setsuccess("User has been Updated");
    toast.success("User Updated  Successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <>
      <div className="Setting">
        <div className="settingWrapper">
          <div className="settingTitle">
            <div className="settingUpdateTitle">Update Your Acount</div>
            <div className="settingDeleteTitle">Delete Your Acount</div>
          </div>
          <form className="settingForm" onSubmit={updateHanlder}>
            <label>Profile Picture</label>
            <div className="settingPP">
              <img
                className="settingImg"
                src={file ? URL.createObjectURL(file) : PF + user?.profilePic}
                alt="pp"
              />
              <label htmlFor="fileInput">
                <FontAwesomeIcon
                  className="settingPpIcon"
                  icon={faUserCircle}
                />
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setfile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <label>Username</label>
            <input
              type="text"
              placeholder={user?.username}
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder={user?.email}
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="password..."
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <p
              style={{ color: "green", textAlign: "center", marginTop: "10px" }}
            >
              {success}
            </p>
            <button className="settingSubmit" type="submit">
              Update
            </button>
          </form>
        </div>
        <Sidebar />
      </div>
      <ToastContainer />
    </>
  );
};

export default Setting;
