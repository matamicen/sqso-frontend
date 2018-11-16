import React from "react";
import FeedAudio from "./FeedAudio";
import Item from 'semantic-ui-react/dist/commonjs/views/Item'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider'
export default class FeedAudioList extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {

        if (this.props.mediaList.length > 0) {
            return (
                <div>
                    <Divider/>
                    <Item.Group >
                        {this
                            .props
                            .mediaList
                            .map((m, i) => <Item key={i}>
                               
                                    <FeedAudio key={i} media={m} qso_owner={this.props.qso_owner}/>
                                
                            </Item>)}
                    </Item.Group>

                </div>
            )
        } else {
            return null
        }

    }
}