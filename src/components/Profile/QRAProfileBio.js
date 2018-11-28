import React, {Fragment} from 'react'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form'
import Container from 'semantic-ui-react/dist/commonjs/elements/Container'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Header from 'semantic-ui-react/dist/commonjs/elements/Header'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider'
const QRAProfileBio = (props) => (
    <Fragment>
        <Segment>
            <Container fluid>
                <Header as='h2'>Bio</Header>
                {props.qraInfo.bio
                    ? props.qraInfo.bio
                    : ""}
            </Container>
            <Divider section/>
        </Segment>
        <Segment>
        <Form size='mini'>
            <Form.Group widths={2}>
                <Form.Input
                    label='First name'
                    width={4}
                    //   error="false"
                    //  required="false"
                    //defaultValue=""
                    readOnly
                    value={props.qraInfo.firstname ? props.qraInfo.firstname : ""}
                />
                <Form.Input
                    label='Last name'
                    // placeholder='Last name'
                    width={4}
                    // error="false"
                    // required="false"
                    //defaultValue=""
                    readOnly
                    value={props.qraInfo.lastname ? props.qraInfo.lastname : ""}
                />
            </Form.Group>
            <Form.Group widths={2}>
                <Form.Input
                    label='Email'
                    width={4}
                    //   error="false"
                    //  required="false"
                    //defaultValue=""
                    readOnly
                    value={props.qraInfo.email ? props.qraInfo.email : ""}
                />
                <Form.Input
                    label='Phone'
                    // placeholder='Last name'
                    width={4}
                    // error="false"
                    // required="false"
                    //defaultValue=""
                    readOnly
                    value={props.qraInfo.phone ? props.qraInfo.phone : ""}
                />
            </Form.Group>
            <Form.Input label='Birthday'
                //placeholder='Address'
                        width={4}
                //      error="false"
                //    required=false
                //defaultValue=""
                        readOnly
                        value={props.qraInfo.birthday ? props.qraInfo.birthday : ""}
            />
            <Form.Input label='Address'
                //placeholder='Address'
                        width={4}
                //      error="false"
                //    required=false
                //defaultValue=""
                        readOnly
                        value={props.qraInfo.address ? props.qraInfo.address : ""}
            />
            <Form.Group widths={3}>
                <Form.Input label='City'
                    //placeholder='Address'
                            width={4}
                    //      error="false"
                    //    required=false
                    //defaultValue=""
                            readOnly
                            value={props.qraInfo.city ? props.qraInfo.city : ""}
                />
                <Form.Input label='State'
                    //placeholder='Address'
                            width={4}
                    //      error="false"
                    //    required=false
                    //defaultValue=""
                            readOnly
                            value={props.qraInfo.state ? props.qraInfo.state : ""}
                />
            </Form.Group>
            <Form.Group widths={2}>
                <Form.Input label='ZIP Code'
                    //placeholder='Address'
                            width={4}
                    //      error="false"
                    //    required=false
                    //defaultValue=""
                            readOnly
                            value={props.qraInfo.zipcode ? props.qraInfo.zipcode : ""}
                />
                < Form.Input label='Country'
                    //placeholder='Address'
                             width={4}
                    //      error="false"
                    //    required=false
                    //defaultValue=""
                             readOnly
                             value={props.qraInfo.country ? props.qraInfo.country : ""}
                />

            </Form.Group>
            <Form.Input label='cqzone'
                //placeholder='Address'
                        width={4}
                //      error="false"
                //    required=false
                //defaultValue=""
                        readOnly
                        value={props.qraInfo.cqzone ? props.qraInfo.cqzone : ""}
            />
            <Form.Input label='iotadesignator'
                //placeholder='Address'
                         width={4}
                //      error="false"
                //    required=false
                //defaultValue=""
                         readOnly
                         value={props.qraInfo.iotadesignator ? props.qraInfo.iotadesignator : ""}
            />
            <Form.Input label='licenseclass'
                //placeholder='Address'
                        width={4}
                //      error="false"
                //    required=false
                //defaultValue=""
                        readOnly
                        value={props.qraInfo.licenseclass ? props.qraInfo.licenseclass : ""}
            />
            <Form.Input label='qslinfo'
                //placeholder='Address'
                         width={4}
                //      error="false"
                //    required=false
                //defaultValue=""
                         readOnly
                         value={props.qraInfo.qslinfo ? props.qraInfo.qslinfo : ""}
            />
        </Form>
        </Segment>
    </Fragment>

);
export default QRAProfileBio
