import React, { Fragment } from "react";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import API from "@aws-amplify/api";
import ReactGA from "react-ga";
import Confirm from "semantic-ui-react/dist/commonjs/addons/Confirm";
import { withRouter } from "react-router-dom";
import * as Sentry from "@sentry/browser";
class QSOLikeButton extends React.Component {
  constructor() {
    super();
    this.state = {
      icon: "thumbs outline up",
      liked: null,
      likeCounter: 0,
      openLogin: false,
      likes: []
    };
  }

  componentDidMount() {
    if (this.props.qso.likes) {
      this.setState({ likeCounter: this.props.qso.likes.length });
    }
  }
  static getDerivedStateFromProps(props, prevState) {
    if (
      prevState.likes.length === 0 &&
      props.qso.likes.length > 0 &&
      props.userData.qra
    ) {
      if (props.qso.likes.some(o => o.idqra === props.userData.qra.idqras)) {
        return {
          liked: true,
          icon: "thumbs up",
          likes: props.qso.likes,
          likeCounter: props.qso.likes.length
        };
      } else {
        return {
          liked: false,
          icon: "thumbs outline up",
          likes: props.qso.likes,
          likeCounter: props.qso.likes.length
        };
      }
    }
    return null;
  }
  doLike() {
    let apiName = "superqso";
    let path = "/qso-like";
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
          this.setState(previousState => ({
            likeCounter: previousState.likeCounter - 1
          }));
        } else {
          // this.setState({
          //   likeCounter: response.body.message
          //   // icon: "thumbs up",
          //   // liked: true
          // });
          window.gtag("event", "qsoLiked", {
            event_category: "QSO",
            event_label: "qsoLiked"
          });
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        } else Sentry.captureException(error);
      });
  }

  doUnLike() {
    let apiName = "superqso";
    let path = "/qso-like";
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
          this.setState(previousState => ({
            likeCounter: previousState.likeCounter - 1
          }));
        } else {
          // this.setState({
          //   likeCounter: response.body.message
          //   // icon: "thumbs outline up",
          //   // liked: false
          // });
          window.gtag("event", "qsoUnliked", {
            event_category: "QSO",
            event_label: "qsoUnliked"
          });
          ReactGA.event({ category: "QSO", action: "unliked" });
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        } else Sentry.captureException(error);
      });
  }

  handleOnLike() {
    if (!this.props.isAuthenticated) this.setState({ openLogin: true });
    else {
      if (!this.state.liked) {
        this.setState(previousState => ({
          likeCounter: previousState.likeCounter + 1,
          icon: "thumbs up",
          liked: true
        }));
        this.doLike();

        this.setState({});
      } else if (this.state.liked) {
        this.setState(previousState => ({
          likeCounter: previousState.likeCounter - 1,
          liked: false,
          icon: "thumbs outline up"
        }));
        this.doUnLike();
      }
    }
  }

  render() {
    return (
      <Fragment>
        <Confirm
          size="mini"
          open={this.state.openLogin}
          onCancel={() => this.setState({ openLogin: false })}
          onConfirm={() =>
            this.props.history.push({
              pathname: "/login",
              state: { from: this.props.location.pathname }
            })
          }
          cancelButton="Cancel"
          confirmButton="Login"
          content="Please Login to perform this action"
        />
        <Button icon active={false} onClick={this.handleOnLike.bind(this)}>
          <Icon name={this.state.icon} /> {this.state.likeCounter}{" "}
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
