import React from "react";
import FeedAudio from "./FeedAudio";
import Item from 'semantic-ui-react/dist/commonjs/views/Item'
export default class FeedAudioList extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        
        if (this.props.mediaList.length > 0) {
            return (

                <Item.Group >
                    {this.props.mediaList.map((m, i) =>
                        <Item key={i}>
                            <a>
                                <FeedAudio key={i}                                       
                                       media={m}/>
                            </a>
                        </Item>
                    )}
                </Item.Group>


            )
        }
        else {
            return null
        }

    }
}