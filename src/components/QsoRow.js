import React from "react";
import {QRAs} from "./QRAs";
import {AudioList} from "./AudioList";
import {Image} from "./Image";
import {Feed, Icon} from "semantic-ui-react";
export class QsoRow extends React.Component {
    constructor() {
        super();
        this.state = {};
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

                <Feed.Label >
                    <img src={this.props.qso.profilepic} alt=""/>
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <QRAs qras={this.props.qso.qras}/>
                    </Feed.Summary>
                    {image}

                    {audio}
                    <Feed.Meta>
                        <Feed.Like>
                            <Icon name='like'/>
                            4 Likes
                        </Feed.Like>
                    </Feed.Meta>
                </Feed.Content>

            </Feed.Event>

        )
    }
}