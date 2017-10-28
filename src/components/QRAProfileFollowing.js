import React from 'react'
import {Image, List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const QRAProfileFollowing = () => (
    <div>
        <List horizontal relaxed>
            <List.Item>
                <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg'/>
                <List.Content>
                    <List.Header as='a'><Link to={"/" + "LU7ACH"}> LU7ACH</Link></List.Header>
                </List.Content>
            </List.Item>
            <List.Item>
                <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/stevie.jpg'/>
                <List.Content>
                    <List.Header as='a'><Link to={"/" + "LU7ACH"}> LU7ACH</Link></List.Header>
                </List.Content>
            </List.Item>
            <List.Item>
                <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg'/>
                <List.Content>
                    <List.Header as='a'><Link to={"/" + "LU7ACH"}> LU7ACH</Link></List.Header>
                </List.Content>
            </List.Item>
        </List>

    </div>
);
export default QRAProfileFollowing

