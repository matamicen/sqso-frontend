import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

// import QRCode from "qrcode.react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
// import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
// import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import API from "@aws-amplify/api";
import * as Sentry from "@sentry/browser";
import QslCardPrint from "./qslCard";
import Recaptcha from "react-recaptcha";
class FeedOptionsMenu extends React.PureComponent {
  state = {
    showReportContent: false,
    showMessage: false,
    recaptchaToken: null,
    comments: ""
  };
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  openReportedContent = () => this.setState({ showReportContent: true });
  closeReportedContent = () => this.setState({ showReportContent: false });
  open = () => this.setState({ showMessage: true });
  close = () => {
    this.setState({ showMessage: false });
    this.setState({ showReportContent: false });
  };
  deleteMedia() {
    this.props.actions.doDeleteMedia(
      this.props.idqsos_media,
      this.props.idqso,
      this.props.token
    );
  }

  deleteComment() {
    this.props.actions.doCommentDelete(
      this.props.idcomment,
      this.props.idqso,
      this.props.token
    );
  }
  deleteQso() {
    this.props.actions.doDeleteQso(this.props.idqso, this.props.token);
  }
  printQSLCard() {
    this.props.actions.doQslCardPrint(this.props.idqso, this.props.token);
    QslCardPrint(this.props);
  }
  handleOnSubmitReportComment(e) {
    var datetime = new Date();
    e.preventDefault();
    if (!e.target.comments.value || !this.state.recaptchaToken) return;
    let apiName = "superqso";
    let path = "/content-reported";
    let myInit = {
      body: {
        idqso: this.props.idqso,
        idcomment: this.props.idcomment,
        detail: e.target.comments.value,
        datetime: datetime
      }, // replace this with attributes you need
      headers: {
        Authorization: this.props.token
      } // OPTIONAL
    };
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error > 0) {
        } else {
          this.open();
          //ReactG.event({ category: "QSO", action: "contentReported" });
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        } else Sentry.captureException(error);
      });
  }
  handleOnSubmitReportQso(e) {
    var datetime = new Date();
    e.preventDefault();
    if (
      !e.target.comments.value ||
      // !e.target.email.value ||
      !this.state.recaptchaToken
    )
      return;
    console.log(e.target.comments.value);
    let apiName = "superqso";
    let path = "/content-reported";
    let myInit = {
      body: {
        idqso: this.props.idqso,
        detail: e.target.comments.value,
        datetime: datetime
        // email: e.target.email.value
      }, // replace this with attributes you need
      headers: {
        // Authorization: this.props.token
      } // OPTIONAL
    };
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.error > 0) {
        } else {
          this.open();
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        } else Sentry.captureException(error);
      });
  }
  handleOnSubmitReportMedia(e) {
    var datetime = new Date();
    e.preventDefault();
    if (!e.target.comments.value || !this.state.recaptchaToken) return;
    let apiName = "superqso";
    let path = "/content-reported";
    let myInit = {
      body: {
        idqso: this.props.idqso,
        idmedia: e.target.idmedia.value,
        detail: e.target.comments.value,
        datetime: datetime
      }, // replace this with attributes you need
      headers: {
        Authorization: this.props.token
      } // OPTIONAL
    };
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error > 0) {
        } else {
          this.open();
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        } else Sentry.captureException(error);
      });
  }
  render() {
    const { showMessage, showReportContent } = this.state;

    return (
      <Dropdown
        icon="ellipsis vertical"
        size="tiny"
        className="icon"
        pointing="right"
      >
        <Dropdown.Menu>
          {/* FEED IMAGE REPORT CONTENT */}
          {this.props.optionsCaller === "FeedImage" &&
            this.props.currentQRA &&
            this.props.currentQRA !== this.props.qso_owner && (
              <Modal
                open={showReportContent}
                onOpen={this.openReportedContent}
                onClose={this.closeReportedContent}
                size="tiny"
                closeIcon
                trigger={<Dropdown.Item icon="warning" text="Report Photo" />}
              >
                <Modal.Header>Help Us Understand What's Happening</Modal.Header>
                <Modal.Content>
                  <Form onSubmit={this.handleOnSubmitReportMedia.bind(this)}>
                    <Form.TextArea
                      required
                      name="comments"
                      label="Comments"
                      placeholder="Why do you think we should remove this photo?"
                    />
                    <Form.Input
                      type="hidden"
                      name="idmedia"
                      value={this.props.idqsos_media}
                    />
                    <Form.Field>
                      <Recaptcha
                        sitekey="6Lf1VL8UAAAAAEyE2sQHbSr-tbH3_fwZqxEXEg-l"
                        render="explicit"
                        verifyCallback={response => {
                          this.setState({ recaptchaToken: response });
                        }}
                      />{" "}
                    </Form.Field>
                    <Form.Button>Submit</Form.Button>

                    <Modal
                      // dimmer={false}
                      open={showMessage}
                      onOpen={this.open}
                      onClose={this.close}
                      size="small"
                    >
                      <Modal.Header>Report Photo</Modal.Header>
                      <Modal.Content>
                        <p>Photo Reported!</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="check"
                          content="Close"
                          onClick={this.close}
                        />
                      </Modal.Actions>
                    </Modal>
                  </Form>
                </Modal.Content>
              </Modal>
            )}
          {/* END FEED IMAGE REPORT CONTENT */}
          {/* FEED IMAGE DELETE CONTENT */}
          {this.props.optionsCaller === "FeedImage" &&
            this.props.currentQRA === this.props.qso_owner && (
              <Dropdown.Item
                icon="delete"
                text="Delete Photo"
                onClick={this.deleteMedia.bind(this)}
              />
            )}
          {/* END FEED IMAGE DELETE CONTENT */}
          {/* FEED AUDIO REPORT CONTENT */}

          {this.props.optionsCaller === "FeedAudio" &&
            this.props.currentQRA &&
            this.props.currentQRA !== this.props.qso_owner && (
              <Modal
                open={showReportContent}
                onOpen={this.openReportedContent}
                onClose={this.closeReportedContent}
                size="tiny"
                closeIcon
                trigger={<Dropdown.Item icon="warning" text="Report Audio" />}
              >
                <Modal.Header>Help Us Understand What's Happening</Modal.Header>
                <Modal.Content>
                  <Form onSubmit={this.handleOnSubmitReportMedia.bind(this)}>
                    <Form.TextArea
                      required
                      name="comments"
                      label="Comments"
                      placeholder="Why do you think we should remove this audio?"
                    />
                    <Form.Input
                      type="hidden"
                      name="idmedia"
                      value={this.props.idqsos_media}
                    />
                    <Form.Field>
                      <Recaptcha
                        sitekey="6Lf1VL8UAAAAAEyE2sQHbSr-tbH3_fwZqxEXEg-l"
                        render="explicit"
                        verifyCallback={response => {
                          this.setState({ recaptchaToken: response });
                        }}
                      />{" "}
                    </Form.Field>
                    <Form.Button>Submit</Form.Button>

                    <Modal
                      dimmer={false}
                      open={showMessage}
                      onOpen={this.open}
                      onClose={this.close}
                      size="small"
                    >
                      <Modal.Header>Report Audio</Modal.Header>
                      <Modal.Content>
                        <p>Audio Reported!</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="check"
                          content="Close"
                          onClick={this.close}
                        />
                      </Modal.Actions>
                    </Modal>
                  </Form>
                </Modal.Content>
              </Modal>
            )}
          {/* END FEED AUDIO REPORT CONTENT */}
          {/* FEED AUDIO DELETE CONTENT */}
          {this.props.optionsCaller === "FeedAudio" &&
            this.props.currentQRA === this.props.qso_owner && (
              <Dropdown.Item
                icon="delete"
                text="Delete Audio"
                onClick={this.deleteMedia.bind(this)}
              />
            )}
          {/* END FEED AUDIO DELETE CONTENT */}
          {/* FEED ITEM QR CODE */}
          {this.props.optionsCaller === "FeedItem" && (
            // <Modal
            //   size="tiny"
            //   closeIcon
            //   trigger={<Dropdown.Item icon="qrcode" text="Show QR Code" />}
            // >
            //   <Modal.Header>QR Code</Modal.Header>
            //   <Modal.Content>
            //     <Grid centered>
            //       <Segment raised>
            //         <QRCode value={this.props.guid} />
            //       </Segment>
            //     </Grid>
            //   </Modal.Content>
            // </Modal>
            <Modal
              size="tiny"
              closeIcon
              open={showReportContent}
              onOpen={this.openReportedContent}
              onClose={this.closeReportedContent}
              trigger={<Dropdown.Item icon="warning" text="Report Content" />}
            >
              <Modal.Header>Help Us Understand What's Happening</Modal.Header>
              <Modal.Content>
                <Form onSubmit={this.handleOnSubmitReportQso.bind(this)}>
                  <Form.TextArea
                    required
                    name="comments"
                    label="Comments"
                    placeholder="Why do you think we should remove this content?"
                    autoFocus
                  />
                  {/* <Form.Input name="email" label="Email" /> */}
                  <Form.Field>
                    <Recaptcha
                      sitekey="6Lf1VL8UAAAAAEyE2sQHbSr-tbH3_fwZqxEXEg-l"
                      render="explicit"
                      verifyCallback={response => {
                        this.setState({ recaptchaToken: response });
                      }}
                    />{" "}
                  </Form.Field>
                  <Form.Button>Submit</Form.Button>
                </Form>
                <Modal
                  open={showMessage}
                  onOpen={this.open}
                  onClose={this.close}
                  size="small"
                >
                  <Modal.Header>Report Content</Modal.Header>
                  <Modal.Content>
                    <p>Content Reported!</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button icon="check" content="Close" onClick={this.close} />
                  </Modal.Actions>
                </Modal>
              </Modal.Content>
            </Modal>
          )}
          {/* END FEED ITEM QR CODE */}
          {/* FEED ITEM DELETE QSO*/}
          {this.props.optionsCaller === "FeedItem" &&
            this.props.currentQRA === this.props.qso_owner && (
              <Dropdown.Item
                icon="delete"
                text="Delete QSO"
                onClick={this.deleteQso.bind(this)}
              />
            )}
          {/* END FEED ITEM DELETE QSO*/}
          {/* FEED ITEM PRINT QSL CARD*/}
          {this.props.optionsCaller === "FeedItem" &&
            this.props.QslCard &&
            this.props.currentQRA === this.props.qso_owner && (
              <Modal
                trigger={<Dropdown.Item icon="print" text="Print QSL Card" />}
                header="QSL Card"
                content="Please disable POPUP Blockers in order to get the PDF File"
                onActionClick={this.printQSLCard.bind(this)}
                actions={[
                  {
                    key: "done",
                    content: "Print QSL CARD",
                    positive: true
                  }
                ]}
              />
            )}
          {/* END FEED ITEM QSL CARD*/}
          {/* FEED ITEM REPORT QSO*/}
          {this.props.optionsCaller === "FeedItem" &&
            this.props.currentQRA &&
            this.props.currentQRA !== this.props.qso_owner && (
              <Modal
                open={showReportContent}
                onOpen={this.openReportedContent}
                onClose={this.closeReportedContent}
                size="tiny"
                closeIcon
                trigger={<Dropdown.Item icon="warning" text="Report Content" />}
              >
                <Modal.Header>Help Us Understand What's Happening</Modal.Header>
                <Modal.Content>
                  <Form onSubmit={this.handleOnSubmitReportQso.bind(this)}>
                    <Form.TextArea
                      required
                      name="comments"
                      label="Comments"
                      placeholder="Why do you think we should remove this content?"
                    />
                    {/* <Form.Input name="email" label="Email" /> */}
                    <Form.Field>
                      <Recaptcha
                        sitekey="6Lf1VL8UAAAAAEyE2sQHbSr-tbH3_fwZqxEXEg-l"
                        render="explicit"
                        verifyCallback={response => {
                          this.setState({ recaptchaToken: response });
                        }}
                      />{" "}
                    </Form.Field>
                    <Form.Button>Submit</Form.Button>

                    <Modal
                      open={showMessage}
                      onOpen={this.open}
                      onClose={this.close}
                      size="small"
                    >
                      <Modal.Header>Report Content</Modal.Header>
                      <Modal.Content>
                        <p>Content Reported!</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="check"
                          content="Close"
                          onClick={this.close}
                        />
                      </Modal.Actions>
                    </Modal>
                  </Form>
                </Modal.Content>
              </Modal>
            )}
          {/* END FEED ITEM REPORT QSO*/}
          {/*  FEED ITEM REPORT COMMENT */}
          {this.props.optionsCaller === "FeedComment" &&
            this.props.currentQRA &&
            this.props.comment_owner !== this.props.currentQRA && (
              <Modal
                open={showReportContent}
                onOpen={this.openReportedContent}
                onClose={this.closeReportedContent}
                size="tiny"
                closeIcon
                trigger={<Dropdown.Item icon="warning" text="Report Content" />}
              >
                <Modal.Header>Help Us Understand What's Happening</Modal.Header>
                <Modal.Content>
                  <Form onSubmit={this.handleOnSubmitReportComment.bind(this)}>
                    <Form.TextArea
                      required
                      name="comments"
                      label="Comments"
                      placeholder="Why do you think we should remove this content?"
                    />
                    <Form.Field>
                      <Recaptcha
                        sitekey="6Lf1VL8UAAAAAEyE2sQHbSr-tbH3_fwZqxEXEg-l"
                        render="explicit"
                        verifyCallback={response => {
                          this.setState({ recaptchaToken: response });
                        }}
                      />{" "}
                    </Form.Field>
                    <Form.Button>Submit</Form.Button>

                    <Modal
                      open={showMessage}
                      onOpen={this.open}
                      onClose={this.close}
                      size="small"
                    >
                      <Modal.Header>Report Comment</Modal.Header>
                      <Modal.Content>
                        <p>Comment Reported!</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="check"
                          content="Close"
                          onClick={this.close}
                        />
                      </Modal.Actions>
                    </Modal>
                  </Form>
                </Modal.Content>
              </Modal>
            )}
          {/* END FEED ITEM REPORT COMMENT */}
          {/* FEED ITEM DELETE COMMENT*/}
          {this.props.optionsCaller === "FeedComment" &&
            this.props.currentQRA === this.props.comment_owner && (
              <Dropdown.Item
                icon="delete"
                text="Delete Comment"
                onClick={this.deleteComment.bind(this)}
              />
            )}
          {/* END FEED ITEM DELETE COMMENT*/}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  token: state.userData.token,
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
)(FeedOptionsMenu);
