import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [cat , setCat] = useState([])

  useEffect(()=>{
    const getsCat = async ()=>{
      const res = await axios.get('http://localhost:5000/api/categories/')
      setCat(res.data)
    }
    getsCat()
  },[])
  // console.log(cat);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Me</span>
        <img
          className="sidebarImg"
          src="https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg"
          alt="img"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          reiciendis nesciunt quibusdam velit.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
          {cat.map((c)=>(
            <Link key={c._id} to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow Us</span>
        <div className="sidebarSocial">
          <FontAwesomeIcon className="sidebarIcon" icon={faFacebook} />
          <FontAwesomeIcon className="sidebarIcon" icon={faInstagram} />
          <FontAwesomeIcon className="sidebarIcon" icon={faGithub} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
