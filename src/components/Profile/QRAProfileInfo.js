import React, { Fragment } from "react";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";

import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";

import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";

import * as Actions from "../../actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "../../styles/style.css";
class QRAProfileInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      qra: {
        firstname: this.props.qraInfo.firstname,
        lastname: this.props.qraInfo.lastname,
        mobile: this.props.qraInfo.mobile,
        birthday: this.props.qraInfo.birthday,
        address: this.props.qraInfo.address,
        city: this.props.qraInfo.city,
        state: this.props.qraInfo.state,
        zipcode: this.props.qraInfo.zipcode,
        country: this.props.qraInfo.country,
        cqzone: this.props.qraInfo.cqzone,
        iotadesignator: this.props.qraInfo.iotadesignator,
        licenseclass: this.props.qraInfo.licenseclass,
        qslinfo: this.props.qraInfo.qslinfo
      }
    };
  }

  close = () => this.setState({ edit: false });
  open = () => this.setState({ edit: true });
  handleOnSaveInfo = e => {
    this.props.actions.doSaveUserInfo(this.props.token, this.state.qra);
    this.close();
  };
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      qra: {
        ...this.state.qra,
        [name]: value
      }
    });
  };
  render() {
    const { edit } = this.state;
    const {
      firstname,
      lastname,

      mobile,
      city,
      birthday,
      zipcode,
      country,
      state,
      address,
      cqzone,
      iotadesignator,
      licenseclass,
      qslinfo
    } = this.state.qra;

    return (
      <Fragment>
        <Segment raised>
          <Form size="mini">
            {this.props.isAuthenticated &&
              this.props.currentQRA === this.props.qraInfo.qra && (
                <div
                  style={{
                    float: "right"
                  }}
                >
                  <Dropdown
                    icon="ellipsis vertical"
                    size="tiny"
                    className="icon"
                    pointing="right"
                  >
                    <Dropdown.Menu>
                      {!edit && (
                        <Dropdown.Item text="Edit Info" onClick={this.open} />
                      )}
                      {edit && (
                        <Dropdown.Item
                          text="Save Info"
                          onClick={this.handleOnSaveInfo}
                        />
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}

            <Form.Group widths={2}>
              <Form.Input
                name="firstname"
                label="First name"
                width={4}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={firstname ? firstname : ""}
              />
              <Form.Input
                name="lastname"
                label="Last name"
                width={4}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={lastname ? lastname : ""}
              />
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input
                name="email"
                label="Email"
                width={4}
                value={this.props.qraInfo.email ? this.props.qraInfo.email : ""}
              />
              <Form.Input
                name="mobile"
                label="Mobile Phone"
                width={4}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={mobile ? mobile : ""}
              />
            </Form.Group>
            <Form.Input
              name="birthday"
              label="Birthday"
              type="date"
              width={4}
              readOnly={!edit}
              onChange={this.changeHandler}
              value={
                birthday
                  ? new Date(birthday).toISOString().substring(0, 10)
                  : ""
              }
            />

            <Form.Input
              name="address"
              label="Address"
              width={4}
              readOnly={!edit}
              onChange={this.changeHandler}
              value={address ? address : ""}
            />
            <Form.Group widths={3}>
              <Form.Input
                name="city"
                label="City"
                width={4}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={city ? city : ""}
              />
              <Form.Input
                name="state"
                label="State"
                width={4}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={state ? state : ""}
              />
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input
                name="zipcode"
                label="ZIP Code"
                width={4}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={zipcode ? zipcode : ""}
              />
              <Form.Input
                name="country"
                label="Country"
                width={4}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={country ? country : ""}
              />
            </Form.Group>
            <Form.Input
              name="cqzone"
              label="cqzone"
              width={4}
              readOnly={!edit}
              onChange={this.changeHandler}
              value={cqzone ? cqzone : ""}
            />
            <Form.Input
              name="iotadesignator"
              label="iotadesignator"
              width={4}
              readOnly={!edit}
              onChange={this.changeHandler}
              value={iotadesignator ? iotadesignator : ""}
            />
            <Form.Input
              name="licenseclass"
              label="licenseclass"
              width={4}
              readOnly={!edit}
              onChange={this.changeHandler}
              value={licenseclass ? licenseclass : ""}
            />
            <Form.Input
              name="qslinfo"
              label="qslinfo"
              width={4}
              readOnly={!edit}
              onChange={this.changeHandler}
              value={qslinfo ? qslinfo : ""}
            />
          </Form>
        </Segment>
      </Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  //state: state,
  currentQRA: state.userData.currentQRA,
  isAuthenticated: state.userData.isAuthenticated,
  token: state.userData.token
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
  )(QRAProfileInfo)
);
