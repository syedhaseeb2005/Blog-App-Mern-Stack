import React from 'react'
import './Single.css'
import Sidebar from '../../Component/Sidebar/Sidebar'
import SinglePost from '../../Component/SinglePost/SinglePost'

const Single = () => {
  return (
    <div className='singal'>
        <SinglePost/>
        <Sidebar/>
    </div>
  )
}

export default Single
