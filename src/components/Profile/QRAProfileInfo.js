import React, {Fragment} from 'react'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form'

import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'

import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal'

import * as Actions from '../../actions/Actions';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



import "../../styles/style.css";
class QRAProfileInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        };
    }

    close = () => this.setState({open: false})
    open = () => this.setState({open: true})
    handleOnSaveBio = (e) => {
        console.log("handleOnSaveBio")
        // console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
        this.close();
    };

    render() {
        const {open} = this.state
        return (
            <Fragment>
                <Modal closeIcon open={open} onClose={this.close}>
                    <Modal.Header>
                        Edit Info
                    </Modal.Header>
                    <Modal.Content></Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => this.close()}>Cancel</Button>
                        <Button positive onClick={() => this.handleOnSaveBio()}>Save</Button>
                    </Modal.Actions>
                </Modal>
                <Segment raised>
                    {this.props.isAuthenticated && this.props.currentQRA === this.props.qraInfo.qra && <div style={{
                        float: 'right'
                    }}>

                        <Dropdown
                            icon='ellipsis vertical'
                            size='tiny'
                            className='icon'
                            pointing="right">
                            <Dropdown.Menu>
                                < Dropdown.Item text='Edit Bio' onClick={this.open}/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
}
                    <Form size='mini'>
                        <Form.Group widths={2}>
                            <Form.Input
                                label='First name'
                                width={4}
                                readOnly
                                value={this.props.qraInfo.firstname
                                ? this.props.qraInfo.firstname
                                : ""}/>
                            <Form.Input
                                label='Last name'
                                width={4}
                                readOnly
                                value={this.props.qraInfo.lastname
                                ? this.props.qraInfo.lastname
                                : ""}/>
                        </Form.Group>
                        <Form.Group widths={2}>
                            <Form.Input
                                label='Email'
                                width={4}
                                readOnly
                                value={this.props.qraInfo.email
                                ? this.props.qraInfo.email
                                : ""}/>
                            <Form.Input
                                label='Phone'
                                width={4}
                                readOnly
                                value={this.props.qraInfo.phone
                                ? this.props.qraInfo.phone
                                : ""}/>
                        </Form.Group>
                        <Form.Input
                            label='Birthday'
                            type='date'
                            width={4}
                            readOnly
                            value={new Date(this.props.qraInfo.birthday)
                            .toISOString()
                            .substring(0, 10)}/>

                        <Form.Input
                            label='Address'
                            width={4}
                            readOnly
                            value={this.props.qraInfo.address
                            ? this.props.qraInfo.address
                            : ""}/>
                        <Form.Group widths={3}>
                            <Form.Input
                                label='City'
                                width={4}
                                readOnly
                                value={this.props.qraInfo.city
                                ? this.props.qraInfo.city
                                : ""}/>
                            <Form.Input
                                label='State'
                                width={4}
                                readOnly
                                value={this.props.qraInfo.state
                                ? this.props.qraInfo.state
                                : ""}/>
                        </Form.Group>
                        <Form.Group widths={2}>
                            <Form.Input
                                label='ZIP Code'
                                width={4}
                                readOnly
                                value={this.props.qraInfo.zipcode
                                ? this.props.qraInfo.zipcode
                                : ""}/>
                            <Form.Input
                                label='Country'
                                width={4}
                                readOnly
                                value={this.props.qraInfo.country
                                ? this.props.qraInfo.country
                                : ""}/>

                        </Form.Group>
                        <Form.Input
                            label='cqzone'
                            width={4}
                            readOnly
                            value={this.props.qraInfo.cqzone
                            ? this.props.qraInfo.cqzone
                            : ""}/>
                        <Form.Input
                            label='iotadesignator'
                            width={4}
                            readOnly
                            value={this.props.qraInfo.iotadesignator
                            ? this.props.qraInfo.iotadesignator
                            : ""}/>
                        <Form.Input
                            label='licenseclass'
                            width={4}
                            readOnly
                            value={this.props.qraInfo.licenseclass
                            ? this.props.qraInfo.licenseclass
                            : ""}/>
                        <Form.Input
                            label='qslinfo'
                            width={4}
                            readOnly
                            value={this.props.qraInfo.qslinfo
                            ? this.props.qraInfo.qslinfo
                            : ""}/>
                    </Form>
                </Segment>
            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    //state: state,
    currentQRA: state.default.userData.qra,
    isAuthenticated: state.default.userData.isAuthenticated

});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(QRAProfileInfo));
