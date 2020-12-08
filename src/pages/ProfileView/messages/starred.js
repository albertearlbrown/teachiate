import React, {useEffect} from 'react';
import profilActions from '../../../redux/profil/actions'
import Moment from "react-moment";

const Starred = ({profil, currentUser, dispatch}) => {
  useEffect(()=>{
    loadInboxMessage()
  }, [])

  const loadInboxMessage = (page = 1) => {
    dispatch({
      type: profilActions.LOAD_INBOX_MESSAGES,
      payload: { page, starred: true }
    })
  }

  const removeMessage = (id) => {
    dispatch({
      type: profilActions.REMOVE_MESSAGE,
      payload: { id }
    })
  }

  const makeMessageStarred = (id)=>{
    dispatch({
      type: profilActions.MAKE_MESSAGE_STARRED,
      payload: {id}
    })
  }

  return(
    <div className="notification_area_inner">
      <div className="notification_head clearfix">
        <div className="new">
          <form>
            <div className="form-group">
              <input type="checkbox" id="html" />
              <label htmlFor="html" />
            </div>
          </form>
        </div>
        <ul>
          <li>Delete</li>
          <li>Mark Read</li>
        </ul>
      </div>
      {
        profil.inbox.map((message) => (
          <div key={message._id} className="notofication_col clearfix">
            <div className="new">
              <form>
                <div className="form-group">
                  <input type="checkbox" id="noti_select" />
                  <label htmlFor="noti_select" />
                </div>
              </form>
            </div>
            <div className="notofication_avtar_col">
              <div className="notofication_avtar_image">
                <img src={message.sender?.avatar || "assets/img/katei-girl.png"} alt="avatar" />
              </div>
            </div>
            <div className="notification_info">
              <h3><span>{message.sender?.fullName} <h4><Moment fromNow>{message.date}</Moment></h4> </span></h3>
              <h4>Subject: {message.subject}</h4>
              <h4>message: {message.message}</h4>
            </div>
            <div className="notif-actions">
              <div className="star" onClick={()=>makeMessageStarred(message._id)}>
                <img src={message.starredByReceiver?"/assets/img/star.png":"/assets/img/star2.png"} alt="starred" />
              </div>
              <div className="noti_del" onClick={()=>removeMessage(message._id)}>Delete</div>
            </div>
          </div>
        ))
      }
      <div className="pager">Viewing 1 - 4 of 4</div>
    </div>
  )
}

export default Starred;
