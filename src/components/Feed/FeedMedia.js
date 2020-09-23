import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import * as Actions from '../../actions';
import '../../styles/style.css';
import FeedAudioList from './FeedAudioList';
import FeedImage from './FeedImage';
import FeedVideoList from './FeedVideoList';
class FeedMedia extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      qso: null,
      error: null
    };
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.qso && (JSON.stringify(this.props.qso) !== JSON.stringify(prevProps.qso)))
  //     this.setState({
  //       qso: this.props.qso
  //     });
  // }
  render() {
    let picList = this.props.qso.media.filter(media => media.type === 'image');

    let audioList = this.props.qso.media.filter(
      media => media.type === 'audio'
    );

    let videoList = this.props.qso.media.filter(
      media => media.type === 'video'
    );

    return (
      <Fragment>
                {videoList.length > 0 && (
          <Fragment>
            <Divider
              hidden
              style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
            />
            <FeedVideoList
              mediaList={videoList}
              measure={this.props.measure}
              idqso={this.props.qso.idqsos}
              qso_owner={this.props.qso.qra}
            />
          </Fragment>
        )}
        {picList.length > 0 && (
          <Fragment>
            <Divider
              hidden
              style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
            />
            <FeedImage
              img={picList}
              measure={this.props.measure}
              idqso={this.props.qso.idqsos}
              qso_owner={this.props.qso.qra}
            />
          </Fragment>
        )}
        {audioList.length > 0 && (
          <Fragment>
            <Divider
              hidden
              style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
            />
            <FeedAudioList
              mediaList={audioList}
              idqso={this.props.qso.idqsos}
              qso_owner={this.props.qso.qra}
              recalculateRowHeight={this.recalculateRowHeight}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  token: state.userData.token,
  isAuthenticated: state.userData.isAuthenticated,
  currentQRA: state.userData.currentQRA
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(FeedMedia);
