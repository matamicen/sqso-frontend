import React, {Component} from "react";

import {Route, Switch, withRouter} from "react-router-dom";

import "../styles/App.css";
import Home from "./Home/Home";
import {SignUp} from "./Auth/SignUp";
import Logout from "./Auth/Logout";
import LogIn from "./Auth/LogIn";
import AppNavigation from "./Home/AppNavigation";
// import AWS from "aws-sdk";
import {Auth} from 'aws-amplify'
import Container from 'semantic-ui-react/dist/commonjs/elements/Container'
import QRAProfileContainer from "./Profile/QRAProfileContainer";
import QSODetail from "./QSODetail"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';
import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';

// if (process.env.NODE_ENV !== 'production') {     const {whyDidYouUpdate} =
// require('why-did-you-update')     whyDidYouUpdate(React)   }

Amplify.configure(aws_exports);

class App extends Component {
    constructor() {
        super();
        this.state = {
            loginValidated: false
        };
    }
    loadAuthenticatedUser() {
        
        Auth
            .currentSession()
            .then(function (session) {
                
                Auth
                    .currentAuthenticatedUser()
                    .then(async function (user) {
                        
                        await this
                            .props
                            .actions
                            .doLogin(session.idToken.jwtToken, user.username.toUpperCase());
                        await this.setState({loginValidated: true});
                        

                    }.bind(this), async function (err) {
                        console.log(err)
                        console.log("User NOT Authenticated")
                        await this
                            .props
                            .actions
                            .doLogout();
                        await this.setState({loginValidated: true});
                        return;
                    }.bind(this));
            }.bind(this), function (err) {
                
            
                this
                    .props
                    .actions
                    .doLogout();
                this.setState({loginValidated: true});
                // return;
            }.bind(this));
    }

    componentDidMount() {

        this.loadAuthenticatedUser()

    }

    render() {
       
        
        if (!this.state.loginValidated) 
            return null;
        
        return (
            <div>
                <AppNavigation/>
                <Container
                    fluid
                    style={{
                    marginTop: '5em'
                }}>
                    <Switch>
                        <Route exact path="/" component={() => <Home/>}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/login" component={() => <LogIn/>}/>
                        <Route exact path="/logout" component={() => <Logout/>}/>
                        <Route exact path="/:qra" component={() => <QRAProfileContainer/>}/>
                        <Route exact path="/qso/:idqso" component={() => <QSODetail/>}/>
                    </Switch>
                </Container>

            </div>

        );
    }

}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
