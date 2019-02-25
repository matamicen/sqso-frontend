import React from "react";

import "../../styles/style.css";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";

import AD from 'react-google-publisher-tag';

export default class FeedItemAd extends React.PureComponent {

    render() {
        
        return (
        <Segment raised >
        
    
            <div id="application">
        <AD path="21799560237/Feed/Feed-Item" />
        
      </div>
        </Segment>
        )
    }
}
