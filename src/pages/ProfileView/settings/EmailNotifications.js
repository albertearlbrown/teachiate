import React, { useEffect, useState } from "react";
import profilActions from '../../../redux/profil/actions'
import {useSelector, useDispatch} from 'react-redux';
import { Formik } from 'formik';

const EmailNotification = () => {
  const profil = useSelector(({profil}) => profil)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({
      type: profilActions.GET_NOTIFICATION_CONFIGS,
    })
  }, [])

  const onSubmit = values => {
    dispatch({
      type: profilActions.UPDATE_NOTIFICATION_CONFIGS,
      payload: values
    })
  }
  return (
    <div id="Email" className="item2 active" data-title="Email">
      <div className="item-content2">
      {
        profil.showForm &&
        <Formik
          initialValues={{...profil.notificationConfig, activeNotification: true}}
          onSubmit={onSubmit}
         >
           {({
             values,
             errors,
             touched,
             handleChange,
             handleBlur,
             handleSubmit,
             isSubmitting,
             /* and other goodies */
           }) => {
             debugger;
             return (
               <form onSubmit={handleSubmit}>
                  <div className="settings_details">
                    <div className="email_column">
                      <div className="email_column_sub clearfix">
                        <h4>
                          Mail Notification <span> (Send an email notice when)</span>
                        </h4>
                        <div className="email_status">
                          <label className="switch" htmlFor="checkbox">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="activeNotification"
                              onChange={handleChange}
                              checked={values.activeNotification}
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="email_column">
                      <h3>Activity</h3>
                      <div className="email_column_sub clearfix">
                        <p>A member mentions you in an update using "@gregorylee"</p>
                        <div className="email_status">
                          <label className="switch" htmlFor="checkbox">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="mentions"
                              onChange={handleChange}
                              checked={values.mentions}
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                      <div className="email_column_sub clearfix">
                        <p>A member replies to an update or comment you've posted</p>
                        <div className="email_status">
                          <label className="switch" htmlFor="checkbox">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="commentReply"
                              onChange={handleChange}
                              checked={values.commentReply}
                              />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="email_column">
                      <h3>Messages</h3>
                      <div className="email_column_sub clearfix">
                        <p>A member sends you a new message</p>
                        <div className="email_status">
                          <label className="switch" htmlFor="checkbox">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="message"
                              onChange={handleChange}
                              checked={values.message}
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="email_column">
                      <h3>Friends</h3>
                      <div className="email_column_sub clearfix">
                        <p>A member sends you a friendship request</p>
                        <div className="email_status">
                          <label className="switch" htmlFor="checkbox">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="friendReq"
                              onChange={handleChange}
                              checked={values.friendReq}
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                      <div className="email_column_sub clearfix">
                        <p>A member accepts your friendship request</p>
                        <div className="email_status">
                          <label className="switch" htmlFor="checkbox">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="acceptFR"
                              onChange={handleChange}
                              checked={values.acceptFR}
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="email_column">
                      <h3>Groups</h3>
                      <div className="email_column_sub clearfix">
                        <p>A member invites you to join a group</p>
                        <div className="email_status">
                          <label className="switch" htmlFor="checkbox">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="groupInvite"
                              onChange={handleChange}
                              checked={values.groupInvite}
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                      <div className="email_column_sub clearfix">
                        <p>Group information is updated</p>
                        <div className="email_status">
                          <label className="switch" htmlFor="checkbox">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="groupInfoUpdated"
                              onChange={handleChange}
                              checked={values.groupInfoUpdated}
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                      <div className="email_column_sub clearfix">
                        <p>You are promoted to a group administrator or moderator</p>
                        <div className="email_status">
                          <label className="switch" htmlFor="checkbox">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="membershipUpdated"
                              onChange={handleChange}
                              checked={values.membershipUpdated}
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                      <div className="email_column_sub clearfix">
                        <p>
                          A member requests to join a private group for which you are an
                          admin
                        </p>
                        <div className="email_status">
                          <label className="switch" htmlFor="checkbox">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="someoneAskJoinGroup"
                              onChange={handleChange}
                              checked={values.someoneAskJoinGroup}
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                      <div className="email_column_sub clearfix">
                        <p>Your request to join a group has been approved or denied</p>
                        <div className="email_status">
                          <label className="switch" htmlFor="checkbox">
                            <input
                              className="checkbox"
                              name="joinGroupReqStatus"
                              onChange={handleChange}
                              type="checkbox"
                              checked={values.joinGroupReqStatus}
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="settings_form_col">
                      <input
                        type="submit"
                        defaultValue="Save Changes"
                        className="btn btn-primary"
                      />
                    </div>
                  </div>
                </form>
              )
           }}
          </Formik>
      }
      </div>
    </div>
  );
};

export default EmailNotification;
