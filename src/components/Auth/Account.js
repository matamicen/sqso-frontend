import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import {Row, Col, FormControl, Form, Button} from "react-bootstrap";
import {browserHistory} from "react-router";
// import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {NavLink} from "react-router-dom";
// ES Modules, e.g. transpiling with Babel
import appConfig from "./Config";
import PropTypes from 'prop-types';

Config.region = appConfig.region;
Config.credentials = new window.CognitoIdentityCredentials({
    IdentityPoolId: appConfig.IdentityPoolId
});


export class Account extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {
            isLoggedIn: false,
            password: '',
            qra: ''
        };
    }

    handleLoginClick() {


    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    redirectTo(route) {
        browserHistory.push(route)
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        const formLogIn = (
            <Form onSubmit={this.handleLoginClick}>
                <Row className="show-grid">
                    <Col xs={2} md={2}>
                        <FormControl bsSize="small" type="qra" placeholder="QRA"
                                     ref={input => this.setState({qra: input})}/>
                    </Col>
                    <Col xs={2} md={2}>
                        <FormControl bsSize="small" type="password" placeholder="Password"
                                     ref={input => this.setState({password: input})}/>
                    </Col>
                    <Col xs={2} md={2}>
                        <Button type="submit">
                            Sign in
                        </Button>
                    </Col>
                    <Col xs={3} md={3}>
                        <NavLink to="/signup" activeClassName="active"><Button type="submit"> Sign Up
                        </Button></NavLink>

                    </Col>
                </Row>
            </Form>


        );
        const formLogOut = (
            <Form onSubmit={this.handleLogoutClick}>
                <Row className="show-grid">
                    <Col xs={2} md={2}>
                        <Button type="submit">
                            Sign out
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
        return (
            <div>
                {isLoggedIn ? formLogOut : formLogIn}
            </div>
        );

    }
}
Account.propTypes = {
    
}