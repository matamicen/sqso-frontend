import React from "react";
import {Link} from "react-router-dom";
import {Menu, Dropdown} from "semantic-ui-react";
import NavigationSearch from './NavigationSearch'

const AuthenticatedNavigation = () => (
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
                        <Link to='/logout'>
                            Signout
                        </Link>
                    </Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>

    </Menu>
);

export default AuthenticatedNavigation;