import React from "react";
import {Comment} from "semantic-ui-react";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import appConfig from "./Auth/Config";


export default  class extends React.Component {
    constructor() {
        super();
        this.state = {
            token: null,
            comment: null,

        };
        this.getSession = this.getSession.bind(this);

    }

    componentDidMount() {
        this.getSession();

        if (this.props.comment) {
            var userPool = new CognitoUserPool(appConfig.poolData);
            var cognitoUser = userPool.getCurrentUser();




        }
    }

    getSession() {
        var userPool = new CognitoUserPool(appConfig.poolData);
        var cognitoUser = userPool.getCurrentUser();


        if (cognitoUser) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    alert(err);
                    return;
                }
                this.setState({token: session.getIdToken().getJwtToken()});

            }.bind(this));
        }
    }


    render() {
        var now = new Date();
        var year;
        var month;
        var commentDate = new Date(this.props.comment.datetime);
        var timestamp = "";

        if (this.props.comment.datetime) {


            //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString

            if (now.getMonth() !== commentDate.getMonth()) {
                month = commentDate.toLocaleString('en-us', {month: "long"});
                timestamp = commentDate.getDate() + " of " + month;
            }

            if (now.getYear() !== commentDate.getYear()) {
                year = commentDate.getYear();
                timestamp = timestamp + " of " + year;
            }
            if (timestamp) timestamp = timestamp + ' at ';

            timestamp = timestamp + commentDate.getHours() + ":" + commentDate.getMinutes();
        }

        return (
            <Comment>

                <Comment.Content>
                    <Comment.Author as='a'>{this.props.comment.qra.toUpperCase()}</Comment.Author>
                    <Comment.Metadata>
                        <span>{timestamp} </span>
                    </Comment.Metadata>
                    <Comment.Text>{this.props.comment.comment}</Comment.Text>
                </Comment.Content>
            </Comment>
        );
    }
}