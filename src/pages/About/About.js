import React, { useEffect } from 'react';

import PageTitle from '../../components/PageTitle';

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <PageTitle title='About Us'/>

            {/* <!-- inner people page end end--> */}
            <section className="inner_content about_content">
                <div className="container">
                    <div className="about_inner_des text-center">
                        <p>Society progresses with positive exchange of ideas and when people find each other’s support to learn new things, wonderful things happen. Teachiate.com is conceived with the idea of reducing the gap of social distancing with a digital social space to bring teachers, students and parents closer. It’s a social platform where you can learn, laugh and share freely.</p>
                        <p>The idea came when homeschooling emerged as a byproduct of the COVID-19-inflicted lockdown, which illuminated the angelic contribution of teachers for taking care of our children without ever making us realize the fact.</p>
                        <p>The absence of school-going, gave way to a flood of social media posting of parent-turned-self-appointed teachers, sharing their fondness, struggle, frustration and lack of skills to engage and teach their children.</p>
                        <p>They are seeking guidance but mostly failing to get it from the right corner because there is not a go-to place for getting such directions.</p>
                        <p>Teachiate.com is unique because it’s a one spot for everything kind of platform that not only has its direct newsfeed but also has blog posts and forums to share information and guide parents. It also allows direct sharing/posting from other social networks like Facebook, Instagram and Twitter.</p>
                        <p>But it’s not boring or drab. You will find here lots of interesting conversations, funny moments, advices and tales of surprise frustration, love and gratitude.</p>
                        <p>You too can write blogs, comments in forums and share stories, memes and videos.</p>
                        <p>If you are a teacher or a parent of school going kids, your views matter. Let your inner writer, photographer, comedian, satirist, storyteller, philosopher and educationist express his/her talent.</p>
                        <p>It is a platform that is meant to promote parents-teachers connectivity, exchange of ideas and to guide parents on homeschooling.</p>
                    </div>

                    <ul className="about_us_about">
                        <li>
                            <a href="/">
                                <img src="/assets/img/mission.png" alt=""/>
                                <div className="about_about_title">
                                    <h3>Mission</h3>
                                </div>
                                <p>To be a social source of learning, sharing and exchanging of ideas among teachers and parents for the positive development of school students.</p>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <img src="/assets/img/vission.png" alt=""/>
                                <div className="about_about_title">
                                    <h3>Vision</h3>
                                </div>
                                <p>To globally connect teachers, educationists with each other and with students, parents to make knowledge sharing a personable and pleasant experience.</p>
                            </a>
                        </li>
                    </ul>

                    <ul className="about_us_about1">
                        <li>
                            <a href="/">
                                <img src="assets/img/appriciation.png" alt=""/>
                                <div className="about_about_title">
                                    <h3>Appreciation</h3>
                                </div>
                                <p>For all of their efforts and contribution to our children’s learning, teachers must be acknowledged and appreciated.</p>
                            </a>
                        </li>

                        <li>
                            <a href="/">
                                <img src="assets/img/connectivity.png" alt=""/>
                                <div className="about_about_title">
                                    <h3>Connectivity</h3>
                                </div>
                                <p>We exist to bring connectivity among teachers, parents and society to initiate a greater dialogue and knowledge sharing.</p>
                            </a>
                        </li>

                        <li>
                            <a href="/">
                                <img src="/assets/img/help.png" alt=""/>
                                <div className="about_about_title">
                                    <h3>Help</h3>
                                </div>
                                <p>We aspire to be a helpful platform for people looking for answers to their kids’ educational needs in a not-so-formal way.</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}



export default About;