import React from 'react'
import Moment from 'react-moment';

function DisplayPost({data}) {
    return (
        <> 
            <div className="blog_title"  key={data.id}>
                <div className="title_img"><img src="assets/img/admin-img.png" alt=""/></div>
                <div className="user_des">
                    <h4>{data.fullname} ({data.role})</h4>
                    <p>{data.state} | USA </p>
                </div>
                <div className="time"> <Moment fromNow>{data.created_at}</Moment></div>
            </div>
            
            {data.filepath !== null ? (
                <div className="blog_img_holder1"><img src={data.filepath} alt=""/></div>
            )  : null}

            <div className="blog_des">
                <div className="admin_details">
                    <div className="haeding">
                        <h4>{data.title}</h4>
                    </div>
                </div>
                <p>{data.description}</p>
            </div>


            <div className="opening_flex">
                <div className="locaton">
                    <p>
                        <i className="fa fa-map-marker" aria-hidden="true"></i> 
                            State: <span>{data.state}</span> </p>
                        <p>City: <span>{data.city}</span></p>
                </div>
                <div className="bbc_news">
                    <p><a href={data.source_url}>Source</a></p>
                </div>
            </div>  

            <div className="blog_feedback clearfox">
                <a href="#">
                    <div className="flower"><img src="assets/img/flower.svg" alt=""/><span>{data.total_comments}</span></div>
                </a>
                <a href="#">
                    <div className="love"><img src="assets/img/love.svg" alt=""/><span>{data.total_likes}</span></div>
                </a>
            </div>                                          

            <div className="comm_se">
                <ul>
                    <li><a href="#"> <span>like <i className="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a></li>
                    <li> <a href="#"> <span>Comment <i className="fa fa-comment-o" aria-hidden="true"></i></span></a></li>
                    <li> <a href="#"> <span>Share <i className="fa fa-share" aria-hidden="true"></i>
                            </span></a></li>
                    <li> <a href="#"> <span>Report <i className="fa fa-exclamation-triangle" aria-hidden="true"></i></span></a></li>
                </ul>
            </div>

         
        </>
    )
}

export default DisplayPost;