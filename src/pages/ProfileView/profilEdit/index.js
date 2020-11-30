import React, {useState, useContext} from 'react';
import UpdateProfilInfo from "./UpdateProfilInfo"
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthStoreContext } from "../../../Store/AuthStore";
import Alert from '@material-ui/lab/Alert';

const ProfilEdit = ()=>{
  const { userData } = useContext(AuthStoreContext);
  const [loading, setLoading] = useState(false)
  const [openNotification, setOpenNotification] = useState(false);

  return(
    <div className="profile-forum-details">
      <section className="tabbed-content2 profile_edit">
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openNotification}
          onClose={()=>setOpenNotification(false)}
          autoHideDuration={5000}
        >
          <Alert onClose={()=>setOpenNotification(false)} severity="success">
            Profil updated successfully
          </Alert>
        </Snackbar>
        <div className="tabs2">
          <ul>
            <li><a href="#profile_info" className="active">Profile Info</a></li>
            <li><a href="#background_info">Background Info</a></li>
            <li><a href="#about_me">About Me</a></li>
          </ul>
        </div>
        <UpdateProfilInfo userData={userData} setLoading={setLoading} setOpenNotification={setOpenNotification}/>
      </section>
    </div>
  )
}

export default ProfilEdit
