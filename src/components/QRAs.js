import React from 'react';
import {Picture} from './Picture'
import Phone from 'react-icons/lib/md/phone-forwarded'
import {QRA} from  './QRA'
import {Grid, Row, Col} from 'react-bootstrap'
export class QRAs extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        return (
            <Grid>
                <Row>
                <Col xs={1} md={1}>
                    <Picture img={this.props.qra_owner} h={'60'} w={'60'} />
                </Col>
                <Col xs={2} md={2}>
                    <Phone/>
                </Col>
                    <Col xs={1} md={1}>
                        <Grid>
                            <Row>
                                { this.props.qras.map((qra, i) =>
                                    <Col key={i} xs={1} md={1}>
                                        <QRA key={i} qra={qra}/>
                                    </Col>
                                )}
                            </Row>
                        </Grid>
                    </Col>
                </Row>

            </Grid>
        )
    }
}