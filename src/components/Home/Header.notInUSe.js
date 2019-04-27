import React from "react";
import { Search } from "./Search";
import { Account } from "./Auth/Account";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import { Grid, Row, Col } from "react-bootstrap";
import * as Sentry from "@sentry/browser";

export class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null
    };
  }
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === "production") {
      this.setState({ error });
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    } else console.log(error, errorInfo);
  }
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
