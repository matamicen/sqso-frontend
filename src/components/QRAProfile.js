import React from "react";
import {Button, Card, Icon} from "semantic-ui-react";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import appConfig from "./Auth/Config";


export class QRAProfile extends React.Component {
    constructor({match}) {
        super();
        this.state = {
            token: null,
            qra: match.params.qra,
            followed: false
        }
        ;
        this.getSession = this.getSession.bind(this);

    }

    componentDidMount() {
        this.getSession();

        if (this.props.comment) {
            //     var userPool = new CognitoUserPool(appConfig.poolData);
            //     var cognitoUser = userPool.getCurrentUser();


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

    doFollow(f) {
        console.log("doComment");
        var apigClient = window.apigClientFactory.newClient({});

        var params = {
            "Authorization": this.state.token
        };
        var body = {
            "qra": f.qra,
            "datetime": f.datetime
        };
        var additionalParams = {};
        apigClient.qraFollowerPost(params, body, additionalParams)
            .then(function (result) {
                console.log("Follower added");
                if (result.data.body.error > 0) {
                    console.error(result.data.body.message);
                } else {
                    console.log(result.data.body.message);
                    this.setState({followed: true});
                }
            }.bind(this))
            .catch(function (error) {
                console.log("error");
                console.error(error);
            });
    }

    handleButtonClick(e) {
        console.log("handleAddComment");
        e.preventDefault();

        if (!this.state.followed) {
            var datetime = new Date();
            var follow = {
                qra: this.state.qra,
                datetime: datetime
            };
            this.setState({followed: !this.state.followed});

            if (this.state.token != null) {
                this.doFollow(follow);
            } else {
                this.getSession()
                    .then(this.doFollow(follow));
            }
        }
    }

    render() {
        const extra = <a>
            <Icon name='user'/>
            16 Friends
        </a>;
        let buttonText;

        if (this.state.followed) {
            buttonText = "Unfollow";
        }
        else {
            buttonText = "Follow";
        }
        return (
            <div>
                <Card
                    image='/assets/images/avatar/large/elliot.jpg'
                    header={this.state.qra}
                    meta='Friend'
                    description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                    extra={extra}
                />
                <Button positive={!this.state.followed}
                        onClick={this.handleButtonClick.bind(this)}> {buttonText} </ Button>
            </ div>

        );
    }
}