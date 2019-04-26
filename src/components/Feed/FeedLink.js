import React, { Fragment } from "react";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";

import NewsFeed from "./NewsFeedPresentational";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import * as Sentry from "@sentry/browser";
class FeedLink extends React.PureComponent {
  state = {
    active: false,
    showModal: false,
    qso_link: this.props.qso_link,
    error: null
  };
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === "production") {
      this.setState({ error });
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    }
  }
  onOpenModal = () => {
    this.props.actions.doFetchQsoLink(this.props.link.GUID_URL);
    this.setState({ active: true });
  };
  static getDerivedStateFromProps(props, state) {
    if (props.qso_link !== state.qso_link)
      return { active: false, showModal: true, qso_link: props.qso_link };
    else if (!props.qso_link && state.qso_link)
      return { active: false, showModal: false, qso_link: null };
    return null;
  }

  close = () => {
    this.props.actions.doClearQsoLink();
  };
  render() {
    let qsos = [];
    if (this.props.qso_link) {
      qsos.push({ qso: this.props.qso_link, type: this.props.qso_link.type });
    }

    return (
      <Fragment>
        <Dimmer active={this.state.active} page>
          <Loader>Loading QSO Link</Loader>
        </Dimmer>

        <Segment>
          <Modal
            closeIcon
            open={this.state.showModal && this.props.qso_link ? true : false}
            onClose={() => this.close()}
          >
            <Modal.Content image scrolling>
              <Modal.Description>
                {this.props.qso_link && <NewsFeed list={qsos} />}
              </Modal.Description>
            </Modal.Content>
          </Modal>
          <Image
            src={this.props.link.avatarpic}
            size="mini"
            avatar
            style={{
              width: "35px",
              height: "35px"
            }}
          />{" "}
          {this.props.link.qra + " "}
          created a linked QSO{" "}
          <Button size="mini" onClick={() => this.onOpenModal()}>
            See Details
          </Button>
        </Segment>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({ qso_link: state.qso_link });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FeedLink)
);
