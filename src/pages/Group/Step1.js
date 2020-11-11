import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development'?"http://localhost:4000":"https://teachiate-backend.fnmotivations.com/"
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  text: {
    top: "50px",
    position: "relative",
    left: "-50px"
  }
}));


function Step2() {
  const classes = useStyles();
  const [groupCreated, setGroupCreated] = useState(false)
  const [name, setName] = useState(null);
  const [privacy, setPrivacy] = useState(null)
  const [location, setLocation] = useState(null)
  const [description, setDescription] = useState(null)
  const [open, setOpen] = useState(false)
  const [cover, setCover] = useState(null)
  const [avatar, setAvatar] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    if(name && privacy && location && description) {
      setOpen(true)
      let cov=null, av = null
      if (cover) {
        cov = await uploadImages(cover)
      }
      if (avatar) {
        av = await uploadImages(avatar)
      }
      debugger
      const headers = {
        Authorization: 'Bearer '+localStorage.getItem('jwt_token')
      }
      axios({
        method: 'post',
        url: `${baseUrl}/group/new`,
        data: {
          name, privacy, location, description, avatar: av, cover: cov
        },
        headers
      }).then(response => {
        console.log(response);
        setOpen(false)
        setGroupCreated(true)
      }).catch((error)=>{
        console.error(error);
        setOpen(true)
      })
    }
  }

  const uploadImages = async (image) => {
    const data = new FormData()
    data.append('file', image);
    const headers = {
      Authorization: 'Bearer '+localStorage.getItem('jwt_token')
    }
    const resp = await axios.post(baseUrl+"/upload", data, headers);
    debugger
    if (resp.data.success) {
      return resp.data.filePath;
    }
  }

  if(groupCreated){
    return <Redirect to="/groups"/>
  }

  return (
      <form onSubmit={onSubmit}>
        <Backdrop className={classes.backdrop} open={open} >
          <CircularProgress color="inherit" />
          <div className={classes.text}>Loading</div>
        </Backdrop>
          <div className="container">
              <div className="create_group">
                  <h2>Create Group</h2>
                  <div className="create_group_area">
                      <div className="add_banner_group">
                          <h3>Select Cover Photo</h3>
                          <div className="profile-banner">
                              <div className="avatar-upload">
                                  <div className="avatar-edit">
                                      <input  onChange={e=> setCover(e.target.files[0])} type='file' id="imageUpload2" accept=".png, .jpg, .jpeg" />
                                      <label for="imageUpload2"></label>
                                  </div>
                                  <div className="avatar-preview">
                                      <div id="imagePreview2" style={{backgroundImage: `url(assets/img/create_group_dflt_cover.jpg )`}}>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="avatar-upload group_profile_image">
                              <div className="avatar-edit">
                                  <input onChange={e=>setAvatar(e.target.files[0])} type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                                  <label for="imageUpload"></label>
                              </div>
                              <div className="avatar-preview">
                                  <div id="imagePreview" style={{backgroundImage: `url(assets/img/create_group_dflt_profile.png ;`}}>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="add_group_info">
                          <div className="row">
                              <div className="col-md-12">
                                  <div className="register_field_col">
                                      <p>Group Name</p>
                                      <input
                                        type="text"
                                        placeholder="Enter Group name"
                                        className="register_input"
                                        name=""
                                        onChange={e=>setName(e.target.value)}
                                        />
                                  </div>
                              </div>
                              <div className="col-md-12">
                                  <div className="only_field register_field_col">
                                      <p>Choose Privacy</p>
                                      <div className="select">
                                          <select name="slct" id="slct" onChange={e=>setPrivacy(e.target.value)}>
                                          <option selected disabled>Select Privecy</option>
                                          <option value="PUBLIC">Public</option>
                                          <option value="PRIVATE">Private</option>
                                          </select>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-12">
                                  <div className="register_field_col">
                                      <p>Location</p>
                                      <input onChange={e=>setLocation(e.target.value)} type="text" placeholder="Enter location" className="register_input" name=""/>
                                  </div>
                              </div>
                              <div className="col-md-12">
                                  <div className="register_field_col">
                                      <p>Description</p>
                                      <textarea onChange={e=>setDescription(e.target.value)} className="register_textarea" placeholder="Enter description"></textarea>
                                  </div>
                              </div>
                              <div className="col-md-12">
                                      <input type="submit" value="Continue" className="submit_grp_btn" name=""/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </form>
  )
}

export default Step2;
