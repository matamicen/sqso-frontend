import React, {Component} from 'react'

import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import QRCode from "qrcode.react";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from '../../actions/Actions';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

class QsoItemOptions extends Component {

    state = {
        showReportContent: false,
        showMessage: false
    }
    handleOnSubmit(e) {

        e.preventDefault();
        if (!e.target.comments.value) 
            return;
        var apigClient = window
            .apigClientFactory
            .newClient({});
        var datetime = new Date();
        var params = {
            "Authorization": this.props.token
        };
        var body = {
            "idqso": this.props.idqso,
            "detail": e.target.comments.value,
            "datetime": datetime
        };
        var additionalParams = {};
        apigClient
            .contentReportedPost(params, body, additionalParams)
            .then(function (result) {
                
                if (result.data.error > 0) {                 
                  
                } else {
                    this.open()
                }
            }.bind(this))
            .catch(function (error) {
                console.log("error");
                console.error(error);
            });

    }
    openReportedContent = () => this.setState({showReportContent: true})
    open = () => this.setState({showMessage: true})
    close = () => {this.setState({showMessage: false})
                   this.setState({showReportContent:false})}
    render() {
        const {showMessage, showReportContent} = this.state
        return (
            <Dropdown
                icon='ellipsis vertical'
                size='tiny'
                button
                className='icon'
                pointing="right">
                <Dropdown.Menu>

                    <Modal         
                        size='tiny'
                        closeIcon
                        trigger={< Dropdown.Item icon = 'qrcode' text = 'Show QR Code' />}>
                        <Modal.Header>QR Code</Modal.Header>
                        <Modal.Content>
                            <Grid centered>
                                <Segment raised>
                                    <QRCode value={window.location.origin + '/qso/' + this.props.idqso}/>
                                </Segment>
                            </Grid>
                        </Modal.Content>
                    </Modal>

                    {this.props.currentQRA === this.props.qso_owner && <Dropdown.Item icon='delete' text='Delete QSO'/>}
                    {this.props.currentQRA && this.props.currentQRA !== this.props.qso_owner && <Modal
                        open={showReportContent}          
                        onOpen={this.openReportedContent}                        
                        size='tiny'
                        closeIcon
                        trigger={< Dropdown.Item icon = 'warning' text = 'Report Content' />}>
                        <Modal.Header>
                            Help Us Understand What's Happening</Modal.Header>
                        <Modal.Content>
                            <Form
                                onSubmit={this
                                .handleOnSubmit
                                .bind(this)}>
                                <Form.TextArea
                                    required
                                    name='comments'
                                    label='Comments'
                                    placeholder='Why do you think we should remove this content?'/>
                                <Form.Button>Submit</Form.Button>

                                <Modal
                                    dimmer={false}
                                    open={showMessage}
                                    onOpen={this.open}
                                    onClose={this.close}
                                    size='small'>
                                    <Modal.Header>Report Content</Modal.Header>
                                    <Modal.Content>
                                        <p>Content Reported!</p>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button icon='check' content='Close' onClick={this.close}/>
                                    </Modal.Actions>
                                </Modal>
                            </Form>
                        </Modal.Content>
                    </Modal>
                } </Dropdown.Menu>
            </Dropdown>
        )
    };

};

const mapStateToProps = (state) => ({token: state.default.userData.token});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QsoItemOptions);
