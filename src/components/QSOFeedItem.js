import React from "react";
import {QRAs} from "./QRAs";
import {AudioList} from "./AudioList";
import {Image} from "./Image";
import {Feed, Icon, Label} from "semantic-ui-react";
export class QSOFeedItem extends React.Component {
    constructor() {
        super();
        this.state = {
            likecolor: "black"
        };
    }

    handleOnLike() {
        this.setState({likecolor: "red"});
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
                        <Feed.Like onClick={this.handleOnLike.bind(this)}>
                            < Icon name='like' color={this.state.likecolor}/>
                            4 Likes
                        </Feed.Like>
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>

        )
    }
}