import React, { Fragment } from 'react';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import '../../styles/style.css';
import Ad from '../Ad/Ad';
import AppNavigation from '../Home/AppNavigation';

const Download = props => (
  <Fragment>
    <div className="global-container">
      <div className="site-header">
        <AppNavigation />
      </div>
      <div className="site-left">
        <Ad adslot="/21799560237/Signup/left" width={160} height={600} />
      </div>
      <div className="site-main" onContextMenu={e => e.preventDefault()}>
        <Header as="h2" dividing>
          Download App
        </Header>

        <Image
          src="/en_badge_web_generic.png"
          size="medium"
          rounded
          href="https://play.google.com/apps/internaltest/4701688562191638690"
          target="_blank"
        />
      </div>
      <div className="site-right">
        <Ad adslot="/21799560237/Signup/left" width={160} height={600} />
      </div>
    </div>
  </Fragment>
);
export default Download;
