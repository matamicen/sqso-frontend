import React from "react";
import {NavLink, Link} from "react-router-dom";
import {Menu, Button} from "semantic-ui-react";
import NavigationSearch from './NavigationSearch'

const AuthenticatedNavigation = () => (
    <Menu fixed='top' attached stackable compact>
        <Menu.Item as={NavLink} to='/'>
            SuperQSO
        </Menu.Item>
        <Menu.Item>
            <NavigationSearch/>
        </Menu.Item>

        <Menu.Item position='right'>
            <Button>
                <Link to='/logout'>
                    Logout
                </Link>
            </Button>

        </Menu.Item>

    </Menu>
);

export default AuthenticatedNavigation;