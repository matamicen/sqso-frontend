import React, { Fragment } from "react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { Confirm } from "semantic-ui-react";

class FeedAudio extends React.Component {
  constructor() {
    super();
    this.state = {
      showReportContent: false,
      showMessage: false,
      audioNotVisible: true,
      promptLogin: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.isAuthenticated) this.setState({ audioNotVisible: false });
    else {
      if (this.props.index > 0) this.setState({ promptLogin: true });
      else this.setState({ audioNotVisible: false });
    }
  }
  render() {
    let date = new Date(this.props.media.datetime);

    if (this.props.media.url) {
      if (this.state.audioNotVisible) {
        return (
          <Fragment>
            <Confirm
              size="mini"
              open={this.state.promptLogin}
              onCancel={() => this.setState({ promptLogin: false })}
              onConfirm={() => this.props.history.push("/login")}
              cancelButton="Cancel"
              confirmButton="Login"
              content="Please Login to perform this action"
            />
            <Button icon onClick={this.onClick}>
              <Icon name="play circle" />
            </Button>
            {date.toLocaleDateString("EN-US", { month: "short" }) +
              " " +
              date.getDate() +
              ", " +
              date.getFullYear()}{" "}
            {date.getUTCHours() + ":" + date.getMinutes()}
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <audio
              ref="audio_tag"
              src={this.props.media.url}
              controls
              autoPlay
              preload="none"
              controlsList="nodownload"
              onPlay={() =>
                this.props.actions.doQsoMediaPlay(
                  this.props.media.idqsos_media,
                  this.props.token,
                  this.props.media.idqso
                )
              }
            />
          </Fragment>
        );
      }
    } else {
      return null;
    }
  }
}
Audio.propTypes = {
  url: PropTypes.string.isRequired
};
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
)(FeedAudio);
