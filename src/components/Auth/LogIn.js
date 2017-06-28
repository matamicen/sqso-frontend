import React from "react";
import {Col, FormControl, Button, FormGroup, ControlLabel, Checkbox} from "react-bootstrap";
import {CognitoUserPool, CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
// ES Modules, e.g. transpiling with Babel
import appConfig from "./Config";
import AWS from "aws-sdk";
import "../../App.css";


var poolData = {
    UserPoolId: appConfig.UserPoolId, // Your user pool id here
    ClientId: appConfig.ClientId // Your client id here
};

export class LogIn extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            userLogged: false,
            password: '',
            qra: ''
        };



        //Fields
      //  this.handlePasswordChange = this.handlePasswordChange.bind(this);
      //  this.handleQraChange = this.handleQraChange.bind(this);

        //Event
      //  this.handleOnClickLogin = this.handleOnClickLogin.bind(this);

        //Callback
      //  this.handleOnLoginSuccess = this.handleOnLoginSuccess.bind(this);

    }


    handleOnLoginSuccess(result) {
        //alert("result" )
       // // console.debug(result)
       //  console.log('access token + ' + result.getAccessToken().getJwtToken());
       //  //var URL = "cognito-idp." + appConfig.region + ".amazonaws.com/" + appConfig.UserPoolId;
       //  //POTENTIAL: Region needs to be set if not already set previously elsewhere.
       //  AWS.config.region = appConfig.region;
       //  alert(result.getIdToken().getJwtToken());
       //  console.log(result)
       //  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
       //      IdentityPoolId: appConfig.IdentityPoolId, // your identity pool id here
       //      Logins: {
       //          // Change the key below according to the specific region your user pool is in.
       //          URL : result.getIdToken().getJwtToken()
       //      }
       //  });
       //
       // // this.setState({userLogged : true});
       //  // Instantiate aws sdk service objects now that the credentials have been updated.
       //  // example: var s3 = new AWS.S3();

    }

    handleOnClickLogin(e) {


        var authenticationData = {
            Username: this.state.qra,
            Password: this.state.password
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);

        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username: this.state.qra,
            Pool: userPool
        };

        var cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                console.log(result);
                console.log('access token + ' + result.getAccessToken().getJwtToken());

                // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                //     IdentityPoolId : '...', // your identity pool id here
                //     Logins : {
                //         // Change the key below according to the specific region your user pool is in.
                //         'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
                //     }
                // });

                // Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();

            },

            onFailure: function(err) {
                console.error(err);
            }
        });

    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleQraChange(e) {
        this.setState({qra: e.target.value})

    }

    loadAuthenticatedUser() {
        var that = this;
        console.log("Loading Auth User");

        var userPool = new CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    alert(err);
                    return;
                }
                console.log(session);
                console.log('session validity: ' + session.isValid());
                console.log(session.getIdToken().getJwtToken());
                var creds = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-east-1:051d18f6-a6bf-4237-af95-33c0f3a45cc1', // your identity pool id here
                    Logins: {
                        // Change the key below according to the specific region your user pool is in.
                        'cognito-idp.us-east-1.amazonaws.com/us-east-1_dqZFpjJEt': session.getIdToken().getJwtToken()
                    }
                },{
                    region: "us-east-1"
                });

                creds.refresh(function(err,data){
                    if(err) console.log(err);
                    else {
                        console.log(creds);
                        console.log(creds.accessKeyId);
                        console.log(creds.secretAccessKey);
                        console.log(creds.sessionToken);

                        var apigClient = window.apigClientFactory.newClient({
                            accessKey: creds.accessKeyId,
                            secretKey: creds.secretAccessKey,
                            sessionToken: creds.sessionToken
                        });
                        var params = {};
                        var body = {};
                        var additionalParams = {};


                        apigClient.qsoPublicListGet(params, body, additionalParams)
                            .then(function (result) {
                                console.log("success");
                                console.log(result.data);
                                that.setState(result.data);

                            }).catch(function (error) {
                            console.log("error");
                            console.error(error);
                        });

                        // var lambda = new AWS.Lambda({
                        //   credentials: creds,
                        //   region: "us-east-1"
                        // });
                        //
                        // var params = {
                        //   FunctionName: 'listFeaturedItems',
                        //   InvocationType: 'RequestResponse',
                        //   Payload: ''
                        // };
                        //
                        // lambda.invoke(params, function(err, result) {
                        //   if (err) console.log(err, err.stack); // an error occurred
                        //   else {
                        //
                        //     var payload = JSON.parse(result.Payload)
                        //     var body = JSON.parse(payload.body)
                        //     console.log(body);           // successful response
                        //     that.setState(body);
                        //     }
                        // });

                    }
                });
                // AWS.config.credentials

                // Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();

            });
        }
    }

    componentDidMount() {
        this.loadAuthenticatedUser();
        // var that = this;
        // console.log("Component mounted!");

    }

    render() {

        return (
            <div className="content">

                    <FormGroup controlId="formHorizontalQRA">
                        <Col componentClass={ControlLabel} sm={2}>
                            QRA
                        </Col>
                        <Col sm={10}>
                            <FormControl type="qra" placeholder="QRA"
                                         onChange={this.handleQraChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password"
                                         onChange={this.handlePasswordChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Checkbox>Remember me</Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit" onClick={(e) => this.handleOnClickLogin(e)}>
                                Login
                            </Button>
                        </Col>
                    </FormGroup>

            </div>
        );

    }
}