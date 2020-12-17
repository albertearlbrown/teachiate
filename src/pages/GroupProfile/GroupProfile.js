import React, { useEffect } from "react";
import GroupDescription from "./description";
import { useSelector, useDispatch } from "react-redux";
import groupActions from '../../redux/groups/actions'

const GroupProfile = (props) => {
  const groupId = props.match?.params?.id
  const groups = useSelector((state)=> state.groups)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: groupActions.LOAD_GROUP,
      payload: {id: groupId }
    })
  },[])
  return (
    <>
      <GroupDescription group={groups.group} />
    </>
  );
};

export default GroupProfile;
