import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { bindActionCreators } from 'redux';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Comment from 'semantic-ui-react/dist/commonjs/views/Comment';
import * as Actions from '../../actions';
import QSOCommentItem from './QSOCommentItem';
class QSOComments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      comment: ""
    };

    this.handleAddComment = this.handleAddComment.bind(this);
  }

  componentDidMount() {
    if (this.props.qso.comments) {
      this.setState({ comments: this.props.qso.comments });
    }
  }
  componentDidUpdate = () => {
    // this.props.recalculateRowHeight();
  };

  handleAddComment = e => {
    // e.preventDefault();
     if (this.state.comment === "") return;

    
    let datetime = new Date();
    let comment = {
      qra: this.props.qra.toUpperCase(),
      comment: this.state.comment ,
      datetime: datetime
    };
    this.setState({ comment: comment });
    // this.setState({
    //   comments: this.state.comments.concat(comment)
    // });
    // e.target.comment.value = null;
    this.setState({comment:""})
    this.props.recalculateRowHeight();

    this.props.actions.doCommentAdd(
      this.props.qso.idqsos,
      comment,
      this.props.token
    );
  };
  static getDerivedStateFromProps(props, prevState) {
    if (props.qso.comments !== prevState.comments)
      return { comments: props.qso.comments };
    return null;
  }
  componentDidUpdate = () => {
    this.props.recalculateRowHeight();
  };
  render() {
    const {t} = this.props;

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
            
            <TextareaAutosize
              value={this.state.comment}
              onChange={e => this.setState({ comment: e.target.value })}
              onHeightChange={this.props.recalculateRowHeight}
              fontSize= {12}
              style={{fontSize: "1.1rem", paddingTop: "5px", paddingBottom: "5px"}}
              placeholder={t('qso.writeComment')}
              rows={4}
            />
            
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
)(withTranslation()(QSOComments));
