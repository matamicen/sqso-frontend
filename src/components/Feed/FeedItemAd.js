import React from "react";

import "../../styles/style.css";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Ad from "../Ad/Ad";

// import {Bling as GPT} from "react-gpt";

export default class FeedItemAd extends React.PureComponent {
  render() {
    return (
      <Segment raised secondary>
        <Ad adslot="/21799560237/Feed/Feed-Item3" width={336} height={280} />
      </Segment>
    );
  }
}
