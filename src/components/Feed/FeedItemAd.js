import React from "react";


import "../../styles/style.css";
export default class FeedItemAd extends React.Component {
    // componentDidMount() {
    //     (window.adsbygoogle = window.adsbygoogle || []).push({});
    // }

    render() {
        // return (<ins class="adsbygoogle"
        
        // data-ad-client="ca-pub-XXXX"
        // data-ad-test="on"
        // data-ad-slot="XXX"
        // data-ad-format="auto"></ins>);
        console.log(this.props.source)
        switch(this.props.source) {
        case 'QSODETAIL':
        return  <img src="../Banner.png" alt='alt' style={{width:'100%'}}/>
        case 'FEED':
        return  <img src="Banner.png" alt='alt'style={{width:'100%'}}/>
        case 'QRA':
        return  <img src="Banner.png" alt='alt' style={{width:'100%'}}/>
        default: return null;
        }
    }
}
