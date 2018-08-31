import React from "react";
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'

import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import API from '@aws-amplify/api';
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import ReactGA from 'react-ga';
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
class QSORePostButton extends React.Component {
    state = {
        showConfirmationRequest: false,
        showMessage: false

    }
    doRePost() {
        if (!this.props.isAuthenticated) 
            return null;
        
        let apiName = 'superqso';
        let path = '/qso-share';
        let qso = (this.props.qso.type === 'SHARE') ? this.props.qso.idqso_shared : this.props.qso.idqsos;
        var datetime = new Date();
        let myInit = {
            body: {
                "qso": qso,
                "datetime": datetime,
                "type": "SHARE"
            }, // replace this with attributes you need
            headers: {
                "Authorization": this.props.token
            } // OPTIONAL
        }
        API
            .post(apiName, path, myInit)
            .then(response => {
                if (response.body.error > 0) {
                    console.error(response.body.message);
                } else {

                   this.closeConfirmationRequest();
                   ReactGA.event({
                    category: 'QSO',
                    action: 'repost'
                  });
                }
            })
            .catch(error => {
                console.log(error)
            });

    }
    openConfirmationRequest = () => { if (this.props.isAuthenticated) 
        this.setState({showConfirmationRequest: true}) }
    closeConfirmationRequest = () => this.setState({showConfirmationRequest: false})
    open = () => this.setState({showMessage: true})
    close = () => {
        this.setState({showMessage: false})
        this.setState({showReportContent: false})
    }
    render() {
        const {showMessage, showConfirmationRequest} = this.state
        return (

            <Modal
                open={showConfirmationRequest}
                onOpen={this.openConfirmationRequest}
                onClose={this.closeConfirmationRequest}
                basic
                size='tiny'
                closeIcon
                trigger={< Button icon > < Icon name = 'retweet' /> </Button>}>
                
                <Header icon='retweet' content='RePost Content'/>
                <Modal.Content>
                    <p>
                        Confirm RePost
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={this.closeConfirmationRequest}>
                        <Icon name='remove'/>
                        No
                    </Button>
                    <Button
                        color='green'
                        inverted
                        onClick={this
                        .doRePost
                        .bind(this)}>
                        <Icon name='checkmark'/>
                        Yes
                    </Button>
                </Modal.Actions>

                <Modal
                    dimmer={false}
                    open={showMessage}
                    onOpen={this.open}
                    onClose={this.close}
                    size='small'>
                    <Modal.Header>RePost Confirmed</Modal.Header>
                    <Modal.Content>
                        <p>RePost Confirmed!</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button icon='check' content='Close' onClick={this.close}/>
                    </Modal.Actions>
                </Modal>

            </Modal>

        );
    }
}

const mapStateToProps = (state) => ({token: state.default.userData.token, 
                                    isAuthenticated: state.default.userData.isAuthenticated});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(QSORePostButton);