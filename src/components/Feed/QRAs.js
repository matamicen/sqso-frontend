import React from "react";
import QRA from "./QRA";

import "../../styles/style.css";
import * as Sentry from "@sentry/browser";
export default class QRAs extends React.Component {
  state = { error: null };
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === "production") {
      this.setState({ error });
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    } else console.log(error, errorInfo);
  }
  render() {
    return (
      <div className="feed-item-qras">
        {this.props.qras.map((qra, i) => (
          <div className="feed-item-qras-qra" key={i}>
            <QRA key={i} avatarpic={qra.avatarpic} qra={qra.qra} />
          </div>
        ))}
      </div>
    );
  }
}
