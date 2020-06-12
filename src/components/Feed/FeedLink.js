import React, { Fragment } from "react";
import { withTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import * as Actions from "../../actions";
import NewsFeed from "./NewsFeedPresentational";
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
    const {t} = this.props;
    let qsos = [];
    if (this.props.qso_link) {
      qsos.push({ qso: this.props.qso_link, type: this.props.qso_link.type });
    }

    return (
      <Fragment>
        <Dimmer active={this.state.active} page>
          <Loader>Loading QSO Link</Loader>
        </Dimmer>

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
        <div style={{ fontSize: "smaller", padding: "1vh", width: "100%" }}>
          <Button fluid basic onClick={() => this.onOpenModal()}>
            {" "}
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
                width: "50px",
                height: "50px"
              }}
            />{" "}
          </Button>
        </div>
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
  )(withTranslation()(FeedLink))
);
