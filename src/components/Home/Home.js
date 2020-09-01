import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';
import * as Actions from '../../actions';
import '../../styles/style.css';
import Ad from '../Ad/Ad';
import FeedQSO from '../Feed/NewsFeedContainer';
import AppNavigation from './AppNavigation';
class Home extends React.PureComponent {
  state = {
    adActive: true,
    active: true,
    modalOpen: null,
    qsos: [],
    error: null
    // videoAlreadyDisplayed: false
  };

  componentDidMount() {
    // let visited = localStorage['alreadyVisited'];

    // if (visited) {
    //   this.setState({ videoAlreadyDisplayed: true });
    //   //do not view Popup
    // } else {
    //   //this is the first time

    //   this.setState({ videoAlreadyDisplayed: false });
    // }
    if (process.env.NODE_ENV !== 'production')
      this.setState({ adActive: false });

    if (this.props.qsos.length === 0) {
      if (this.props.isAuthenticated) {
        // this.props.actions.doFetchUserFeed(
        //   this.props.token,
        //   this.props.currentQRA
        // );
        this.props.actions.doFetchPublicFeed(this.props.currentQRA);
      } else {
        // if (!visited) this.setState({ modalOpen: true });
        this.props.actions.doFetchPublicFeed();
      }
    }
    //Comentado Adsense
    window.googletag.cmd.push(function() {
      window.googletag.destroySlots();
      window.googletag
        .defineSlot(
          '/22031658057/Home/home_left',
          [160, 600],
          'div-ads-instance-home-left'
        )
        .addService(window.googletag.pubads());
      window.googletag
        .defineSlot(
          '/22031658057/Home/home_right',
          [160, 600],
          'div-ads-instance-home-right'
        )
        .addService(window.googletag.pubads());
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
    });
  }
  handleOpen = () => this.setState({ adActive: true });
  handleClose = () => this.setState({ adActive: false });

  static getDerivedStateFromProps(props, state) {
    if (props.qsos.length > 0) return { active: false, qsos: props.qsos };
    else if (props.qsos.length === 0) return { active: true };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.qsos.length > 0)
      this.setState({ qsos: this.props.qsos, active: false });
    // else if (props.qsos.length === 0) return { active: true };
  }
  render() {
    const { t } = this.props;

    return (
      <Fragment>
        <Dimmer active={this.state.active} page>
          <Loader>{t('qso.loadingQSO')}</Loader>
        </Dimmer>
        {/* <Dimmer
          active={
            this.state.adActive &&
            this.props.account_type &&
            this.props.account_type.web_home_intersitial !== ""
          }
          onClick={this.handleClose}
          page
          // verticalAlign="center"
        >
          <Ad
            adslot="/21799560237/Home/Home_Intersitial"
            width={640}
            height={480}
            id="home-intersitial"
            displayOnly={true}
          />
        </Dimmer> */}
        <div className="global-container">
          <div className="site-header">
            <AppNavigation />
          </div>
          {this.state.qsos.length > 0 && (
            <Fragment>
              <div className="site-left">
                <Ad
                  adslot="/22031658057/Home/home_left"
                  width={160}
                  height={600}
                  id="div-ads-instance-home-left"
                  displayOnly={true}
                />
              </div>

              <div className="site-main"><FeedQSO /></div>

              <div className="site-right">
                <Ad
                  adslot="/22031658057/Home/home_right"
                  width={160}
                  height={600}
                  id="div-ads-instance-home-right"
                  displayOnly={true}
                />
              </div>
            </Fragment>
          )}
        </div>

        {/* <Modal
          open={this.state.modalOpen}
          onClose={() => {
            localStorage['alreadyVisited'] = true;
            this.setState({ modalOpen: false, videoAlreadyDisplayed: true });
          }}
          size="large"
        >
          <Modal.Header>{t('whatIsSuperQSO.whatIsSuperQSO')}</Modal.Header>
          <Modal.Content>
            <video width="100%" autoPlay controls controlsList="nodownload">
              <source
                src={
                  global_config.s3Cloudfront + '/faq/Presentacion_SuperQSO2.mp4'
                }
                type="video/mp4"
              />
              {t('whatIsSuperQSO.browserNotSupportTag')}.
            </video>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="facebook"
              onClick={() => {
                this.setState({
                  modalOpen: false,
                  videoAlreadyDisplayed: true
                });
                localStorage['alreadyVisited'] = true;
                this.props.history.push('/download');
              }}
            >
              {t('whatIsSuperQSO.downloadApp')}
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  modalOpen: false,
                  videoAlreadyDisplayed: true
                });
                localStorage['alreadyVisited'] = true;
                this.props.history.push('/tutorials');
              }}
            >
              {t('whatIsSuperQSO.tutorial')}
            </Button>
            <Button
              onClick={() => {
                localStorage['alreadyVisited'] = true;
                this.setState({
                  modalOpen: false,
                  videoAlreadyDisplayed: true
                });
              }}
            >
              {t('whatIsSuperQSO.skip')}
            </Button>
          </Modal.Actions>
        </Modal> */}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  FetchingQSOS: state.FetchingQSOS,
  qsosFetched: state.qsosFetched,
  authenticating: state.userData.authenticating,
  currentQRA: state.userData.currentQRA,
  isAuthenticated: state.userData.isAuthenticated,
  token: state.userData.token,
  qsos: state.qsos,
  account_type: state.userData.qra.account_type,
  public: state.userData.public
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(Home))
);
