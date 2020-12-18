import React from "react";

const WhatsNew = () => {
  return (
    <div className="post_share">
      <h2>What’s New?</h2>
      <div className="post_share_area">
        <div className="posted_avtar">
          <img src="/assets/img/g4.png" alt="g4" />
        </div>
        <div className="post_share_field">
          <textarea
            placeholder="Sarah What’s are your mind?"
            defaultValue={""}
          />
          <div className="share_option_right">
            <input type="submit" defaultValue="Submit" name />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
