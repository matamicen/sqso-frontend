import React from "react";
import PopupToFollow from "../PopupToFollow";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import { Link } from "react-router-dom";
import "../../styles/style.css";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import AppNavigation from "../Home/AppNavigation";
import "../../styles/style.css";
import Ad from "../Ad/Ad";
const qraFollowRecommendPresentational = props => (
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

    <div className="profile-main">
      <div className="profile-following">
        {props.follow.followingMe
          ? props.follow.followingMe.map((qra, i) => (
              <PopupToFollow
                qra={qra.qra}
                key={qra.qra}
                trigger={
                  <Link to={"/" + qra.qra}>
                    <div className="qra">
                      <div className="avatar">
                        {qra.avatarpic ? (
                          <Image avatar size="tiny" src={qra.avatarpic} />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="qra">{qra.qra}</div>
                    </div>
                  </Link>
                }
              />
            ))
          : ""}
      </div>
    </div>

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
export default qraFollowRecommendPresentational;
