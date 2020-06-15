import React from "react";
import { withTranslation } from 'react-i18next';
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import Flag from "semantic-ui-react/dist/commonjs/elements/Flag";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import "../../styles/style.css";
import { MY_COUNTRIES_DATA } from "./countries.js";
const QRAProfileHeader = (props) => {
  const {t} = props; 
  let buttonText;

  if (props.followed) {
    buttonText = t('qra.unfollow');
  } else {
    buttonText = t('qra.follow');
  }
  var result = MY_COUNTRIES_DATA.filter((obj) => {
    return obj.key === props.qraInfo.country;
  });

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
            {/* <div> */}
            <h1 style={{ display: "inline", marginRight: "2%" }}>
              <span className="qra">{props.qraInfo.qra}</span>
            </h1>
            <Flag
              name={
                props.qraInfo.country !== "" && props.qraInfo.country !== null
                  ? props.qraInfo.country.toLowerCase()
                  : null
              }
            />
            <span>{result.length > 0 ? result[0].text : null}</span>
            {/* </div> */}
            <Divider
              hidden
              style={{ marginTop: "0.5vh", marginBottom: "0.5vh" }}
            />
            <h2 style={{ margin: "initial" }}>
              <div className="name">
                {props.qraInfo.firstname && props.qraInfo.firstname + " "}
                {props.qraInfo.lastname && props.qraInfo.lastname}
              </div>
            </h2>

            <div className="kpi">
              {props.qraInfo.views_counter ? (
                <div style={{ marginRight: "5%" }}>
                  {t('qra.views')}: {props.qraInfo.views_counter}
                </div>
              ) : (
                ""
              )}
              {props.qraInfo.qsos_counter ? (
                <div style={{ marginRight: "5%" }}>
                  {t('qra.qsos')}: {props.qraInfo.qsos_counter}
                </div>
              ) : (
                ""
              )}
              {props.qraInfo.followers_counter ? (
                <div style={{ marginRight: "5%" }}>
                  {t('qra.followers')}: {props.qraInfo.followers_counter}
                </div>
              ) : (
                ""
              )}
            </div>

            <Divider hidden style={{ marginBottom: "0vh" }} />
            <div className="follow">
              {props.isAuthenticated && props.userFetched && props.qraInfo.qra !== props.currentQRA && (
                <Button
                  size="small"
                  // positive={!props.following.some(o => o.qra === props.qraInfo.qra)}
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

export default withTranslation()(QRAProfileHeader);
