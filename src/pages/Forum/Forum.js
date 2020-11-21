import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Post from './Post';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const baseUrl = process.env.NODE_ENV === 'development'?"http://localhost:4000":"https://teachiate-backend.fnmotivations.com/"

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  text: {
    top: "50px",
    position: "relative",
    left: "-50px"
  },
  cover:{
    width: 73,
    height: 73,
    borderRadius: '50%'
  }
}));

function Forum() {
  const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [load, setLoad] = useState(false);
    const [trendingTopic, setTrendingTopic] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [open, setOpen] = useState(false)
    const [categorySelected, setSelectCategory] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null)
    const [selectedSubCat, setSelectedSubCat] = useState(null)

    useEffect(() => {
        fetchPosts();
    },[selectedCat, selectedSubCat]);

    async function fetchPosts() {
       setOpen(true)
       setPosts([])
       axios({
         type: 'get',
         url: `${baseUrl}/forum`,
         params: {
           category: selectedCat,subcategory: selectedSubCat
         }
       }).then((response)=>{
         const { data } = response.data;
         setPosts(data.posts)
         setOpen(false)
       }).catch(err=>{
         setOpen(false)
         console.log(err)
       })
    }


    const searchHandler = (e) => {
        e.preventDefault();
        alert('Search...');
    }

    const setSelectCat = (cat) =>{
      setSelectedCat(cat)
      setSelectedSubCat(null)
    }

    return (
        <>
           <PageTitle title='Forum'/>
           <Backdrop className={classes.backdrop} open={open} >
             <CircularProgress color="inherit" />
             <div className={classes.text}>Loading</div>
           </Backdrop>
            <section className="inner_content forums_inner_page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <form onSubmit={searchHandler}>
                                <div className="search_flex text-center">
                                    <input type="search" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="form-control"/>
                                    <button className="search_btn" type="submit"><img src="assets/img/search-icon.png" alt=""/></button>
                                </div>
                             </form>
                        </div>
                    </div>


                    <Link to="/forum-create-post" className='btn btn-primary create_blog_btn create_forum_btn'>
                        <span>Post Your Forum Topic</span>
                    </Link>

                    <div className="trend_topics">
                    <h2>Trending Topics</h2>
                        <ul>
                            <li><a href="#">#<span  onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Youth Process</span></a></li>
                            <li><a href="#">#<span onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Motivation for Kids</span></a></li>
                            <li><a href="#">#<span onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Teacher Appreciation</span></a></li>
                            <li><a href="#">#<span onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Teachers</span></a></li>
                            <li><a href="#">#<span  onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Parents</span></a></li>
                            <li><a href="#">#<span onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Options for College and Beyond</span></a></li>
                            <li><a href="#">#<span onClick={(e) => setTrendingTopic(e.target.textContent.toLowerCase())}>Teachers</span></a></li>
                        </ul>
                    </div>

                    <div className="forum clearfix">
                        <div className="forum_left">
                            <ul className="left_listing">
                                {
                                  posts.map((post, i)=>{
                                    return(
                                      <Post post={post} key={post._id}/>
                                    )
                                  })
                                }
                            </ul>
                        </div>

                        <div className="forum_right">
                            <div className="list_chat">
                              <div className="accordion2">
                                <h3 className={`${!selectedCat ?'active':''} `}
                                 onClick={()=>{setSelectCat(null); setSelectedSubCat(null)}}>All</h3>
                                  <h3 className={`${selectedCat === 'General Community Chat' ?'active':''} `}
                                   onClick={()=>setSelectCat('General Community Chat')}>General Community Chat</h3>
                                  <div className="aaa" style={{display: selectedCat === 'General Community Chat'?'block': 'none'}}>
                                      <ul>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Parent")}>Parents</li>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Student")}>Students</li>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Teacher")}>Teachers</li>
                                      </ul>
                                  </div>
                                  <h3 className={`${selectedCat === 'Higher Education Chat' ?'active':''} `}
                                    onClick={()=>setSelectCat('Higher Education Chat')}>Higher Education Chat</h3>
                                  <div className="aaa" style={{display: selectedCat === 'Higher Education Chat'?'block': 'none'}}>
                                      <ul>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Youth Progress")}>Youth Progress</li>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Motivation for Kids")}>Motivation for Kids</li>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Options for College and Beyond")}>Options for College and Beyond</li>
                                      </ul>
                                  </div>
                                  <h3 className={`${selectedCat === 'Parental Connection' ?'active':''} `}
                                   onClick={()=>setSelectCat('Parental Connection')}>Parental Connection</h3>
                                  <div className="aaa" style={{display: selectedCat === 'Parental Connection'?'block': 'none'}}>
                                      <ul>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Home-schooling ideas for parents")}>Home-schooling ideas for parents</li>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Teacher Appreciation")}>Teacher Appreciation</li>
                                      </ul>
                                  </div>
                                  <h3 className={`${selectedCat === 'Parents and Teachers Lounge' ?'active':''} `}
                                   onClick={()=>setSelectCat('Parents and Teachers Lounge')}>Parents and Teachers Lounge</h3>
                                  <div className="aaa"  style={{display: selectedCat === 'Parents and Teachers Lounge'?'block': 'none'}}>
                                      <ul>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Social and Racial Injustice Forum")}>Social and Racial Injustice Forum</li>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Issues Caused During COVID-19")}>Issues Caused During COVID-19</li>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Relaxation and Meditation")}>Relaxation and Meditation</li>
                                      </ul>
                                  </div>
                                  <h3 className={`${selectedCat === 'Teachers' ?'active':''} `}
                                   onClick={()=>setSelectCat('Teachers')}>Teachers</h3>
                                  <div className="aaa" style={{display: selectedCat === 'Teachers'?'block': 'none'}}>
                                      <ul>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Distant Teaching")}>Distant Teaching</li>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Supplies for Teaching")}>Supplies for Teaching</li>
                                          <li className="subcategorie" onClick={()=>setSelectedSubCat("Teacher Venting Forum")}>Teacher Venting Forum</li>
                                      </ul>
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
