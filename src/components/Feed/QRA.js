import React from "react";
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import {Link} from 'react-router-dom'

export default class QRA extends React.Component {
    render() {

        return (

            <div
                style={{
                width: '55px',
                height: '65px',
                display: 'flex'
            }}>
                <Link to={"/" + this.props.qra}>
                    <div style={{
                        display: 'flex',
                        height: '40px',
                    }}>
                    <Image
                        style={{
                             width: '100%'
                        }}
                        src={this.props.avatarpic}
                        size='mini'
                        />
                    </div>
                    <div style={{
                        display: 'flex'
                    }} >
                        <Label>
                            {this.props.qra}
                        </Label>
                    </div>
                </Link>
            </div>

        )
    }
}