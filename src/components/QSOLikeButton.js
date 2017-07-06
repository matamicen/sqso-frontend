import React from "react";
import {Feed, Icon} from "semantic-ui-react";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import appConfig from "./Auth/Config";


export class QSOLikeButton extends React.Component {
    constructor() {
        super();
        this.state = {
            icon: "thumbs outline up",
            liked: false,
            likeCounter: 0,
            token: null,
            cognitoUser: {}
        };
        this.handleOnLike = this.handleOnLike.bind(this);
        this.getSession = this.getSession.bind(this);

    }

    componentDidMount() {
        this.getSession();

        if (this.props.qso.likes) {
            var userPool = new CognitoUserPool(appConfig.poolData);
            var cognitoUser = userPool.getCurrentUser();
            this.setState({likeCounter: this.props.qso.likes.length});

            if (this.props.qso.likes.some(o => o.qra === cognitoUser.username.toUpperCase())) {
                this.setState({liked: true});
                this.setState({icon: "thumbs up"})
            }
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


    doLike() {
        console.log("doLike");
        var apigClient = window.apigClientFactory.newClient({});

        var params = {
            "Authorization": this.state.token
        };
        var body = {"qso": this.props.qso.idqsos};
        var additionalParams = {};
        apigClient.qsoLikePost(params, body, additionalParams)
            .then(function (result) {
                console.log("updateCounter success");
                if (result.data.body.error > 0) {
                    console.error(result.data.body.message);
                } else {
                    this.setState({likeCounter: result.data.body.message});
                }
            }.bind(this))
            .catch(function (error) {
                console.log("error");
                console.error(error);
            });
    }

    doUnLike() {
        console.log("doUnLike");
        var apigClient = window.apigClientFactory.newClient({});

        var params = {
            "Authorization": this.state.token
        };
        var body = {"qso": this.props.qso.idqsos};
        var additionalParams = {};
        apigClient.qsoLikeDelete(params, body, additionalParams)
            .then(function (result) {
                console.log("updateCounter success");
                if (result.data.body.error > 0) {
                    console.error(result.data.body.message);
                } else {
                    this.setState({likeCounter: result.data.body.message});
                }
            }.bind(this))
            .catch(function (error) {
                console.log("error");
                console.error(error);
            });
    }

    handleOnLike() {
        if (!this.state.token) return null;

        console.log("handleOnLike")

        if (!this.state.liked) {
            this.setState({likeCounter: this.state.likeCounter + 1});
            if (this.state.token != null) {
                this.doLike();
            } else {
                this.getSession()
                    .then(this.doLike());
            }

            this.setState({icon: "thumbs up"})

        }
        else {
            this.setState({likeCounter: this.state.likeCounter - 1});
            if (this.state.token != null) {
                this.doUnLike();
            } else {
                this.getSession()
                    .then(this.doUnLike());
            }
            this.setState({icon: "thumbs outline up"})
        }

        this.setState({liked: !this.state.liked})

    }

    render() {

        return (
            <Feed.Like onClick={this.handleOnLike}>
                < Icon name={this.state.icon}/>
                {this.state.likeCounter} Likes
            </Feed.Like>
        );
    }
}