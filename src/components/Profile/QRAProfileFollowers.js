import React from 'react'

import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import List from 'semantic-ui-react/dist/commonjs/elements/List'
import {Link} from 'react-router-dom'

const QRAProfileFollowers = (props) => {

    return (
        <div>
            <List horizontal relaxed>
                {props.followers ?
                    props.followers.map((qra, i) =>
                        <List.Item key={qra.qra}>
                            {qra.avatarpic ? <Image avatar src={qra.avatarpic}/> : ""}

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

