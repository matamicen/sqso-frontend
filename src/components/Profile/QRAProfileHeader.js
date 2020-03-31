import React from "react";

import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Flag from "semantic-ui-react/dist/commonjs/elements/Flag";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import "../../styles/style.css";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
const QRAProfileHeader = props => {
  let buttonText;

  if (props.followed) {
    buttonText = "Unfollow";
  } else {
    buttonText = "Follow";
  }

  return (
    <div className="profile-header">
      <Segment>
        <div className="inner">
          <div className="pic">
            <Image
              src={
                props.qraInfo.profilepic
                  ? props.qraInfo.profilepic
                  : "/emptyprofile.png"
              }
              centered
              size="small"
              circular
            />
          </div>
          <div className="detail">
            <h1 style={{ display: "inline" }}>
              <span className="qra">{props.qraInfo.qra}</span>
            </h1>
            <Flag
              name={
                props.qraInfo.country !== ""
                  ? props.qraInfo.country.toLowerCase()
                  : "ar"
              }
            />
            Argentina
            <Divider
              hidden
              style={{ marginTop: "0.5vh", marginBottom: "0.5vh" }}
            />
            <h2>
              <div className="name">
                {props.qraInfo.firstname && props.qraInfo.firstname + " "}
                {props.qraInfo.lastname && props.qraInfo.lastname}
              </div>
            </h2>
            <Divider hidden style={{ marginBottom: "4vh" }} />
            <div className="follow">
              {props.isAuthenticated && props.qraInfo.qra !== props.currentQRA && (
                <Button
                  size="mini"
                  positive={!props.followed}
                  onClick={() => props.onClick()}
                >
                  {buttonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Segment>
    </div>
  );
};

export default QRAProfileHeader;
