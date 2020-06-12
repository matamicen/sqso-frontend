import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import * as Actions from '../../actions';
class QSOLikeTextModalItem extends React.PureComponent {
  constructor() {
    super();
    this.followed = null;
    this.state = { followed: null };
  }
  componentDidMount() {
    // this.setState({ likes: this.props.qso ? this.props.qso.likes : [] });
  }
  // static getDerivedStateFromProps(props, prevState) {
  //   if (props.qso.likes && props.qso.likes.length !== prevState.likes.length)
  //     return { likes: props.qso.likes };
  //   return null;
  // }
  handleButtonClick(idqra) {
    if (!this.props.userData.token) return null;
    if (this.props.userData.isAuthenticated) {
      if (!this.followed) {
        this.props.actions.doFollowQRA(this.props.userData.token, idqra);
        this.followed = true;
        this.setState({ followed: this.followed });
      } else {
        this.props.actions.doUnfollowQRA(this.props.userData.token, idqra);
        this.followed = false;
        this.setState({ followed: this.followed });
      }
    }
    // this.setState(prevState => {
    //   return {
    //     followed: !prevState.followed
    //   };
    // });
  }
  render() {
    const { l, t } = this.props;


    if (
      this.props.isAuthenticated &&
      this.props.userFetched &&
      this.followed !== true &&
      this.followed !== false &&
      this.state.followed === this.followed
    ) {
      this.followed = this.props.userData.following.some(
        o => o.idqra_followed === l.idqra
      );
    }
    return (
      <div key={l.qra} style={{ display: 'flex', paddingBottom: '10px' }}>
        <div
          style={{
            flex: '0 1 auto',
            justifyContent: 'center',
            paddingRigth: '5px'
          }}
        >
          <Image
            src={l.avatarpic ? l.avatarpic : '/emptyprofile.png'}
            size="mini"
            avatar
            style={{
              width: '50px',
              height: '50px'
            }}
          />
        </div>
        <div
          style={{
            flex: '1 1 auto',
            justifyContent: 'center',
            paddingRigth: '5px'
          }}
        >
          <Link to={'/' + l.qra}>
            <span style={{ fontSize: 'large' }}>{l.qra}</span>
            <br />
            <span style={{ fontSize: 'medium' }}>
              {l.firstname + ' ' + l.lastname}
            </span>
          </Link>
        </div>
        <div
          style={{
            flex: '0 1 auto',
            justifyContent: 'center',
            padding: '0'
          }}
        >
          {this.props.isAuthenticated &&
            l.qra !== this.props.userData.currentQRA && (
              <Button
                style={{
                  width: '100px'
                }}
                positive={!this.followed}
                onClick={() => this.handleButtonClick(l.qra)}
              >
                {this.followed ? 'Unfollow' : 'Follow'}
              </Button>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.userData.isAuthenticated,
  currentQRA: state.userData.currentQRA,
  userData: state.userData,
  userFetched: state.userData.userFetched,
  token: state.userData.token
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(QSOLikeTextModalItem))
);
