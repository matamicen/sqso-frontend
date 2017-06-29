import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import {Home} from "./components/Home";
import {Grid} from "react-bootstrap";
import {SignUp} from "./components/Auth/SignUp";
import Public from "./components/Auth/Public";
import Logout from "./components/Auth/Logout";
import {LogIn} from "./components/Auth/LogIn";
import AppNavigation from "./components/AppNavigation";
import appConfig from "./components/Auth/Config";


var poolData = {
    UserPoolId: appConfig.UserPoolId, // Your user pool id here
    ClientId: appConfig.ClientId // Your client id here
};

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        };
        this.doLogin = this.doLogin.bind(this);
    }

    doLogin() {
        console.log("authenticated true")
        this.setState({authenticated: true});

    }

    doLogout() {
        console.log("authenticated false")
        this.setState({authenticated: false});

    }


    componentWillUnmount() {

    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="bar">
                        <AppNavigation authenticated={this.state.authenticated}/>
                    </div>
                    <Grid className="content">
                        <Switch>
                            <Route exact name="home" path="/home" component={Home}/>
                            {/*<Authenticated exact path="/documents" component={Documents} {...appProps} />*/}
                            {/*<Authenticated exact path="/documents/new" component={NewDocument} {...appProps} />*/}
                            {/*<Authenticated exact path="/documents/:_id" component={ViewDocument} {...appProps} />*/}
                            {/*<Authenticated exact path="/documents/:_id/edit" component={EditDocument} {...appProps} />*/}
                            <Public path="/signup" component={SignUp}  />
                            <Route exact path="/login" component={() => <LogIn authenticated={this.state.authenticated}
                                    doLogin={this.doLogin.bind(this)}/>} />
                            <Route exact path="/logout" component={() => <Logout authenticated={this.state.authenticated}
                                   doLogout={this.doLogout.bind(this)}/>} />
                            {/*<Route name="recover-password" path="/recover-password" component={RecoverPassword} />*/}
                            {/*<Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />*/}
                            {/*<Route component={NotFound} />*/}
                        </Switch>
                    </Grid>


                </div>
            </Router>
        );
    }

}

