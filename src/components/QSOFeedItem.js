import React from "react";
import {AudioList} from "./AudioList";
import {Image} from "./Image";
import {Card, Feed, Icon, Label} from "semantic-ui-react";
import QSOComments from "./QSOComments";
import QSOLikeButton from "./QSOLikeButton";
import {QRAs} from "./QRAs";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';

class QSOFeedItem extends React.Component {
    constructor() {
        super();
        this.state = {
            showComment: false
        };
        this.handleOnComment = this.handleOnComment.bind(this);
    }
    shouldComponentUpdate(nextProps) {
     //   console.log("shouldComponentUpdate QSOFEEDITEM" + this.props.qsosFetched);
        return this.props.qsosFetched;
    }


    handleOnComment() {
        console.log("Comment Pressed");
        this.setState({showComment: true});
    }

    render() {

        let image = null;

        let picList = this.props.qso.media.filter((media) => media.type === "image");

        if (picList.length > 0) {
            image = <Image img={picList[0].url}/>;
        }


        let audioList = this.props.qso.media.filter((media) => media.type === 'audio');

        let audio = null;
        if (audioList.length > 0) {
            audio = <AudioList mediaList={audioList}/>;
        }

        let comment = null;
        if (this.state.showComment) {
            comment = <QSOComments qso={this.props.qso}/>;
        }


        return (
            <Card fluid>
            <Feed.Event>
                <Feed.Content>
                    <Feed.Summary>
                        <QRAs profilepic={this.props.qso.profilepic} qso_owner={this.props.qso.qra}
                              qras={this.props.qso.qras}/>
                        <Label>Mode:</Label>{this.props.qso.mode}
                        <Label>Band:</Label>{this.props.qso.band}
                    </Feed.Summary>
                    <Feed.Extra images>
                        {image}
                    </Feed.Extra>
                    <Feed.Extra>
                        {audio}
                    </Feed.Extra>
                    <Feed.Meta>
                        <QSOLikeButton qso={this.props.qso}/>
                        <Feed.Like onClick={this.handleOnComment.bind(this)}>
                            < Icon name='comment outline'/>
                            Comment
                        </Feed.Like>
                    </Feed.Meta>
                    <Feed.Extra>
                        {comment}
                    </Feed.Extra>
                </Feed.Content>
            </Feed.Event>
            </Card>
        )
    }
}

const mapStateToProps = (state, qsos) => ({
    fetchingQSOS: state.default.FetchingQSOS,
    qsosFetched: state.default.qsosFetched,

});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps, null, {
        pure: false
    }
)(QSOFeedItem);