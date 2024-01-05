import React, { useEffect, useState } from 'react'
import Header from '../../Component/Header/Header'
// import Post from '../../Component/Post/Post'
import Sidebar from '../../Component/Sidebar/Sidebar'
import './Home.css'
import Posts from '../../Component/Posts/Posts'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const [post , setPost] = useState([])
  const {search} = useLocation()

  useEffect(()=>{
    const getPost = async () =>{
      const res = await axios.get(`http://localhost:5000/api/post/${search}`)
      setPost(res.data)
    }
    getPost()
  },[search])
  // console.log(post);

  return (
    <div>
        <Header/>
        <div className="home">
          <Posts post={post}/>
          <Sidebar/>
        </div>
        </div>
  )
}

export default Home