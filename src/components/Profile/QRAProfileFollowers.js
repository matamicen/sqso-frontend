import React from 'react'
import {Image, List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const QRAProfileFollowers = (props) => {

    return (
        <div>
            <List horizontal relaxed>
                {props.followers ?
                    props.followers.map((qra, i) =>
                        <List.Item key={qra.qra}>
                            {qra.profilepic ? <Image avatar src={qra.profilepic}/> : ""}

                            <List.Content>
                                <List.Header><Link to={"/" + qra.qra}> {qra.qra}</Link></List.Header>
                            </List.Content>
                        </List.Item>
                    )
                    : ""
                }
            </List>

        </div>
    );
};
export default QRAProfileFollowers

