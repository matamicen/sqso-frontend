import React from "react";
import {AudioList} from "../AudioList";
import {FeedImage} from './FeedImage'
import QSOShareButtons from './QSOShareButtons'

import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Item from 'semantic-ui-react/dist/commonjs/views/Item'
import Feed from 'semantic-ui-react/dist/commonjs/views/Feed'
import QSOComments from "./QSOComments";
import QSOLikeButton from "./QSOLikeButton";
import {QRAs} from "../QRAs";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import PropTypes from 'prop-types';

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
        console.log("Comment Pressed");
        this.setState({showComment: true});
        this.recalculateRowHeight();
    }

    recalculateRowHeight() {
        console.log("recalculateRowHeight");
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
                    <Item.Extra>
                        <Button icon floated='right' size='mini'>
                            <Icon name='ellipsis vertical'/>
                        </Button>
                    </Item.Extra>
                    <Feed.Content>
                        <Feed.Summary>
                            <QRAs
                                profilepic={this.props.qso.profilepic}
                                qso_owner={this.props.qso.qra}
                                qras={this.props.qso.qras}/>
                            <Label>Mode:</Label>{this.props.qso.mode}
                            <Label>Band:</Label>{this.props.qso.band}
                            <Label>QSO:
                            </Label>{this.props.qso.idqsos}
                        </Feed.Summary>

                        {picList.length > 0 && <FeedImage img={picList} measure={this.props.measure}/>
}

                        {audioList.length > 0 && <AudioList mediaList={audioList}/>
}

                        <Feed.Meta>
                            <Button.Group basic fluid>

                                <QSOLikeButton qso={this.props.qso}/>

                                <Button>
                                    <Feed.Like
                                        onClick={this
                                        .handleOnComment
                                        .bind(this)}>
                                        < Icon name='comment outline'/>
                                        Comment
                                        {this.props.qso.comments.length > 0 && commentsCounter  }
                                    </Feed.Like>
                                </Button>
                                <Button>
                                    <Feed.Like>
                                        <QSOShareButtons idqso={this.props.qso.idqsos}/>
                                    </Feed.Like>

                                </Button>
                            </Button.Group>
                        </Feed.Meta>
                        <Feed.Extra>
                            {this.state.showComment && <QSOComments
                                qso={this.props.qso}
                                recalculateRowHeight={this.recalculateRowHeight}/>
}
                        </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>
            </Segment>
        )
    }
}
const mapStateToProps = (state, qsos) => ({fetchingQSOS: state.default.FetchingQSOS, qsosFetched: state.default.qsosFetched});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(FeedItem);
FeedItem.propTypes = {
    qso: PropTypes.object.isRequired,
    // measure: PropTypes.func.isRequired
}