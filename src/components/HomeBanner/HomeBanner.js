import React from 'react'
import { Link } from 'react-router-dom';

const HomeBanner = () => {
    return (
        <>
            <div style={{overflow: 'scroll', height: '200px'}}>
                <div style={{position: 'fixed', top: 0, width: '100%', height: '300px', zIndex: '1000'}}>
                    <section className="banner" style={{background: `url('assets/img/banner-bg.jpg')`,
                    backgroundSize: '100% 100%', height: '400px'}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5 col-sm-5 col-sm-push-7 col-xs-12">

                                    <img src="/assets/img/index_banner_side_image.png" alt="" height='290px'/>
                                </div>
                                <div className="col-md-7 col-sm-7 col-sm-pull-5 col-xs-12">

                                    <div className="banner_caption">
                                        <h3>Join Today</h3>
                                        <p>Join One of the fastest growing social paltforms for teachers, parents and general educators to connect, engage and share with each other.</p>
                                        <Link to='/register' className="btn btn-primary">Register</Link>
                                        <Link to="/login" className="btn btn-info">Log In</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
         </>
    )
}

export default HomeBanner;