import React, { Fragment } from "react";
import FeedAudio from "./FeedAudio";
import Item from "semantic-ui-react/dist/commonjs/views/Item";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import * as Sentry from "@sentry/browser";
export default class FeedAudioList extends React.Component {
  constructor() {
    super();
    this.state = { error: null };
  }
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
    if (this.props.mediaList.length > 0) {
      return (
        <Fragment>
          <Divider />
          <Item.Group>
            {this.props.mediaList.map((m, i) => (
              <Item key={i}>
                <FeedAudio
                  key={i}
                  index={i}
                  media={m}
                  qso_owner={this.props.qso_owner}
                />
              </Item>
            ))}
          </Item.Group>
        </Fragment>
      );
    } else {
      return null;
    }
  }
}
