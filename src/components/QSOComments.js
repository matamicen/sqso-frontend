import React from "react";
import {Form, Button, Comment} from "semantic-ui-react";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import appConfig from "./Auth/Config";
import {QSOCommentItem} from "./QSOCommentItem";

export class QSOComments extends React.Component {
    constructor() {
        super();
        this.state = {
            token: null,
            comments: [],
            comment: null,
            qra: null
        };
        this.getSession = this.getSession.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);

    }

    componentDidMount() {
        if (this.props.qso.comments) this.setState({comments: this.props.qso.comments});
        this.getSession();

        if (this.props.qso.comments) {
      //      var userPool = new CognitoUserPool(appConfig.poolData);
      //      var cognitoUser = userPool.getCurrentUser();

        }
    }

    getSession() {
        var userPool = new CognitoUserPool(appConfig.poolData);
        var cognitoUser = userPool.getCurrentUser();


        if (cognitoUser) {
            this.setState({qra: cognitoUser.username});
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    alert(err);
                    return;
                }
                this.setState({token: session.getIdToken().getJwtToken()});


            }.bind(this));
        }
    }


    doComment(c) {
        console.log("doComment");
        var apigClient = window.apigClientFactory.newClient({});

        var params = {
            "Authorization": this.state.token
        };
        var body = {
            "qso": this.props.qso.idqsos,
            "comment": c.comment,
            "datetime": c.datetime
        };
        var additionalParams = {};
        apigClient.qsoCommentPost(params, body, additionalParams)
            .then(function (result) {
                console.log("Comment added");
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
        console.log("handleAddComment");
        e.preventDefault();
        if (!e.target.comment.value) return;

        var datetime = new Date();
        var comment = {
            qra: this.state.qra,
            comment: e.target.comment.value,
            datetime: datetime
        };
        this.setState({comment: comment});
        this.setState({comments: this.state.comments.concat(comment)});
        e.target.comment.value = null;
        if (this.state.token != null) {
            this.doComment(comment);
        } else {
            this.getSession()
                .then(this.doComment(comment));
        }
    }


    render() {
        let comments = null;
        if (this.state.comments) {
            comments = this.state.comments.map((comment, i) =>
                <QSOCommentItem key={i} comment={comment}/>
            )
        };
        let form = null;
        if (this.state.token != null) {
            form = <Form size="mini" reply onSubmit={this.handleAddComment.bind(this)}>
                <Form.Group>
                    <input placeholder='Comment' name="comment"/>
                    <Button size="mini" content='Add'/>
                </Form.Group>
            </Form>
        }
        ;


        return (
            <Comment.Group threaded>
                {comments}
                {form}
            </Comment.Group>
        );
    }
}