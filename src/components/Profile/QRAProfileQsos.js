import React from "react";
import NewsFeed from "../Feed/NewsFeedPresentational";
import * as Sentry from "@sentry/browser";
export default class QRAProfileQsos extends React.Component {
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
    let qsos = [];
    if (this.props.qsos && this.props.qsos.length > 0) {
      for (let i = 0; i < this.props.qsos.length; i++) {
        qsos.push({
          qso: this.props.qsos[i],
          type: this.props.qsos[i].type,
          source: this.props.qsos[i].source ? this.props.qsos[i].source : null,
          ad: this.props.qsos[i].ad ? this.props.qsos[i].ad : null
        });
      }
      return <NewsFeed list={qsos} />;
    }

    return null;
  }
}
