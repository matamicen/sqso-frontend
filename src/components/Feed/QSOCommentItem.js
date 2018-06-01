import React from "react";

import Item from 'semantic-ui-react/dist/commonjs/views/Item'
import Comment from 'semantic-ui-react/dist/commonjs/views/Comment'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";

class QSOCommentItem extends React.Component {
    state = {
        showReportContent: false,
        showMessage: false,
        comment: null
    }
    openReportedContent = () => this.setState({showReportContent: true})
    closeReportedContent = () => this.setState({showReportContent: false})
    open = () => this.setState({showMessage: true})
    close = () => {
        this.setState({showMessage: false})
        this.setState({showReportContent: false})
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
            "idqso": this.props.comment.idqso,
            "idcomment": this.props.comment.idqsos_comments,
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
        var now = new Date();
        var year;
        var month;
        var commentDate = new Date(this.props.comment.datetime);
        var timestamp = "";

        if (this.props.comment.datetime) {
            // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/
            // Date/toLocaleString
            if (now.getMonth() !== commentDate.getMonth()) {
                month = commentDate.toLocaleString('en-us', {month: "long"});
                timestamp = commentDate.getDate() + " of " + month;
            }

            if (now.getYear() !== commentDate.getYear()) {
                year = commentDate.getYear();
                timestamp = timestamp + " of " + year;
            }
            if (timestamp) 
                timestamp = timestamp + ' at ';
            
            timestamp = timestamp + commentDate.getHours() + ":" + commentDate.getMinutes();
        }
        const {showMessage, showReportContent} = this.state
        
        return (
            
            <Comment>
                <Comment.Content>
                    <Item.Extra>
                        { this.props.comment.qra !== this.props.currentQRA && 
                        <div
                            style={{
                            float: 'right'
                        }}>
                     
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
                                </Dropdown.Menu>
                            </Dropdown >
                                                </div> }
                    </Item.Extra>
                    < Comment.Author >
                        <Link to={"/" + this.props.comment.qra}>{this
                                .props
                                .comment
                                .qra
                                .toUpperCase()}</Link>
                    </Comment.Author>
                    <Comment.Metadata>
                        <span>{timestamp}
                        </span >
                    </Comment.Metadata>
                    < Comment.Text >
                        {this.props.comment.comment
}
                    </Comment.Text>
                </Comment.Content>
            </Comment>
        );
    }
}

const mapStateToProps = (state) => ({token: state.default.userData.token,  currentQRA: state.default.userData.qra});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(QSOCommentItem);
