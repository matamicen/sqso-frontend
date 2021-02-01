import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import Advertisement from "semantic-ui-react/dist/commonjs/views/Advertisement";
import { bindActionCreators } from 'redux';
import { Modal } from 'semantic-ui-react';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';
import * as Actions from '../actions';
import '../styles/style.css';
import Ad from './Ad/Ad';
import NewsFeed from './Feed/NewsFeedPresentational';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';

import AppNavigation from './Home/AppNavigation';
class QSODetail extends React.PureComponent {
  state = {
    eventId: null,
    active: true,
    showModal: false,
    adActive: false,
    idqso: null,
    adClosed: false,
    qsoError: null
  };

  static getDerivedStateFromProps(props, prevState) {
    if (props.qsoError && prevState.active)
      return {
        qsoError: props.qsoError,
        active: false
      };
    if (props.qso && prevState.active) {
      if (
        process.env.NODE_ENV === 'production' &&
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
      } else if (
        process.env.NODE_ENV === 'production' &&
        !props.isAuthenticated
      )
        return {
          adActive: true,
          active: false
        };
      else return { active: false };
    }
    if (!props.qso && !prevState.active) return { active: true };
    if (
      process.env.NODE_ENV === 'production' &&
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
    if (process.env.NODE_ENV !== 'production')
      this.setState({ adActive: false });
    let qsoInMemory = this.props.qso ? this.props.qso.GUID_URL : '';

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

    //Comentado Adsense
    window.googletag.cmd.push(function() {
      window.googletag.destroySlots();
      window.googletag
        .defineSlot(
          '/22031658057/qsoDetail/qsoDetail_left',
          [160, 600],
          'div-ads-instance-qsoDetail-left'
        )
        .addService(window.googletag.pubads());
      window.googletag
        .defineSlot(
          '/22031658057/qsoDetail/qsoDetail_right',
          [160, 600],
          'div-ads-instance-qsoDetail-right'
        )
        .addService(window.googletag.pubads());
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
    });
  }
  handleOpen = () => this.setState({ adActive: true });
  handleClose = () => this.setState({ adActive: false, adClosed: true });
  render() {
    const { t } = this.props;
    let error;
    switch (this.state.qsoError) {
      case 'QSO does not exist':
        error = t('qso.notExist');
        break;
      case 'This QSO was deleted and cannot be displayed':
        error = t('qso.postDeleted');
        break;
      default:
        error = this.state.qsoError;
    }
    if (this.state.qsoError) {
      return (
        <Modal
          open={this.state.qsoError ? true : false}
          onClose={() => {
            this.setState({ qsoError: null });
            this.props.history.push('/');
          }}
          size="small"
        >
          <Modal.Content>
            <p align="center">{error}</p>
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
          <Loader>{t('qso.loadingQSO')}</Loader>
        </Dimmer>

        {/* <Dimmer
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
        </Dimmer> */}

        <div className="site-header">
          <AppNavigation />
        </div>
        <div className="site-left">
          <Ad
            adslot="/22031658057/qsoDetail/qsoDetail_left"
            width={160}
            height={600}
            id="div-ads-instance-qsoDetail-left"
            displayOnly={true}
          />
        </div>

        <div className="qsoDetail-main">
          {this.props.qso && <NewsFeed list={qsos} />}
          <Segment
            raised
            secondary
            style={{ padding: 'initial', textAlign: 'center' }}
          >
            <div className="adDesktop">
              <Ad
                adslot="/22031658057/qsoDetail/qsoDetailFeed"
                width={300}
                height={250}
                // id="div-ads-instance-home-feed"
                displayOnly={false}
              />
            </div>
            <div className="adMobile">
              <Ad
                adslot="/22031658057/qsoDetail/qsoDetailFeed"
                width={300}
                height={250}
                // id="div-ads-instance-home-feed"
                displayOnly={false}
              />
            </div>
          </Segment>
        </div>

        <div className="site-right">
          <Ad
            adslot="/22031658057/qsoDetail/qsoDetail_right"
            width={160}
            height={600}
            id="div-ads-instance-qsoDetail-right"
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
  )(withTranslation()(QSODetail))
);
