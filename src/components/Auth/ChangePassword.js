import React from "react";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import * as Actions from "../../actions";
import Auth from "@aws-amplify/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Advertisement from "semantic-ui-react/dist/commonjs/views/Advertisement";
import AppNavigation from "../Home/AppNavigation";
import { withRouter } from "react-router-dom";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import "../../styles/style.css";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Ad from "../Ad/Ad";
class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      showModal: false,
      oldPassword: null,
      password: null,
      passwordConfirm: null,
      changePasswordError: "",
      formErrors: {
        oldPassword: "",
        password: "",
        passwordConfirm: ""
      }
    };
    this.handleChangePasswordButton = this.handleChangePasswordButton.bind(
      this
    );
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  };
  close = () => {
    this.setState({ showModal: false });
    this.props.actions.doLogout();
    this.props.history.push("/login");
  };
  open = () => this.setState({ showModal: true });

  handleChangePasswordButton = () => {
    let error = this.validateFields();

    if (!error) {
      this.setState({ loader: true });
      Auth.currentAuthenticatedUser()
        .then(user => {
          return Auth.changePassword(
            user,
            this.state.oldPassword,
            this.state.password
          );
        })
        .then(data => {
          this.setState({ loader: false });
          this.setState({ showModal: true });
        })
        .catch(err => {
          this.setState({ changePasswordError: err.message });
          this.setState({ loader: false });
        });
    }
  };
  validateFields() {
    let fieldValidationErrors = this.state.formErrors;

    //password

    let passwordValid = this.state.password.length >= 6;
    fieldValidationErrors.password = passwordValid
      ? null
      : "Password is too short";

    fieldValidationErrors.passwordConfirm =
      this.state.password === this.state.passwordConfirm
        ? null
        : "New Password and Confirmation are not the same";

    this.setState({ formErrors: fieldValidationErrors });

    if (fieldValidationErrors.password || fieldValidationErrors.passwordConfirm)
      return true;
    else return false;
  }

  render() {
    return (
      <div className="global-container">
        <div className="site-header">
          <AppNavigation />
        </div>
        <div className="site-left">
          <Advertisement className="left" unit="wide skyscraper">
            <Ad
              adslot="/21799560237/ChangePassword/left"
              width={160}
              height={600}
            />
          </Advertisement>
        </div>

        <div className="changepassword-main">
          <Segment raised>
            <Modal
              open={this.state.showModal}
              onClose={this.close}
              header="Password Changed"
              content="Your password has been changed. Please login again!"
              actions={[
                {
                  key: "done",
                  content: "Ok",
                  positive: true
                }
              ]}
            />
            <Dimmer active={this.state.loader} page>
              <Loader>Loading</Loader>
            </Dimmer>
            <Header as="h2" color="teal" textAlign="center">
              Change Password
            </Header>
            <Form onSubmit={() => this.handleChangePasswordButton()}>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  error={this.state.formErrors.password ? true : false}
                  placeholder="Old Password"
                  name="oldPassword"
                  onChange={this.changeHandler.bind(this)}
                />{" "}
                {this.state.formErrors.password && (
                  <Message negative content={this.state.formErrors.password} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  error={this.state.formErrors.password ? true : false}
                  placeholder="New Password"
                  name="password"
                  onChange={this.changeHandler.bind(this)}
                />{" "}
                {this.state.formErrors.password && (
                  <Message negative content={this.state.formErrors.password} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  error={this.state.formErrors.passwordConfirm ? true : false}
                  placeholder="New Password Confirmation"
                  name="passwordConfirm"
                  onChange={this.changeHandler.bind(this)}
                />{" "}
                {this.state.formErrors.passwordConfirm && (
                  <Message
                    negative
                    content={this.state.formErrors.passwordConfirm}
                  />
                )}
              </Form.Field>
              {this.state.changePasswordError && (
                <Message negative content={this.state.changePasswordError} />
              )}
              <Form.Button content="Change Password" />
            </Form>
          </Segment>
        </div>

        <div className="site-right">
          <Advertisement unit="wide skyscraper">
            <Ad
              adslot="/21799560237/ChangePassword/right"
              width={160}
              height={600}
            />
          </Advertisement>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  //state: state,
  currentQRA: state.userData.qra
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
  )(ChangePassword)
);
