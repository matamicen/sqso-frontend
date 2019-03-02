import React, {Fragment} from 'react'

import Container from 'semantic-ui-react/dist/commonjs/elements/Container'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'

import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import Confirm from "semantic-ui-react/dist/commonjs/addons/Confirm"
import * as Actions from '../../actions';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import API from '@aws-amplify/api';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Storage from '@aws-amplify/storage';
import "../../styles/style.css";
class QRAProfileBio extends React.Component {
    constructor(props) {
        super(props)
        let editorState;
        if (this.props.qraInfo.bio) {
            const contentBlock = htmlToDraft(this.props.qraInfo.bio);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                editorState = EditorState.createWithContent(contentState);
            }
        }
        this.state = {
            edit: false,
            openPornConfirm: false,
            editorState: editorState
        };
        this.handleOnSaveBio = this
            .handleOnSaveBio
            .bind(this);
        this.uploadImageCallBack = this
            .uploadImageCallBack
            .bind(this);
    }
    getImage(path) {
        return new Promise((resolve, reject) => {
            Storage
                .get(path, {level: 'protected'})
                .then(result => {
                    console.log(result);
                    resolve(result)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }
    uploadImageCallBack(file) {

        return new Promise((resolve, reject) => {
            let folder = 'bio/' + file.name;
            Storage
                .put(folder, file, {
                level: 'protected',
                contentType: 'image/png'
            })
                .then(result => {
                    let filepath = 'https://d3gbqmcrekpw4.cloudfront.net/protected/' + encodeURIComponent(this.props.identityId) + '/' + encodeURIComponent(result.key);
                    console.log(filepath)
                    //CHECK NSFW
                    let apiName = 'superqso';
                    let path = '/nsfw-check';
                    let myInit = {
                        body: {
                            "url": filepath

                        },
                        headers: {
                            "Authorization": this.props.token
                        }
                    }
                    API
                        .post(apiName, path, myInit)
                        .then(response => {
                            if (response.body.error > 0) {
                                //NSFW
                                Storage
                                    .remove(result.key, {level: 'protected'})
                                    .then(result => resolve(true))
                                    .catch(err => reject(err));
                                this.setState({openPornConfirm: true})
                            } else 
                                //SFW
                                resolve({
                                    data: {
                                        link: filepath
                                    }
                                })
                        })
                        .catch(error => {
                            reject(error);
                        });

                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                });
        });
    }

    close = () => this.setState({edit: false})
    open = () => this.setState({edit: true})
    handleOnSaveBio = () => {
        this
            .props
            .actions
            .doSaveUserBio(this.props.token, draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())), this.props.identityId)
        this.close();
    };
    onEditorStateChange = (editorState) => {

        this.setState({editorState: editorState});

    }
    render() {
        const {edit, editorState} = this.state
        return (
            <Fragment>
                <Confirm
                    size='mini'
                    open={this.state.openPornConfirm}
                    onCancel={() => this.setState({openPornConfirm: false})}
                    onConfirm={() => this.setState({openPornConfirm: false})}
                    cancelButton='Cancel'
                    confirmButton="OK"
                    content='The image you try to upload contain Nudity or sexual content.'/>
                <Segment raised>

                    {this.props.isAuthenticated && this.props.currentQRA === this.props.qraInfo.qra && <div style={{
                        float: 'right'
                    }}>

                        <Dropdown
                            icon='ellipsis vertical'
                            size='tiny'
                            className='icon'
                            pointing="right">
                            <Dropdown.Menu>
                                {!edit && < Dropdown.Item text = 'Edit Bio' onClick = {
                                    this.open
                                } />}
                                {edit && < Dropdown.Item text = 'Save Bio' onClick = {
                                    this.handleOnSaveBio
                                } />}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
}

                    {(!edit) && <Container >
                        <div
                            className='profile-bio'
                            dangerouslySetInnerHTML={{
                            __html: this.props.qraInfo.bio
                        }}></div>
                    </Container>
}
                    {edit && <Container >
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
                        }}/>

                    </Container>
}
                </Segment>

            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    //state: state,
    currentQRA: state.default.userData.qra,
    identityId: state.default.userData.identityId,
    isAuthenticated: state.default.userData.isAuthenticated,
    token: state.default.userData.token
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(QRAProfileBio));
