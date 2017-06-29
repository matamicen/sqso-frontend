import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import PublicNavigation from "./PublicNavigation.js";
import AuthenticatedNavigation from "./AuthenticatedNavigation.js";

export default class AppNavigation extends Component{

    renderNavigation()
    {
        return (this.props.authenticated ? <AuthenticatedNavigation /> : <PublicNavigation />);
    }
    render()
    {
        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">SuperQSO</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                { this.renderNavigation(this.props.authenticated) }

            </Navbar>
        );
    }

}


