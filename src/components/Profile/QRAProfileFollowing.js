import React from "react";
import PopupToFollow from "../PopupToFollow";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import { Link } from "react-router-dom";
import "../../styles/style.css";

const QRAProfileFollowing = props => (
  <div className="profile-following">
    {props.following
      ? props.following.map((qra, i) => (
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
                      <Image avatar size="tiny" src="/emptyprofile.png" />
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
);
export default QRAProfileFollowing;
