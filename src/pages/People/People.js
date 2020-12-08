import React, { useEffect, useState, useContext } from 'react';
import PageTitle from '../../components/PageTitle';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { AuthStoreContext } from '../../Store/AuthStore';
import { configureSocket } from "../../utils/axiosInterceptor"
import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development'?"http://localhost:4000":"https://api.teachiate.com"

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


const People = () => {
  const { userData } = useContext(AuthStoreContext);
  const classes = useStyles();
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [sort, setSort] = useState('date')
  const [role, setNewRole] = useState('');
  const [socket, setSocket] = useState(null)
  const [friendReq, setFriendReq] = useState(userData?.friendReq)

  useEffect(()=>{
    getUsers(1)
  },[])

  useEffect(()=>{
    getUsers(1)
  },[sort, role])

  useEffect(()=>{
    const confSock = async ()=>{
      let soc = await configureSocket(baseUrl);
      setSocket(soc)
      if (soc) {
        soc.on("friend-request"+userData?._id, data => {
          console.log(data);
        })
      }
    }
    confSock()
  },[])

  const getUsers = async (page) => {
    setOpen(true)
    axios({
      url: `/users/all`,
      method: 'get',
      params:{ page, sort,role, name: searchValue}
    }).then((response)=>{
      const { data } = response.data
      setUsers(data.users)
      setCurrentPage(data.page)
      const tt = Math.ceil(data.totalElement / data.limit)
      setTotalPages(tt)
      setOpen(false)
    }).catch((e)=>{
      setOpen(false)
      console.log(e);
    })
  }

  const getPagination = () => {
    const list = [];
    for (let i = 1; i <= totalPages; i++) {
      list.push(<li className={currentPage === ""+i?"selected":""}><span onClick={()=>getUsers(i)}>{i}</span></li>)
    }
    return list;
  }

  const setRole = e => {
    if (e === role) {
      setNewRole(null)
    }else{
      setNewRole(e)
    }
  }

  const sendInviation = async (receiver)=>{
    if (userData?._id && socket) {
      socket.emit('friend-request', {receiver}, ack => {
          console.log(ack);
        });
        const friendReq1 = [...friendReq, {reqId: receiver._id}]
        setFriendReq(friendReq1)
    }
  }

  return (
      <>
        <Backdrop className={classes.backdrop} open={open} >
          <CircularProgress color="inherit" />
          <div className={classes.text}>Loading</div>
        </Backdrop>
        <PageTitle title='Teachiate Members'/>
        <section className="inner_content people_content">
            <div className="container">
                <div className="row">
                    <div className="col-md-9 col-sm-8">
                        <h3 className="main_sec_title">All Members</h3>
                    </div>
                    <div className="col-md-3 col-sm-4">
                    <div className="short profile_short">
                      <label>Sort by:</label>
                      <div className="select">
                        <select name="slct" id="slct" value={sort} onChange={e=>setSort(e.target.value)}>
                          <option value={"date"}>Date</option>
                          <option value={"fullName"}>Name</option>
                          <option value={"location"}>Location</option>
                          <option value={"organisation"}>Organisation</option>
                          <option value={"role"}>User Type</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="search_flex text-center">
                            <input onChange={e=>setSearchValue(e.target.value)} type="search" placeholder="Search" className="form-control"/>
                            <button onClick={()=>getUsers(1)} className="search_btn" type="button">
                                <img src="assets/img/search-icon.png" alt=""/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                  <div className="register_field_col">
                      <p>Type of User</p>
                      <div  className="choose_field">
                      <p>
                          <input type="checkbox" id="test1" checked={role === 'Parent'} name="radio-group" value="Parent" onChange={(e) => setRole(e.target.value)}/>
                          <label htmlFor="test1">Parent</label>
                      </p>
                      <p>
                          <input type="checkbox" id="test2" checked={role === 'Teacher'} name="radio-group" value="Teacher" onChange={(e) => setRole(e.target.value)}/>
                          <label htmlFor="test2">Teacher</label>
                      </p>
                      <p>
                          <input type="checkbox" id="test3" checked={role === 'Student'} name="radio-group" value="Student" onChange={(e) => setRole(e.target.value)}/>
                          <label htmlFor="test3">Student</label>
                      </p>
                      <p>
                          <input type="checkbox" id="test4" checked={role === 'General Education'} name="radio-group" value="General Education" onChange={(e) => setRole(e.target.value)}/>
                          <label htmlFor="test4">General Educator</label>
                      </p>
                      <p>
                          <input type="checkbox" id="test5" checked={role === 'Admin'} name="radio-group" value="Admin" onChange={(e) => setRole(e.target.value)}/>
                          <label htmlFor="test5">Admin</label>
                      </p>
                      </div>
                  </div>
                </div>
                <div className="row">
                  {users.map((user, index) => {
                    if (userData?._id === user._id) {
                      return;
                    }
                    return (
                      <div key={index} className="col-md-3 col-sm-6 col-xs-12">
                          <div className="add_frnd text-center">
                              <img src={user.avatar || "assets/img/m1.png"} alt=""/>
                              <h4>{user.fullName}</h4>
                              <div className="catagory">{user.role}</div>
                              {
                                friendReq?.find((a)=>a.reqId === user._id)
                                 ?
                                <a>Sent</a>:
                                (
                                  userData?.friends?.find((a)=>a === user._id)?
                                  <a>Friend</a>:
                                  <a onClick={()=>sendInviation(user)}>Add Friend</a>
                                )
                              }
                          </div>
                      </div>
                    )
                  })}

                </div>
                <ul className="pagination clearfix">
                    {getPagination()}
                </ul>
            </div>
        </section>
      </>
    )
};

export default People;
