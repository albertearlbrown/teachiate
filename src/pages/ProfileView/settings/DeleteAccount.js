import React, { useState } from 'react';
import profilActions from '../../../redux/profil/actions'
import { useDispatch } from 'react-redux';

const DeleteAccount = ({setLoading})=> {
  const [agree, setAgree] = useState(false)
  const dispatch  = useDispatch();
  const deleteAccount = ()=>{
    if (agree) {
      dispatch({
        type: profilActions.REMOVE_ACCOUNT,
      })
    }
  }

  return(
    <div id="Delete" className="item2 active" data-title="Delete Account">
        <div className="item-content2">
              <div className="settings_details">
                  <div className="delete_account">
                      <div className="white-logo"><a href="index.html"><img src="assets/img/white-logo.png" alt="" /></a></div>
                      <p>Deleting your account will delete all of the content you have created. It will be completely irrecoverable.</p>
                      <div className="bb">
                          <div className="form_group">
                              <input
                                type="checkbox"
                                id="html"
                                onChange={e=> setAgree(e.target.checked)}
                                className="check"
                                checked={agree}
                              />
                              <label htmlFor="html">I Accept All<span> Terms &amp; Conditions</span></label>
                          </div>
                          <div className="settings_form_col settings_form_col3">
                              <input onClick={()=>deleteAccount()} type="submit" value="Delete Account" className="btn btn-primary" />
                          </div>
                      </div>
                  </div>
              </div>
        </div>
    </div>
  )
}

export default DeleteAccount;
