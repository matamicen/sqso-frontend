import React from "react";
import { Search } from "./Search";
import { Account } from "./Auth/Account";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import { Grid, Row, Col } from "react-bootstrap";

export class Header extends React.Component {
  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={6} md={6}>
            <Search />
          </Col>
          <Col xs={6} md={6}>
            <Account />
          </Col>
        </Row>
      </Grid>
    );
  }
}
