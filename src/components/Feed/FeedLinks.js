import React from "react";
import Item from 'semantic-ui-react/dist/commonjs/views/Item'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider'
export default class FeedAudioList extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
console.log(this.props.links)
        if (this.props.links.length > 0) {
            return (
                <div>
                    <Divider/>
                    <Item.Group >
                        {this
                            .props
                            .links
                            .map((l, i) => <Item key={i}>
                               
                                   {l}
                               
                            </Item>)}
                    </Item.Group>

                </div>
            )
        } else {
            return null
        }

    }
}