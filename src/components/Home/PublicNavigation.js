import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import '../../styles/style.css';
import NavigationSearch from './NavigationSearch';
const PublicNavigation = ({t}) => (
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
    <Menu.Item style={{ padding: "10px" }}>
      <Link to="/">
        <Icon.Group size="large" >
          <Icon name="home" />
        </Icon.Group>
      </Link>
    </Menu.Item>
    <Menu.Menu style={{ flex: '0 1 auto' }}>
      <Dropdown item text='LOGIN' direction="left" style={{ width: '90px', padding: "4px", justifyContent: 'center' }}>
        <Dropdown.Menu>
          <Link
            to={{
              pathname: '/login'
            }}
          >
            <Dropdown.Item>{t('navBar.login')}</Dropdown.Item>
          </Link>
          <Link
            to={{
              pathname: '/signup'
            }}
          >
            <Dropdown.Item> {t('navBar.signUp')} </Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Link to="/privacy">
          <Dropdown.Item>{t('navBar.privacyPolicy')} </Dropdown.Item>
          </Link>
          <Link to="/terms">
          <Dropdown.Item>{t('navBar.termsOfService')}</Dropdown.Item>
          </Link>
          <Link to="/contact">
          <Dropdown.Item>{t('navBar.contactUs')}</Dropdown.Item>
          </Link>
          <Link to="/FAQ">
          <Dropdown.Item>{t('navBar.whatIsSuperQSO')}</Dropdown.Item>
          </Link>
          <Link to="/tutorials">
            <Dropdown.Item>
            <b>{t('navBar.tutorial')}</b>
            </Dropdown.Item>
          </Link>
          <Link to="/download">
            <Dropdown.Item>
            <b>{t('navBar.downloadApp')}</b>
            </Dropdown.Item>
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

export default (withTranslation()(PublicNavigation));
