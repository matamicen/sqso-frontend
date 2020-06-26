import React, { Fragment } from "react";
import { withTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import * as Actions from "../../actions";
import "../../styles/style.css";
import { MY_COUNTRIES_DATA } from "./countries.js";


// const options = [
//   { key: "Y", text: "Yes", value: "1" },
//   { key: "N", text: "No", value: "0" }
// ];
class QRAProfileInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,

      qra: {
        firstname: this.props.qraInfo.firstname,
        lastname: this.props.qraInfo.lastname,
        email: this.props.qraInfo.email,
        mobile: this.props.qraInfo.mobile,
        birthday: this.props.qraInfo.birthday,
        address: this.props.qraInfo.address,
        address2: this.props.qraInfo.address2,
        city: this.props.qraInfo.city,
        state: this.props.qraInfo.state,
        zipcode: this.props.qraInfo.zipcode,
        country: this.props.qraInfo.country,
        cqzone: this.props.qraInfo.cqzone,
        ituzone: this.props.qraInfo.ituzone,
        gridlocator: this.props.qraInfo.gridlocator,
        iotadesignator: this.props.qraInfo.iotadesignator,
        licenseclass: this.props.qraInfo.licenseclass,
        qslinfo: this.props.qraInfo.qslinfo,
        eqsl: this.props.qraInfo.eqsl,
        lotw: this.props.qraInfo.lotw,
        mailqsl: this.props.qraInfo.mailqsl
      }
    };
  }

  close = () => this.setState({ edit: false });
  open = () => this.setState({ edit: true });
  handleOnSaveInfo = e => {
    this.props.actions.doSaveUserInfo(this.props.token, this.state.qra);
    this.close();
  };
  changeHandler = (e, { name, value }) => {
    this.setState({
      qra: {
        ...this.state.qra,
        [name]: value
      }
    });
  };
  render() {
    const {t} = this.props;
    const { edit } = this.state;
    let {
      firstname,
      lastname,
      email,
      // mobile,
      city,
      birthday,
      zipcode,
      country,
      state,
      address,
      address2,
      cqzone,
      ituzone,
      gridlocator,
      iotadesignator,
      licenseclass,
      qslinfo
      // eqsl,
      // lotw,
      // mailqsl
    } = this.state.qra;
    this.props.isAuthenticated
      ? (email = this.state.qra.email)
      : (email = t('auth.loginToSeeField'));
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
                        <Dropdown.Item text={t('qra.editInfo')} onClick={this.open} />
                      )}
                      {edit && (
                        <Dropdown.Item
                          text={t('qra.saveInfo')}
                          onClick={this.handleOnSaveInfo}
                        />
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}

            <Form.Group widths="equal">
              <Form.Input
                name="firstname"
                label={t('qra.firstName')}
                // width={6}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={firstname ? firstname : ""}
              />
              <Form.Input
                name="lastname"
                label={t('qra.lastName')}
                // width={6}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={lastname ? lastname : ""}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="email"
                label={t('qra.email')}
                // width={5}
                value={email ? email : ""}
              />
              <Form.Input
                name="birthday"
                label={t('qra.birthday')}
                type="date"
                // width={4}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={
                  birthday
                    ? new Date(birthday).toISOString().substring(0, 10)
                    : ""
                }
              />
              {/* <Form.Input
                name="mobile"
                label="Mobile Phone"
                // width={4}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={mobile ? mobile : ""}
              /> */}
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="address"
                label={t('qra.addressLine1')}
                // width={12}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={address ? address : ""}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="address2"
                label={t('qra.addressLine2')}
                // width={12}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={address2 ? address2 : ""}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="city"
                label={t('qra.city')}
                width={5}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={city ? city : ""}
              />
              <Form.Input
                name="state"
                label={t('qra.state')}
                width={3}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={state ? state : ""}
              />
              <Form.Input
                name="zipcode"
                label={t('qra.zipCode')}
                width={2}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={zipcode ? zipcode : ""}
              />

              <Form.Field width={3}>
                <label htmlFor="country">{t('qra.country')}</label>
                <Dropdown
                  name="country"
                  onChange={this.changeHandler}
                  options={MY_COUNTRIES_DATA}
                  search
                  disabled={!edit}
                  selection
                  selectOnBlur={false}
                  value={country ? country : ""}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="cqzone"
                label={t('qra.cqZone')}
                width={3}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={cqzone ? cqzone : ""}
              />
              <Form.Input
                name="ituzone"
                label={t('qra.ituZone')}
                width={3}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={ituzone ? ituzone : ""}
              />
              <Form.Input
                name="gridlocator"
                label={t('qra.gridLocator')}
                width={3}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={gridlocator ? gridlocator : ""}
              />
              <Form.Input
                name="licenseclass"
                label={t('qra.licenseClass')}
                width={3}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={licenseclass ? licenseclass : ""}
              />

              <Form.Input
                name="iotadesignator"
                label={t('qra.iotaDesignator')}
                // width={4}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={iotadesignator ? iotadesignator : ""}
              />
            </Form.Group>
            <Form.Group inline>
              <Form.Input
                name="qslinfo"
                label={t('qra.qsoInfo')}
                width={13}
                readOnly={!edit}
                onChange={this.changeHandler}
                value={qslinfo ? qslinfo : ""}
              />
              <label>{t('qra.qsoInfoEG')}</label>
            </Form.Group>
            {/* <Form.Group inline>
              <label>QSL by eQSL?</label>
              <Form.Select
                // fluid
                name="eqsl"
                options={options}
                defaultValue={eqsl === 1 ? "1" : "0"}
                onChange={this.changeHandler}
                disabled={!edit}
                // placeholder=''
              />
              <label>Do you accept QSL from eQSL.net?</label>
            </Form.Group>
            <Form.Group inline>
              <label>Uses LOTW?</label>
              <Form.Select
                // fluid
                name="lotw"
                options={options}
                onChange={this.changeHandler}
                disabled={!edit}
                defaultValue={lotw === 1 ? "1" : "0"}
                // placeholder="Gender"
              />
              <label>Do you use ARRL's Logbook of the World (LOTW)?</label>
            </Form.Group>
            <Form.Group inline>
              <label>QSL by Mail?</label>
              <Form.Select
                // fluid
                name="mailqsl"
                options={options}
                onChange={this.changeHandler}
                disabled={!edit}
                defaultValue={mailqsl === 1 ? "1" : "0"}
                // placeholder="Gender"
              />
              <label>Do you send QSL Cards by postal mail?</label>
            </Form.Group> */}
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
  )(withTranslation()(QRAProfileInfo))
);
