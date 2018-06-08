import React from "react";

import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal'

import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
class FeedImage extends React.Component {
    state = {
        showReportContent: false,
        showMessage: false

    } 
    openReportedContent = () => this.setState({showReportContent: true})
    closeReportedContent = () => this.setState({showReportContent: false})
    open = () => this.setState({showMessage: true})
    close = () => {
        this.setState({showMessage: false})
        this.setState({showReportContent: false})
    }
    handleOnSubmit(e) {
    
        e.preventDefault()

        
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
            "idmedia": e.target.idmedia.value,
            "detail": e.target.comments.value,
            "datetime": datetime
        };
        var additionalParams = {};
        apigClient
            .contentReportedPost(params, body, additionalParams)
            .then(function (result) {

                if (result.data.error > 0) {} else {
                    this.open()
                }
            }.bind(this))
            .catch(function (error) {
                console.log("error");
                console.error(error);
            });

    }
    render() {  
        const {showMessage, showReportContent} = this.state      
        
        return (
            <Modal                
                closeIcon               
                trigger=
                { 
                   <Image size = 'large' centered src = { this.props.img[0].url } onLoad = { this.props.measure } onClick={this.handleOpenModal}/>}
                    >
                  
                
                <Modal.Content image scrolling>
                    <Modal.Description>
                        {this
                            .props
                            .img
                            .map(m => 
                            <Segment key={m.idqsos_media} raised textAlign='center'>
                                <div
                                            style={{
                                            float: 'right'
                                        }}>
                                    { this.props.currentQRA && this.props.currentQRA !== this.props.qso_owner &&
                                            <Dropdown
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
                                                        trigger={< Dropdown.Item icon = 'warning' text = 'Report Photo' />}>
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
                                                                    placeholder='Why do you think we should remove this photo?'/>
                                                                    <Form.Input type='hidden' name='idmedia' value={m.idqsos_media} />
                                                                <Form.Button>Submit</Form.Button>

                                                                <Modal
                                                                    dimmer={false}
                                                                    open={showMessage}
                                                                    onOpen={this.open}
                                                                    onClose={this.close}
                                                                    size='small'>
                                                                    <Modal.Header>Report Photo</Modal.Header>
                                                                    <Modal.Content>
                                                                        <p>Photo Reported!</p>
                                                                    </Modal.Content>
                                                                    <Modal.Actions>
                                                                        <Button icon='check' content='Close' onClick={this.close}/>
                                                                    </Modal.Actions>
                                                                </Modal>
                                                            </Form>
                                                        </Modal.Content>
                                                    </Modal>
                                                </Dropdown.Menu>
                                            </Dropdown >
                                    }
                                        </div>
                                <Image key={m.idqsos_media} wrapped centered src={m.url}/>
                                
                                <p>{m.description}</p>
                            </Segment>)}
                    </Modal.Description>
                </Modal.Content>
            </Modal>

        )
    }
}

const mapStateToProps = (state) => (
    
    {token: state.default.userData.token,  
        currentQRA: state.default.userData.qra});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(FeedImage);

