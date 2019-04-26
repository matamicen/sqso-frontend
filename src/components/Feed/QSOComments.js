import React from "react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Comment from "semantic-ui-react/dist/commonjs/views/Comment";
import QSOCommentItem from "./QSOCommentItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import API from "@aws-amplify/api";
import ReactGA from "react-ga";
import * as Sentry from "@sentry/browser";
class QSOComments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      comment: null,
      error: null
    };

    this.handleAddComment = this.handleAddComment.bind(this);
  }
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
  componentDidMount() {
    if (this.props.qso.comments) {
      this.setState({ comments: this.props.qso.comments });
    }
  }
  componentDidUpdate = () => {
    this.props.recalculateRowHeight();
  };

  doComment = c => {
    let apiName = "superqso";
    let path = "/qso-comment";
    let myInit = {
      body: {
        qso: this.props.qso.idqsos,
        comment: c.comment,
        datetime: c.datetime
      }, // replace this with attributes you need
      headers: {
        Authorization: this.props.token
      } // OPTIONAL
    };
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error > 0) {
          console.error(response.body.message);
        } else {
          this.setState({ comments: response.body.message });
          ReactGA.event({ category: "QSO", action: "CommentAdd" });
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        } else Sentry.captureException(error);
      });
  };

  handleAddComment = e => {
    e.preventDefault();
    if (!e.target.comment.value) return;

    let datetime = new Date();
    let comment = {
      qra: this.props.qra.toUpperCase(),
      comment: e.target.comment.value,
      datetime: datetime
    };
    this.setState({ comment: comment });
    this.setState({
      comments: this.state.comments.concat(comment)
    });
    e.target.comment.value = null;
    // this .props .recalculateRowHeight();
    this.doComment(comment);
  };

  render() {
    let comments = null;
    if (this.state.comments) {
      comments = this.state.comments.map((comment, i) => (
        <QSOCommentItem
          key={i}
          comment={comment}
          recalculateRowHeight={this.props.recalculateRowHeight}
        />
      ));
    }

    let form = null;

    if (this.props.isAuthenticated) {
      form = (
        <Form size="mini" reply onSubmit={this.handleAddComment}>
          <Form.Group>
            <input placeholder="Comment" name="comment" />
            <Button size="mini" content="Add" />
          </Form.Group>
        </Form>
      );
    }
    if (comments || form)
      return (
        <Comment.Group threaded>
          {comments}
          {form}
        </Comment.Group>
      );
    else return null;
  }
}

const mapStateToProps = state => ({
  token: state.userData.token,
  qra: state.userData.currentQRA,
  isAuthenticated: state.userData.isAuthenticated
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QSOComments);
