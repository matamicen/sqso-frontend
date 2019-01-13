import React, {Fragment} from 'react'

import Container from 'semantic-ui-react/dist/commonjs/elements/Container'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'

import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal'

import * as Actions from '../../actions/Actions';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

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
            open: false,
            editorState: editorState
        };
        this.handleOnSaveBio = this.handleOnSaveBio.bind(this);
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
        console.log(file)
        return new Promise((resolve, reject) => {
            let folder = 'bio/' + file.name;
            Storage
                .put(folder, file, {
                level: 'protected',
                contentType: 'image/png'
            })
                .then(result => {
                    Storage
                        .get(folder, {level: 'protected'})
                        .then(result => {

                            resolve({
                                data: {
                                    link: result
                                }
                            })
                        })
                        .catch(err => {
                            console.log(err);
                            reject(err);
                        })
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                });
        });
    }

    close = () => this.setState({open: false})
    open = () => this.setState({open: true})
    handleOnSaveBio = () => {
        this.props.actions.doSaveUserBio(this.props.token,draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
        this.close();
    };
    onEditorStateChange = (editorState) => {

        this.setState({editorState: editorState});
        
    }
    render() {
        const {open, editorState} = this.state
        return (
            <Fragment>
                <Modal closeIcon open={open} onClose={this.close}>
                    <Modal.Header>
                        Edit Bio
                    </Modal.Header>
                    <Modal.Content>

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
                                previewImage: true,
                                uploadCallback: this.uploadImageCallBack,
                                alt: {
                                    present: true,
                                    mandatory: false
                                }
                            }
                        }}/>

                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => this.close()}>Cancel</Button>
                        <Button positive onClick={() => this.handleOnSaveBio()}>Save</Button>
                    </Modal.Actions>
                </Modal>
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
                                < Dropdown.Item text='Edit Bio' onClick={this.open}/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
}

                    
                    <Container fluid>
                        <div
                            className='profile-bio'
                            dangerouslySetInnerHTML={{
                            __html: this.props.qraInfo.bio
                        }}></div>
                    </Container>

                </Segment>
               
                
            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    //state: state,
    currentQRA: state.default.userData.qra,
    isAuthenticated: state.default.userData.isAuthenticated,
    token: state.default.userData.token
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(QRAProfileBio));
