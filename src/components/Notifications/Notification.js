import React from "react";

import {Link} from "react-router-dom";
import "../../styles/style.css";
import List from "semantic-ui-react/dist/commonjs/elements/List";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";

export default class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this
            .handleOnClick
            .bind(this);
    }
    handleOnClick(e) {

        this
            .props
            .doNotificationRead(this.props.notification.idqra_notifications, this.props.token);
        console.log(this.props.notification.idqra_notifications);
    }
    formatNotification() {
        let notif = this.props.notification;
        let message;
        switch (this.props.notification.activity_type) {
            case 1: //Follow
                message = notif.QRA + " now follows " + notif.REF_QRA;
                return (
                    <List.Description>
                        <Link to={"/" + notif.REF_QRA} onClick={this.handleOnClick}>{message}</Link>
                    </List.Description>
                );
            case 10: //new QSO
                switch (notif.qso_type) {
                    case 'QSO':
                        message = notif.QRA + " worked a QSO on mode:" + notif.qso_mode + ", band: " + notif.qso_band;
                        break;
                    case 'LISTEN':
                        message = notif.QRA + " listened a QSO on mode:" + notif.qso_mode + ", band: " + notif.qso_band;
                        break;
                    default:
                        console.log(notif);
                        break;
                }

                return (
                    <List.Description>
                        <Link to={"/qso/" + notif.QSO_GUID} onClick={this.handleOnClick}>{message}</Link>
                    </List.Description>
                );
            case 12: //add QRA to QSO
                message = notif.QRA + " included " + notif.REF_QRA + " on his new QSO" ;
                return (
                    <List.Description>
                        <Link to={"/qso/" + notif.QSO_GUID} onClick={this.handleOnClick}>{message}</Link>
                    </List.Description>
                );
            case 18: //add QSO Comment
                message = notif.QRA + " commented a QSO created by " + notif.REF_QRA;
                return (
                    <List.Description>
                        <Link to={"/qso/" + notif.QSO_GUID} onClick={this.handleOnClick}>{message}</Link>
                    </List.Description>
                );
            case 20: //add QSO Link
                message = notif.QRA + " linked a QSO with another created by " + notif.REF_QRA;
                return (
                    <List.Description>
                        <Link to={"/qso/" + notif.QSO_GUID} onClick={this.handleOnClick}>{message}</Link>
                    </List.Description>
                );
            case 23: //add QSO Like
                message = notif.QRA + " liked a QSO created by " + notif.REF_QRA;
                return (
                    <List.Description>
                        <Link to={"/qso/" + notif.QSO_GUID} onClick={this.handleOnClick}>{message}</Link>
                    </List.Description>
                );
            default:
                message = notif.idqra_notifications;
                return <List.Description>
                    <Link to={"/qso/" + notif.QSO_GUID} onClick={this.handleOnClick}>{message}</Link>
                </List.Description>;
        }

    }
    render() {
        return (

            <List.Item >
                <Image avatar src={this.props.notification.qra_avatarpic}/>
                <List.Content>
                    {this.formatNotification()}
                </List.Content>
            </List.Item>
        )
    }
}
