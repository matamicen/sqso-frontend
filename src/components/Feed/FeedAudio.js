import React, { Fragment } from "react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { Confirm, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as Sentry from "@sentry/browser";
Audio.propTypes = {
  url: PropTypes.string.isRequired
};
class FeedAudio extends React.Component {
  constructor() {
    super();
    this.state = {
      showReportContent: false,
      showMessage: false,
      audioNotVisible: true,
      promptLogin: false,
      promptPremium: false,
      error: null
    };
    this.onClick = this.onClick.bind(this);
  }
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === "production") {
      this.setState({ error });
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    } else console.log(error, errorInfo);
  }
  onClick() {
    if (this.props.isAuthenticated) {
      if (
        this.props.qraUserData.monthly_audio_play >
        this.props.qraUserData.account_type.web_qso_audio_play
      )
        this.setState({ promptPremium: true });
      else this.setState({ audioNotVisible: false });
    } else {
      if (this.props.index > 0) this.setState({ promptLogin: true });
      else this.setState({ audioNotVisible: false });
    }
  }
  render() {
    let date = new Date(this.props.media.datetime);
    let onlyForRegistered =
      this.props.index > 0 && !this.props.isAuthenticated ? true : false;
    if (this.props.media.url) {
      if (this.state.audioNotVisible) {
        return (
          <Fragment>
            <Modal
              closeIcon
              open={this.state.promptPremium}
              onClose={() => this.setState({ promptPremium: false })}
              header="Upgrade to Premium"
              content="You've reached the maximum allowed for free users. Upgrade to Premium in our APP"
              actions={["OK"]}
            />
            <Confirm
              size="mini"
              open={this.state.promptLogin}
              onCancel={() => this.setState({ promptLogin: false })}
              onConfirm={() => this.props.history.push("/login")}
              cancelButton="Cancel"
              confirmButton="Login"
              content="Please Login to perform this action"
            />
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
            {date.getUTCHours() + ":" + date.getMinutes()}{" "}
            {onlyForRegistered && <Link to="/login">Login Required</Link>}
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
                this.props.isAuthenticated &&
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

const mapStateToProps = state => ({
  token: state.userData.token,
  isAuthenticated: state.userData.isAuthenticated,
  currentQRA: state.userData.currentQRA,
  qraUserData: state.userData.qra
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
