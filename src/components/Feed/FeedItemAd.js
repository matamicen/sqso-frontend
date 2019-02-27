import React from "react";

import "../../styles/style.css";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";

import AD from 'react-google-publisher-tag';
// import {Bling as GPT} from "react-gpt";
export default class FeedItemAd extends React.PureComponent {

    render() {
        
        return (
        <Segment raised >
        
               
        
        
        <div id="ad-1" style={{textAlign: 'center'}}>
        <AD path="21799560237/Feed/Feed-Item3" dimensions = {[[336, 280]]} />
            </div>            
        </Segment>
        )
    }
}
