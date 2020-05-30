import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import * as Actions from '../../actions';
import global_config from '../../global_config.json';
import '../../styles/style.css';
import Ad from '../Ad/Ad';
import FeedQSO from '../Feed/NewsFeedContainer';
import AppNavigation from './AppNavigation';
class Home extends React.Component {
  state = {
    adActive: true,
    active: null,
    modalOpen: false,
    error: null, 
    videoAlreadyDisplayed: false
  };

  componentDidMount() {
    let visited = localStorage["alreadyVisited"];
    
    if(visited) {
         this.setState({ videoAlreadyDisplayed: true })
         //do not view Popup
    } else {
         //this is the first time
         localStorage["alreadyVisited"] = true;
         this.setState({ viewPopup: false});
    }
    if (process.env.NODE_ENV !== 'production')
      this.setState({ adActive: false });

    if (this.props.isAuthenticated)
      this.props.actions.doFetchUserFeed(this.props.token);
    else {
      if (!visited) this.setState({ modalOpen: true });
      this.props.actions.doFetchPublicFeed();
    }
    //Comentado Adsense
    window.googletag.cmd.push(function() {
      window.googletag.destroySlots();
      window.googletag
        .defineSlot(
          "/22031658057/Home/home_left",
          [160, 600],
          "div-ads-instance-home-left"
        )
        .addService(window.googletag.pubads());
      window.googletag
        .defineSlot(
          "/22031658057/Home/home_right",
          [160, 600],
          "div-ads-instance-home-right"
        )
        .addService(window.googletag.pubads());
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
    });
  }
  handleOpen = () => this.setState({ adActive: true });
  handleClose = () => this.setState({ adActive: false });

  static getDerivedStateFromProps(props, state) {
    if (props.qsosFetched) return { active: false };
    else if (!props.qsosFetched) return { active: true };
  }
  render() {
    return (
      <Fragment>
        <Dimmer active={this.state.active} page>
          <Loader>Loading QSOs...</Loader>
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
          <div className="site-left">
            <Ad
              adslot="/22031658057/Home/home_left"
              width={160}
              height={600}
              id="div-ads-instance-home-left"
              displayOnly={true}
            />

            {/* <img src='/bannerDescarga.gif' alt="Download APP and work your first QSO"/> */}
          </div>

          <div className="site-main">
            {this.props.qsosFetched && <FeedQSO />}
          </div>

          <div className="site-right">
            <Ad
              adslot="/22031658057/Home/home_right"
              width={160}
              height={600}
              id="div-ads-instance-home-right"
              displayOnly={true}
            />
            {/* <img src='/bannerDescarga.gif' alt="Download APP and work your first QSO"/> */}
          </div>
        </div>
        <Modal
          open={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false, videoAlreadyDisplayed: true })}
          size="large"
        ><Modal.Header>¿Que es SuperQSO?</Modal.Header>
          <Modal.Content>
            <video width="100%" autoPlay controls controlsList="nodownload">
              <source
                src={
                  global_config.s3Cloudfront + '/faq/Presentacion_SuperQSO2.mp4'
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="facebook"
              onClick={() => {
                this.setState({ modalOpen: false, videoAlreadyDisplayed: true });
                this.props.history.push('/download');
              }}
            >
              Download App
            </Button>
            <Button onClick={() => {
                this.setState({ modalOpen: false, videoAlreadyDisplayed: true });
                this.props.history.push('/tutorials');
              }}
            >
              Tutorials
            </Button>
            <Button onClick={() => {
                this.setState({ modalOpen: false, videoAlreadyDisplayed: true });
                
              }}
            >
              Skip
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  FetchingQSOS: state.FetchingQSOS,
  qsosFetched: state.qsosFetched,
  authenticating: state.userData.authenticating,
  isAuthenticated: state.userData.isAuthenticated,
  token: state.userData.token,
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
  )(Home)
);
