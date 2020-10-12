import React, {useEffect} from 'react'

function Search() {
    useEffect(() => {

    }, []);
    
    return (
        <>
        <section className="search_result">
            <div className="container">
                <div className="search_result_info">
                    <div className="search_result_details">
                        <h2>Search results for</h2>
                        <h3>Antoine Jackson</h3>
                    </div>                    
                    <div className="search-content">
                        <input type="text" placeholder="Search"/>
                        <input type="submit" value="Search"/>
                    </div>
                </div>
                <div className="search_select">
                    <ul>
                        <li className="active"><a href="#">All</a></li>
                        <li><a href="#">People</a></li>
                        <li><a href="#">Forums</a></li>
                        <li><a href="#">Groups</a></li>
                        <li><a href="#">Blogs</a></li>
                    </ul>
                </div>
                <div className="search_result_area">
                    <div className="search_result_col">
                        <div className="rslt_title">People</div>
                        <div className="search_result_col_area">
                            <ul className="search_col">
                                <li>
                                     <div className="add_frnd text-center">
                                        <img src="/assets/img/m1.png" alt=""/>
                                        <h4>Albert Brown</h4>
                                        <div className="catagory">Parent<span>6 hours ago</span></div>
                                        <a href="#" className="meseage_only">Message</a>
                                    </div>
                                </li>
                                <li>
                                     <div className="add_frnd text-center">
                                        <img src="/assets/img/m1.png" alt=""/>
                                        <h4>Albert Brown</h4>
                                        <div className="catagory">Parent<span>6 hours ago</span></div>
                                        <a href="#" className="meseage_only">Message</a>
                                    </div>
                                </li>
                                <li>
                                     <div className="add_frnd text-center">
                                        <img src="/assets/img/m2.png" alt=""/>
                                        <h4>Albert Brown</h4>
                                        <div className="catagory">Parent<span>6 hours ago</span></div>
                                        <a href="#">Add Friend</a>
                                    </div>
                                </li>
                                <li>
                                     <div className="add_frnd text-center">
                                        <img src="/assets/img/m3.png" alt=""/>
                                        <h4>Albert Brown</h4>
                                        <div className="catagory">Parent<span>6 hours ago</span></div>
                                        <a href="#">Add Friend</a>
                                    </div>
                                </li>
                                <li>
                                     <div className="add_frnd text-center">
                                        <img src="/assets/img/m15.png" alt=""/>
                                        <h4>Albert Brown</h4>
                                        <div className="catagory">Parent<span>6 hours ago</span></div>
                                        <a href="#">Add Friend</a>
                                    </div>
                                </li>
                                <li>
                                     <div className="add_frnd text-center">
                                        <img src="/assets/img/m5.png" alt=""/>
                                        <h4>Albert Brown</h4>
                                        <div className="catagory">Parent<span>6 hours ago</span></div>
                                        <a href="#">Add Friend</a>
                                    </div>
                                </li>
                                <li>
                                     <div className="add_frnd text-center">
                                        <img src="/assets/img/m6.png" alt=""/>
                                        <h4>Albert Brown</h4>
                                        <div className="catagory">Parent<span>6 hours ago</span></div>
                                        <a href="#">Add Friend</a>
                                    </div>
                                </li>
                                <li>
                                     <div className="add_frnd text-center">
                                        <img src="/assets/img/m7.png" alt=""/>
                                        <h4>Albert Brown</h4>
                                        <div className="catagory">Parent<span>6 hours ago</span></div>
                                        <a href="#">Add Friend</a>
                                    </div>
                                </li>
                            </ul>
                            <a href="#" className="view_more_search">View All</a>
                            
                        </div>
                    </div>
                    <div className="search_result_col">
                        <div className="rslt_title">Forums</div>
                        <div className="search_result_col_area">
                            <ul className="forum_search_col">
                                <li>
                                    <div className="forum_search_item">
                                        <div className="forum_user_info">
                                            <div className="forum_col_avatar"><img src="/assets/img/forum_col_avatar_1.png" alt=""/></div>
                                            <div className="forum_avtar_info">
                                                <h2>Antoine Jackson<span>(Teacher)</span></h2>
                                                <h3>Higher Education Chat</h3>
                                            </div>
                                            <div className="forum_col_content">
                                                <a href="#" className="forum_title">This forum community is created to assist and encourage each parent as they pursue..</a>
                                                <p className="more">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions</p>
                                                <a href="#">#Youth Progress</a>
                                                <div className="comment_num">2 Comments</div>
                                                <div className="post_time">1 Month Ago</div>
                                            </div>
                                        </div>
                                        <div className="comm_se">
                                            <ul>
                                                <li><a href="#"> <span>like <i className="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a></li>
                                                <li id="commentpost">
                                                    <span>Comment <i className="fa fa-comment-o" aria-hidden="true"></i></span>
                                                </li>
                                                <li><span>Share <i className="fa fa-share" aria-hidden="true"> 
                                                    </i></span>
                                                    <div className="share_post_via">
                                                        <ul>
                                                            <li><a href="#"><span><i className="fa fa-facebook-square"></i></span>Facebook</a></li>
                                                            <li><a href="#"><span><i className="fa fa-twitter"></i></span>Twitter</a></li>
                                                            <li><a href="#"><span><i className="fa fa-instagram"></i></span>Instagram</a></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <div className="commentpost_open">
                                                        <div className="blog_title margin_btm">
                                                            <div className="title_img"><img src="/assets/img/katei-re.png" alt=""/></div>
                                                            <div className="user_des">
                                                                <h4>Katie Knapp <span>(Parent)</span></h4>
                                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution. </p>
                                                                <div className="replaied">
                                                                    <div className="hour">12 Hours ago</div>
                                                                    <a href="#">Reply</a>
                                                                    <div>Replied</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="blog_title margin_right">
                                                            <div className="title_img"><img src="/assets/img/katei-girl.png" alt=""/></div>
                                                            <div className="user_des">
                                                                <h4>Katie Knapp <span>(Parent)</span></h4>
                                                                <p>Readable content of a page when looking at its layout. The point of using Lorem .</p>
                                                                <div className="replaied">
                                                                    <div className="hour">12 Hours ago</div>
                                                                    <a href="#">Reply</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="post_share single_post_comment">
                                                                <div className="post_share_area">
                                                                    <div className="posted_avtar"><img src="/assets/img/g4.png" alt=""/></div>
                                                                    <div className="post_share_field">
                                                                        <textarea placeholder="Sarah What’s are your mind?"></textarea>
                                                                        <div className="share_option_right">
                                                                            <input type="submit" value="Submit" name=""/>
                                                                        </div>
                                                                    </div>
                                                                </div>                  
                                                        </div>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="forum_search_item">
                                        <div className="forum_user_info">
                                            <div className="forum_col_avatar"><img src="/assets/img/forum_col_avatar_1.png" alt=""/></div>
                                            <div className="forum_avtar_info">
                                                <h2>Antoine Jackson<span>(Teacher)</span></h2>
                                                <h3>Higher Education Chat</h3>
                                            </div>
                                            <div className="forum_col_content">
                                                <a href="#" className="forum_title">This forum community is created to assist and encourage each parent as they pursue..</a>
                                                
                                                <p className="more">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions</p>
                                                <a href="#">#Youth Progress</a>
                                                <div className="comment_num">2 Comments</div>
                                                <div className="post_time">1 Month Ago</div>
                                            </div>
                                        </div>
                                        <div className="comm_se">
                                            <ul>
                                                <li><a href="#"> <span>like <i className="fa fa-thumbs-o-up" aria-hidden="true"></i></span></a></li>
                                                <li id="commentpost">
                                                    <span>Comment <i className="fa fa-comment-o" aria-hidden="true"></i></span>
                                                </li>
                                                <li><span>Share <i className="fa fa-share" aria-hidden="true"> 
                                                    </i></span>
                                                    <div className="share_post_via">
                                                        <ul>
                                                            <li><a href="#"><span><i className="fa fa-facebook-square"></i></span>Facebook</a></li>
                                                            <li><a href="#"><span><i className="fa fa-twitter"></i></span>Twitter</a></li>
                                                            <li><a href="#"><span><i className="fa fa-instagram"></i></span>Instagram</a></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <div className="commentpost_open">
                                                        <div className="blog_title margin_btm">
                                                            <div className="title_img"><img src="/assets/img/katei-re.png" alt=""/></div>
                                                            <div className="user_des">
                                                                <h4>Katie Knapp <span>(Parent)</span></h4>
                                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution. </p>
                                                                <div className="replaied">
                                                                    <div className="hour">12 Hours ago</div>
                                                                    <a href="#">Reply</a>
                                                                    <div>Replied</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="blog_title margin_right">
                                                            <div className="title_img"><img src="/assets/img/katei-girl.png" alt=""/></div>
                                                            <div className="user_des">
                                                                <h4>Katie Knapp <span>(Parent)</span></h4>
                                                                <p>Readable content of a page when looking at its layout. The point of using Lorem .</p>
                                                                <div className="replaied">
                                                                    <div className="hour">12 Hours ago</div>
                                                                    <a href="#">Reply</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="post_share single_post_comment">
                                                                <div className="post_share_area">
                                                                    <div className="posted_avtar"><img src="/assets/img/g4.png" alt=""/></div>
                                                                    <div className="post_share_field">
                                                                        <textarea placeholder="Sarah What’s are your mind?"></textarea>
                                                                        <div className="share_option_right">
                                                                            <input type="submit" value="Submit" name=""/>
                                                                        </div>
                                                                    </div>
                                                                </div>                  
                                                        </div>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <a href="#" className="view_more_search">View All</a>                            
                        </div>
                    </div>
                    <div className="search_result_col">
                        <div className="rslt_title">Groups</div>
                        <div className="search_result_col_area">
                            <ul className="search_col">
                                <li>
                                    <div className="group_des text-center">
                                        <img src="/assets/img/g1.png" alt=""/>
                                        <h4>Test group</h4>
                                        <div className="catagory"><a href="#">Public Group<span>created 2 weeks</span></a></div>
                                    </div>
                                </li>
                                <li>
                                    <div className="group_des text-center">
                                        <img src="/assets/img/g2.png" alt=""/>
                                        <h4>Test group</h4>
                                        <div className="catagory"><a href="#">Public Group<span>created 2 weeks</span></a></div>
                                    </div>
                                </li>
                                <li>
                                    <div className="group_des text-center">
                                        <img src="/assets/img/g3.png" alt=""/>
                                        <h4>Test group</h4>
                                        <div className="catagory"><a href="#">Public Group<span>created 2 weeks</span></a></div>
                                    </div>
                                </li>
                                <li>
                                    <div className="group_des text-center">
                                        <img src="/assets/img/g4.png" alt=""/>
                                        <h4>Test group</h4>
                                        <div className="catagory"><a href="#">Public Group<span>created 2 weeks</span></a></div>
                                    </div>
                                </li>
                            </ul>
                            <a href="#" className="view_more_search">View All</a>                            
                        </div>
                    </div>
                    <div className="search_result_col">
                        <div className="rslt_title">Blogs</div>
                        <div className="search_result_col_area">
                            <div className="box_search_slide">
                                <ul className="blog_search_col">
                                    <li>
                                        <div className="blog_search_item">
                                            <div className="blog_img_sec"><img src="/assets/img/blog2.jpg" alt=""/></div>
                                            <div className="list_flex">
                                                <div className="name">
                                                    <p>Rita Koroso</p>
                                                </div>
                                                <div className="comment_time">
                                                    <p>No Comments | May 11, 2020</p>
                                                </div>
                                            </div>
                                            <div className="blog_title_h4">
                                                <a href="#"><h3>Teachers, like myself, getting used to virtual teaching</h3></a>
                                            </div>
                                            <div className="blog_des_p">
                                                <p>My Experience with my kids during COVID Homeschooling I am a single mother and have </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="blog_search_item">
                                            <div className="blog_img_sec"><img src="/assets/img/blog1.jpg" alt=""/></div>
                                            <div className="list_flex">
                                                <div className="name">
                                                    <p>Rita Koroso</p>
                                                </div>
                                                <div className="comment_time">
                                                    <p>No Comments | May 11, 2020</p>
                                                </div>
                                            </div>
                                            <div className="blog_title_h4">
                                                <a href="#"><h3>Teachers, like myself, getting used to virtual teaching</h3></a>
                                            </div>
                                            <div className="blog_des_p">
                                                <p>My Experience with my kids during COVID Homeschooling I am a single mother and have </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="blog_search_item">
                                            <div className="blog_img_sec"><img src="/assets/img/blog1.jpg" alt=""/></div>
                                            <div className="list_flex">
                                                <div className="name">
                                                    <p>Rita Koroso</p>
                                                </div>
                                                <div className="comment_time">
                                                    <p>No Comments | May 11, 2020</p>
                                                </div>
                                            </div>
                                            <div className="blog_title_h4">
                                                <a href="#"><h3>Teachers, like myself, getting used to virtual teaching</h3></a>
                                                
                                            </div>
                                            <div className="blog_des_p">
                                                <p>My Experience with my kids during COVID Homeschooling I am a single mother and have </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            <a href="#" className="view_more_search">View All</a>                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )    
}


export default Search