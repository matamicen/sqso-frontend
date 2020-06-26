import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import global_config from '../../global_config.json';
import '../../styles/style.css';
import Ad from '../Ad/Ad';
import AppNavigation from '../Home/AppNavigation';
const FAQ = ({t}) => (
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
          ¿Que es SuperQSO?
        </Header>

        <video width="100%" controls controlsList="nodownload">
          <source
            src={global_config.s3Cloudfront + '/faq/Presentacion_SuperQSO2.mp4'}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="site-right">
        <Ad adslot="/21799560237/Signup/left" width={160} height={600} />
      </div>
    </div>
  </Fragment>
);
export default withTranslation()(FAQ);
