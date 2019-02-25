import React from "react";

import "../../styles/style.css";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { DFPSlotsProvider, AdSlot } from 'react-dfp';
import AD from 'react-google-publisher-tag';
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
export default class FeedItemAd extends React.PureComponent {
    // componentDidMount() {     (window.adsbygoogle = window.adsbygoogle ||
    // []).push({}); }
    // componentDidUpdate(prevProps, prevState) {this
    //     .props
    //     .recalculateRowHeight(this.props.index)}
    // componentDidMount() {
    //     window.googletag.cmd.push(function() {
    //         window.googletag.defineSlot('21799560237/Feed-Item',  'div-1').addService(window.googletag.pubads());
    //         window.googletag.pubads().enableSingleRequest();
    //         window.googletag.enableServices();
    //     });
    //     window.googletag.cmd.push(function() { window.googletag.display('div-1'); });
    // }
    render() {
        
        return (
        <Segment raised >
        
    
            <div id="application">
        <AD path="21799560237/Feed-Item" />
        
      </div>
        </Segment>
        )
    }
}
