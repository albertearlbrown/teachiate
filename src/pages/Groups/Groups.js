import React, { useEffect } from 'react'
import PageTitle from '../../components/PageTitle';

const Groups = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <PageTitle title='Groups'/>
            <section className="inner_content groups people_content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 col-sm-8">
                            <h3 className="main_sec_title">All Groups</h3>
                        </div>
                        <div className="col-md-3 col-sm-4">
                            <div className="short profile_short">
                                <label>Sort by:</label>
                                <select>
                                    <option value="all people" defaultValue>All People</option>
                                    <option value="all people">All People 1</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="search_flex text-center">
                                <input type="search" placeholder="Search" className="form-control"/>
                                <button className="search_btn" type="button"><img src="assets/img/search-icon.png" alt=""/></button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g1.png" alt=""/>
                                <h4>Test group<span>created 2 weeks</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g2.png" alt=""/>
                                <h4>Homeschool Martial Arts<span>created 2 weeks</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g3.png" alt=""/>
                                <h4>Homeschooling gifted children<span>created 4 days ago</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g4.png" alt=""/>
                                <h4>Middle school students<span>created 4 days ago</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g5.png" alt=""/>
                                <h4>Homeschooling gifted children<span>created 2 weeks</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g6.png" alt=""/>
                                <h4>Homeschool Martial Arts<span>created 2 weeks</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g3.png" alt=""/>
                                <h4>Homeschooling gifted children<span>created 4 days ago</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g7.png" alt=""/>
                                <h4>Albert Brown<span>6 hours ago</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g1.png" alt=""/>
                                <h4>Test group<span>created 2 weeks</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g2.png" alt=""/>
                                <h4>Alexa Jennings<span>6 hours ago</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g3.png" alt=""/>
                                <h4>Homeschooling gifted children<span>created 4 days ago</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g4.png" alt=""/>
                                <h4>Middle school students<span>created 4 days ago</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g3.png" alt=""/>
                                <h4>Homeschooling gifted children<span>created 4 days ago</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g7.png" alt=""/>
                                <h4>Isabel Forben<span>6 hours ago</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g1.png" alt=""/>
                                <h4>Test group<span>created 2 weeks</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img src="assets/img/g2.png" alt=""/>
                                <h4>Chuck Henley<span>6 hours ago</span></h4>
                                <div className="catagory"><a href="/">Public Group</a></div>
                            </div>
                        </div>
                    </div>
                    <ul className="pagination clearfix">
                        <li><a href="/">1</a></li>
                        <li><a href="/">2</a></li>
                        <li><a href="/">3</a></li>
                        <li><a href="/">4</a></li>
                    </ul>
                </div>
            </section>            
        </>
    )
};

export default Groups;