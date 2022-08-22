import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Vote from './Vote';
import Comment from './Comment';
import ListComment from './ListComment';
import SocialShare from './SocialShare';
import { useParams } from 'react-router-dom';


function BlogDetail(props) {
    let Auth = localStorage.getItem("Auth")
    let token = localStorage.getItem("token")
    if (Auth && token) {
        Auth = JSON.parse(Auth)
        token = JSON.parse(token)
    }
    const userData = {
        Auth: Auth,
        token: token
    }
    const [blogData, setBlogData] = useState("");
    const [comment, setComment] = useState([]);
    const [idComment, setIdComment] = useState(0);
    let { id } = useParams()
    
    useEffect(() => {
        axios.get("http://localhost:8080/laravel/laravel/public/api/blog/detail/" + id)
        .then( res => {
            setBlogData(res.data.data);
            setComment(res.data.data.comment);
        })
        .catch(error => console.log(error))
    },[id])

    const getIdComment = (idcomment) => {
        setIdComment(idcomment)
    }
    
    const getComment = (cmt) =>{
        let cmtConcat = comment.concat([cmt])
        return setComment(cmtConcat) 
    }

    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                <div className="single-blog-post">
                    <h3>{blogData.title}</h3>
                    <div className="post-meta">
                    <ul>
                        <li><i className="fa fa-user" />{blogData.id_auth}</li>
                        <li><i className="fa fa-clock-o" />{blogData.created_at}</li>
                        <li><i className="fa fa-calendar" />{blogData.created_at}</li>
                    </ul>
                    </div>
                    <a href>
                        <img src="images/blog/blog-one.jpg" alt="" />
                    </a>
                    {blogData.content}
                    <div className="pager-area">
                        <ul className="pager pull-right">
                            <li><a href='true'>Pre</a></li>
                            <li><a href='true'>Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>  
            
            <Vote idBlog={id} userData={userData} />
            <SocialShare/>
            <ListComment userData={userData} comment={comment} getIdComment={getIdComment} />
            <Comment userData={userData} idBlog={id} idComment={idComment} getComment={getComment} />
            
        </div>
    );
}

export default BlogDetail;