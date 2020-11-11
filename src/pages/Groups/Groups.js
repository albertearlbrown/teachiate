import React, { useEffect, useState } from 'react'
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


const Groups = () => {
  const classes = useStyles();
  const [groups, setGroups] = useState([])
  const [currentPage, setCurrentPage] = useState([])
  const [limit, setLimit] = useState([])
  const [totalElement, setTotalElement] = useState([])
  const [totalPages, setTotalPages] = useState([])
  const [open, setOpen] = useState(false)
    useEffect(() => {
        window.scrollTo(0, 0);
        getGroups(currentPage, limit);
    }, [currentPage, limit]);
    const getGroups = async (page, limit) => {
      setOpen(true)
      axios({
        url: `${baseUrl}/group/list`,
        method: 'get'
      }).then((response)=>{
        debugger
        const { data } = response.data
        setGroups(data.groups)
        setCurrentPage(data.page)
        setLimit(limit)
        setTotalElement(data.totalElement)
        setTotalPages(Math.ceil(data.totalElement/limit))
        setOpen(false)
      }).catch((e)=>{
        console.log(e);
      })
    }

    return (
        <>
          <Backdrop className={classes.backdrop} open={open} >
            <CircularProgress color="inherit" />
            <div className={classes.text}>Loading</div>
          </Backdrop>
            <PageTitle title='Groups'/>
            <section className="inner_content groups people_content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 col-sm-8">
                            <h3 className="main_sec_title">All Groups</h3>
                        </div>
                        <div className="col-md-3 col-sm-4">

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
                    {groups.map((group, index)=>{
                      return(
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="group_des text-center">
                                <img className={classes.cover} src={group.avatar||'assets/img/g1.png'} alt=""/>
                                <h4>{group.groupName}{/*<span>created 2 weeks</span>*/}</h4>
                                <div className="catagory"><a href="/">{group.privacy === 'PUBLIC'? 'Public Group':'Private Group'}</a></div>
                            </div>
                        </div>
                      )
                    })}
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
