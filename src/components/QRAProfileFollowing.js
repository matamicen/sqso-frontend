import React from 'react'
import {Image, List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const QRAProfileFollowing = (props) => (
    <div>
        <List horizontal relaxed>
            {props.following ?
                props.following.map((qra, i) =>
                    <List.Item key={qra.qra}>
                        {qra.profilepic ? <Image avatar src={qra.profilepic}/> : ""}

                        <List.Content>
                            <List.Header as='a'><Link to={"/" + qra.qra}> {qra.qra}</Link></List.Header>
                        </List.Content>
                    </List.Item>
                )
                : ""
            }
        </List>

    </div>
);
export default QRAProfileFollowing

