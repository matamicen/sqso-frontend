import React from "react";

import "../../styles/style.css";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { DFPSlotsProvider, AdSlot } from 'react-dfp';
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
export default class FeedItemAd extends React.PureComponent {
    // componentDidMount() {     (window.adsbygoogle = window.adsbygoogle ||
    // []).push({}); }
    // componentDidUpdate(prevProps, prevState) {this
    //     .props
    //     .recalculateRowHeight(this.props.index)}
    componentDidMount() {
        window.googletag.cmd.push(function() {
            window.googletag.defineSlot('21799560237/Feed-Item',  'div-1').addService(window.googletag.pubads());
            window.googletag.pubads().enableSingleRequest();
            window.googletag.enableServices();
        });
        window.googletag.cmd.push(function() { window.googletag.display('div-1'); });
    }
    render() {
        
        return (
        <Segment raised >
        
            {/* <a href={this.props.ad.url}>
                <Image
                    src={this.props.ad.avatar}
                    size='mini'
                    avatar
                    style={{
                    width: '35px',
                    height: '35px'
                }}/> {this.props.ad.name}
            </a>                 */}
                
             {/* <img
                src={this.props.ad.img}
                    alt='alt'
                    // onLoad = {this.props.measure}
                    style={{
                    height: this.props.ad.height,
                     widht: this.props.ad.widht,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display:'block'
                    // height: '',
                    // maxHeight: '100%',
                    
                }}/> */}
                 {/* <DFPSlotsProvider dfpNetworkId={'21799560237'}   >
                    <AdSlot adUnit={"Feed-Item"}  />                     
                    </DFPSlotsProvider> 
                 */}
                   <div id="banner">
		<div id="div-1" style={{ height: '600px', width: '160px' }} />
            </div>
        </Segment>
        )
    }
}
