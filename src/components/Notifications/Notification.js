import React from "react";

import {Link} from "react-router-dom";
import "../../styles/style.css";
import List from "semantic-ui-react/dist/commonjs/elements/List";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";

export default class Notification extends React.Component {

    render() {
        console.log(this.props)
        let message = 'LU2ACH started to follow LU5MMMM'
        return (

            <List.Item key={m.idqra_notifications}>
                <List.Content floated='right'>

                    <Image avatar src='/images/avatar/small/rachel.png'/>
                </List.Content>
            </List.Item>
        )
    }
}
