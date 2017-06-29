import React from "react";
import {NavLink} from "react-router-dom";
import {Button, ButtonGroup, Navbar, FormControl, FormGroup} from "react-bootstrap";
const PublicNavigation = () => (
    <div>
        <Navbar.Form pullLeft>
            <FormGroup>
                <FormControl type="text" placeholder="Search"/>
            </FormGroup>

        </Navbar.Form>
        <Navbar.Collapse>
            <Navbar.Form pullRight>
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

        </Navbar.Collapse>
    </div>
);

export default PublicNavigation;