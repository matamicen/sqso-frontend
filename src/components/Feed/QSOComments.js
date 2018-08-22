import React from "react";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form'
import Comment from 'semantic-ui-react/dist/commonjs/views/Comment'
import QSOCommentItem from "./QSOCommentItem";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import {API} from 'aws-amplify'
import ReactGA from 'react-ga';
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
        let apiName = 'superqso';
        let path = '/qso-comment';
        let myInit = {
            body: {
                "qso": this.props.qso.idqsos,
                "comment": c.comment,
                "datetime": c.datetime
            
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
                    this.setState({comments: response.body.message});
                    ReactGA.event({
                        category: 'QSO',
                        action: 'CommentAdd'
                      });
                }
            })
            .catch(error => {
                console.log(error)
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
        if (this.props.isAuthenticated) {
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

const mapStateToProps = (state) => (
    {token: state.default.userData.token,
        qra: state.default.userData.qra, 
    isAuthenticated: state.default.userData.isAuthenticated});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(QSOComments);
