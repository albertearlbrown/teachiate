import React from 'react'
import { Link } from 'react-router-dom';

const HomeBanner = () => {
    return (
        <>
          <section className="banner" style={{background: `url('assets/img/banner-bg.jpg')`,
            backgroundSize: '100% 100%'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-sm-5 col-sm-push-7 col-xs-12">

                            <img src="/assets/img/index_banner_side_image.png" alt="" className="img-responsive"/>
                        </div>
                        <div className="col-md-7 col-sm-7 col-sm-pull-5 col-xs-12">

                            <div className="banner_caption">
                                <h3>Join Today</h3>
                                <p>Join One of the fastest growing social paltforms for teachers, parents and general educators to connect, engage and share with each other.</p>
                                <Link to='/register' className="btn btn-primary">Register</Link>
                                <a href="#" className="btn btn-info">Log In</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeBanner;