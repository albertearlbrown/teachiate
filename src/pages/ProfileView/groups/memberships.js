import React, { useEffect, useState } from "react";
import profilActions from "../../../redux/profil/actions";
import Moment from "react-moment";

const Sent = ({ profil, currentUser, dispatch }) => {
  useEffect(() => {
    loadMyGroups();
  }, []);

  const loadMyGroups = (page = 1) => {
    dispatch({
      type: profilActions.LOAD_MY_GROUPS,
      payload: { page },
    });
  };

  return (
    <div id="General" className="item2 active" data-title="Topics Started">
      <div className="item-content2">
        <div className="group-details clearfix">
          {
            profil.groups.map(group=>(
              <div className="group-column clearfix">
                <div className="group-info">
                  <div className="group-photo">
                    <div className="group-banner">
                      <img src={group.cover||"assets/img/group-banner1.png"} alt="cover" />
                    </div>
                    <div className="group-pro-image">
                      <img src={group.avatar || "assets/img/group-pro-image1.png"} alt="avatar" />
                    </div>
                  </div>
                  <div className="group-info-details">
                    <h3>{group.groupName}</h3>
                    <h4><Moment fromNow>{group.creationDate}</Moment></h4>
                    <ul>
                      <li>
                        <p>{group.privacy === 'PRIVATE' ? 'Private Group':'Public Group'}</p>
                      </li>
                      <li>{group.members.length} Members</li>
                    </ul>
                  </div>
                  <div className="clear" />
                </div>
                {
                  group.creatorId !== currentUser._id &&
                  <div className="group-links">
                    <p className="btn btn-secondary">
                      Report
                    </p>
                    <p className="btn btn-primary">
                      Leave Group
                    </p>
                  </div>
                }
              </div>
            ))
          }
          {/*
            <div className="pager">Viewing 1 - 4 of 4</div>
            */}
        </div>
      </div>
    </div>
  );
};

export default Sent;
