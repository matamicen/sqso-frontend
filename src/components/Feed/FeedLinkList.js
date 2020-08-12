import React, { Fragment } from "react";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import Item from "semantic-ui-react/dist/commonjs/views/Item";
import FeedLink from "./FeedLink";

export default class FeedLinkList extends React.Component {
  render() {
    if (this.props.links.length > 0) {
      return (
        <Fragment>
          <Divider hidden style={{ marginTop: "0.5vh", marginBottom: "0.5vh" }} />
          <Item.Group style={{ marginTop: "0.5vh", marginBottom: "0.5vh" }}>
            {this.props.links.map((l, i) => (
              <Item key={i} style={{ marginTop: "0.5vh", marginBottom: "0.5vh" }}>
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
