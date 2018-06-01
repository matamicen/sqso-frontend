import React from "react";
import {AudioList} from "../AudioList";
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
import QSOItemOptions from './QSOItemOptions'
import QRAs from "./QRAs";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import PropTypes from 'prop-types';
import Image from "semantic-ui-react/dist/commonjs/elements/Image";

import {Link} from 'react-router-dom'

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

    shouldComponentUpdate(nextProps) {
        //   console.log("shouldComponentUpdate QSOFEEDITEM" + this.props.qsosFetched);
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

        return (
            <Segment raised>

                <Feed.Event>
                    <Feed.Label>
                        <Link to={"/" + this.props.qso.qra}>
                            <Image src={this.props.qso.profilepic} size='mini' avatar/> {this.props.qso.qra}
                        </Link>
                        {'  '}started a QSO
                        <div
                            style={{
                            float: 'right'
                        }}>
                            <QSOItemOptions idqso={this.props.qso.idqsos} currentQRA={this.props.currentQRA} qso_owner={this.props.qso.qra}/>
                        </div>
                    </Feed.Label>

                    <Feed.Content>
                        <Divider hidden/>
                        <Feed.Extra text>
                            <Label>Mode:</Label>{this.props.qso.mode}
                            <Label>Band:</Label>{this.props.qso.band}
                            <Label>QSO:
                            </Label>{this.props.qso.idqsos}
                            <QRAs
                                profilepic={this.props.qso.profilepic}
                                qso_owner={this.props.qso.qra}
                                qras={this.props.qso.qras}/>
                        </Feed.Extra>

                        {picList.length > 0 && <FeedImage img={picList} measure={this.props.measure} idqso={this.props.qso.idqsos}/>
}

                        {audioList.length > 0 && <AudioList mediaList={audioList}/>
}

                        <Feed.Extra>
                            <Divider hidden/>
                            <Button.Group widths='3' basic>
                                <QSOLikeButton qso={this.props.qso}/>
                                <Button
                                    onClick={this
                                    .handleOnComment
                                    .bind(this)}>
                                    < Icon name='comment outline'/> {this.props.qso.comments.length > 0 && commentsCounter}

                                </Button>
                                <QSOShareButtons idqso={this.props.qso.idqsos}/>
                            </Button.Group>

                        </Feed.Extra>
                        <Feed.Extra>
                            <div style={{ overflow: 'visible' }}>
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
    qso: PropTypes.object.isRequired,
    
}