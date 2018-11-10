import React from "react";

import AppNavigation from '../Home/AppNavigation'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import "../../styles/style.css";
import List from "semantic-ui-react/dist/commonjs/elements/List";
import Notification from "./Notification";
class Notifications extends React.Component {
    state = {
        active: true,
        showModal: false

    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.notifications) {
            this.setState({active: false})
        }

    }
    componentDidMount() {

        this
            .props
            .actions
            .doFetchNotifications(this.props.token);
    }
    render() {
        return (
            <div className='notifications-container'>
                {!this.props.notifications && <Dimmer active={this.state.active} page>
                    <Loader>Loading</Loader>
                </Dimmer>}

                <div className='site-header'>
                    <AppNavigation/>
                </div>

                <div className='site-left'>
                    <Advertisement className="left" unit='wide skyscraper' test='Wide Skyscraper'/>
                </div>
                <div className='notifications-main'>
                    
                    <List divided>
                        {this
                            .props
                            .notifications
                            .map(m => {
                                return <Notification
                                    key={m.idqra_notifications}
                                    notification={m}
                                    token={this.props.token}
                                    doNotificationRead={this.props.actions.doNotificationRead}/>

                            })}
                    </List>
                </div>

                <div className='site-right'>
                    <Advertisement unit='wide skyscraper' test='Wide Skyscraper'/>
                </div>

            </div>

        );
    }
}
const mapStateToProps = (state) => ({notifications: state.default.userData.notifications, token: state.default.userData.token});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notifications));