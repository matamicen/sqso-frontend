import React from "react";
import PropTypes from "prop-types";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import PublicNavigation from "./PublicNavigation.js";
import AuthenticatedNavigation from "./AuthenticatedNavigation.js";

const renderNavigation = authenticated =>
    (authenticated ? <AuthenticatedNavigation /> : <PublicNavigation />);

const AppNavigation = ({authenticated}) => (
    <Navbar fixedTop>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">SuperQSO</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>

        { renderNavigation(authenticated) }

    </Navbar>
);

AppNavigation.propTypes = {
    authenticated: PropTypes.bool,
};

export default AppNavigation;