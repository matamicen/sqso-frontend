import React from "react";
import {NavLink, Link} from "react-router-dom";
import {Menu, Button} from 'semantic-ui-react'
import NavigationSearch from './NavigationSearch'

const PublicNavigation = () => (
    <Menu attached='top' compact stackable>
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
                        Sign Up
                    </Link>
                </Button>
            </Button.Group>
        </Menu.Item>

    </Menu>
);

export default PublicNavigation;