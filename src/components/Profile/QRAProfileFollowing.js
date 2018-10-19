import React from 'react'
import List from 'semantic-ui-react/dist/commonjs/elements/List'
import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import {Link} from 'react-router-dom'

const QRAProfileFollowing = (props) => (
    <div>
        <List horizontal relaxed>
            {props.following ?
                props.following.map((qra, i) =>
                    <List.Item key={qra.qra}>
                        {qra.avatarpic ? <Image avatar src={qra.avatarepic}/> : ""}

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

