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
class PublicNavigation extends React.PureComponent {
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
                if (process.env.REACT_APP_STAGE === 'production')
                  window.gtag('event', 'navHomeButton_WEBPRD', {});
                if (!this.props.isAuthenticated) {
                  this.props.actions.doFollowFetch();
                  this.props.actions.doFetchPublicFeed();
                }
              }}
            >
              <Icon.Group size="large">
                <Icon name="home" />
              </Icon.Group>
            </Link>
          </Menu.Item>
        )}
        <Menu.Menu style={{ flex: '0 1 auto' }}>
          <Dropdown
            item
            text={t('navBar.titleLogin')}
            direction="left"
            style={{
              minWidth: '90px',
              padding: '4px',
              justifyContent: 'center',
            }}
          >
            <Dropdown.Menu>
              <Link
                to={{
                  pathname: '/login',
                }}
              >
                <Dropdown.Item>{t('navBar.login')}</Dropdown.Item>
              </Link>
              {!this.props.embeddedSession && (
                <Link
                  to={{
                    pathname: '/signup',
                  }}
                >
                  <Dropdown.Item> {t('navBar.signUp')} </Dropdown.Item>
                </Link>
              )}
              <Dropdown.Divider />
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
const mapStateToProps = (state) => ({
  currentQRA: state.userData.currentQRA,
  isAuthenticated: state.userData.isAuthenticated,
  token: state.userData.token,
  embeddedSession: state.embeddedSession,
  notifications: state.userData.notifications,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(
    withTranslation()(PublicNavigation)
  )
);
