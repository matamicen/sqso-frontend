import React from "react";
import {Audio} from "./Audio";
import {Item} from 'semantic-ui-react'
export class AudioList extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        if (this.props.mediaList.length > 0) {
            return (

                <Item.Group>
                    {this.props.mediaList.map((m, i) =>
                        <Item key={i}>
                            <a>
                                <Audio key={i}
                                       url={m.url}/>
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