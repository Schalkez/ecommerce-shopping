import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Blog(props) {
    const [blogData, setBlogData] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/laravel/laravel/public/api/blog")
        .then( res => setBlogData(res.data.blog.data))
        .catch(error => alert(error))
    },[])



    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
        
                {(blogData.length > 0) && 
                    blogData.map((post) => {
                        return (
                            <div className="single-blog-post" key={post.id}>
                                <h3>{post.title}</h3>
                                <div className="post-meta">
                                <ul>
                                    <li><i className="fa fa-user" />{post.id_auth}</li>
                                    <li><i className="fa fa-clock-o" />{post.created_at.substring(11,16)}</li>
                                    <li><i className="fa fa-calendar" />{post.created_at.substring(0,10)}</li>
                                </ul>
                                <span>
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half-o" />
                                </span>
                                </div>
                                <a href>
                                <img src={"http://localhost:8080/laravel/laravel/public/upload/Blog/image/" + post.image} alt="" />
                                </a>
                                <p>{post.description}</p>
                                <Link className="btn btn-primary" to={"/blog/detail/" + post.id}>Read More</Link>
                            </div>
                        )
                    })
                }
                <div className="pagination-area">
                    <ul className="pagination">
                    <li><a href className="active">1</a></li>
                    <li><a href>2</a></li>
                    <li><a href>3</a></li>
                    <li><a href><i className="fa fa-angle-double-right" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Blog;