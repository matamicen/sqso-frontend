import React from "react";
import {Card, Icon} from "semantic-ui-react";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import appConfig from "./Auth/Config";


export class QRAProfile extends React.Component {
    constructor({match}) {
        super();
        this.state = {
            token: null,
            qra: match.params.qra
        };
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


    render() {
        const extra = <a>
            <Icon name='user'/>
            16 Friends
        </a>;

        return (
            <Card
                image='/assets/images/avatar/large/elliot.jpg'
                header={this.state.qra}
                meta='Friend'
                description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                extra={extra}
            />
        );
    }
}