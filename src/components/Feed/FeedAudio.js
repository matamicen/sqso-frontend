import React from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import {API} from 'aws-amplify'
import FeedOptionsMenu from './FeedOptionsMenu';
class FeedAudio extends React.Component {

    constructor() {
        super();
        this.state = {
            showReportContent: false,
            showMessage: false,
            audioNotVisible: true
        }
        this.onClick = this
            .onClick
            .bind(this)
    }

    // openReportedContent = () => this.setState({showReportContent: true})
    // closeReportedContent = () => this.setState({showReportContent: false})
    // open = () => this.setState({showMessage: true})
    // close = () => {
    //     this.setState({showMessage: false})
    //     this.setState({showReportContent: false})
    // }
    // handleOnSubmit(e) {
    //     var datetime = new Date();
    //     e.preventDefault()

    //     if (!e.target.comments.value) 
    //         return;
    //     let apiName = 'superqso';
    //     let path = '/content-reported';
    //     let myInit = {
    //         body: {
    //             "idqso": this.props.media.idqso,
    //             "idmedia": this.props.media.idqsos_media,
    //             "detail": e.target.comments.value,
    //             "datetime": datetime
    //         }, // replace this with attributes you need
    //         headers: {
    //             "Authorization": this.props.token
    //         } // OPTIONAL
    //     }
    //     API
    //         .post(apiName, path, myInit)
    //         .then(response => {
    //             if (response.error > 0) {} else {
    //                 this.open()
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         });

    // }
    onClick() {
        this.setState({audioNotVisible: false})
    }
    render() {

        // const {showMessage, showReportContent} = this.state
        if (this.props.media.url) {

            if (this.state.audioNotVisible) {
                return (
                    <Button icon onClick={this.onClick}>
                        <Icon name='play'/>
                    </Button>
                )
            } else {
                return (
                    <div>

                        < audio ref="audio_tag" src={this.props.media.url} controls autoPlay preload="none" controlsList="nodownload"/>

                        <div
                            style={{
                            float: 'right'
                        }}>
                                 
                            <FeedOptionsMenu idqsos_media={this.props.media.idqsos_media} qso_owner={this.props.qso_owner} idqso={this.props.media.idqso} optionsCaller="FeedAudio"/>                                    
                                        
                            {/* <Dropdown
                                icon='ellipsis vertical'
                                size='tiny'
                                button
                                className='icon'
                                pointing="right">

                                <Dropdown.Menu>
                                    <Modal
                                        open={showReportContent}
                                        onOpen={this.openReportedContent}
                                        onClose={this.closeReportedContent}
                                        size='tiny'
                                        closeIcon
                                        trigger={< Dropdown.Item icon = 'warning' text = 'Report Audio' />}>
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
                                                    placeholder='Why do you think we should remove this audio?'/>

                                                <Form.Button>Submit</Form.Button>

                                                <Modal
                                                    dimmer={false}
                                                    open={showMessage}
                                                    onOpen={this.open}
                                                    onClose={this.close}
                                                    size='small'>
                                                    <Modal.Header>Report Audio</Modal.Header>
                                                    <Modal.Content>
                                                        <p>Audio Reported!</p>
                                                    </Modal.Content>
                                                    <Modal.Actions>
                                                        <Button icon='check' content='Close' onClick={this.close}/>
                                                    </Modal.Actions>
                                                </Modal>
                                            </Form>
                                        </Modal.Content>
                                    </Modal>
                                </Dropdown.Menu>
                            </Dropdown > */}
                        </div>
                    </div>
                )
            }
        } else {
            return null
        }

    }
}
Audio.propTypes = {
    url: PropTypes.string.isRequired
}
const mapStateToProps = (state) => ({token: state.default.userData.token, currentQRA: state.default.userData.qra});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(FeedAudio);