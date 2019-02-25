import React from "react";

import "../../styles/style.css";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";

import AD from 'react-google-publisher-tag';
import {Bling as GPT} from "react-gpt";
export default class FeedItemAd extends React.PureComponent {

    render() {
        
        return (
        <Segment raised >
        
               
        <AD path="21799560237/Feed/Feed-Item3" />
        
        <div id="ad-1">
                <GPT
                    adUnitPath="/21799560237/Feed/Feed-Item3"
                    slotSize={[336, 280]}
                />
            </div>
            <div id="ad-2">
                <GPT
                    adUnitPath="/21799560237/Feed/Feed-Item3"
                    slotSize={[468, 60]}
                />
            </div>
        </Segment>
        )
    }
}
