import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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


const People = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(()=>{
    getUsers(1)
  },[])

  const getUsers = async (page) => {
    setOpen(true)
    axios({
      url: `${baseUrl}/users/all`,
      method: 'get',
      params:{ page, name: searchValue}
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
                  {users.map((user, index) => {
                    return (
                      <div key={index} className="col-md-3 col-sm-6 col-xs-12">
                          <div className="add_frnd text-center">
                              <img src={user.avatar || "assets/img/m1.png"} alt=""/>
                              <h4>{user.fullName}</h4>
                              <div className="catagory">{user.category}</div>
                              <a href="#">Add Friend</a>
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
