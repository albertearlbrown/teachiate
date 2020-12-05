import React, {useState, useContext} from 'react';
import UpdatePassword from './UpdatePassword'
import EmailNotification from './EmailNotifications'

const Settings = () => {
  const [view, setView] = useState('password')
  return (
    <div className="profile-forum-details">
      <section className="tabbed-content2">
        <div className="tabs2">
          <ul>
            <li onClick={()=>setView('password')}><p className={view === 'password' ?'active':''}>General</p></li>
            <li onClick={()=>setView('email')}><p className={view === 'email' ?'active':''}>Email</p></li>
            {/*<li><p>Email </p></li>
              <li><a href="#Social">Social Accounts </a></li>
              <li><a href="#Profile">Profile Visibility</a></li>
              <li><a href="#Export">Export Data </a></li>
              <li><a href="#Delete">Delete Account</a></li>
              */}
          </ul>
        </div>
        {view === 'password' && <UpdatePassword />}
        {view === 'email' && <EmailNotification />}

      </section>
    </div>
  )
}

export default Settings;
