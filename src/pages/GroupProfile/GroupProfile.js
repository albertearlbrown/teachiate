import React, { useEffect, useState } from "react";
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import GroupDescription from "./description";
import NavBar from './navbar';
import ProfileComponent from './Profil';
import { useSelector, useDispatch } from "react-redux";
import groupActions from '../../redux/groups/actions'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const GroupProfile = (props) => {
  const classes = useStyles()
  const groupId = props.match?.params?.id
  const groups = useSelector((state)=> state.groups)
  const dispatch = useDispatch();
  const [openNotification, setOpenNotification] = useState(false)

  useEffect(() => {
    dispatch({
      type: groupActions.LOAD_GROUP,
      payload: {id: groupId }
    })
  },[])

  useEffect(()=>{
    if (groups.openNotification) {
      setTimeout(()=>{
        setOpenNotification(false)
        setOpenNotification(groups.openNotification)
        dispatch({
          type: groupActions.SET_STATE,
          payload: {openNotification: false}
        })
      }, 2000)
    }
  },[ groups.openNotification ])

  if (!groups.group._id) {
    return(
      <Backdrop open={true} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }
  return (
    <div className="profile_view gorup_members_view">
      <Backdrop open={groups.loading} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openNotification}
        onClose={()=>setOpenNotification(false)}
        autoHideDuration={2000}
      >
        <Alert severity={groups.notificationType}>
          {groups.notificationMessage}
        </Alert>
      </Snackbar>
      <GroupDescription group={groups.group} />
      <section className="profile-details clearfix">
        <div className="container">
        <div className="profile-wrapper">
          <NavBar />
          <ProfileComponent />
        </div>
        </div>
      </section>
    </div>
  );
};

export default GroupProfile;
