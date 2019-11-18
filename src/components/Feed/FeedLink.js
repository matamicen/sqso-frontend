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

import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";

class FeedLink extends React.PureComponent {
  state = {
    active: false,
    showModal: false,
    qso_link: this.props.qso_link
  };
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

        <Segment textAlign="center" style={{ padding: "1vh", width: "100%" }}>
          <Modal
            closeIcon={{
              style: { top: "0.0535rem", right: "0rem" },
              color: "black",
              name: "close"
            }}
            open={this.state.showModal && this.props.qso_link ? true : false}
            onClose={() => this.close()}
            style={{ height: "90%", overflowY: "auto" }}
          >
            <Modal.Content image>
              <Modal.Description>
                {this.props.qso_link && <NewsFeed list={qsos} />}
              </Modal.Description>
            </Modal.Content>
          </Modal>
          <div
            style={{ fontSize: "smaller" }}
            onClick={() => this.onOpenModal()}
          >
            This QSO is linked to another QSO created by
            {" " + this.props.link.qra + " "}
            <Image
              src={
                this.props.link.avatarpic
                  ? this.props.link.avatarpic
                  : "/emptyprofile.png"
              }
              size="mini"
              avatar
              style={{
                width: "35px",
                height: "35px"
              }}
            />
          </div>
          {/* <Button size="mini">See Details</Button> */}
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
