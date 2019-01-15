import React from "react";

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import NavigationSearch from './NavigationSearch'
import Auth from '@aws-amplify/auth';
import {Link, withRouter} from "react-router-dom";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
class AuthenticatedNavigation extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            notif_icon: 'bell'
        };

    }
    logout() {
        Auth
            .signOut()
            .then(data => {
                this
                    .props
                    .actions
                    .doLogout()
                this
                    .props
                    .history
                    .push("/");
            })
            .catch(err => console.log(err));

    }    
    notificationIcon() {
        
        if (this.props.notifications.length > 0) {
            return (
                <Icon.Group size='large'>
                    <Icon name='bell'/>
                    <Icon corner name='attention'/>
                </Icon.Group>
            )
        } else {
            return (
                <Icon.Group size='large'>
                    <Icon name='bell outline'/>
                </Icon.Group>
            )
        }

    }
    render() {
        
        return (

            <Menu fixed='top' style={{
                height: '50px'
            }}>
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

                            {this.notificationIcon()}

                        </Link>
                    </Menu.Item>
                    <Dropdown item icon='setting'>
                        <Dropdown.Menu>
                            <Dropdown.Header content={this.props.currentQRA}/>
                            <Dropdown.Divider/>
                            <Dropdown.Item
                                onClick={()=>this
                                    .props
                                    .history
                                    .push('/'+this.props.currentQRA+'/bio')}>
                                Edit My Bio
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={()=>this
                                    .props
                                    .history
                                    .push('/'+this.props.currentQRA+'/info')}>
                                Edit My Info
                            </Dropdown.Item>
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

const mapStateToProps = (state) => ({currentQRA: state.default.userData.qra, notifications: state.default.userData.notifications});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(AuthenticatedNavigation));
