import React from "react";
import {NavLink} from "react-router-dom";
import {Menu, Input, Button} from 'semantic-ui-react'
const PublicNavigation = () => (
    <Menu attached='top' stackable>
        <Menu.Item as={NavLink} to='/'>
            SuperQSO
        </Menu.Item>


        <Menu.Item>
            <Input className='icon' icon='search' placeholder='Search...'/>
        </Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item as={NavLink} to='/login'>
                <Button>Login</Button>
            </Menu.Item>
            <Menu.Item as={NavLink} to='/signup'>
                <Button>Signup</Button>
            </Menu.Item>
        </Menu.Menu>
    </Menu>
);

export default PublicNavigation;