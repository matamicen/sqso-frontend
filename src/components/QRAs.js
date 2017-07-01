import React from "react";
import {QRA} from "./QRA";
import {Label, Feed} from "semantic-ui-react";
export class QRAs extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
//TODO: hacer que sea dinamico el texto ya que deberia aparecer diferente dependiendo quien es el OWNER del QSO
        return (
            <div>
                <Label image >
                    <img src={this.props.profilepic} alt=""/>
                    <Feed.User>{this.props.qso_owner}</Feed.User>
                </Label> started a QSO with
                {this.props.qras.map((qra, i) =>
                    <QRA key={i} qra={qra}/>
                )}
            </div>
        );
    }
}