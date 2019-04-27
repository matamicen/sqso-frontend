import React, { Fragment } from "react";
import Item from "semantic-ui-react/dist/commonjs/views/Item";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import FeedLink from "./FeedLink";
import * as Sentry from "@sentry/browser";
export default class FeedLinkList extends React.Component {
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
    } else console.log(error, errorInfo);
  }
  render() {
    if (this.props.links.length > 0) {
      return (
        <Fragment>
          <Divider />
          <Item.Group>
            {this.props.links.map((l, i) => (
              <Item key={i}>
                <FeedLink key={i} link={l} />
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
