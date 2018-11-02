import React from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import NavigationSearch from './NavigationSearch'
import Auth from '@aws-amplify/auth';

import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
class AuthenticatedNavigation extends React.Component {
    constructor() {
        super();
        this.state = {
            notif_icon: 'bell'
        };

    }
    logout() {
        Auth
            .signOut()
            .then(data => this.props.actions.doLogout())
            .catch(err => console.log(err));

    }
    render() {

        return (

            <Menu fixed='top'>
                <Menu.Item>
                    <Link to='/'>
                        SuperQSO
                    </Link>
                </Menu.Item>
                <Menu.Item >
                    <NavigationSearch/>
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item position='right'>
                        <Link to='/notifications'>
                            <Icon.Group size='large'>
                                <Icon name={this.state.notif_icon}/> {this.state.notif_icon === 'bell' && <Icon corner name='attention'/>}
                            </Icon.Group>
                        </Link>
                    </Menu.Item>
                    <Dropdown item icon='setting'>
                        <Dropdown.Menu>
                            <Dropdown.Header content={this.props.currentQRA}/>
                            <Dropdown.Divider/>
                            <Dropdown.Item
                                onClick={this
                                .logout
                                .bind(this)}>
                                Signout
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>

            </Menu>

        );
    }
};

const mapStateToProps = (state) => ({currentQRA: state.default.userData.qra});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(AuthenticatedNavigation);
