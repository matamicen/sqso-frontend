import React, { Fragment } from "react";
import AppNavigation from "../Home/AppNavigation";
import "../../styles/style.css";
import Ad from "../Ad/Ad";
const PrivacyPolicy = props => (
  <Fragment>
    <div className="global-container">
      <div className="site-header">
        <AppNavigation />
      </div>
      <div className="site-left">
        <Ad adslot="/21799560237/Signup/left" width={160} height={600} />
      </div>
      <div className="site-main">PrivacyPolicy</div>
      <div className="site-right">
        <Ad adslot="/21799560237/Signup/left" width={160} height={600} />
      </div>
    </div>
  </Fragment>
);
export default PrivacyPolicy;
