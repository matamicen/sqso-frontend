import React from 'react';
import { withTranslation } from 'react-i18next';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share';
import global_config from '../../global_config.json';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
// import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
const QSOShareButtons = ({ idqso, t, title }) => {
  const url =
  global_config.dynamic_link +
  'QSO=' +
  idqso +
  global_config.dynamic_apn +
  global_config.dynamic_ibi +
  global_config.dynamic_afl +
  '/qso/' +
  idqso +
  global_config.dynamic_isi +
  global_config.dynamic_ifl +
  '/qso/' +
  idqso;
  return (
    <Button>
      <div style={{ display: 'grid', justifyItems: 'center' }}>
        <Dropdown
          // text="Filter Posts"
          icon="share alternate"
          floating
          // labeled
          // button
          className="icon"
          style={{ zIndex: 10, textAlign: 'center', alignSelf: 'center' }}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div className="socialDesktop">
                <WhatsappShareButton
                  title={title}
                  url={url}
                  beforeOnClick={() => {
                    if (process.env.REACT_APP_STAGE === 'production')

                      window.gtag('event', 'qsoShareWAPP_WEBPRD', {
                        event_category: 'QSO',
                        event_label: 'shareWAPP'
                      });
                  }}
                >
                  <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>

                <FacebookShareButton
                  quote={title}
                  url={url}
                  beforeOnClick={() => {
                    if (process.env.REACT_APP_STAGE === 'production')

                      window.gtag('event', 'qsoShareFB_WEBPRD', {
                        event_category: 'QSO',
                        event_label: 'shareFB'
                      });
                  }}
                >
                  <FacebookIcon size={40} round={true} />
                </FacebookShareButton>

                <TwitterShareButton
                  title={title}
                  url={url}
                  beforeOnClick={() => {
                    if (process.env.REACT_APP_STAGE === 'production')

                      window.gtag('event', 'qsoShareTW_WEBPRD', {
                        event_category: 'QSO',
                        event_label: 'shareTW'
                      });
                  }}
                >
                  <TwitterIcon size={40} round={true} />
                </TwitterShareButton>
              </div>
              <div className="socialMobile">
                <a
                  href={
                    'whatsapp://send?text=' +
                    encodeURIComponent(
                      title + ' ' + url
                    )
                  }
                  onClick={() => {
                    if (process.env.REACT_APP_STAGE === 'production')

                      window.gtag('event', 'qsoShareWAPP_WEBPRD', {
                        event_category: 'QSO',
                        event_label: 'shareWAPP'
                      });
                  }}
                  data-action="share/whatsapp/share"
                >
                  {' '}
                  <WhatsappIcon size={40} round={true} />
                </a>
                <FacebookShareButton
                  quote={title}
                  url={url}
                  beforeOnClick={() => {
                    if (process.env.REACT_APP_STAGE === 'production')

                      window.gtag('event', 'qsoShareFB_WEBPRD', {
                        event_category: 'QSO',
                        event_label: 'shareFB'
                      });
                  }}
                >
                  <FacebookIcon size={40} round={true} />
                </FacebookShareButton>
                <a
                  href={
                    'https://twitter.com/intent/tweet?url=' +
                    encodeURIComponent(url) +
                    '&text=' +
                    encodeURIComponent(title)
                  }
                  onClick={() => {
                    if (process.env.REACT_APP_STAGE === 'production')

                      window.gtag('event', 'qsoShareTW_WEBPRD', {
                        event_category: 'QSO',
                        event_label: 'shareTW'
                      });
                  }}
                >
                  
                  <TwitterIcon size={40} round={true} />
                </a>
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <span style={{ fontSize: '1rem' }}>{t('qso.share')}</span>
      </div>
    </Button>
  );
};

export default withTranslation()(QSOShareButtons);
