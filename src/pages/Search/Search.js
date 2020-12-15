import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import Post from '../Forum/Post';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { AuthStoreContext } from '../../Store/AuthStore';
import { configureSocket } from "../../utils/axiosInterceptor"
import axios from 'axios';

const baseUrl = "https://api.teachiate.com"

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
  cover: {
    width: 73,
    height: 73,
    borderRadius: '50%'
  }
}));

function Search() {
  const { userData } = useContext(AuthStoreContext);
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  const [groups, setGroups] = useState([])
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchValueClone, cloneSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [sort, setSort] = useState('date')
  const [role, setNewRole] = useState('');
  const [socket, setSocket] = useState(null)
  const [friendReq, setFriendReq] = useState(userData?.friendReq)
  const [tag, setTags] = useState('All')
  const [showAllPoeple, setShowAllPeople] = useState(false)
  const [showAllForums, setShowAllForums] = useState(false)
  const [showAllGroups, setShowAllGroups] = useState(false)
  const [showAllBlogs, setShowAllBlogs] = useState(false)

  useEffect(() => {
    const confSock = async () => {
      let soc = await configureSocket(baseUrl)
      setSocket(soc)
      debugger
      if (soc) {
        soc.on("friend-request" + userData?._id, data => {
          console.log(data);
        })
      }
    }
    confSock()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const getUsers = async (page) => {
    setOpen(true)
    axios({
      url: `${baseUrl}/users/all`,
      method: 'get',
      params: { page, sort, role, name: searchValue }
    }).then((response) => {
      const { data } = response.data
      setUsers(data.users)
      setCurrentPage(data.page)
      debugger
      const tt = Math.ceil(data.totalElement / data.limit)
      setTotalPages(tt)
      setOpen(false)
    }).catch((e) => {
      setOpen(false)
      console.log(e)
    })
  }

  const getUserPagination = () => {
    const list = [];
    for (let i = 1; i <= totalPages; i++) {
      list.push(<li className={currentPage === "" + i ? "selected" : ""}><span onClick={() => getUsers(i)}>{i}</span></li>)
    }
    return list
  }

  const getGroups = async (page) => {
    setOpen(true)
    axios({
      url: `${baseUrl}/group/list`,
      method: 'get',
      params: { page, name: searchValue }
    }).then((response) => {
      const { data } = response.data
      setGroups(data.groups)
      const tt = Math.ceil(data.totalElement / data.limit)
      setTotalPages(tt)
      setOpen(false)
    }).catch((e) => {
      setOpen(false)
      console.log(e);
    })
  }

  const getGroupPagination = () => {
    const list = [];
    for (let i = 1; i <= totalPages; i++) {
      list.push(<li><span onClick={() => getGroups(i)}>{i}</span></li>)
    }
    return list;
  }

  const sendInviation = async (receiver) => {
    if (userData?._id && socket) {
      socket.emit('friend-request', { receiver }, ack => {
        console.log(ack);
      });
      const friendReq1 = [...friendReq, { reqId: receiver._id }]
      setFriendReq(friendReq1)
    }
  }

  const getPosts = async () => {
    setOpen(true)
    setPosts([])
    axios({
      type: 'get',
      url: `${baseUrl}/forum`,
      params: {
        category: null, subcategory: null
      }
    }).then((response) => {
      const { data } = response.data;
      setPosts(data.posts)
      setOpen(false)
    }).catch(err => {
      setOpen(false)
      console.log(err)
    })
  }

  const filterSearchResult = () => {
    getPosts(1)
    getGroups(1)
    getUsers(1)
    setShowAllPeople(false)
    setShowAllGroups(false)
    setShowAllForums(false)
    setShowAllBlogs(false)
  }
  return (
    <>
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
        <div className={classes.text}>Loading</div>
      </Backdrop>
      <section className="search_result">
        <div className="container">
          <div className="search_result_info">
            <div className="search_result_details">
              <h2>Search results for</h2>
              <h3>{searchValueClone}</h3>
            </div>
            <div className="search-content">
              <input type="text" placeholder="Search" onChange={e => { cloneSearchValue(''); setSearchValue(e.target.value) }} />
              <input type="submit" value="Search" onClick={() => { cloneSearchValue(searchValue); filterSearchResult() }} />
            </div>
          </div>
          <div className="search_select">
            <ul>
              <li className={tag === 'All' ? "active" : ''}><a onClick={() => setTags('All')}>All</a></li>
              <li className={tag === 'People' ? "active" : ''}><a onClick={() => setTags('People')}>People</a></li>
              <li className={tag === 'Forums' ? "active" : ''}><a onClick={() => setTags('Forums')}>Forums</a></li>
              <li className={tag === 'Groups' ? "active" : ''}><a onClick={() => setTags('Groups')}>Groups</a></li>
              <li className={tag === 'Blogs' ? "active" : ''}><a onClick={() => setTags('Blogs')}>Blogs</a></li>
            </ul>
          </div>
          <div className="search_result_area">
            {(tag === 'All' || tag === 'People') && <div className="search_result_col">
              <div className="rslt_title">People</div>
              <div className="search_result_col_area">
                <ul className="search_col">
                  {users.map((user, index) => {
                    if (!showAllPoeple && index >= 8) { return; }
                    if (userData?._id === user._id) {
                      return;
                    }
                    return (
                      <li>
                        <div className="add_frnd text-center">
                          <img src={user.avatar || "assets/img/m1.png"} alt="" />
                          <h4>{user.fullName}</h4>
                          <div className="catagory">{user.role}</div>
                          {
                            friendReq?.find((a) => a.reqId === user._id)
                              ?
                              <a className="meseage_only">Message</a> :
                              (
                                userData?.friends?.find((a) => a === user._id) ?
                                  <a>Friend</a> :
                                  <a onClick={() => sendInviation(user)}>Add Friend</a>
                              )
                          }
                        </div>
                      </li>
                    )
                  })}

                </ul>
                {
                  showAllPoeple &&
                  <ul className="pagination clearfix">
                    {getUserPagination()}
                  </ul>
                }
                <a onClick={() => setShowAllPeople(true)} className="view_more_search">View All</a>

              </div>
            </div>
            }
            {(tag === 'All' || tag === 'Forums') && <div className="search_result_col">
              <div className="rslt_title">Forums</div>
              <div className="search_result_col_area">
                <ul className="forum_search_col">
                  {
                    posts.map((post, i) => {
                      if (!showAllForums && i >= 2) { return; }

                      return (
                        <Post post={post} key={post._id} />
                      )
                    })
                  }
                </ul>
                {
                  showAllForums &&
                  <ul className="pagination clearfix">
                    {/* {getGroupPagination()} */}
                  </ul>
                }
                <a onClick={() => setShowAllForums(true)} className="view_more_search">View All</a>
              </div>
            </div>
            }
            {(tag === 'All' || tag === 'Groups') && <div className="search_result_col">
              <div className="rslt_title">Groups</div>
              <div className="search_result_col_area">
                <ul className="search_col">
                  {groups.map((group, index) => {
                    if (!showAllGroups && index >= 4) { return; }
                    return (
                      <li>
                        <div className="group_des text-center">
                          <img className={classes.cover} src={group.avatar || 'assets/img/g1.png'} alt="" />
                          <h4>{group.groupName}{/*<span>created 2 weeks</span>*/}</h4>
                          <div className="catagory"><a href="/">{group.privacy === 'PUBLIC' ? 'Public Group' : 'Private Group'}</a></div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
                {
                  showAllGroups &&
                  <ul className="pagination clearfix">
                    {getGroupPagination()}
                  </ul>
                }
                <a onClick={() => setShowAllGroups(true)} className="view_more_search">View All</a>
              </div>
            </div>
            }
            {(tag === 'All' || tag === 'Blogs') && <div className="search_result_col">
              <div className="rslt_title">Blogs</div>
              <div className="search_result_col_area">
                <div className="box_search_slide">
                  <ul className="blog_search_col">

                  </ul>
                </div>

                <a href="#" className="view_more_search">View All</a>
              </div>
            </div>
            }
          </div>
        </div>
      </section>
    </>
  )
}


export default Search