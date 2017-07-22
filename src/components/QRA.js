import React from "react";
import {Feed, Label} from "semantic-ui-react";
import {Link} from 'react-router-dom'
export class QRA extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {

        return (
        <Label image>
            <img src={this.props.qra.profilepic} alt=""/>
            <Feed.User><Link to={"/" + this.props.qra.qra}> {this.props.qra.qra}</Link> </Feed.User>
        </Label>

        )
    }
}