import React from "react";

import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import {Link} from 'react-router-dom'


export default class QRA extends React.Component {
    render() {

        return (

            <Link to={"/" + this.props.qra}>
                
                    <div style={{
                        display: 'grid',
                        justifyItems: 'center'
                    }}>
                        <div
                            style={{
                            justifySelf: 'center',
                            width: '60px',
                            height: '60px'
                        }}>
                            <Image
                               size='medium'
                                src={this.props.avatarpic + '?' + Date.now()}
                                circular/>
                        </div>
                        <div
                            style={{
                            justifySelf: 'center'
                        }}>
                            {this.props.qra}</div>

                    </div>
                
            </Link>

        )
    }
}