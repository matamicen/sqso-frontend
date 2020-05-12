import Auth from '@aws-amplify/auth';
import * as Sentry from '@sentry/browser';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import * as Actions from '../../actions';
import '../../styles/style.css';
import NavigationSearch from './NavigationSearch';
class AuthenticatedNavigation extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      notif_icon: 'bell'
    };
  }

  logout() {
    Auth.signOut()
      .then(data => {
        this.props.actions.doLogout();
        this.props.history.push('/');
      })
      .catch(error => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(error);
        } else {
          Sentry.configureScope(function(scope) {
            scope.setExtra('ENV', process.env.NODE_ENV);
          });
          Sentry.captureException(error);
        }
      });
  }

  notificationIcon() {
    if (this.props.notifications.length > 0) {
      return (
        <Icon.Group size="large" className="notifIcon">
          <Icon name="bell" />
          <Icon corner name="attention" />
        </Icon.Group>
      );
    } else {
      return (
        <Icon.Group size="large" className="notifIcon">
          <Icon name="bell outline" />
        </Icon.Group>
      );
    }
  }

  render() {
    return (
      <Menu fixed="top" style={{ height: '50px', display: 'flex' }}>
        <Menu.Item
          style={{ flex: '0 1 auto', justifyContent: 'center', padding: '0' }}
        >
          <Link to="/">
            <img src="/logoMobile.jpg" alt="SuperQSO.com" className="mobile" />
            <img src="/logoDesk.jpg" alt="SuperQSO.com" className="desktop" />
          </Link>
        </Menu.Item>
        <Menu.Item style={{ flex: '1 1 auto', justifyContent: 'center', padding: "5px" }}>
          <NavigationSearch />
        </Menu.Item>
        <Menu.Item style={{  padding: "10px" }}>
          <Link to="/">
            <Icon.Group size="large" >
              <Icon name="home" />
            </Icon.Group>
          </Link>
        </Menu.Item>
        <div className="notifIcon">
          <Menu.Item>
            <Link to="/notifications">{this.notificationIcon()}</Link>
          </Menu.Item>
        </div>
        <Menu.Menu style={{ flex: '0 1 auto' }}>
          <Dropdown
            item
            text={this.props.currentQRA}
            direction="left"
            style={{ width: '90px', padding: "4px", justifyContent: 'center' }}
          >
            <Dropdown.Menu>
              <Dropdown.Header content={this.props.currentQRA} />
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() =>
                  this.props.history.push('/' + this.props.currentQRA + '/bio')
                }
              >
                Edit My Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => this.props.history.push('/changepassword')}
              >
                Change Password
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => this.props.history.push('/follow')}>
                Who to Follow
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={this.logout.bind(this)}>
                Log Out
              </Dropdown.Item>
              <Dropdown.Divider />
              <Link to="/privacy">
                <Dropdown.Item>Privacy Policy</Dropdown.Item>
              </Link>
              <Link to="/terms">
                <Dropdown.Item>Terms of Service</Dropdown.Item>
              </Link>
              <Link to="/contact">
                <Dropdown.Item>Contact Us</Dropdown.Item>
              </Link>
              <Link to="/FAQ">
                <Dropdown.Item>¿Que es SuperQSO?</Dropdown.Item>
              </Link>
              <Link to="/tutorials">
                <Dropdown.Item>
                  <b>Tutorial</b>
                </Dropdown.Item>
              </Link>
              <Link to="/download">
                <Dropdown.Item>
                  <b>Download App</b>
                </Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}
AuthenticatedNavigation.propTypes = {
  actions: PropTypes.shape({
    //   doStartingLogin: PropTypes.func,
    doLogout: PropTypes.func
    //   doLogin: PropTypes.func,
    //   doFetchUserInfo: PropTypes.func,
    //   doSetPublicSession: PropTypes.func
  }).isRequired,
  // location: PropTypes.shape({
  //   pathname: PropTypes.string,
  //   data: PropTypes.shape({ newPasswordRequired: PropTypes.bool })
  // }),
  // authenticating: PropTypes.bool,
  // isAuthenticated: PropTypes.bool,
  // public: PropTypes.bool,
  currentQRA: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func
    //   location: PropTypes.shape({
    //     state: PropTypes.shape({})
    //   }).isRequired
  }).isRequired,
  notifications: PropTypes.array
};
const mapStateToProps = state => ({
  currentQRA: state.userData.currentQRA,
  notifications: state.userData.notifications
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { pure: false }
  )(AuthenticatedNavigation)
);
