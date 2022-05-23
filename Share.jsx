import React, { useContext, useRef, useState } from 'react'
import './share.css';
import CancelIcon from '@mui/icons-material/Cancel';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import {AuthContext} from "../../context/AuthContext"
import axios from 'axios';



export default function Share() {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file,setFile] = useState(null)
    //
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
        };
        if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newPost.img = fileName;
          console.log(newPost);
          try {
            await axios.post("http://localhost:5000/api/upload", data);
          } catch (err) {}
        }
        try {
          await axios.post("http://localhost:5000/api/posts", newPost);
          window.location.reload();
        } catch (err) {}
      };



    //
  
  
  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={user.profilePicture ? PF+ user.profilePicture : PF+"profile_pic/noprofile.png"} alt="" className="shareProfileImg" />
                <input placeholder="Whats in your mind" className="shareInput" ref={desc}/>
            </div>
            <hr className="shareHr" />
            {file &&  (
              <div className="shareImageContainer">
                <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                <CancelIcon className="shareCancelImg" onClick={()=>setFile(null)}/>
              </div>
            )}

            <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            
            <div className="shareOption">
              <RoomIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="skyblue" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>

        </div>
    </div>
  )
}
