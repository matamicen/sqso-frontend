import API from '@aws-amplify/api';
import * as Sentry from '@sentry/browser';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import * as Actions from '../../actions';
class QSOLikeButton extends React.Component {
  constructor() {
    super();
    this.likeCounter = 0;
    this.liked = null;
    this.icon = 'thumbs outline up';
    this.state = {
      icon: 'thumbs outline up',
      liked: null,
      likeCounter: 0,
      openLogin: false,
      likes: [],
      idqra: null
    };
  }

  componentDidMount() {
    this.likeCounter = this.props.qso.likes.length;
    this.setState({
      likeCounter: this.props.qso.likes.length
    });

    if (this.props.userData.qra.idqras) {
      this.setState({ idqra: this.props.userData.qra.idqras });
      if (this.props.qso.likes) {
        if (
          this.props.qso.likes.some(
            o => o.idqra === this.props.userData.qra.idqras
          )
        ) {
          this.icon = 'thumbs up';
          this.liked = true;
          this.setState({
            likeCounter: this.props.qso.likes.length,
            icon: 'thumbs up',
            liked: true
          });
        } else {
          this.icon = 'thumbs outline up';
          this.liked = false;
          this.setState({
            likeCounter: this.props.qso.likes.length,
            icon: 'thumbs outline up',
            liked: false
          });
        }
      }
    }
  }
  static getDerivedStateFromProps(props, prevState) {
    if (
      props.userData.qra.idqras &&
      prevState.idqra !== props.userData.qra.idqras
    ) {
      if (props.qso.likes.some(o => o.idqra === props.userData.qra.idqras)) {
        return {
          liked: true,
          icon: 'thumbs up',
          likes: props.qso.likes,
          likeCounter: props.qso.likes.length
        };
      } else {
        return {
          liked: false,
          icon: 'thumbs outline up',
          likes: props.qso.likes,
          likeCounter: props.qso.likes.length
        };
        // if (
        //   props.userData.qra
        // ) {
        //   if (props.qso.likes.some(o => o.idqra === props.userData.qra.idqras)) {
        //     return {
        //       liked: true,
        //       icon: 'thumbs up',
        //       likes: props.qso.likes,
        //       likeCounter: props.qso.likes.length
        //     };
        //   } else {
        //     return {
        //       liked: false,
        //       icon: 'thumbs outline up',
        //       likes: props.qso.likes,
        //       likeCounter: props.qso.likes.length
        //     };
        //   }
      }
    }
    return null;
  }
  doLike() {
    let apiName = 'superqso';
    let path = '/qso-like';
    let myInit = {
      body: {
        qso: this.props.qso.idqsos
      }, // replace this with attributes you need
      headers: {
        Authorization: this.props.token
      } // OPTIONAL
    };
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error > 0) {
          // this.setState(previousState => ({
          //   likeCounter:
          //     this.props.qso.likes.length === 0
          //       ? this.props.qso.likes.length
          //       : this.props.qso.likes.length - 1
          // }));
        } else {
          // this.setState({
          //   likeCounter: response.body.message
          //   // icon: "thumbs up",
          //   // liked: true
          // });
          if (process.env.NODE_ENV !== 'production') {
            window.gtag('event', 'qsoLiked_WEBDEV', {
              event_category: 'QSO',
              event_label: 'liked'
            });
          } else {
            window.gtag('event', 'qsoLiked_WEBPRD', {
              event_category: 'QSO',
              event_label: 'liked'
            });
          }
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(error);
        } else {
          Sentry.configureScope(function(scope) {
            scope.setExtra('ENV', process.env.NODE_ENV);
          });
          Sentry.captureException(error);
        }
      });
  }

  doUnLike() {
    let apiName = 'superqso';
    let path = '/qso-like';
    let myInit = {
      body: {
        qso: this.props.qso.idqsos
      }, // replace this with attributes you need
      headers: {
        Authorization: this.props.token
      } // OPTIONAL
    };
    API.del(apiName, path, myInit)
      .then(response => {
        if (response.body.error > 0) {
          // this.setState(previousState => ({
          //   likeCounter:
          //     this.props.qso.likes.length === 0
          //       ? this.props.qso.likes.length
          //       : this.props.qso.likes.length - 1
          // }));
        } else {
          // this.setState({
          //   likeCounter: response.body.message
          //   // icon: "thumbs outline up",
          //   // liked: false
          // });
          if (process.env.NODE_ENV !== 'production') {
            window.gtag('event', 'qsoUnliked_WEBDEV', {
              event_category: 'QSO',
              event_label: 'unliked'
            });
          } else {
            window.gtag('event', 'qsoUnliked_WEBPRD', {
              event_category: 'QSO',
              event_label: 'unliked'
            });
          }
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(error);
        } else {
          Sentry.configureScope(function(scope) {
            scope.setExtra('ENV', process.env.NODE_ENV);
          });
          Sentry.captureException(error);
        }
      });
  }

  handleOnLike() {
    if (!this.props.isAuthenticated) this.setState({ openLogin: true });
    else {
      if (!this.liked) {
        this.likeCounter++;
        this.liked = true;
        this.icon = 'thumbs up';
        this.setState({
          likeCounter: this.likeCounter,
          icon: 'thumbs up',
          liked: true
        });
        this.props.actions.doLikeQSO(this.props.qso.idqsos, this.props.userData.qra.idqras)
        this.doLike();
      } else {
        this.likeCounter--;
        this.liked = false;
        this.icon = 'thumbs outline up';
        this.setState({
          likeCounter: this.likeCounter,
          liked: false,
          icon: 'thumbs outline up'
        });
        this.props.actions.doDislikeQSO(this.props.qso.idqsos, this.props.userData.qra.idqras)
        this.doUnLike();
      }
    }
  }

  render() {
    let icon;

    if (this.liked !== true && this.liked !== false) {
      icon = this.state.icon;
      this.liked = this.state.liked;
    } else if (this.liked) icon = 'thumbs up';
    else icon = 'thumbs outline up';

    return (
      <Fragment>
        <Confirm
          size="mini"
          open={this.state.openLogin}
          onCancel={() => this.setState({ openLogin: false })}
          onConfirm={() =>
            this.props.history.push({
              pathname: '/login',
              state: { from: this.props.location.pathname }
            })
          }
          cancelButton="Cancel"
          confirmButton="Login"
          content="Please Login to perform this action"
        />
        <Button icon active={false} onClick={() => this.handleOnLike()}>
          <Icon name={icon} /> {this.likeCounter}{' '}
        </Button>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.userData.isAuthenticated,
  currentQRA: state.userData.currentQRA,
  userData: state.userData,
  token: state.userData.token
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QSOLikeButton)
);
