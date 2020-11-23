import React, { useEffect, useContext, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import axios from "axios"
import { configureSocket } from "../../utils/axiosInterceptor"
import { AuthStoreContext } from "../../Store/AuthStore";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const baseUrl = process.env.NODE_ENV === 'development'?"http://localhost:4000":"https://api.teachiate.com"

function MainMenu() {
  const { isAuthenicate, userData } = useContext(AuthStoreContext);
  const [nCount, setNCount] = useState(0)
  const [message, setMessage] = useState(null)
  const [open, setOpen] = React.useState(false);
  useEffect(()=>{
    const getNCount = () => {
      axios({
        url:'/notifications/count',
        method: 'get'
      }).then((resp)=>{
        setNCount(resp.data.count)
      })
    }
    getNCount()
  },[])

  // Add listner to the new notifications
  useEffect(()=>{
    const confSock = async ()=>{
      if (userData?._id) {
        let soc = await configureSocket(baseUrl);
        soc.on("friend-request"+userData._id, data => {
          setNCount(data.count)
          setMessage(data.message)
          setOpen(true)
        })
        soc.on("friend-request-accepted"+userData._id, data=>{
          debugger;
          setNCount(data.count)
          setMessage(data.message)
          setOpen(true)
        })
      }
    }
    confSock()
  },[userData])

    const handleClose = () => {
      setOpen(false);
    };

    const setAllSeen = ()=>{
      setNCount(0)
    }

    return (
        <>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          onClose={handleClose}
          autoHideDuration={5000}
        >
          <Alert onClose={handleClose} severity="info">
            {message}
          </Alert>
        </Snackbar>
           <div className="page-header_main-menu">
                <nav className="nav-primary">
                    <ul className="menu-main-navigation menu clearfix">
                        <li className="menu-item-has-children"><Link to="/">Home</Link></li>
                        <li className="menu-item-has-children"><Link to="/opening-school-in-covid-siutation">School Opening</Link></li>
                        <li className="menu-item-has-children"><Link to="/groups">Groups</Link></li>
                        <li className="menu-item-has-children"><Link to="/people">People</Link></li>
                        <li className="menu-item-has-children"><Link to="/forum">Forum</Link></li>
                        {
                          isAuthenicate &&
                          <li className="menu-item-has-children">
                          <Link to="/notifications">
                            <Badge badgeContent={nCount} color="error" onClick={()=>setAllSeen()}>
                              <NotificationsIcon />
                            </Badge>
                            </Link>
                          </li>
                        }
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default MainMenu;
