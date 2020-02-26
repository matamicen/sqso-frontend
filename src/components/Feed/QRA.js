import React from "react";

import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import { Link } from "react-router-dom";
import PopupToFollow from "../PopupToFollow";

export default class QRA extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "grid",
          justifyItems: "center"
        }}
      >
        <div
          style={{
            justifySelf: "center",
            width: "60px",
            height: "60px"
          }}
        >
          <Link to={"/" + this.props.qra}>
            <Image
              size="medium"
              src={
                this.props.avatarpic
                  ? this.props.avatarpic
                  : "/emptyprofile.png"
              }
              circular
            />
          </Link>
        </div>
        <div
          style={{
            justifySelf: "center"
          }}
        >
          <PopupToFollow
            qra={this.props.qra}
            trigger={<Link to={"/" + this.props.qra}>{this.props.qra}</Link>}
          />
        </div>
      </div>
    );
  }
}
