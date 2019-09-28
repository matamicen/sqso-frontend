import React from "react";
import { Link } from "react-router-dom";

import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import NavigationSearch from "./NavigationSearch";
import "../../styles/style.css";
const PublicNavigation = () => (
  <Menu fixed="top" style={{ height: "50px" }}>
    <Menu.Item>
      <Link to="/">
        <img
          src="/logo.jpg"
          alt="SuperQSO.com"
          style={{
            height: "50px"
          }}
        />
      </Link>
    </Menu.Item>
    <Menu.Item>
      <NavigationSearch />
    </Menu.Item>
    <Menu.Menu position="right">
      <Dropdown item icon="setting">
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="/login">Login</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/signup">Signup</Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Link to="/contact">Contact Us</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

export default PublicNavigation;
