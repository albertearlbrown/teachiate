import React, {useState, useContext} from 'react';
import UpdateProfilInfo from "./UpdateProfilInfo"
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthStoreContext } from "../../../Store/AuthStore";
import Alert from '@material-ui/lab/Alert';
import BackgroundInfo from './BackgroundInfo'

const ProfilEdit = ()=>{
  const { userData, setUserData } = useContext(AuthStoreContext);
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('info')
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
            <li onClick={()=>setView('info')}><p className={view ===' info' ? 'active':''}>Profile Info</p></li>
            <li onClick={()=>setView('background_info')}><p className={view ===' background_info' ? 'active':''}>Background Info</p></li>
            <li onClick={()=>setView('about')}><p className={view ===' about' ? 'active':''}>About Me</p></li>
          </ul>
        </div>
        {view === 'info' &&
          <UpdateProfilInfo
            userData={userData}
            setUserData={setUserData}
            setLoading={setLoading}
            setOpenNotification={setOpenNotification}
            />
        }
        {
          view === 'background_info' &&
          <BackgroundInfo />
        }
      </section>
    </div>
  )
}

export default ProfilEdit
