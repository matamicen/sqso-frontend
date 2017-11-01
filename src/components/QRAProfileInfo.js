import React from 'react'
import {Form} from 'semantic-ui-react'


const QRAProfileInfo = (props) => (

    <div>
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
            < Form.Input label='iotadesignator'
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
            < Form.Input label='qslinfo'
                //placeholder='Address'
                         width={4}
                //      error="false"
                //    required=false
                //defaultValue=""
                         readOnly
                         value={props.qraInfo.qslinfo ? props.qraInfo.qslinfo : ""}
            />
        </Form>
    </div>

);
export default QRAProfileInfo

