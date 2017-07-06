import React from "react";
import {QSOFeedItem} from "./QSOFeedItem";
import {Feed} from "semantic-ui-react";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import appConfig from "./Auth/Config";


//TODO: Cambiar QSOsTable a Feed
export class QSOFeed extends React.Component {

    constructor() {
        super();
        this.state = {
            qsos: []
        };


    }


    componentDidMount() {
        var that = this;
        var userPool = new CognitoUserPool(appConfig.poolData);
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    alert(err);
                    that.doLogout();
                    return;
                }


                //console.log('session validity: ' + session.isValid());
               // console.log(session.getIdToken().getJwtToken());


                var apigClient = window.apigClientFactory.newClient({});

                var params = {
                    "Authorization": session.getIdToken().getJwtToken()
                };
                var body = {};
                var additionalParams = {};
                apigClient.qsoGetUserFeedGet(params, body, additionalParams)
                    .then(function (result) {
                        console.log("qsoGetUserFeedGet success");
                        that.setState({qsos: result.data});

                    }).catch(function (error) {
                    console.log("error");
                    console.error(error);
                });


            });
        }
        else {
            var apigClient = window.apigClientFactory.newClient({});
            var params = {};
            var body = {};
            var additionalParams = {};

//TODO: pasar como parametro la fecha de ahora o del ultimo qso para que traiga los 50 siguientes.
            apigClient.qsoPublicListGet(params, body, additionalParams)
                .then(function (result) {
                    console.log("qsoPublicListGet success");
                    that.setState({qsos: result.data});

                }).catch(function (error) {
                console.log("error");
                console.error(error);
            });
        }
    }

    componentWillUnmount() {

    }

    render() {
        //var qsos2: this.props.qsos;
        //this.setState( qsos = qsos2);
        let qsos = null;
        if (this.state.qsos.length > 0) {
            qsos = this.state.qsos.map((qso, i) =>
                <QSOFeedItem key={i} qso={qso}/>
            )
        }

        return (
            <Feed>
                { qsos }
            </Feed>
        );
    }
}