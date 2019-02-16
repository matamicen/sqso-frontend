import React from "react";

import "../../styles/style.css";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";

import Image from "semantic-ui-react/dist/commonjs/elements/Image";
export default class FeedItemAd extends React.PureComponent {
    // componentDidMount() {     (window.adsbygoogle = window.adsbygoogle ||
    // []).push({}); }
    // componentDidUpdate(prevProps, prevState) {this
    //     .props
    //     .recalculateRowHeight(this.props.index)}
   
    render() {
        
        return (
        <Segment raised >
        
            <a href={this.props.ad.url}>
                <Image
                    src={this.props.ad.avatar}
                    size='mini'
                    avatar
                    style={{
                    width: '35px',
                    height: '35px'
                }}/> {this.props.ad.name}
            </a>                
                
             <img
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
                    
                }}/>
          </Segment>
        )
    }
}
