import React from 'react'

// css files from/for the landing page
import "./all.min.css"
import "./main.css"
// import "./bootstrap.min.css"
import "./normalize.css"

const LandingPage = () => {
    return(
        <React.Fragment>
            <header className="header-part">
                <div className="t-img">
                    <img src="img/T%20logo%202.png" alt="none" className="img-fluid" />
                </div>
                <div className="container-fluid">
                    <div className="content-box">
                        <div className="left-box">
                            <a href="#" className="navbar-brand"><img src="img/logo.png" alt="none" className="img-fluid" /></a>
                            <h2>Be a part of an 'innovative Social Network' that brings Teachers, Parents and General Educators on a single platform.</h2>
                        </div>

                        <div className="img-box ">
                            <img src="img/Group%20120.png" alt="none" className="img-fluid img1" />
                        </div>
                    </div>
                </div>
                <div className="blank-box"></div>
            </header>


            <div className="join_now-part join_now-part1">
                <div className="container-fluid">
                    <div className="content-box">
                        <h2>Join Now</h2>
                        <p className='h5'>Enter your name and email address to get an exclusive invitation to register to this social network platform</p>
                        <div className="form-box">
                            <form>
                                <div className="w-25">
                                    <input type="text" name="name" placeholder="Full name" required />
                                </div>
                                <div className="w-25">
                                    <input type="email" name="email" placeholder="Email address" required />
                                </div>
                                <div className="">
                                    <button className="cust-btn">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <section className="being-part">
                <div className="container-fluid">
                    <div className="content-box">
                        <h4>Be being a part of this platform, you can connect with others who share related interests and face similar life situations.</h4>
                        <div className="row">
                            <div className="col-lg-7 col-md-6">
                                <div className="box">
                                    <p>Join the one-of-its-kind academic social platform and share ideas, discuss issues and learn about the latest developments around the world in a friendly, informal setting.</p>
                                    <p>Education has been evolving exponentially over the past few years and this change is not going to stop. Technology, increasing diversity and the current pandemic has transformed the landscape of education. The needs and expectations of today's children have changed dramatically.</p>
                                </div>


                            </div>
                            <div className="col-lg-5 col-md-6">
                                <div className="img-box">
                                    <img src="img/adam-winger-UFG04g43hqs-unsplash.png" alt="none" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="help-part">
                <div className="container-fluid">
                    <div className="content-box">
                        <div className="row">
                            <div className="col-lg-10">
                                <h3>How will it help you?</h3>
                                <h5>Teachers and Educators</h5>
                                <label><i className="fas fa-check-circle"></i><span>Exchange teachingaids, materials and ideas to enhance the learning and education developments of your children</span></label>
                                <label><i className="fas fa-check-circle"></i><span>Take part in forums and have engaging discussions, and dialogues on thought-provoking and stimulating subjects.</span></label>
                                <label><i className="fas fa-check-circle"></i><span>Connect with people globally or join specific group within your city or state.</span></label>
                                <label><i className="fas fa-check-circle"></i><span>Get access to the latest trends, advances and happenings on the educational fornt so you are in tune with the most recent developments happening around the world.</span></label>
                                <label><i className="fas fa-check-circle"></i><span>Build connections with other teachers, students and parents to be able to support each other in a relaxed and comfortable setting.</span></label>

                                <h5>For Parents</h5>

                                <label><i className="fas fa-check-circle"></i><span>Share ideas, developments and content with other teachers, parents, students and educators in a fun, informal setting. </span></label>
                                <label><i className="fas fa-check-circle"></i><span>Get in touch with like-minded people having the same challenges, life experiences and issues; and identify ways to deal with problem affecting your children and their development.</span></label>
                                <label><i className="fas fa-check-circle"></i><span>Get updates on COVID-19 and how it is affecting educational institutions around the world and in your state and town.</span></label>
                                <label><i className="fas fa-check-circle"></i><span>Promote your business ideas, ventures, products and services through the platform.</span> </label>


                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className="join_now-part join_now-part2">
                <div className="container-fluid">
                    <div className="content-box">
                        <h2>Join Now</h2>
                        <p className='h5'>Enter your name and email address to get an exclusive invitation to register to this social network platform</p>
                        <div className="form-box">
                            <form>
                                <div className="w-25">
                                    <input type="text" name="name" placeholder="Full name" required />
                                </div>
                                <div className="w-25">
                                    <input type="email" name="email" placeholder="Email address" required />
                                </div>
                                <div className="">
                                    <button className="cust-btn">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer-part">
                <div className="container-fluid">
                    <div className="content-box">
                        <p>Connect with us</p>
                        <div className="icon-box">
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-facebook-square"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default LandingPage