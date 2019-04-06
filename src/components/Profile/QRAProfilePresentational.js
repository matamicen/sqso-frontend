import React from "react";

import QRAProfileFollowing from "./QRAProfileFollowing";
import QRAProfileQsos from "./QRAProfileQsos";
import QRAProfileBio from "./QRAProfileBio";
import QRAProfileInfo from "./QRAProfileInfo";
import QRAProfileHeader from "./QRAProfileHeader";

import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";

import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import AppNavigation from "../Home/AppNavigation";
import "../../styles/style.css";
import Ad from "../Ad/Ad";

const QRAProfile = props => {
  return (
    <div className="profile-container">
      <Dimmer active={props.active} page>
        <Loader>Loading QRA...</Loader>
      </Dimmer>
      <Dimmer
        active={props.adActive}
        onClick={props.handleClose}
        page
        // verticalAlign="center"
      >
        <Ad
          adslot="/21799560237/qraDetail/intersitial"
          width={640}
          height={480}
          id="qradetail-intersitial"
          displayOnly={true}
        />
      </Dimmer>
      <div className="site-header">
        <AppNavigation />
      </div>
      <div className="site-left">
        <Ad
          adslot="/21799560237/qraDetail/left"
          width={160}
          height={600}
          id="qradetail-left"
          displayOnly={true}
        />
      </div>
      {!props.active && props.qra && (
        <div className="profile-main">
          <QRAProfileHeader
            qraInfo={props.qraInfo}
            isAuthenticated={props.isAuthenticated}
            followed={props.followed}
            onClick={props.onClick}
            currentQRA={props.currentQRA}
          />
          <div className="profile-buttons">
            <Segment>
              <Button.Group widths="5">
                <Button
                  onClick={() => props.handleTabClick(1)}
                  active={props.tab === 1 ? true : false}
                >
                  QSO's
                </Button>
                <Button
                  onClick={() => props.handleTabClick(2)}
                  active={props.tab === 2 ? true : false}
                >
                  Bio
                </Button>
                <Button
                  onClick={() => props.handleTabClick(3)}
                  active={props.tab === 3 ? true : false}
                >
                  Info
                </Button>
                <Button
                  onClick={() => props.handleTabClick(4)}
                  active={props.tab === 4 ? true : false}
                >
                  Following
                </Button>
              </Button.Group>
            </Segment>
          </div>
          <div className="profile-detail">
            <Segment>
              {
                {
                  1: <QRAProfileQsos qsos={props.qra ? props.qra.qsos : []} />,
                  2: <QRAProfileBio qraInfo={props.qraInfo} />,
                  3: <QRAProfileInfo qraInfo={props.qraInfo} />,
                  4: (
                    <QRAProfileFollowing
                      following={props.qra ? props.qra.following : null}
                    />
                  )
                }[props.tab]
              }
            </Segment>
          </div>
        </div>
      )}
      <div className="site-right">
        <Ad
          adslot="/21799560237/qraDetail/right"
          width={160}
          height={600}
          id="qradetail-right"
          displayOnly={true}
        />
      </div>
    </div>
  );
};

export default QRAProfile;
