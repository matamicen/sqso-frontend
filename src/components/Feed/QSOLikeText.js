import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import * as Actions from '../../actions';
class QSOLikeText extends React.PureComponent {
  constructor() {
    super();
    this.state = { likes: [], showModal: false };
  }
  componentDidMount() {
    this.setState({ likes: this.props.qso ? this.props.qso.likes : [] });
  }
  static getDerivedStateFromProps(props, prevState) {
    if (props.qso.likes && props.qso.likes.length !== prevState.likes.length)
      return { likes: props.qso.likes };
    return null;
  }
  handleButtonClick(idqra) {
    if (!this.props.userData.token) return null;
    if (!this.props.userData.following.some(o => o.qra === idqra)) {
      if (this.props.userData.isAuthenticated) {
        this.props.actions.doFollowQRA(this.props.userData.token, idqra);
      }
    } else {
      if (this.props.userData.isAuthenticated) {
        this.props.actions.doUnfollowQRA(this.props.userData.token, idqra);
      }
    }
    // this.setState(prevState => {
    //   return {
    //     followed: !prevState.followed
    //   };
    // });
  }
  render() {
    const { qso } = this.props;
    let counter;
    let outputText = '';
    let finalText;
    let maxLikers = 2;
    let others = 0;
    let avatarPic = null;

    if (qso.likes.length > maxLikers) {
      counter = maxLikers;
      others = qso.likes.length - maxLikers;
      finalText =
        ' and ' +
        others +
        (others > 1 ? ' others liked this' : ' other liked this');
    } else {
      counter = this.props.qso.likes.length;
      finalText =
        ' liked this' + (this.props.qso.type === 'POST' ? ' Post' : ' QSO');
    }

    if (counter === 0) return null;

    for (let a = 0; a < counter; a++) {
      if (qso.likes[a].avatarpic !== null && avatarPic === null)
        avatarPic = qso.likes[a].avatarpic;

      outputText =
        outputText +
        (qso.likes[a].qra === this.props.userData.currentQRA
          ? 'You'
          : qso.likes[a].qra);

      switch (true) {
        case a === counter - 1: //Last QRA
          outputText = outputText + finalText;
          break;
        case qso.likes.length > 1 && a === counter - 2: //Before Last
          outputText = outputText + ' and ';
          break;
        case qso.likes.length > 1 && a < counter - 2: //Before Last
          outputText = outputText + ', ';
          break;
        default:
          break;
      }
    }
    return (
      <Fragment>
        <a
          style={{
            cursor: 'pointer',
            fontSize: '1.1rem',
            display: 'flex',
            marginBottom: '5px'
          }}
          href={null}
          onClick={() => this.setState({ showModal: true })}
        >
          {avatarPic && (
            <Image
              style={{ height: '1.5rem', width: 'auto', marginRigth: '5px' }}
              src={avatarPic}
              circular
            />
          )}
          <span>{outputText}</span>
        </a>
        <Modal
          size="tiny"
          centered={true}
          closeIcon={{
            style: { top: '0.0535rem', right: '0rem' },
            color: 'black',
            name: 'close'
          }}
          open={this.state.showModal}
          onClose={() => this.setState({ showModal: false })}
          style={{
            //height: '90%',
            overflowY: 'auto'
          }}
        >
          <Modal.Header>
            These Hams likes this {qso.type === 'POST' ? ' Post' : ' QSO'}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <div>
                {qso.likes.map(l => (
                  // <div key={l.idqsos_likes} style={{ padding: '1vh' }} />
                  <div
                    key={l.qra}
                    style={{ display: 'flex', paddingBottom: '10px' }}
                  >
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
                      {l.qra !== this.props.userData.currentQRA && (
                        <Button
                          style={{
                            width: '100px'
                          }}
                          positive={
                            !this.props.userData.following.some(
                              o => o.idqra_followed === l.idqra
                            )
                          }
                          onClick={() => this.handleButtonClick(l.qra)}
                        >
                          {this.props.userData.following.some(
                            o => o.idqra_followed === l.idqra
                          )
                            ? 'Unfollow'
                            : 'Follow'}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Modal.Description>
          </Modal.Content>
        </Modal>
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
  )(QSOLikeText)
);
