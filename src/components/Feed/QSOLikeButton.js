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
      liked: false,
      likeCounter: 0,
      openLogin: false
    };
  }

  componentDidMount() {
    if (this.props.qso.likes) {
      this.setState({ likeCounter: this.props.qso.likes.length });
    }
  }
  static getDerivedStateFromProps(props, prevState) {
    if (
      !prevState.liked &&
      props.isAuthenticated &&
      props.qso.likes.some(o => o.idqra === props.userData.qra.idqras)
    ) {
      return { liked: true, icon: "thumbs up" };
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
          console.error(response.body.message);
        } else {
          this.setState({ likeCounter: response.body.message });
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
          console.error(response.body.message);
        } else {
          this.setState({
            likeCounter: response.body.message,
            icon: "thumbs outline up"
          });

          ReactGA.event({ category: "QSO", action: "liked" });
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        } else Sentry.captureException(error);
      });
  }

  handleOnLike() {
    console.log(this.state.liked);
    if (!this.props.isAuthenticated) this.setState({ openLogin: true });
    else {
      if (!this.state.liked) {
        this.setState(previousState => ({
          likeCounter: previousState.likeCounter + 1
        }));
        if (this.props.isAuthenticated) this.doLike();

        this.setState({ icon: "thumbs up" });
      } else {
        this.setState(previousState => ({
          likeCounter: previousState.likeCounter - 1
        }));
        if (this.props.isAuthenticated) this.doUnLike();

        this.setState({ icon: "thumbs outline up" });
      }

      this.setState({
        liked: !this.state.liked
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Confirm
          size="mini"
          open={this.state.openLogin}
          onCancel={() => this.setState({ openLogin: false })}
          onConfirm={() => this.props.history.push("/login")}
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
