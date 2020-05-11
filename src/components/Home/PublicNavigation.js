import React from 'react'
import { Link } from 'react-router-dom'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import '../../styles/style.css'
import NavigationSearch from './NavigationSearch'

const PublicNavigation = () => (
  <Menu fixed="top" style={{ height: '50px', display: 'flex' }}>
    <Menu.Item
      style={{ flex: '0 1 auto', justifyContent: 'center', padding: '0' }}
    >
      <Link to="/">
        <img src="/logoMobile.jpg" alt="SuperQSO.com" className="mobile" />
        <img src="/logoDesk.jpg" alt="SuperQSO.com" className="desktop" />
      </Link>
    </Menu.Item>
    <Menu.Item style={{ flex: '1 1 auto', justifyContent: 'center' }}>
      <NavigationSearch />
    </Menu.Item>
    <Menu.Menu style={{ flex: '0 1 auto' }}>
      <Dropdown item icon="setting" direction="left" style={{ width: '50px' }}>
        <Dropdown.Menu>
          <Link
            to={{
              pathname: '/login'
            }}
          >
            <Dropdown.Item>Login</Dropdown.Item>
          </Link>
          <Link
            to={{
              pathname: '/signup'
            }}
          >
            <Dropdown.Item>SignUp</Dropdown.Item>
          </Link>
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
            <Dropdown.Item>Que es SuperQSO.com</Dropdown.Item>
          </Link>
          <Link to="/tutorials">
            <Dropdown.Item><b>Tutorial</b></Dropdown.Item>
          </Link>
          <Link to="/download">
            <Dropdown.Item><b>Download App</b></Dropdown.Item>
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
)

export default PublicNavigation
