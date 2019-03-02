import React, { Component } from 'react';

import "../../styles/style.css";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";


import {Bling as GPT} from "react-gpt";

class AdUnit extends Component {

	componentDidMount() {
        // this.beginGPTsetup();
        window.googletag.cmd.push(function() { window.googletag.display('div-gpt-ad-1551538079958-0'); });
	}

	beginGPTSetup = () => {
        // Begin GPT slot rendering, etc.
       
	}

	render() {
		return (
			<div id='ad-selector-abc'></div>
		);
	}
}

export default class FeedItemAd extends React.PureComponent {
    state = {
		// Ensure that the GPTHasLoaded boolean is false
		GPTHasLoaded: false
	}
    componentDidMount = () => {
        const { googletag: { cmd }} = window;

		// Feel free to get really paranoid here and check for Array-ness, too.
		if (cmd) {
			// Enqueue a function onto GPT
			cmd.push(() => this.setState({ GPTHasLoaded: true }))
		}
    }
    render() {
        const { state: { GPTHasLoaded }} = this;
        return (
            <Segment raised>
            
            <div id="ad-1" style={{textAlign: 'center'}}>
                    {/* <GPT
                        adUnitPath="/21799560237/Feed/Feed-Item3"
                        slotSize={[336, 280]}
                    />  */}
                { GPTHasLoaded && <AdUnit /> }
                </div>             
                   
            </Segment>
        )
    }
}
