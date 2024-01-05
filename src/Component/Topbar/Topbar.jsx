import { useNavigate } from "react-router-dom";
import React from "react";
import "./Topbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
// import myImg from "../../assests/myImg.jpeg";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Logout } from "../../Redux/ApiCall";

const Topbar = () => {
  const user = useSelector((state) => state?.user?.user?.Db);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const PF = "http://localhost:5000/images/";

  const LogoutHandler = (e) => {
    e.preventDefault();
    Logout(dispatch);
    toast.success("Logout Successfully");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <>
      <div className="top">
        <div className="topLeft">
          <FontAwesomeIcon className="topIcon" icon={faFacebook} />
          <FontAwesomeIcon className="topIcon" icon={faInstagram} />
          <FontAwesomeIcon className="topIcon" icon={faGithub} />
        </div>
        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to={"/"}>
                HOME
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to={"/"}>
                ABOUT
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to={"/"}>
                CONTACT
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to={"/write"}>
                WRITE
              </Link>
            </li>
            <li className="topListItem" onClick={LogoutHandler}>
              {user && "LOGOUT"}
            </li>
          </ul>
        </div>
        <div className="topRight">
          {user ? (
            <Link className="link" to={"/setting"}>
              <img src={PF + user?.profilePic} className="topImg" alt="IMG" />
            </Link>
          ) : (
            <>
              <ul className="topList">
                <li className="topListItem">
                  <Link className="link" to={"/login"}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="link" to={"/register"}>
                    Register
                  </Link>
                </li>
              </ul>
            </>
          )}

          <FontAwesomeIcon icon={faSearch} className="topSearchIcon" />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Topbar;
