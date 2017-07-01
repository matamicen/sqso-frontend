import React from "react";
import {Feed, Label} from "semantic-ui-react";
export class QRA extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {

        return (
        <Label image>
            <img src={this.props.qra.profilepic} alt=""/>
            <Feed.User> {this.props.qra.qra} </Feed.User>
        </Label>

        )
    }
}