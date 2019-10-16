import React from "react";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton
} from "react-share";

import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";

import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";

const QSOShareButtons = ({ idqso }) => {
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
      style={{ textAlign: "center" }}
    >
      <Dropdown.Menu>
        <Dropdown.Item style={{ textAlign: "center" }}>
          <WhatsappShareButton
            title="CheckOut this QSO"
            url={window.location.origin + "/qso/" + idqso}
          >
            <Icon name="whatsapp" />
          </WhatsappShareButton>
        </Dropdown.Item>
        <Dropdown.Item style={{ textAlign: "center" }}>
          <FacebookShareButton
            quote="CheckOut this QSO"
            url={window.location.origin + "/qso/" + idqso}
          >
            <Icon name="facebook" />
          </FacebookShareButton>
        </Dropdown.Item>
        <Dropdown.Item style={{ textAlign: "center" }}>
          <TwitterShareButton
            title="CheckOut this QSO"
            url={window.location.origin + "/qso/" + idqso}
          >
            <Icon name="twitter" />
          </TwitterShareButton>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    // </Button>
  );
};

export default QSOShareButtons;
