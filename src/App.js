import React, {Component} from "react";
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import {Home} from "./components/Home";
import {Grid} from "react-bootstrap";
import {SignUp} from "./components/Auth/SignUp";
import Public from "./components/Auth/Public";
import {LogIn} from "./components/Auth/LogIn";
import AppNavigation from "./components/AppNavigation";

class App extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="bar">
                        <AppNavigation {...this.props} />
                    </div>
                    <Grid className="content">
                        <Switch>
                            <Route exact name="home" path="/" component={Home}/>
                            {/*<Authenticated exact path="/documents" component={Documents} {...appProps} />*/}
                            {/*<Authenticated exact path="/documents/new" component={NewDocument} {...appProps} />*/}
                            {/*<Authenticated exact path="/documents/:_id" component={ViewDocument} {...appProps} />*/}
                            {/*<Authenticated exact path="/documents/:_id/edit" component={EditDocument} {...appProps} />*/}
                            <Public path="/signup" component={SignUp} {...this.props}  />
                            <Public path="/login" component={LogIn} {...this.props} />
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

App.propTypes = {
    isLoggedIn: PropTypes.bool,
    authenticated: PropTypes.bool,
    loggedIn(props, propName) {
        this.isLoggedIn = true;
        return null;
    },
    loggedOff(props, propName) {
        this.isLoggedIn = false;
        return null;
    }
}

App.defaultProps = {
    isLoggedIn: false
}

export default App;
