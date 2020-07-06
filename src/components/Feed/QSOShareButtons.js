import React from 'react';
import { withTranslation } from 'react-i18next';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
// import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
const QSOShareButtons = ({ idqso, t, title }) => {
  return (
    // <Button icon as="div">
    //   <Icon name="share alternate" />

    <Dropdown
      // text="Filter Posts"
      icon="share alternate"
      floating
      // labeled
      button
      className="icon"
      style={{ textAlign: 'center' }}
    >
      <Dropdown.Menu>
        <Dropdown.Item style={{ display:"flex", justifyContent: "center" }}>
          <WhatsappShareButton
            title={title}
            url={window.location.origin + '/qso/' + idqso}
            beforeOnClick={() => {
              if (process.env.NODE_ENV !== 'production')
                window.gtag('event', 'qsoShareWAPP_WEBDEV', {
                  event_category: 'QSO',
                  event_label: 'shareWAPP'
                });
              else
                window.gtag('event', 'qsoShareWAPP_WEBPRD', {
                  event_category: 'QSO',
                  event_label: 'shareWAPP'
                });
            }}
          >
            <WhatsappIcon size={20} round={true} />
          </WhatsappShareButton>
        </Dropdown.Item>
        <Dropdown.Item style={{ display:"flex", justifyContent: "center"}}>
          <FacebookShareButton
            quote={title}
            url={window.location.origin + '/qso/' + idqso}
            beforeOnClick={() => {
              if (process.env.NODE_ENV !== 'production')
                window.gtag('event', 'qsoShareFB_WEBDEV', {
                  event_category: 'QSO',
                  event_label: 'shareFB'
                });
              else
                window.gtag('event', 'qsoShareFB_WEBDEV', {
                  event_category: 'QSO',
                  event_label: 'shareFB'
                });
            }}
          >
            <FacebookIcon size={20} round={true} />
            {/* <FacebookShareCount url={window.location.origin + '/qso/' + idqso}>
              {shareCount => (
                <span className="myShareCountWrapper">{shareCount}</span>
              )}
            </FacebookShareCount> */}
          </FacebookShareButton>
        </Dropdown.Item>
        <Dropdown.Item style={{ display:"flex", justifyContent: "center" }}>
          <div>
          <TwitterShareButton
            title={title}
            url={window.location.origin + '/qso/' + idqso}
            beforeOnClick={() => {
              if (process.env.NODE_ENV !== 'production')
                window.gtag('event', 'qsoShareTW_WEBDEV', {
                  event_category: 'QSO',
                  event_label: 'shareTW'
                });
              else
                window.gtag('event', 'qsoShareTW_WEBDEV', {
                  event_category: 'QSO',
                  event_label: 'shareTW'
                });
            }}
          >
            <TwitterIcon size={20} round={true} /> 
            {/* <Icon name="twitter" /> */}
          </TwitterShareButton>

          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    // </Button>
  );
};

export default withTranslation()(QSOShareButtons);
