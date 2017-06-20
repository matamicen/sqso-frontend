import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Row,Col,  FormControl, Form, Button } from 'react-bootstrap';
export class Account extends React.Component{
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        // let button = null;
        // if (isLoggedIn) {
        //     button = <LogoutButton onClick={this.handleLogoutClick} />;
        // } else {
        //     button = <LoginButton onClick={this.handleLoginClick} />;
        // }
        const formLogIn = (
            <Form>
                <Row className="show-grid">
                    <Col xs={2} md={2}><FormControl bsSize="small" type="email" placeholder="Email" /></Col>
                    <Col xs={2} md={2}><FormControl bsSize="small" type="password" placeholder="Password" /></Col>
                    <Col xs={2} md={2}>
                        <Button type="submit">
                        Sign in
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
        const formLogOut = (
            <Form>
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
                {/*{button}*/}
                {isLoggedIn ? formLogOut:  formLogIn}
            </div>
        );

    }
}