import React from "react";
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import {Link} from 'react-router-dom'

export default class QRA extends React.Component {
    render() {

        return (

            <div
                style={{
                width: '65px',
                display: 'flex'
                
           
            }}>
                <Link to={"/" + this.props.qra}>
                    <div><Image
                        style={{
                width: '100%'
            }}
                        src={this.props.profilepic}
                        size='mini'
                        centered/>
                    </div>
                    <div centered>
                        <Label size='large'>
                            {this.props.qra}
                        </Label>
                    </div>
                </Link>
            </div>

        )
    }
}