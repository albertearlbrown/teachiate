import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { configureSocket } from "../../utils/axiosInterceptor"
import { AuthStoreContext } from "../../Store/AuthStore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
    marginBottom: 20,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: '50%',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  buttonDec:{
    marginLeft: 10,
  },
  pos: {
    marginBottom: 0,
    paddingBottom: 0,
  },
}));
const baseUrl = process.env.NODE_ENV === 'development'?"http://localhost:4000":"https://teachiate-backend.fnmotivations.com/"

export default function ComplexGrid({notification}) {
  const { isAuthenicate, userData } = useContext(AuthStoreContext);
  const classes = useStyles();
  const [title, setTitle ] = useState("")
  const [action, showActions] = useState(false)
  const [requestAccepted, setRequestAccepted] = useState(false)
  const {senderId} = notification

  useEffect(()=>{
    const getNotificationTitle = () =>{
      // 'FRIEND_REQUEST', 'FRIEND_REQUEST_ACCEPTED', 'JOIN_GROUP', 'JOIN_GROUP_ACCEPT', 'TO_JOIN_GROUP'
      switch (notification.type) {
        case 'FRIEND_REQUEST':
          setTitle(`${senderId.fullName} sent you a friend request`);
          showActions(true)
          break;
        case 'FRIEND_REQUEST_ACCEPTED':
          setTitle(`${senderId.fullName} accepted your friend request`);
          setRequestAccepted(true)
          break;
        case 'JOIN_GROUP':
          setTitle(`${senderId.fullName} sent request to join your group`);
          break;
        case 'JOIN_GROUP_ACCEPT':
          setTitle(`${senderId.fullName} accepted your request to join their group`);
          break;
        case 'TO_JOIN_GROUP':
          setTitle(`${senderId.fullName} sent request to join group`);
          break;
        default:
          setTitle(`${senderId.fullName} sent you a notification`);
      }
    }
    getNotificationTitle()
  },[])

  const onAcceptFriendRequest = async (sender) => {
    if (userData?._id) {
      let soc = await configureSocket(baseUrl);
      soc.emit("accept-friend-request", ({sender}), ack => {
        console.log(ack);
      })
      setRequestAccepted(true)
    }
  }

  const cancelRequest = senderId =>{
    axios({
      method: 'delete',
      url: '/users/friends/cancel',
      data: {senderId}
    }).then(res=>{
      console.log(res);
    })
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={senderId.avatar || "/assets/img/m1.png"} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {senderId.role}
                </Typography>
              </Grid>
              {
                action &&
                <>
                  {!requestAccepted ?
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={()=>onAcceptFriendRequest(senderId)}>
                        Accept
                      </Button>
                      <Button variant="contained" className={classes.buttonDec} onClick={()=>cancelRequest(senderId)}>
                        Decline
                      </Button>
                    </Grid>:
                    <Grid item>
                      <Button variant="contained" color="primary">
                        Accepted
                      </Button>
                    </Grid>
                  }
                </>
              }
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
