import React from "react";
import {NavLink} from "react-router-dom";
import {Navbar, FormGroup, FormControl, Button} from "react-bootstrap";

const PublicNavigation = () => (
    <div>
        <Navbar.Form pullLeft>
            <FormGroup>
                <FormControl type="text" placeholder="Search"/>
            </FormGroup>

        </Navbar.Form>
        <Navbar.Collapse>
            <Navbar.Form pullRight>

                <NavLink to="/logout" activeClassName="active">
                    <Button type="submit">Logout</Button>
                </NavLink>


            </Navbar.Form>

        </Navbar.Collapse>
    </div>

);

export default PublicNavigation;