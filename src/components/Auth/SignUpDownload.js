import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import global_config from '../../global_config.json';
import '../../styles/style.css';
import Ad from '../Ad/Ad';
import AppNavigation from '../Home/AppNavigation';
const Download = ({ t }) => (
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
          Registración
        </Header>
        <p>
            <b>{t('forms.downloadAPP')}</b>
          </p>
        <Image
          src={global_config.s3Cloudfront + "/en_badge_web_generic.png"}
          size="medium"
          rounded
          href="https://play.google.com/store/apps/details?id=com.sqsomobile&hl=es_AR"
          target="_blank"
          onClick={()=>window.gtag('event', 'signupDownloadAndroid_WEBPRD')}
        />
        <Image
          src={global_config.s3Cloudfront +"/ios_en_badge_web_generic.png"}
          size="medium"
          rounded
          href="https://apps.apple.com/ar/app/superqso/id1478967853"
          target="_blank"
          onClick={()=>window.gtag('event', 'signupDownloadiOS_WEBPRD')}
        />
      </div>
      <div className="site-right">
        <Ad adslot="/21799560237/Signup/left" width={160} height={600} />
      </div>
    </div>
  </Fragment>
);
export default withTranslation()(Download);
