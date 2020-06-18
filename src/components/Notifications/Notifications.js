import React from "react";
import { withTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import 'semantic-ui-css/semantic.min.css';
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Feed from "semantic-ui-react/dist/commonjs/views/Feed";
import * as Actions from "../../actions";
import "../../styles/style.css";
import Ad from "../Ad/Ad";
import AppNavigation from "../Home/AppNavigation";
import Notification from "./Notification";


class Notifications extends React.Component {
  state = {
    active: true,
    adActive: true,
    showModal: false
  };

  static getDerivedStateFromProps(props, state) {
    if (props.notifications) return { active: false };
    else if (!props.notifications) return { active: true };
    //Default
    return null;
  }

  componentDidMount() {
    this.props.actions.doFetchNotifications(this.props.token);
   //Comentado Adsense
   window.googletag.cmd.push(function() {
    window.googletag.destroySlots();
    window.googletag
      .defineSlot(
        '/22031658057/notifications/notifications_left',
        [160, 600],
        'div-ads-instance-notifications-left'
      )
      .addService(window.googletag.pubads());
    window.googletag
      .defineSlot(
        '/22031658057/notifications/notifications_right',
        [160, 600],
        'div-ads-instance-notifications-right'
      )
      .addService(window.googletag.pubads());
    window.googletag.pubads().enableSingleRequest();
    window.googletag.enableServices();
  });
  }
  handleOpen = () => this.setState({ adActive: true });
  handleClose = () => this.setState({ adActive: false });
  render() {
    const {t} = this.props;
    console.log(this.props.notifications)
    return (
      <div className="notifications-container">
        <Dimmer active={this.state.active} page>
          <Loader>Loading</Loader>
        </Dimmer>

        {/* <Dimmer
          active={
            this.state.adActive &&
            this.props.accountType &&
            this.props.accountType.web_notifications_intersitial !== ""
          }
          onClick={this.handleClose}
          page
          // verticalAlign="center"
        >
          <Ad
            adslot="/21799560237/Notifications/intersitial"
            width={640}
            height={480}
            id="notifications-intersitial"
            displayOnly={true}
          />
        </Dimmer> */}

        <div className="site-header">
          <AppNavigation />
        </div>

        <div className="site-left">
        <Ad
            adslot="/22031658057/notifications/notifications_left"
            width={160}
            height={600}
            id="div-ads-instance-notifications-left"
            displayOnly={true}
          />
        </div>
        <div className="notifications-main">
          {this.props.notifications && (
            // <Table unstackable>
              // <Table.Body>
              <Feed>  
                {/* <List divided relaxed animated> */}
                {this.props.notifications &&
                  this.props.notifications.map(m => {
                    return (
                      <Notification
                        key={m.idqra_notifications}
                        notification={m}
                        token={this.props.token}
                        currentQRA={this.props.currentQRA}
                        doNotificationRead={
                          this.props.actions.doNotificationRead
                        }
                      />
                    );
                  })}
                  </Feed>
              // </Table.Body>
            // </Table>
          )}
          {this.props.notifications.length === 0 && (
            <Message negative>
              <Message.Header>{t('notification.congratulations')}</Message.Header>
              <p>{t('notification.noPendingNotifications')}</p>
            </Message>
          )}
          {/* </List> */}
        </div>

        <div className="site-right">
        <Ad
            adslot="/22031658057/notifications/notifications_right"
            width={160}
            height={600}
            id="div-ads-instance-notifications-right"
            displayOnly={true}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    notifications: state.userData.notifications,
    token: state.userData.token,
    currentQRA: state.userData.currentQRA,
    accountType: state.userData.qra.accountType
  };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(Notifications))
);
