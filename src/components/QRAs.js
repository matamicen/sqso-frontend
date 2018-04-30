import React from "react";
import {QRA} from "./QRA";
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import {Link} from 'react-router-dom'
export class QRAs extends React.Component {

    render() {
//TODO: hacer que sea dinamico el texto ya que deberia aparecer diferente dependiendo quien es el OWNER del QSO
        return (
            <div>
                <Label image >
                    <img src={this.props.profilepic} alt=""/>
                    <Link to={"/" + this.props.qso_owner}>{this.props.qso_owner}</Link>
                </Label> started a QSO with
                {this.props.qras.map((qra, i) =>
                    <QRA key={i} qra={qra}/>
                )}
            </div>
        );
    }
}