import React from "react";

const SocialAccounts = () => {
  return (
    <div id="Social" className="item2 active" data-title="Social Accounts">
      <div className="item-content2">
        <div className="settings_details">
          <div className="social_media">
            <h3>Social Login</h3>
            <div className="social_login">
              <ul>
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/img/facebook-icon.png" alt='fcb' /> Facebook
                  </a>
                </li>
                <li>
                  <a  href="https://google.com" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/img/google_icon.png" alt='ggl' /> Google
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAccounts;
