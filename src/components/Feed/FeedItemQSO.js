import React, { Fragment } from "react";
import FeedAudioList from "./FeedAudioList";
import FeedImage from "./FeedImage";
import FeedLinkList from "./FeedLinkList";
import QSOShareButtons from "./QSOShareButtons";
import PopupToFollow from "../PopupToFollow";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import Label from "semantic-ui-react/dist/commonjs/elements/Label";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";

import QSOComments from "./QSOComments";
import QSOLikeButton from "./QSOLikeButton";
import QRAs from "./QRAs";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import FeedOptionsMenu from "./FeedOptionsMenu";
import QSORePostButton from "./QSORePostButton";
import "../../styles/style.css";

class FeedItemQSO extends React.Component {
  constructor() {
    super();
    this.state = { comments: [], error: null };
    this.handleOnComment = this.handleOnComment.bind(this);
    this.recalculateRowHeight = this.recalculateRowHeight.bind(this);
  }
  handleOnComment = () => {
    if (this.props.currentQRA || this.props.qso.comments.length > 0)
      this.props.showComments(this.props.index);
    // this.recalculateRowHeight(); this.props.recalculateRowHeight()
  };

  recalculateRowHeight() {
    if (this.props.recalculateRowHeight)
      this.props.recalculateRowHeight(this.props.index);
  }

  //     }
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

    switch (this.props.qso.type) {
      case "QSO":
        text = " worked a QSO with";
        break;
      case "LISTEN":
        text = " listened a QSO with";
        break;
      case "SHARE":
        text = " reposted a QSO";
        break;
      default:
    }
    var date = new Date(this.props.qso.datetime);

    return (
      <Segment raised>
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
          />{" "}
        </Link>
        <PopupToFollow
          qra={this.props.qso.qra}
          trigger={
            <Link to={"/" + this.props.qso.qra}>{this.props.qso.qra}</Link>
          }
        />
        {text}
        {/* {date.toLocaleDateString("EN-US", {month: "short"}) + ' ' + date.getDate() + ', ' + date.getFullYear()} */}
        <div
          style={{
            float: "right"
          }}
        >
          <FeedOptionsMenu
            qso_owner={this.props.qso.qra}
            idqso={this.props.qso.idqsos}
            guid={this.props.qso.GUID_QR}
            qso={this.props.qso}
            optionsCaller="FeedItem"
            QslCard={true}
          />
        </div>
        <Divider hidden style={{ marginTop: "0.5vh", marginBottom: "0.5vh" }} />
        <Segment>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <Label>Mode:</Label>
              {this.props.qso.mode}

              <Label>Band:</Label>
              {this.props.qso.band}
            </div>
            <div>
              <Label>Date:</Label>
              {date.toLocaleDateString("EN-US", { month: "short" }) +
                " " +
                date.getDate() +
                ", " +
                date.getFullYear()}

              <Label>UTC:</Label>
              {date.getUTCHours() +
                ":" +
                (date.getMinutes() < 10 ? "0" : "") +
                date.getMinutes()}
            </div>
          </div>
          <Divider
            hidden
            style={{ marginTop: "0.5vh", marginBottom: "0.5vh" }}
          />
          <QRAs
            avatarpic={this.props.qso.avatarpic}
            qso_owner={this.props.qso.qra}
            qras={this.props.qso.qras}
          />
        </Segment>
        {picList.length > 0 && (
          <Fragment>
            <Divider hidden style={{ marginTop: "1vh", marginBottom: "1vh" }} />
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
            <Divider hidden style={{ marginTop: "1vh", marginBottom: "1vh" }} />
            <FeedAudioList
              mediaList={audioList}
              idqso={this.props.qso.idqsos}
              qso_owner={this.props.qso.qra}
            />
          </Fragment>
        )}
        {this.props.qso.links && <FeedLinkList links={this.props.qso.links} />}
        <Divider hidden style={{ marginTop: "1vh", marginBottom: "1vh" }} />
        <Button.Group fluid basic>
          <QSOLikeButton qso={this.props.qso} />
          <Button onClick={e => this.handleOnComment(e)}>
            <div>
              <Icon name="comment outline" />{" "}
              {this.props.qso.comments.length > 0 && commentsCounter}
            </div>
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
  mapDispatchToProps
)(FeedItemQSO);
FeedItemQSO.propTypes = {
  qso: PropTypes.object.isRequired
};
