import React from "react";
import { Label} from "semantic-ui-react";
import {Link} from 'react-router-dom'

export class QRA extends React.Component {
    render() {

        return (
        <Label image>
            <img src={this.props.qra.profilepic} alt=""/>
            <Link to={"/" + this.props.qra.qra}> {this.props.qra.qra}</Link>
        </Label>

        )
    }
}