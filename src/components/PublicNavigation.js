import React from "react";
import {NavLink} from "react-router-dom";
import {Nav, NavItem, Button, ButtonGroup, Navbar, FormControl, FormGroup} from "react-bootstrap";
const PublicNavigation = () => (
    <Navbar.Collapse>
        <Nav pullLeft>

                <Navbar.Form>
                    <FormGroup>
                        <FormControl type="text" placeholder="Search"/>
                    </FormGroup>

                </Navbar.Form>

        </Nav>
        <Nav pullRight>

                <Navbar.Form>
                    <FormGroup>
                        <FormControl type="text" placeholder="QRA"/>
                        <FormControl type="text" placeholder="Password"/>
                    </FormGroup>
                    <ButtonGroup>

                        <NavLink to="/login" activeClassName="active">
                            <Button type="submit">Login</Button>
                        </NavLink>

                        <NavLink to="/signup" activeClassName="active"><Button type="submit">Signup</Button></NavLink>

                    </ButtonGroup>
                </Navbar.Form>

        </Nav>
    </Navbar.Collapse>
);

export default PublicNavigation;