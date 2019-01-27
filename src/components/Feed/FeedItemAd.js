import React from "react";

import "../../styles/style.css";
export default class FeedItemAd extends React.PureComponent {
    // componentDidMount() {     (window.adsbygoogle = window.adsbygoogle ||
    // []).push({}); }
    // componentDidUpdate(prevProps, prevState) {this
    //     .props
    //     .recalculateRowHeight(this.props.index)}
    render() {
        // return (<ins class="adsbygoogle" data-ad-client="ca-pub-XXXX"
        // data-ad-test="on" data-ad-slot="XXX" data-ad-format="auto"></ins>);
        switch (this.props.source) {
            case 'QSODETAIL':
                return <img
                    src="../Banner.png"
                    alt='alt'
                    // onLoad = {this.props.measure}
                    style={{
                        height: '45px',
                        widht:'auto',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        display:'block'
                }}/>
            case 'FEED':
                return <img
                    src="Banner.png"
                    alt='alt'
                    // onLoad = {this.props.measure}
                    style={{
                    height: '45px',
                    // widht:'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display:'block'
                    // height: '',
                    // maxHeight: '100%',
                    
                }}/>
            case 'QRA':
                return <img
                    src="Banner.png"
                    alt='alt'
                    style={{
                        height: '45px',
                        widht:'auto',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        display:'block'
                }}/>
            default:
                return null;
        }
    }
}
