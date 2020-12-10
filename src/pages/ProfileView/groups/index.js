import React, {useState, useEffect} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import profilActions from '../../../redux/profil/actions';
import {useSelector, useDispatch} from 'react-redux';
import Inbox from './memberships'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const MessagesView = ()=>{
  const classes = useStyles();
  const [view, setView] = useState('memberships');
  const [loading, setLoading] = useState(false)
  const {profil, users} = useSelector(({profil, users}) => ({profil, users}));
  const [openNotification, setOpenNotification] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(profil.loading)
  }, [profil.loading])

  useEffect(()=>{
    if (profil.openNotification) {
      setTimeout(()=>{
        setOpenNotification(false)
        setOpenNotification(profil.openNotification)
        dispatch({
          type: profilActions.SET_STATE,
          payload: {openNotification: false}
        })
        if (view === 'compose') {
          setView('sent')
        }
      }, 2000)
    }
  },[ profil.openNotification ])

  return(
    <div className="profile-forum-details">
      <section className="tabbed-content2 profile_edit">
        <Backdrop open={loading} className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openNotification}
          onClose={()=>setOpenNotification(false)}
          autoHideDuration={2000}
        >
          <Alert severity={profil.notificationType}>
            {profil.notificationMessage}
          </Alert>
        </Snackbar>
        <div className="tabs2" style={{marginBottom: 20}}>
          <ul>
            <li onClick={()=>setView('memberships')}><p className={view ==='memberships' ? 'active':''}>Memberships</p></li>
            <li onClick={()=>setView('invitations')}><p className={view ==='starred' ? 'active':''}>Invitations</p></li>
          </ul>
        </div>
        {view === 'memberships' && <Inbox profil={profil} dispatch={dispatch} currentUser={users.currentUser} />}
        {/*
          {view === 'invitations' && <ComposeMessage profil={profil} dispatch={dispatch} currentUser={users.currentUser} />}
          */}
      </section>
    </div>
  )
}

export default MessagesView
