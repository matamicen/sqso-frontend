import React from "react";

import NewsFeed from "./Feed/NewsFeedPresentational";
import AppNavigation from "./Home/AppNavigation";
// import Advertisement from "semantic-ui-react/dist/commonjs/views/Advertisement";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Ad from "./Ad/Ad";
import "../styles/style.css";
import * as Sentry from "@sentry/browser";
import { Modal } from "semantic-ui-react";
class QSODetail extends React.PureComponent {
  state = {
    error: null,
    eventId: null,
    active: true,
    showModal: false,
    adActive: false,
    idqso: null,
    adClosed: false
  };
  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }
  static getDerivedStateFromProps(props, prevState) {
    if (props.qsoError && prevState.active)
      return {
        qsoError: props.qsoError,
        active: false
      };
    if (props.qso && prevState.active) {
      if (
        !prevState.adClosed &&
        props.qraUserData &&
        props.qraUserData.account_type &&
        props.qraUserData.monthly_qso_views >
          props.qraUserData.account_type.web_qso_detail
      ) {
        return {
          adActive: true,
          active: false
        };
      } else if (!props.isAuthenticated)
        return {
          adActive: true,
          active: false
        };
      else return { active: false };
    }
    if (!props.qso && !prevState.active) return { active: true };
    if (
      !prevState.adClosed &&
      props.qraUserData &&
      props.qraUserData.account_type &&
      props.qraUserData.monthly_qso_views >
        props.qraUserData.account_type.web_qso_detail
    ) {
      return {
        adActive: true
      };
    }
    return null;
  }
  componentDidMount() {
    let qsoInMemory = this.props.qso ? this.props.qso.GUID_URL : "";

    if (
      (!this.props.FetchingQSO && !this.props.QSOFetched) ||
      (this.props.QSOFetched && this.props.match.params.idqso !== qsoInMemory)
    ) {
      this.props.actions.doRequestQSO();
      this.props.actions.doFetchQSO(
        this.props.match.params.idqso,
        this.props.token
      );
      this.setState({ idqso: this.props.match.params.idqso });
    }
    window.googletag.cmd.push(function() {
      window.googletag.destroySlots();
      window.googletag
        .defineSlot(
          "/21799560237/qsoDetail/left",
          [160, 600],
          "div-ads-instance-qsodetail-left"
        )
        .addService(window.googletag.pubads());
      // .setTargeting("interests", ["sports", "music", "movies"]);
      window.window.googletag
        .defineSlot(
          "/21799560237/qsoDetail/intersitial",
          [640, 480],
          "div-ads-instance-qsodetail-intersitial"
        )
        .addService(window.googletag.pubads());
      window.googletag
        .defineSlot(
          "/21799560237/qsoDetail/right",
          [160, 600],
          "div-ads-instance-qsodetail-right"
        )
        .addService(window.googletag.pubads());
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
    });
  }
  handleOpen = () => this.setState({ adActive: true });
  handleClose = () => this.setState({ adActive: false, adClosed: true });
  render() {
    if (this.state.qsoError) {
      return (
        <Modal
          open={this.state.qsoError ? true : false}
          onClose={() => this.props.history.push("/")}
          size="small"
        >
          <Modal.Content>
            <p align="center">{this.state.qsoError}</p>
          </Modal.Content>
        </Modal>
      );
    }
    let qsos = [];
    if (this.props.qso) {
      qsos.push({ qso: this.props.qso, type: this.props.qso.type });
    }

    return (
      <div className="qsoDetail-container">
        <Dimmer active={this.state.active} page>
          <Loader>Loading QSO...</Loader>
        </Dimmer>

        <Dimmer
          active={this.state.adActive}
          onClick={this.handleClose}
          page
          // verticalAlign="center"
        >
          <Ad
            adslot="/21799560237/qsoDetail/intersitial"
            width={640}
            height={480}
            id="qsodetail-intersitial"
            displayOnly={true}
          />
        </Dimmer>

        <div className="site-header">
          <AppNavigation />
        </div>
        <div className="site-left">
          <Ad
            adslot="/21799560237/qsoDetail/left"
            width={160}
            height={600}
            id="qsodetail-left"
            displayOnly={true}
          />
        </div>

        <div className="qsoDetail-main">
          {this.props.qso && <NewsFeed list={qsos} />}
        </div>

        <div className="site-right">
          <Ad
            adslot="/21799560237/qsoDetail/right"
            width={160}
            height={600}
            id="qsodetail-right"
            displayOnly={true}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  qsoError: state.qsoError,
  qso: state.qso,
  FetchingQSO: state.FetchingQSO,
  QSOFetched: state.QSOFetched,
  token: state.userData.token,
  qraUserData: state.userData.qra,
  isAuthenticated: state.userData.isAuthenticated
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QSODetail)
);
