import React from "react";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';

import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal'

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
    delete(){
        this.props.actions.doDeleteMedia(this.props.idqsos_media, this.props.idqso, this.props.token)
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
            <div>
                {this.props.optionsCaller === 'FeedImage' && this.props.currentQRA &&
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
                                    .handleOnSubmit
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
                    {
                        this.props.optionsCaller === 'FeedImage' && this.props.currentQRA === this.props.qso_owner && 
                        <Dropdown.Item icon='delete' text='Delete Photo' onClick={this.delete.bind(this)}/>

                    }
                    {/* END FEED IMAGE DELETE CONTENT */
                    } </Dropdown.Menu>
             </Dropdown>
            } </div>
        )
    }

}

const mapStateToProps = (state) => ({token: state.default.userData.token, currentQRA: state.default.userData.qra});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(FeedOptionsMenu);
