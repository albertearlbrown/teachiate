import React, {useEffect, useState} from 'react';
import profilActions from '../../../redux/profil/actions'
import Moment from "react-moment";

const Sent = ({profil, currentUser, dispatch}) => {
  const [selected, setSelected] = useState([])
  useEffect(()=>{
    loadSentMessage()
  }, [])
  const loadSentMessage = (page = 1) => {
    dispatch({
      type: profilActions.LOAD_SENT_MESSAGES,
      payload: { page }
    })
  }
  const makeMessageStarred = (message)=>{
    dispatch({
      type: message.starredBySender ? profilActions.REMOVE_SENT_MESSAGE_STARRED: profilActions.MAKE_SENT_MESSAGE_STARRED,
      payload: {ids: [message._id]}
    })
  }

  const removeMessage = (ids) => {
    dispatch({
      type: profilActions.REMOVE_MESSAGE,
      payload: { ids }
    })
  }

  const selectMessage = message => {
    const index = selected.findIndex((a) => a._id === message._id);
    debugger;
    if (index>=0) {
      const s = selected.splice(index, 1);
      setSelected(s)
    }else{
      setSelected([...selected, message])
    }
  }

  const selectAll = ()=>{
    selected.length > 0 ? setSelected([]):setSelected(profil.sent)
  }

  const removeBulk = ()=>{
    if (selected.length === 0) {
      return
    }
    const ids = [];
    selected.filter(a => ids.push(a._id))
    dispatch({
      type: profilActions.MAKE_SENT_MESSAGE_STARRED,
      payload: { ids }
    })
  }

  const addStar = ()=>{
    if (selected.length === 0) {
      return
    }
    const ids = [];
    selected.filter(a => ids.push(a._id))
    dispatch({
      type: profilActions.MAKE_SENT_MESSAGE_STARRED,
      payload: { ids }
    })
  }

  const removeStar = ()=>{
    if (selected.length === 0) {
      return
    }
    const ids = [];
    selected.filter(a => ids.push(a._id))
    dispatch({
      type: profilActions.REMOVE_SENT_MESSAGE_STARRED,
      payload: { ids }
    })
  }

  return(
    <div className="notification_area_inner">
      <div className="notification_head clearfix">
        <div className="new">
          <form>
            <div className="form-group">
              <input type="checkbox" id="html" checked={selected.length === profil.sent.length} onChange={()=>selectAll(profil.sent)} />
              <label htmlFor="html" />
            </div>
          </form>
        </div>
        <ul>
          <li onClick={()=>removeBulk()}>Delete</li>
          <li onClick={()=> addStar()}>Add Star</li>
          <li onClick={()=> removeStar()}>Remove Star</li>
        </ul>
      </div>
      {
        profil.sent.map((message) => (
          <div key={message._id} className="notofication_col clearfix">
            <div className="new">
              <form>
                <div className="form-group">
                  <input type="checkbox" id="noti_select" checked={selected.findIndex((a)=> a._id === message._id)>=0}/>
                  <label htmlFor="noti_select" onClick={()=> selectMessage(message)} />
                </div>
              </form>
            </div>
            <div className="notofication_avtar_col">
              <div className="notofication_avtar_image">
                <img src={message.receiver?.avatar || "assets/img/katei-girl.png"} alt="avatar" />
              </div>
            </div>
            <div className="notification_info">
              <h3><span>{message.receiver?.fullName} <h4><Moment fromNow>{message.date}</Moment></h4> </span></h3>
              <h4>Subject: {message.subject}</h4>
              <h4>message: {message.message}</h4>
            </div>
            <div className="notif-actions">
              <div className="star" onClick={()=>makeMessageStarred(message)}>
                <img src={message.starredBySender?"/assets/img/star.png":"/assets/img/star2.png"} alt="starred" />
              </div>
              <div className="noti_del" onClick={()=>removeMessage([message._id])}>Delete</div>
            </div>
          </div>
        ))
      }
      {/*
        <div className="pager">Viewing 1 - {profil.sentPagination.totalElement} of 4</div>
        */}
    </div>
  )
}

export default Sent;
