import React from "react";

import "../../styles/style.css";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Ad from "../Ad/Ad";
import * as Sentry from "@sentry/browser";
// import {Bling as GPT} from "react-gpt";

export default class FeedItemAd extends React.PureComponent {
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
      <Segment raised secondary>
        <Ad adslot="/21799560237/Feed/Feed-Item3" width={336} height={280} />
      </Segment>
    );
  }
}
