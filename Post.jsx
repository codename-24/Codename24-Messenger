import React, { useContext, useEffect, useState } from 'react'
import './post.css'
import {Link} from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {format} from 'timeago.js'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
export default function Post({post}) {

//const user = Users.filter(u=>u.id===1)
//console.log(user);
//console.log(post);
const [like,setLike] = useState(post.likes.length);
const [isLiked,setisLiked] = useState(false);
const [user,setUser] = useState({});
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const {user: currentUser} = useContext(AuthContext);
useEffect(()=>{
    setisLiked(post.likes.includes(currentUser._id))
},[currentUser._id,post.likes])


useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get(`http://localhost:5000/api/users?userId=${post.userId}`)
      setUser(res.data)
      }
      fetchUser();    
  },[post.userId]);

const likeHandler = ()=>{
    try {
        axios.put("http://localhost:5000/api/posts/"+post._id+"/like",{userId: currentUser._id})
    } catch (error) {
        
    }
    setLike(isLiked ? like-1 : like+1)
    setisLiked(!isLiked)
}

  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                  <a href = {`profile/${user.username}`}> 
                <img src={user.profilePicture ? PF + user.profilePicture :  PF+"profile_pic/noprofile.png"} alt="" className="postProfileImg" />
                </a> 
                <span className="postUsername">
                    {user.username}
                </span>
                <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                <MoreVertIcon/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img src={PF+post.img} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick = {likeHandler}/>
                    <img src={`${PF}likes.png`} alt="" className="likeIcon" onClick = {likeHandler}/>
                    <span className="postLikeCounter">{like} people liked</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>

            </div>

        </div>
    </div>
  )
}
