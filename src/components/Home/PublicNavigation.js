import React from "react";
import {NavLink, Link} from "react-router-dom";
import {Menu, Button} from 'semantic-ui-react'
import NavigationSearch from './NavigationSearch'
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider/Divider";
const PublicNavigation = () => (
    <Menu fluid attached='top' stackable compact>
        <Menu.Item as={NavLink} to='/'>
            SuperQSO
        </Menu.Item>
        <Menu.Item>
            <NavigationSearch/>
        </Menu.Item>

        <Menu.Item position='right'>
            <Button.Group>
                <Button>
                    <Link to='/login'>
                        Login
                    </Link>
                </Button>
                <Button.Or/>
                <Button>
                    <Link to='/signup'>
                        Signup
                    </Link>
                </Button>
            </Button.Group>
        </Menu.Item>

    </Menu>
);

export default PublicNavigation;