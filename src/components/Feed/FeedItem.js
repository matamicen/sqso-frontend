import React from "react";
import FeedAudioList from "./FeedAudioList";
import FeedImage from './FeedImage'
import QSOShareButtons from './QSOShareButtons'

import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'

import Feed from 'semantic-ui-react/dist/commonjs/views/Feed'

import QSOComments from "./QSOComments";
import QSOLikeButton from "./QSOLikeButton";

import QRAs from "./QRAs";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import PropTypes from 'prop-types';
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import {Link} from 'react-router-dom'
import FeedOptionsMenu from "./FeedOptionsMenu";
import QSORePostButton from "./QSORePostButton";

class FeedItem extends React.Component {
    constructor() {
        super();
        this.state = {
            showComment: false
        };
        this.handleOnComment = this
            .handleOnComment
            .bind(this);
        this.recalculateRowHeight = this
            .recalculateRowHeight
            .bind(this);
    }
    // componentDidMount(){     this.recalculateRowHeight(this.props.index) }
    shouldComponentUpdate(nextProps) {

        return this.props.qsosFetched;
    }

    handleOnComment() {

        this.setState({showComment: true});
        this.recalculateRowHeight();
    }

    recalculateRowHeight() {

        if (this.props.recalculateRowHeight) 
            this.props.recalculateRowHeight(this.props.index);
        }
    
    render() {

        let picList = this
            .props
            .qso
            .media
            .filter((media) => media.type === "image");
        let audioList = this
            .props
            .qso
            .media
            .filter((media) => media.type === 'audio');
        const commentsCounter = '(' + this.props.qso.comments.length + ')'
        console.log(this.props.qso)
        return (
            <Segment raised>

                <Feed.Event>
                    <Feed.Label>
                        <Link to={"/" + this.props.qso.qra}>
                            <Image
                                src={this.props.qso.profilepic}
                                size='mini'
                                avatar
                                style={{
                                width: '35px',
                                height: '35px'
                            }}/> {this.props.qso.qra}
                        </Link>
                        {'  '}worked a QSO with
                        <div
                            style={{
                            float: 'right'
                        }}>

                            <FeedOptionsMenu
                                qso_owner={this.props.qso.qra}
                                idqso={this.props.qso.idqsos}
                                guid={this.props.qso.GUID_QR}
                                optionsCaller="FeedItem"/>

                        </div>
                    </Feed.Label>

                    <Feed.Content>
                        <Divider hidden/>
                        <QRAs
                            profilepic={this.props.qso.profilepic}
                            qso_owner={this.props.qso.qra}
                            qras={this.props.qso.qras}/>
                        <Divider hidden/>
                        <Feed.Extra text>
                            <Label>Mode:</Label>{this.props.qso.mode}
                            <Label>Band:</Label>{this.props.qso.band}
                            <Label>QSO:
                            </Label>{this.props.qso.idqsos}
                            <Label>GUID:
                            </Label>{this.props.qso.GUID_URL}

                        </Feed.Extra>

                        {picList.length > 0 && <FeedImage
                            img={picList}
                            measure={this.props.measure}
                            idqso={this.props.qso.idqsos}
                            qso_owner={this.props.qso.qra}/>
}

                        {audioList.length > 0 && <FeedAudioList
                            mediaList={audioList}
                            idqso={this.props.qso.idqsos}
                            qso_owner={this.props.qso.qra}/>
}

                        <Feed.Extra>
                            <Divider hidden/>
                            <Button.Group widths='4' basic>
                                <QSOLikeButton qso={this.props.qso}/>
                                <Button
                                    onClick={this
                                    .handleOnComment
                                    .bind(this)}>
                                    < Icon name='comment outline'/> {this.props.qso.comments.length > 0 && commentsCounter}

                                </Button>
                                <QSORePostButton qso={this.props.qso}/>
                                <QSOShareButtons idqso={this.props.qso.GUID_URL}/>
                            </Button.Group>

                        </Feed.Extra>
                        <Feed.Extra>
                            <div
                                style={{
                                overflow: 'visible'
                            }}>
                                {this.state.showComment && <QSOComments
                                    qso={this.props.qso}
                                    recalculateRowHeight={this.recalculateRowHeight}/>}
                            </div>
                        </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>

            </Segment>
        )
    }
}
const mapStateToProps = (state, qsos) => ({fetchingQSOS: state.default.FetchingQSOS, qsosFetched: state.default.qsosFetched, currentQRA: state.default.userData.qra});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(FeedItem);
FeedItem.propTypes = {
    qso: PropTypes.object.isRequired
}