import React from "react";
import FeedAudioList from "./FeedAudioList";
import FeedImage from './FeedImage'
import QSOShareButtons from './QSOShareButtons'

import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'

import QSOComments from "./QSOComments";
import QSOLikeButton from "./QSOLikeButton";

import QRAs from "./QRAs";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';

import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import {Link} from 'react-router-dom'
import FeedOptionsMenu from "./FeedOptionsMenu";
import QSORePostButton from "./QSORePostButton";

class FeedItemRepost extends React.Component {
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

    handleOnComment() {
        this.setState({showComment: true});

    }
    componentDidUpdate(prevProps, prevState) {
        if ((this.state.showComment !== prevState.showComment) && (this.props.recalculateRowHeight)) 
            this.props.recalculateRowHeight(this.props.index);

        }
    recalculateRowHeight() {

        if (this.props.recalculateRowHeight) 
            this.props.recalculateRowHeight(this.props.index);
        }
    componentDidMount() {
        this.recalculateRowHeight();
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

        let text;

        switch (this.props.qso.original[0].type) {
            case "QSO":
                text = ' worked a QSO with';
                break;
            case "LISTEN":
                text = ' listened a QSO with';
                break;
            default:

        }
        var date = new Date(this.props.qso.original[0].datetime);
        return (
            <Segment raised>

                <Link to={"/" + this.props.qso.qra}>
                    <Image src={this.props.qso.profilepic} size='mini' avatar/> {this.props.qso.qra}
                </Link>
                {' reposted a QSO'}
                <div style={{
                    float: 'right'
                }}>

                    <FeedOptionsMenu
                        qso_owner={this.props.qso.qra}
                        idqso={this.props.qso.idqsos}
                        guid={this.props.qso.GUID_QR}
                        optionsCaller="FeedItem"/>

                </div>

                <Divider hidden/>
                <Segment raised>

                    <Link to={"/" + this.props.qso.original[0].qra}>
                        <Image src={this.props.qso.original[0].profilepic} size='mini' avatar/> {this.props.qso.original[0].qra}
                    </Link>
                    {text}
                    <div style={{
                        float: 'right'
                    }}></div>

                    <Divider hidden/>
                    <Label>Date:</Label>{date.toLocaleDateString("EN-US", {month: "short"}) + ' ' + date.getDate() + ', ' + date.getFullYear()}
                <Label>QTR (UTC):</Label>{date.getUTCHours() + ':' + date.getMinutes()}
                    <Label>Mode:</Label>{this.props.qso.original[0].mode}
                    <Label>Band:</Label>{this.props.qso.original[0].band}
 
                    <QRAs
                        avatarpic={this.props.qso.original[0].avatarpic}
                        qso_owner={this.props.qso.original[0].qra}
                        qras={this.props.qso.qras}/> {picList.length > 0 && <FeedImage
                        img={picList}
                        measure={this.props.measure}
                        idqso={this.props.qso.idqsos}
                        qso_owner={this.props.qso.original[0].qra}/>
}

                    {audioList.length > 0 && <FeedAudioList
                        mediaList={audioList}
                        idqso={this.props.qso.idqsos}
                        qso_owner={this.props.qso.original[0].qra}/>
}
                </Segment>

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

                {this.state.showComment && <QSOComments
                    qso={this.props.qso}
                    recalculateRowHeight={this.recalculateRowHeight}/>}

            </Segment>
        )
    }
}
const mapStateToProps = (state, qsos) => ({fetchingQSOS: state.default.FetchingQSOS, qsosFetched: state.default.qsosFetched, currentQRA: state.default.userData.qra});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(FeedItemRepost);
