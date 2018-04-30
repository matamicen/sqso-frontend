import React from 'react'

import Container from 'semantic-ui-react/dist/commonjs/elements/Container'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Header from 'semantic-ui-react/dist/commonjs/elements/Header'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider'
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

