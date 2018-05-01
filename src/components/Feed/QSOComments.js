import React from "react";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form'
import Comment from 'semantic-ui-react/dist/commonjs/views/Comment'
import QSOCommentItem from "./QSOCommentItem";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';

class QSOComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: [],
            comment: null
        };

        this.handleAddComment = this
            .handleAddComment
            .bind(this);

    }

    componentDidMount() {
        if (this.props.qso.comments) 
            this.setState({comments: this.props.qso.comments});
        
        if (this.props.qso.comments) {}
    }

    doComment(c) {

        var apigClient = window
            .apigClientFactory
            .newClient({});

        var params = {
            "Authorization": this.props.state.default.userData.token
        };
        var body = {
            "qso": this.props.qso.idqsos,
            "comment": c.comment,
            "datetime": c.datetime
        };
        var additionalParams = {};
        apigClient
            .qsoCommentPost(params, body, additionalParams)
            .then(function (result) {
                if (result.data.body.error > 0) {
                    console.error(result.data.body.message);
                } else {
                    this.setState({comments: result.data.body.message});
                }
            }.bind(this))
            .catch(function (error) {
                console.log("error");
                console.error(error);
            });
    }

    handleAddComment(e) {

        e.preventDefault();
        if (!e.target.comment.value) 
            return;
        
        var datetime = new Date();
        var comment = {
            qra: this
                .props
                .state
                .default
                .userData
                .qra
                .toUpperCase(),
            comment: e.target.comment.value,
            datetime: datetime
        };
        this.setState({comment: comment});
        this.setState({
            comments: this
                .state
                .comments
                .concat(comment)
        });
        e.target.comment.value = null;

        this.doComment(comment);
    }

    render() {
        console.log(this.state)
        console.log(this.props)
        let comments = null;
        if (this.state.comments) {
            comments = this
                .state
                .comments
                .map((comment, i) => <QSOCommentItem key={i} comment={comment}/>)
            this
                .props
                .recalculateRowHeight();
        };
        let form = null;
        if (this.props.state.default.userData.isAuthenticated) {
            form = <Form
                size="mini"
                reply
                onSubmit={this
                .handleAddComment
                }>
                <Form.Group>
                    <input placeholder='Comment' name="comment"/>
                    <Button size="mini" content='Add'/>
                </Form.Group>
            </Form>
        };

        return (
            <Comment.Group threaded>
                {comments}
                {form}
            </Comment.Group>
        );
    }
}

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(QSOComments);
