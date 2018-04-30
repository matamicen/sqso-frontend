import React from "react";
import {Link} from "react-router-dom";

import  Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import NavigationSearch from './NavigationSearch'

const PublicNavigation = () => (
    <Menu fixed='top'>
        <Menu.Item>
            <Link to='/'>
                SuperQSO
            </Link>
        </Menu.Item>
        <Menu.Item>
            <NavigationSearch/>
        </Menu.Item>
        <Menu.Menu position='right'>
            <Dropdown item icon='setting'>
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Link to='/login'>
                            Sign In
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='/signup'>
                            Sign Up
                        </Link>
                    </Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>

    </Menu>
);

export default PublicNavigation;