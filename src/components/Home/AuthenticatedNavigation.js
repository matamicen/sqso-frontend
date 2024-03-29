import Auth from '@aws-amplify/auth';
import * as Sentry from '@sentry/browser';
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import * as Actions from '../../actions';
import global_config from '../../global_config.json';
import '../../styles/style.css';
import ServerAutoSuggest from './server.autosuggest';
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
            scope.setExtra('ENV', process.env.REACT_APP_STAGE);
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
    const { t } = this.props;

    return (
      <Menu fixed="top" style={{ height: '50px', display: 'flex' }}>
        {isMobile && window.location.pathname !== '/' && (
          <Menu.Item style={{ padding: '5px' }}>
            <Button
              style={{ background: 'none' }}
              icon
              onClick={() => {
                this.props.history.length > 1
                  ? this.props.history.goBack()
                  : this.props.history.push('/');
                if (process.env.REACT_APP_STAGE === 'production')
                  window.gtag('event', 'navHomeButton_WEBPRD', {});
              }}
            >
              <Icon.Group size="large">
                <Icon name="arrow left" style={{ color: '#243665' }} />
              </Icon.Group>
            </Button>
          </Menu.Item>
        )}
        {(!isMobile || (isMobile && window.location.pathname === '/')) && (
          <Menu.Item
            style={{ flex: '0 1 auto', justifyContent: 'center', padding: '0' }}
          >
            <MobileView>
              <img
                src={global_config.s3Cloudfront + 'superqsoIconAzul.png'}
                alt="SuperQSO.com"
                className="mobile"
              />
            </MobileView>
            <BrowserView>
              <img
                src={global_config.s3Cloudfront + 'logoDesk.jpg'}
                alt="SuperQSO.com"
                className="desktop"
              />
            </BrowserView>
          </Menu.Item>
        )}
        <Menu.Item style={{ flex: '1 1 auto', padding: '5px' }}>
          <ServerAutoSuggest />
        </Menu.Item>
        {!this.props.embeddedSession && (
          <Menu.Item style={{ padding: '5px' }}>
            <Link
              to="/"
              onClick={async () => {
                try {
                  const currentSession = await Auth.currentSession();
                  const token = currentSession.getIdToken().getJwtToken();

                  this.props.actions.refreshToken(token);
                  this.props.actions.doFetchUserInfo(this.props.token);
                  this.props.actions.doFollowFetch();
                  this.props.actions.doFetchPublicFeed(this.props.currentQRA);
                  if (process.env.REACT_APP_STAGE === 'production')
                    window.gtag('event', 'navHomeButton_WEBPRD', {});
                } catch (error) {
                  if (process.env.NODE_ENV !== 'production') {
                    console.log('Unable to refresh Token');
                    console.log(error);
                  } else {
                    Sentry.configureScope(function(scope) {
                      scope.setExtra('ENV', process.env.REACT_APP_STAGE);
                    });
                    Sentry.captureException(error);
                  }
                }
              }}
            >
              <Icon.Group size="large">
                <Icon name="home" />
              </Icon.Group>
            </Link>
          </Menu.Item>
        )}
        {!this.props.embeddedSession && (
          <div className="notifIcon">
            <Menu.Item style={{ padding: '5px' }}>
              <Link to="/notifications">{this.notificationIcon()}</Link>
            </Menu.Item>
          </div>
        )}
        <Menu.Menu style={{ flex: '0 1 auto' }}>
          <Dropdown
            item
            text={this.props.currentQRA}
            direction="left"
            style={{
              minWidth: '90px',
              padding: '4px',
              justifyContent: 'center'
            }}
          >
            <Dropdown.Menu>
              <Dropdown.Header content={this.props.currentQRA} />
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => this.props.history.push('/fielddays')}
              >
                <b> {t('navBar.lastFieldDays')}</b>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  this.props.history.push('/' + this.props.currentQRA)
                }
              >
                {t('navBar.myPosts')}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  this.props.history.push('/' + this.props.currentQRA + '/bio')
                }
              >
                {t('navBar.editProfile')}
              </Dropdown.Item>
              <Dropdown.Divider />
              {!this.props.embeddedSession && (
                <Dropdown.Item
                  onClick={() => this.props.history.push('/changepassword')}
                >
                  {t('navBar.changePassword')}
                </Dropdown.Item>
              )}
              {!this.props.embeddedSession && <Dropdown.Divider />}
              {!this.props.embeddedSession && (
                <Dropdown.Item
                  onClick={() => {
                    if (process.env.REACT_APP_STAGE === 'production')
                      window.gtag('event', 'exploreUsersMenu_WEBPRD', {});

                    this.props.history.push('/explore');
                  }}
                >
                  {t('navBar.exploreUsers')}
                </Dropdown.Item>
              )}
              {!this.props.embeddedSession && <Dropdown.Divider />}
              {!this.props.embeddedSession && (
                <Dropdown.Item onClick={this.logout.bind(this)}>
                  {t('navBar.logOut')}
                </Dropdown.Item>
              )}
              {!this.props.embeddedSession && <Dropdown.Divider />}
              <Link to="/privacy">
                <Dropdown.Item>{t('navBar.privacyPolicy')} </Dropdown.Item>
              </Link>
              <Link to="/terms">
                <Dropdown.Item>{t('navBar.termsOfService')}</Dropdown.Item>
              </Link>
              {!this.props.embeddedSession && (
                <Link to="/contact">
                  <Dropdown.Item>{t('navBar.contactUs')}</Dropdown.Item>
                </Link>
              )}
              {!this.props.embeddedSession && (
                <Link to="/download">
                  <Dropdown.Item>
                    <b>{t('navBar.downloadApp')}</b>
                  </Dropdown.Item>
                </Link>
              )}
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
  isAuthenticated: state.userData.isAuthenticated,
  token: state.userData.token,
  embeddedSession: state.embeddedSession,
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
  )(withTranslation()(AuthenticatedNavigation))
);
