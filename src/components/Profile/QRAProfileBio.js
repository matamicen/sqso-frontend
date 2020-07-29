import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import * as Sentry from '@sentry/browser';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { Fragment } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import * as Actions from '../../actions';
import global_config from '../../global_config.json';
import '../../styles/style.css';
class QRAProfileBio extends React.Component {
  constructor(props) {
    super(props);
    let editorState;
    if (this.props.qraInfo.bio) {
      const contentBlock = htmlToDraft(this.props.qraInfo.bio);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        editorState = EditorState.createWithContent(contentState);
      }
    }
    this.state = {
      edit: false,
      openPornConfirm: false,
      editorState: editorState
    };

    this.handleOnSaveBio = this.handleOnSaveBio.bind(this);
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
  }

  getImage(path) {
    return new Promise((resolve, reject) => {
      Storage.get(path, { level: 'protected' })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error);
          } else {
            Sentry.configureScope(function(scope) {
              scope.setExtra('ENV', process.env.REACT_APP_STAGE);
            });
            Sentry.captureException(error);
          }
          reject(error);
        });
    });
  }
  uploadImageCallBack(file) {
    const customPrefix = {
      public: 'myPublicPrefix/',
      protected: '1/',
      private: 'myPrivatePrefix/'
    };
    return new Promise(async (resolve, reject) => {
      try {
        // const cognitoUser = Auth.currentAuthenticatedUser();
        // const currentSession = cognitoUser.signInUserSession;
        // cognitoUser.refreshSession(
        //   currentSession.refreshToken,
        //   (error, session) => {
        //     if (process.env.NODE_ENV !== 'production') {
        //       console.log('Unable to refresh Token');
        //       console.log(error);
        //     } else {
        //       Sentry.configureScope(function(scope) {
        //         scope.setExtra('ENV', process.env.REACT_APP_STAGE);
        //       });
        //       Sentry.captureException(error);
        //     }
        //     // console.log('session', err, session);
        //     let token = session.idToken.jwtToken;
        const currentSession = await Auth.currentSession();
        const token = currentSession.getIdToken().getJwtToken();
            this.props.actions.refreshToken(token);
             let folder = 'bio/' + file.name;

              Storage.put(folder, file, {
                customPrefix: customPrefix,
                level: 'protected',
                contentType: 'image/png'
              })
                .then(result => {
                  let filepath;

                  filepath =
                    global_config.s3Cloudfront +
                    '/1/' +
                    encodeURIComponent(this.props.identityId) +
                    '/' +
                    encodeURIComponent(result.key);
                  //CHECK NSFW
                  let apiName = 'superqso';
                  let path = '/nsfw-check';
                  let myInit = {
                    body: {
                      url: filepath
                    },
                    headers: {
                      Authorization: token
                    }
                  };
                  API.post(apiName, path, myInit)
                    .then(response => {
                      if (response.body.error > 0) {
                        //NSFW
                        Storage.remove(result.key, { level: 'protected' })
                          .then(result => resolve(true))
                          .catch(error => {
                            if (process.env.NODE_ENV !== 'production') {
                              console.log(error);
                            } else {
                              Sentry.configureScope(function(scope) {
                                scope.setExtra('ENV', process.env.REACT_APP_STAGE);
                              });
                              Sentry.captureException(error);
                            }
                            reject(error);
                          });
                        this.setState({ openPornConfirm: true });
                      }
                      //SFW
                      else
                        resolve({
                          data: {
                            link: filepath
                          }
                        });
                    })
                    .catch(error => {
                      if (process.env.NODE_ENV !== 'production') {
                        console.log(error);
                      } else {
                        Sentry.configureScope(function(scope) {
                          scope.setExtra('ENV', process.env.REACT_APP_STAGE);
                        });
                        Sentry.captureException(error);
                      }
                      reject(error);
                    });
                })
                .catch(error => {
                  if (process.env.NODE_ENV !== 'production') {
                    console.log(error);
                  } else {
                    Sentry.configureScope(function(scope) {
                      scope.setExtra('ENV', process.env.REACT_APP_STAGE);
                    });
                    Sentry.captureException(error);
                  }
                  reject(error);
                });
          // });
        } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Unable to refresh Token');
          console.log(error);
        } else {
          Sentry.configureScope(function(scope) {
            scope.setExtra('ENV', process.env.REACT_APP_STAGE);
          });
          Sentry.captureException(error);
        }
      }
  
    });
  }

  close = () => this.setState({ edit: false });
  open = () => this.setState({ edit: true });
  handleOnSaveBio = () => {
    this.props.actions.doSaveUserBio(
      this.props.token,
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
      this.props.identityId
    );
    this.close();
  };
  onEditorStateChange = editorState => {
    this.setState({ editorState: editorState });
  };
  render() {
    const { edit, editorState } = this.state;
    const {t} = this.props;
    return (
      <Fragment>
        <Confirm
          size="mini"
          open={this.state.openPornConfirm}
          onCancel={() => this.setState({ openPornConfirm: false })}
          onConfirm={() => this.setState({ openPornConfirm: false })}
          cancelButton={t('global.cancel')}
          confirmButton={t('global.ok')}
          content={t('global.imageContainNudity')}
        />
        <Segment raised>
          {this.props.isAuthenticated &&
            this.props.currentQRA === this.props.qraInfo.qra && (
              <div
                style={{
                  float: 'right'
                }}
              >
                <Dropdown
                  icon="ellipsis vertical"
                  size="tiny"
                  className="icon"
                  pointing="right"
                >
                  <Dropdown.Menu>
                    {!edit && (
                      <Dropdown.Item text={t('qra.editBio')} onClick={this.open} />
                    )}
                    {edit && (
                      <Dropdown.Item
                        text={t('qra.saveBio')}
                        onClick={this.handleOnSaveBio}
                      />
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}

          {!edit && (
            <Container>
              <div
                className="profile-bio"
                dangerouslySetInnerHTML={{
                  __html: this.props.qraInfo.bio
                }}
              />
            </Container>
          )}
          {edit && (
            <Container>
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                  inline: {
                    inDropdown: true
                  },
                  list: {
                    inDropdown: true
                  },
                  textAlign: {
                    inDropdown: true
                  },
                  link: {
                    inDropdown: true
                  },
                  history: {
                    inDropdown: true
                  },
                  image: {
                    urlEnabled: false,
                    previewImage: true,
                    uploadCallback: this.uploadImageCallBack,
                    alt: {
                      present: true,
                      mandatory: false
                    }
                  }
                }}
              />
            </Container>
          )}
        </Segment>
      </Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  //state: state,
  currentQRA: state.userData.currentQRA,
  identityId: state.userData.identityId,
  isAuthenticated: state.userData.isAuthenticated,
  token: state.userData.token
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { pure: false }
  )(withTranslation()(QRAProfileBio))
);
