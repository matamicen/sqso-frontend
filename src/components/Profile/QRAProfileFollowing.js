import React from "react";
import PopupToFollow from "../PopupToFollow";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import { Link } from "react-router-dom";
import "../../styles/style.css";

const QRAProfileFollowing = props => (
  <div className="profile-following">
    {props.following
      ? props.following.map((qra, i) => (
          <div className="qra" key={qra.qra}>
            <div className="avatar">
              <Link to={"/" + qra.qra}>
                {qra.avatarpic ? (
                  <Image avatar size="tiny" src={qra.avatarpic} />
                ) : (
                  <Image avatar size="tiny" src="/emptyprofile.png" />
                )}
              </Link>
            </div>
            <div className="qra">
              {" "}
              <PopupToFollow
                qra={qra.qra}
                key={qra.qra}
                trigger={<Link to={"/" + qra.qra}>{qra.qra}</Link>}
              />
            </div>
          </div>
        ))
      : ""}
  </div>
);
export default QRAProfileFollowing;
