import React, { Fragment } from "react";

import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
// import Auth from '@aws-amplify/auth';
import "./style.css";
import Advertisement from "semantic-ui-react/dist/commonjs/views/Advertisement";
import AppNavigation from "../Home/AppNavigation";
import Amplify from "@aws-amplify/core";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Ad from "../Ad/Ad";

const Auth = Amplify.Auth;
class LogIn extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: null,
      showModal: false,
      password: "",
      qra: "",

      loginError: false
    };
  }

  handleOnClickLogin = () => {
    this.setState({ active: true });
    this.login();
  };
  async login() {
    let token;
    this.setState({ active: true });

    let user = await Auth.signIn(this.state.qra, this.state.password).catch(
      err => {
        this.setState({ active: false });
        this.setState({ loginError: err.message });
      }
    );

    if (user) {
      await this.props.actions.doStartingLogin();
      token = user.signInUserSession.idToken.jwtToken;
      let credentials = await Auth.currentCredentials();
      await this.props.actions.doLogin(
        token,
        this.state.qra.toUpperCase(),
        credentials.data.IdentityId
      );
      await this.props.actions.doFetchUserInfo(token);

      await this.props.history.push("/");
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.isAuthenticated || state.loginError) return { active: false };
    else if (props.authenticating && !state.loginError) return { active: true };
    // Return null to indicate no change to state.
    return null;
  }
  // componentWillReceiveProps(nextProps) {     if (nextProps.isAuthenticated)
  // this.setState({}) }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleQraChange(e) {
    this.setState({
      qra: e.target.value.toUpperCase()
    });
  }

  render() {
    return (
      <Fragment>
        <Dimmer active={this.state.active} page>
          <Loader>Validating User...</Loader>
        </Dimmer>

        <div className="global-container">
          <div className="site-header">
            <AppNavigation />
          </div>
          <div className="site-left">
            <Advertisement unit="wide skyscraper">
              <Ad adslot="/21799560237/Login/left" width={160} height={600} />
            </Advertisement>
          </div>

          <div className="site-main">
            <Grid
              textAlign="center"
              style={{
                height: "100%"
              }}
              verticalAlign="middle"
            >
              <Grid.Column
                style={{
                  maxWidth: 450
                }}
              >
                <Header as="h2" color="teal" textAlign="center">
                  Sign-in to your account
                </Header>
                <Form size="large" onSubmit={() => this.handleOnClickLogin()}>
                  <Segment stacked>
                    <Form.Field>
                      <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="QRA"
                        error={this.state.loginError ? true : false}
                        name="QRA"
                        value={this.state.qra}
                        onChange={this.handleQraChange.bind(this)}
                        style={{
                          textTransform: "uppercase"
                        }}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        type="password"
                        error={this.state.loginError ? true : false}
                        placeholder="Password"
                        name="password"
                        onChange={this.handlePasswordChange.bind(this)}
                      />
                    </Form.Field>

                    {this.state.loginError && (
                      <Message negative content={this.state.loginError} />
                    )}
                    <Button content="Login" />
                  </Segment>
                </Form>
                <Message>
                  New to us?
                  <Link to="/signup"> Sign Up</Link>
                </Message>
                <Message>
                  <Link to="/forgot"> Forgot Password?</Link>
                </Message>
              </Grid.Column>
            </Grid>
          </div>

          <div className="site-right">
            <Advertisement unit="wide skyscraper">
              <Ad adslot="/21799560237/Login/left" width={160} height={600} />
            </Advertisement>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.userData.isAuthenticated,
  authenticating: state.userData.authenticating
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LogIn)
);
