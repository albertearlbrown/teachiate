import React, {useState, useContext} from 'react';
import { Auth } from 'aws-amplify'
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthStoreContext } from "../../../Store/AuthStore";

const UpdatePassword = () => {
  const { userData } = useContext(AuthStoreContext);
  const [oldPassword, setOldPassword] = useState(null)
  const [newPassword, setNewPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const [error, setError] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  const onUpdatePassword = async () => {
    if ((newPassword !== confirmPassword) || !oldPassword || !newPassword) {
      setErrorMessage("Passwords not match, please try again")
      setError(true)
      return
    }
    setError(false)
    setLoading(true)
    const user = await Auth.currentAuthenticatedUser();
    Auth.changePassword(user,oldPassword,newPassword)
      .then((response) => {
        setLoading(false)
        setOpenNotification(true)
        setShowUpdatePassword(false)
        setConfirmPassword(null)
        setOldPassword(null)
        setNewPassword(null)
      })
      .catch(err => {
        setError(true)
        setErrorMessage(err.message)
        setLoading(false)
      });
  };
  return (
    <div>
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
          Password updated successfully
        </Alert>
      </Snackbar>
      <div id="General" className="item2 active" data-title="General">
        <div className="item-content2">
          <div className="settings_details">
            <div className="settings_form_col">
              <label>Current Password (required to update email or change current password)</label>
              <div className="input_col">
                <input type="password" className="input" placeholder="**************" />
                <i className="input_icon"><i className="fa fa-pencil" aria-hidden="true" /></i>
              </div>
              <a href="#">Lost your password?</a>
            </div>
            <div className="settings_form_col">
              <label>Account Email</label>
              <div className="input_col">
                <input type="text" className="input" placeholder={userData?.email} />
                <i className="input_icon"><i className="fa fa-pencil" aria-hidden="true" /></i>
              </div>
            </div>
            <div className="accordion2">
              <h3 className={showUpdatePassword && "active"}  onClick={()=> setShowUpdatePassword(!showUpdatePassword)} >Change Password?</h3>
              <div className="aaa" style={{display: showUpdatePassword?'block':'none'}}>
                {error ? <Alert severity="error" style={{marginBottom: '20px'}}>{errorMessage}</Alert> : null}
                <div className="settings_form_col">
                  <label>Current Password</label>
                  <div className="input_col">
                    <input
                      type="password"
                      className="input"
                      placeholder="**************"
                      onChange={e => setOldPassword(e.target.value)}
                      />
                    <i className="input_icon"><i className="fa fa-pencil" aria-hidden="true" /></i>
                  </div>
                </div>
                <div className="settings_form_col">
                  <label>Create new Password (leave blank for no change)</label>
                  <div className="input_col">
                    <input
                      type="password"
                      className="input"
                      placeholder="**************"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                       />
                    <i className="input_icon"><i className="fa fa-pencil" aria-hidden="true" /></i>
                  </div>
                </div>
                <div className="settings_form_col">
                  <label>Repeat New Password</label>
                  <div className="input_col">
                    <input
                      type="password"
                      className="input"
                      placeholder="**************"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <i className="input_icon"><i className="fa fa-pencil" aria-hidden="true" /></i>
                  </div>
                </div>
                <div className="settings_form_col">
                  <input
                    disabled={(newPassword !== confirmPassword) || !oldPassword || !newPassword }
                    onClick={()=>onUpdatePassword()}
                    defaultValue="Save Changes"
                    className="btn btn-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdatePassword;
