import React, { Fragment } from "react";
import Item from "semantic-ui-react/dist/commonjs/views/Item";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import FeedLink from "./FeedLink";

export default class FeedLinkList extends React.Component {
  render() {
    if (this.props.links.length > 0) {
      return (
        <Fragment>
          <Divider hidden style={{ marginTop: "1vh", marginBottom: "1vh" }} />
          <Item.Group style={{ marginTop: "1vh", marginBottom: "1vh" }}>
            {this.props.links.map((l, i) => (
              <Item key={i} style={{ marginTop: "1vh", marginBottom: "1vh" }}>
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
