import React from 'react';



function ListComment({comment, getIdComment, userData}) {

    const RenderReply = (cmt) => {
        return comment.map((value, index) => {
            if (value.id_comment !== 0 && value.id_comment === cmt.cmt.id ) {
                return (
                    <li className="media second-media" key={index}>
                        <a className="pull-left" href>
                        <img
                            className="media-object" 
                            style={{width: "150px"}} 
                            src={"http://localhost:8080/laravel/laravel/public/upload/user/avatar/" + value.image_user} alt="" 
                        />
                        </a>
                        <div className="media-body">
                        <ul className="sinlge-post-meta">
                            <li><i className="fa fa-user" />{value.name_user}</li>
                            <li><i className="fa fa-clock-o" />{value.created_at}</li>
                            <li><i className="fa fa-calendar" />{value.created_at}</li>
                        </ul>
                        <p>{value.comment}</p>
                        <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                        </div>
                    </li>
                )
            }
        })
    }


    const fetchData = () => {
        if (comment.length > 0) {
            return comment.map((cmt, index) => {
                if (cmt.id_comment === 0) {
                    return (
                        <div key={index}>
                            <li className="media" key={index}>
                                <a className="pull-left" href="true">
                                    <img style={{width: "150px"}} className="media-object" src={"http://localhost:8080/laravel/laravel/public/upload/user/avatar/" + cmt.image_user} alt="" />
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user" />{cmt.name_user}</li>
                                    <li><i className="fa fa-clock-o" />{cmt.created_at}</li>
                                    <li><i className="fa fa-calendar" />{cmt.created_at}</li>
                                    </ul>
                                    <p>{cmt.comment}</p>
                                    <a  href
                                        className="btn btn-primary" 
                                        onClick={()=> {
                                            userData.Auth.id !== cmt.id_user ?
                                            getIdComment(cmt.id) :
                                            alert("Khong the tra loi binh luan cua chinh minh")
                                        }}
                                    >
                                        <i className="fa fa-reply" />
                                        Reply
                                    </a>
                                </div>
                            </li>
                            <RenderReply cmt={cmt} />
                        </div>
                    )
                }
                
                
            })
        }
    }

    return (
        <div className="response-area">
            <h2>{comment.length} RESPONSES</h2>
            <ul className="media-list">
                {fetchData()}
            </ul>					
        </div>
    );
}

export default ListComment;