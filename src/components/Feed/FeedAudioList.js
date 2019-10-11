import React from "react";
import FeedAudio from "./FeedAudio";
import Item from "semantic-ui-react/dist/commonjs/views/Item";

export default class FeedAudioList extends React.Component {
  render() {
    if (this.props.mediaList.length > 0) {
      return (
        <Item.Group style={{ margin: "0px" }}>
          {this.props.mediaList.map((m, i) => (
            <Item key={i} style={{ margin: "6px" }}>
              <FeedAudio
                key={i}
                index={i}
                media={m}
                qso_owner={this.props.qso_owner}
              />
            </Item>
          ))}
        </Item.Group>
      );
    } else {
      return null;
    }
  }
}
