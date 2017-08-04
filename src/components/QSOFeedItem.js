import React from "react";
import {AudioList} from "./AudioList";
import {Image} from "./Image";
import {Feed, Icon, Label} from "semantic-ui-react";
import QSOComments from "./QSOComments";
import QSOLikeButton from "./QSOLikeButton";
import {QRAs} from "./QRAs";
export class QSOFeedItem extends React.Component {
    constructor() {
        super();
        this.state = {
            showComment: false
        };
        this.handleOnComment = this.handleOnComment.bind(this);
    }


    handleOnComment() {
        console.log("Comment Pressed")
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

        )
    }
}