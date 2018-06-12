import React from "react";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';

import QRCode from "qrcode.react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal'
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";

class FeedOptionsMenu extends React.PureComponent {
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
    deleteMedia(){
        this.props.actions.doDeleteMedia(this.props.idqsos_media, this.props.idqso, this.props.token)
    }
    deleteComment(){
        this.props.actions.doDeleteComment(this.props.idcomment, this.props.idqso, this.props.token)
    }
    deleteQso(){        
        this.props.actions.doDeleteQso( this.props.idqso, this.props.token)
    }
    handleOnSubmitReportComment(e) {

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
            "idcomment": this.props.idcomment,
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
    handleOnSubmitReportQso(e) {

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
    handleOnSubmitReportMedia(e) {

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
           
                
                <Dropdown
                    icon='ellipsis vertical'
                    size='tiny'
                    button
                    className='icon'
                    pointing="right">
                    <Dropdown.Menu>
                        {/* FEED IMAGE REPORT CONTENT */}
                        {this.props.optionsCaller === 'FeedImage' && this.props.currentQRA && this.props.currentQRA !== this.props.qso_owner && <Modal
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
                                    .handleOnSubmitReportMedia
                                    .bind(this)}>
                                    <Form.TextArea
                                        required
                                        name='comments'
                                        label='Comments'
                                        placeholder='Why do you think we should remove this photo?'/>
                                    <Form.Input type='hidden' name='idmedia' value={this.props.idqsos_media}/>
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
                    }
                    {/* END FEED IMAGE REPORT CONTENT */
                    }
                    {/* FEED IMAGE DELETE CONTENT */
                    }
                    {    this.props.optionsCaller === 'FeedImage' && this.props.currentQRA === this.props.qso_owner && 
                        <Dropdown.Item icon='delete' text='Delete Photo' onClick={this.deleteMedia.bind(this)}/>

                    }
                    {/* END FEED IMAGE DELETE CONTENT */
                    } 
                    {/* FEED ITEM QR CODE */
                    }
                    { this.props.optionsCaller === 'FeedItem' &&
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
                    }
                    {/* END FEED ITEM QR CODE */
                    }
                    {/* FEED ITEM DELETE QSO*/
                    }
                    {this.props.optionsCaller === 'FeedItem' && this.props.currentQRA === this.props.qso_owner &&                     
                    <Dropdown.Item icon='delete' text='Delete QSO' onClick={this.deleteQso.bind(this)}/>}
                    {/* END FEED ITEM DELETE QSO*/
                    }
                    {/* FEED ITEM REPORT QSO*/
                    }
                    {this.props.optionsCaller === 'FeedItem' && 
                     this.props.currentQRA && this.props.currentQRA !== this.props.qso_owner && <Modal
                        open={showReportContent}          
                        onOpen={this.openReportedContent}               
                        onClose={this.closeReportedContent}         
                        size='tiny'
                        closeIcon
                        trigger={< Dropdown.Item icon = 'warning' text = 'Report Content' />}>
                        <Modal.Header>
                            Help Us Understand What's Happening</Modal.Header>
                        <Modal.Content>
                            <Form
                                onSubmit={this
                                .handleOnSubmitReportQso
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
                    }
                    { /* END FEED ITEM REPORT QSO*/
                    }
                    {/*  FEED ITEM REPORT COMMENT */}
                    {this.props.optionsCaller === 'FeedComment' && this.props.currentQRA && this.props.comment_owner !== this.props.currentQRA && 
                        <Modal
                            open={showReportContent}
                            onOpen={this.openReportedContent}
                            onClose={this.closeReportedContent}         
                            size='tiny'
                            closeIcon
                            trigger={< Dropdown.Item icon = 'warning' text = 'Report Content' />}>
                            <Modal.Header>
                                Help Us Understand What's Happening</Modal.Header>
                            <Modal.Content>

                                <Form
                                    onSubmit={this
                                    .handleOnSubmitReportComment
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
                                        <Modal.Header>Report Comment</Modal.Header>
                                        <Modal.Content>
                                            <p>Comment Reported!</p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button icon='check' content='Close' onClick={this.close}/>
                                        </Modal.Actions>
                                    </Modal>
                                </Form>
                            </Modal.Content>
                        </Modal>
                     }
                     {/* END FEED ITEM REPORT COMMENT */
                    }
                    {/* FEED ITEM DELETE COMMENT*/
                    }
                    {this.props.optionsCaller === 'FeedComment' && this.props.currentQRA === this.props.comment_owner &&                     
                    <Dropdown.Item icon='delete' text='Delete QSO' onClick={this.deleteComment.bind(this)}/>}
                    {/* END FEED ITEM DELETE COMMENT*/
                    }
                    </Dropdown.Menu>
             </Dropdown>
             
        )
    }

}

const mapStateToProps = (state) => ({token: state.default.userData.token, currentQRA: state.default.userData.qra});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(FeedOptionsMenu);
