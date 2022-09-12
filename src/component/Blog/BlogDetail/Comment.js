import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

import axios from 'axios';



function Comment({idBlog, getComment, idComment, userData}) {
    const [cmt, setCmt] = useState("");
    
    let url = "http://localhost:8080/laravel/laravel/public/api/blog/comment/" + idBlog;
    let accessToken = userData.token;
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };
    const navigate = useNavigate()

    const handleCmt = (e) => {
        setCmt(e.target.value)
    }

    const handleSubmitCmt = (e) => {
        e.preventDefault()

        let isLogedin = JSON.parse(localStorage.getItem("isLogin")) 
            if (!isLogedin) {
                alert("Please login for comment")
                navigate("/login-register")
            } else {
                if (!(cmt.trim() === "")) {
                    const formData = new FormData ();
                     formData.append('id_blog', idBlog);
                     formData.append('id_user', userData.Auth.id);
                     formData.append('id_comment', idComment);
                     formData.append('comment', cmt.trim());
                     formData.append('image_user', userData.Auth.avatar);
                     formData.append('name_user', userData.Auth.name);
            
                    axios.post(url, formData, config)
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })

                    
                    getComment({
                        id_blog: idBlog,
                        id_user: userData.Auth.id,
                        id_comment: idComment,
                        comment: cmt.trim(),
                        image_user: userData.Auth.avatar,
                        name_user: userData.Auth.name
                    })
                    
                    alert("Binh luan thanh cong")

                } else {
                    alert("chua nhap binh luan")
                }
            }
        }


    return (
            <div className="replay-box">
                    <div className="row">
                        <div className="col-sm-12">
                        <h2>Leave a replay</h2>
                        <div className="text-area">
                            <div className="blank-arrow">
                            <label>{userData.Auth !== null ? userData.Auth.name : "You"}</label>
                            </div>
                            <span>*</span>
                            <form method='post' onSubmit={handleSubmitCmt}>
                                <textarea name="message" rows={11} defaultValue={cmt} onChange={handleCmt} />
                                <button className="btn btn-primary">post comment</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
    );
}

export default Comment;