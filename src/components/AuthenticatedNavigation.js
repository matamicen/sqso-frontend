import React from "react";
import {NavLink} from "react-router-dom";
import {Menu, Button, Input} from "semantic-ui-react";
import NavigationSearch from './NavigationSearch'

const AuthenticatedNavigation = () => (
    <Menu attached='top' stackable>
        <Menu.Item as={NavLink} to='/'>
            SuperQSO
        </Menu.Item>
        <Menu.Item>
            <NavigationSearch/>
        </Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item as={NavLink} to='/logout'>
                <Button>Logout</Button>
            </Menu.Item>
        </Menu.Menu>
    </Menu>
);

export default AuthenticatedNavigation;