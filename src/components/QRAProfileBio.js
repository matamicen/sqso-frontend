import React from 'react'
import {Container, Divider, Header, Segment} from 'semantic-ui-react'


const QRAProfileBio = (props) => (
    <div>
        <Segment>
            <Container fluid>
                <Header as='h2'>Bio</Header>
                {props.qraInfo.bio ? props.qraInfo.bio : ""}
            </Container>
            <Divider section/>
        </Segment>
    </div>

);
export default QRAProfileBio

