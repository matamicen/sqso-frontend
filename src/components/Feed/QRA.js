import React from "react";
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import {Link} from 'react-router-dom'

export default class QRA extends React.Component {
    render() {

        return (
            <Link to={"/" + this.props.qra}>
                    <Image src={this.props.profilepic} size='mini' avatar/>
                    <Label size='large' >
                        {this.props.qra}
                    </Label>
                </Link>
     

        )
    }
}