import React, { useEffect } from 'react'
import PageTitle from '../../components/PageTitle'

const Forum = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
        <>
           <PageTitle title='Forum'/>

            <section class="inner_content forums_inner_page">
                <div class="container">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="search_flex text-center mt_30">
                                <input type="search" placeholder="Search" class="form-control"/>
                                <button class="search_btn" type="submit"><img src="assets/img/search-icon.png" alt=""/></button>
                            </div>
                        </div>
                    </div>
                    <div class="forum clearfix">
                        <div class="forum_left">
                            <div class="left_title">
                                <h2>General Community Chat</h2>
                            </div>
                            <ul class="left_listing">
                                <li>
                                    <div class="catagory_forum"><a href="#">Parents</a></div>
                                    <div class="img_holder"><img src="assets/img/katei-knapp.png" alt=""/></div>
                                    <div class="img_des">
                                        <h4>Chloe Garry<span>General Community Chat</span></h4>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="des_p">
                                        <p>This forum community is an online-based platform for students where they can share their experiences, frustrations, questions, and encouragement to other fellow students.</p>
                                    </div>
                                    <div class="read_more_btn"><a href="#">Read More</a></div>
                                    <div class="month">
                                        <p>1 Month Ago</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="catagory_forum"><a href="#">Students</a></div>
                                    <div class="img_holder"><img src="assets/img/katei-re.png" alt=""/></div>
                                    <div class="img_des">
                                        <h4>Nikhil<span>General Community Chat</span></h4>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="des_p">
                                        <p>The life of a teacher is difficult; it is full of pressure and frustrations. They are unheard, misunderstood, and sometimes even disrespected. Despite all these, their love, passion for teaching, and building a better life for their students keep them invested in the profession. Know more about the difficulties, challenges, and success stories of teachers in this forum.</p>
                                    </div>
                                    <div class="read_more_btn"><a href="#">Read More</a></div>
                                    <div class="month">
                                        <p>1 Month Ago</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="catagory_forum"><a href="#">Teachers</a></div>
                                    <div class="img_holder"><img src="assets/img/katie-kanapp.jpg" alt=""/></div>
                                    <div class="img_des">
                                        <h4>Lauren Zhum<span>General Community Chat</span></h4>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="des_p">
                                        <p>The life of a teacher is difficult; it is full of pressure and frustrations. They are unheard, misunderstood, and sometimes even disrespected. Despite all these, their love, passion for teaching, and building a better life for their students keep them invested in the profession. Know more about the difficulties, challenges, and success stories of teachers in this forum.</p>
                                    </div>
                                    <div class="read_more_btn"><a href="#">Read More</a></div>
                                    <div class="month">
                                        <p>1 Month Ago</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="catagory_forum"><a href="#">Students</a></div>
                                    <div class="img_holder"><img src="assets/img/katei-re.png" alt=""/></div>
                                    <div class="img_des">
                                        <h4>Nikhil<span>General Community Chat</span></h4>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="des_p">
                                        <p>The life of a teacher is difficult; it is full of pressure and frustrations. They are unheard, misunderstood, and sometimes even disrespected. Despite all these, their love, passion for teaching, and building a better life for their students keep them invested in the profession. Know more about the difficulties, challenges, and success stories of teachers in this forum.</p>
                                    </div>
                                    <div class="read_more_btn"><a href="#">Read More</a></div>
                                    <div class="month">
                                        <p>1 Month Ago</p>
                                    </div>
                                </li>
                            </ul>
                            <ul class="pagination clearfix">
                                <li><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                            </ul>
                        </div>
                        <div class="forum_right">
                            <div class="list_chat">
                                <ul>
                                    <li class="active"><a href="#">General Community Chat</a></li>
                                    <li><a href="#">Higher Education Chat</a></li>
                                    <li><a href="#">Parental Connection</a></li>
                                    <li><a href="#">Parents and Teachers Lounge</a></li>
                                    <li><a href="#">Teachers Lounge</a></li>
                                </ul>
                            </div>
                            <div class="Recent_topics_form">
                                <div class="articles_title">
                                    <h2>Recent Posts</h2>
                                </div>
                                <div class="articles recent_post clearfix">
                                    <ul class="tag">
                                        <li><a href="#">
                                                <div class="img_holder"><img src="assets/img/katei-knapp.png" alt=""/></div>
                                                <div class="img_des">
                                                    <h4>Covid Education<span>Parental Connection</span></h4>
                                                </div>
                                                <div class="clearfix"></div>
                                            </a></li>
                                        <li><a href="#">
                                                <div class="img_holder"><img src="assets/img/katie-kanapp.jpg" alt=""/></div>
                                                <div class="img_des">
                                                    <h4>What homeschooling activity do you enjoy?<span>Higher Education Chat</span></h4>
                                                </div>
                                                <div class="clearfix"></div>
                                            </a></li>
                                        <li><a href="#">
                                                <div class="img_holder"><img src="assets/img/katei-re.png" alt=""/></div>
                                                <div class="img_des">
                                                    <h4>Home school meet ups<span>Parents and Teacher lounge</span></h4>
                                                </div>
                                                <div class="clearfix"></div>
                                            </a></li>
                                        <li><a href="#">
                                                <div class="img_holder"><img src="assets/img/katei-girl.png" alt=""/></div>
                                                <div class="img_des">
                                                    <h4>Virtual classroom to replace classroom lecturing in future<span>Higher Education Chat</span></h4>
                                                </div>
                                                <div class="clearfix"></div>
                                            </a></li>
                                        <li><a href="#">
                                                <div class="img_holder"><img src="assets/img/katei-knapp.png" alt=""/></div>
                                                <div class="img_des">
                                                    <h4>Evaluating the efectiveness of distance learning<span>General Community Chat</span></h4>
                                                </div>
                                                <div class="clearfix"></div>
                                            </a></li>

                                    </ul>

                                </div>
                            </div>
                            <div class="Groups">
                                <div class="articles_title">
                                    <h2>Groups</h2>
                                </div>
                                <div class="articles clearfix">
                                    <ul class="tabs">
                                        <li class="active" rel="tab1">Newest</li>
                                        <li rel="tab2">Active</li>
                                        <li rel="tab3">Popular</li>
                                        <li rel="tab4">Alphabetical</li>
                                    </ul>
                                    <div class="tab_container">
                                        <h3 class="d_active tab_drawer_heading" rel="tab1">Newest</h3>
                                        <div id="tab1" class="tab_content">
                                            <div class="row">
                                                <div class="col-md-6 col-sm-12 col-xs-6">
                                                    <div class="boder_box text-center">
                                                        <a href="#">
                                                            <img src="assets/img/t.png" alt=""/>
                                                            <h4>Test group<span>created 2 weeks</span></h4>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-12 col-xs-6">
                                                    <div class="boder_box text-center">
                                                        <a href="#">
                                                            <img src="assets/img/martial-art.png" alt=""/>
                                                            <h4>Homeschool Martial Arts<span>created 1 month ago</span></h4>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-12 col-xs-6">
                                                    <div class="boder_box text-center">
                                                        <a href="#">
                                                            <img src="assets/img/gift-child.png" alt=""/>
                                                            <h4>Homeschooling gifted
                                                                children<span>created 2 weeks, 4 days ago</span></h4>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-12 col-xs-6">
                                                    <div class="boder_box text-center">
                                                        <a href="#">
                                                            <img src="assets/img/student.png" alt=""/>
                                                            <h4>Middle school students<span>created 1 Month ago</span></h4>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- #tab1 --> */}
                                        <h3 class="tab_drawer_heading" rel="tab2">Active</h3>
                                        <div id="tab2" class="tab_content">
                                            <div class="row">
                                                <div class="col-md-6 col-sm-12 col-xs-6">
                                                    <div class="boder_box text-center">
                                                        <a href="#">
                                                            <img src="assets/img/t.png" alt=""/>
                                                            <h4>Test group<span>created 2 weeks</span></h4>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-12 col-xs-6">
                                                    <div class="boder_box text-center">
                                                        <a href="#">
                                                            <img src="assets/img/martial-art.png" alt=""/>
                                                            <h4>Homeschool Martial Arts<span>created 1 month ago</span></h4>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-12 col-xs-6">
                                                    <div class="boder_box text-center">
                                                        <a href="#">
                                                            <img src="assets/img/gift-child.png" alt=""/>
                                                            <h4>Homeschooling gifted
                                                                children<span>created 2 weeks, 4 days ago</span></h4>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-12 col-xs-6">
                                                    <div class="boder_box text-center">
                                                        <a href="#">
                                                            <img src="assets/img/student.png" alt=""/>
                                                            <h4>Middle school students<span>created 1 Month ago</span></h4>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}



export default Forum;