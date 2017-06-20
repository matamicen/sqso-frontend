import React from 'react';
import {Audio} from './Audio';
import {Grid, Col, Row} from 'react-bootstrap'
export class AudioList extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        if (this.props.mediaList.length > 0 ) {
            return (
                <div className="AudioList">
                    <Grid>

                    {this.props.mediaList.map((m, i) =>
                    <Row>
                        <Col key={i}>
                            <Audio key = {i}
                                url = {m.url}/>
                        </Col>
                    </Row>
                )}
                    </Grid>
                </div>

        )
        }
        else
        { return null }

    }
}