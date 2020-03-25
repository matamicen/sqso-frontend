import React from "react";
import FeedAudioList from "./FeedAudioList";
import FeedImage from "./FeedImage";
import QSOShareButtons from "./QSOShareButtons";
import PopupToFollow from "../PopupToFollow";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";

import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";

import QSOComments from "./QSOComments";
import QSOLikeButton from "./QSOLikeButton";

import QRAs from "./QRAs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import { Link } from "react-router-dom";
import FeedOptionsMenu from "./FeedOptionsMenu";
import QSORePostButton from "./QSORePostButton";
import "./style.css";
class FeedItemRepost extends React.Component {
  constructor() {
    super();
    this.state = { comments: [], error: null };
    this.handleOnComment = this.handleOnComment.bind(this);
    this.recalculateRowHeight = this.recalculateRowHeight.bind(this);
  }
  handleOnComment() {
    if (this.props.qso.comments.length > 0)
      this.props.showComments(this.props.index);
    // this.recalculateRowHeight(); this.props.recalculateRowHeight()
  }

  // componentDidUpdate(prevProps, prevState) {
  //     if ((this.state.showComment !== prevState.showComment) && (this.props.recalculateRowHeight))
  //         this.props.recalculateRowHeight(this.props.index);

  //     }
  recalculateRowHeight() {
    if (this.props.recalculateRowHeight)
      this.props.recalculateRowHeight(this.props.index);
  }
  static getDerivedStateFromProps(props, prevState) {
    if (props.qso.comments !== prevState.comments)
      return { comments: props.qso.comments };
    return null;
  }
  render() {
    let picList = this.props.qso.media.filter(media => media.type === "image");
    let audioList = this.props.qso.media.filter(
      media => media.type === "audio"
    );
    const commentsCounter = "(" + this.props.qso.comments.length + ")";

    let text;

    switch (this.props.qso.original[0].type) {
      case "QSO":
        text = " worked a QSO";
        break;
      case "LISTEN":
        text = " listened a QSO";
        break;
      default:
    }
    var date = new Date(this.props.qso.original[0].datetime);
    return (
      <Segment raised>
        <div className="qso-header">
          <div className="qso-avatar">
            <Link to={"/" + this.props.qso.qra}>
              <Image
                src={
                  this.props.qso.avatarpic
                    ? this.props.qso.avatarpic
                    : "/emptyprofile.png"
                }
                size="mini"
                avatar
                style={{
                  width: "35px",
                  height: "35px"
                }}
              />
            </Link>
          </div>
          <div className="qso-header-action">
            <PopupToFollow
              qra={this.props.qso.qra}
              trigger={
                <Link to={"/" + this.props.qso.qra}>{this.props.qso.qra}</Link>
              }
            />
            {"reposted a QSO"}
          </div>

          <div
            className="qso-header-button"
            style={{
              float: "right"
            }}
          >
            <FeedOptionsMenu
              qso_owner={this.props.qso.qra}
              idqso={this.props.qso.idqsos}
              guid={this.props.qso.GUID_QR}
              optionsCaller="FeedItem"
              QslCard={false}
            />
          </div>
        </div>

        <Divider hidden />
        <Segment raised>
          <div className="qso-header">
            <div className="qso-avatar">
              <Link to={"/" + this.props.qso.original[0].qra}>
                <Image
                  src={
                    this.props.qso.original[0].avatarpic
                      ? this.props.qso.original[0].avatarpic
                      : "/emptyprofile.png"
                  }
                  size="mini"
                  avatar
                  style={{
                    width: "35px",
                    height: "35px"
                  }}
                />
              </Link>
            </div>
            <div className="qso-header-action">
              <PopupToFollow
                qra={this.props.qso.original[0].qra}
                trigger={
                  <Link to={"/" + this.props.qso.original[0].qra}>
                    {this.props.qso.original[0].qra}
                  </Link>
                }
              />
              {text}
            </div>
            <div className="qso-header-info">
              <div>
                <b>Mode: </b>
                {this.props.qso.original[0].mode}
              </div>
              <div>
                <b>Band: </b>
                {this.props.qso.original[0].band}
              </div>
              <div>
                <b>Date: </b>
                {date.toLocaleDateString("EN-US", { month: "short" }) +
                  " " +
                  date.getDate() +
                  ", " +
                  date.getFullYear()}
              </div>
              <div>
                <b>UTC: </b>
                {date.getUTCHours() +
                  ":" +
                  (date.getMinutes() < 10 ? "0" : "") +
                  date.getMinutes()}
              </div>
            </div>

            <div
              className="qso-header-button"
              style={{
                float: "right"
              }}
            >
              <FeedOptionsMenu
                qso_owner={this.props.qso.qra}
                idqso={this.props.qso.idqsos}
                guid={this.props.qso.GUID_QR}
                optionsCaller="FeedItem"
                QslCard={false}
              />
            </div>
          </div>
          <Divider
            hidden
            style={{ marginTop: "0.5vh", marginBottom: "0.5vh" }}
          />
          <Segment>
            <QRAs
              avatarpic={this.props.qso.original[0].avatarpic}
              qso_owner={this.props.qso.original[0].qra}
              qras={this.props.qso.qras}
            />
          </Segment>
          {picList.length > 0 && (
            <FeedImage
              img={picList}
              measure={this.props.measure}
              idqso={this.props.qso.idqsos}
              qso_owner={this.props.qso.original[0].qra}
            />
          )}
          {audioList.length > 0 && (
            <FeedAudioList
              mediaList={audioList}
              idqso={this.props.qso.idqsos}
              qso_owner={this.props.qso.original[0].qra}
            />
          )}
        </Segment>

        <Divider hidden />
        <Button.Group widths="4" basic>
          <QSOLikeButton qso={this.props.qso} />
          <Button onClick={this.handleOnComment.bind(this)}>
            <Icon name="comment outline" />{" "}
            {this.props.qso.comments.length > 0 && commentsCounter}
          </Button>
          <QSORePostButton qso={this.props.qso} />
          <QSOShareButtons idqso={this.props.qso.GUID_URL} />
        </Button.Group>

        {this.props.qso.showComments && (
          <QSOComments
            qso={this.props.qso}
            comments={this.state.comments}
            recalculateRowHeight={this.recalculateRowHeight}
          />
        )}
      </Segment>
    );
  }
}
const mapStateToProps = (state, qsos) => ({
  fetchingQSOS: state.FetchingQSOS,
  qsosFetched: state.qsosFetched,
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
)(FeedItemRepost);
