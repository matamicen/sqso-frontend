import React from "react";

import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import { Link } from "react-router-dom";
import PopupToFollow from "../PopupToFollow";
import * as Sentry from "@sentry/browser";
export default class QRA extends React.Component {
  state = { error: null };
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === "production") {
      this.setState({ error });
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    }
  }
  render() {
    return (
      <PopupToFollow
        qra={this.props.qra}
        trigger={
          <Link to={"/" + this.props.qra}>
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
                <Image size="medium" src={this.props.avatarpic} circular />
              </div>
              <div
                style={{
                  justifySelf: "center"
                }}
              >
                {this.props.qra}
              </div>
            </div>
          </Link>
        }
      />
    );
  }
}
