import React from "react";

import { Link } from "react-router-dom";
import "../../styles/style.css";

import Table from "semantic-ui-react/dist/commonjs/collections/Table";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";

export default class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    this.props.doNotificationRead(
      this.props.notification.idqra_notifications,
      this.props.token
    );
  }
  formatNotification() {
    let notif = this.props.notification;

    switch (this.props.notification.activity_type) {
      case 1: //Follow
        if (this.props.currentQRA === notif.REF_QRA)
          return (
            // <List.Description>
            <Link to={"/" + notif.QRA} onClick={this.handleOnClick}>
              {notif.message}
            </Link>
            // </List.Description>
          );
        else
          return (
            // <List.Description>
            <Link to={"/" + notif.REF_QRA} onClick={this.handleOnClick}>
              {notif.message}
            </Link>
            // </List.Description>
          );
      case 10: //new QSO
        return (
          // <List.Description>
          <Link to={"/qso/" + notif.QSO_GUID} onClick={this.handleOnClick}>
            {notif.message}
          </Link>
          // </List.Description>
        );
      case 12: //add QRA to QSO
        return (
          // <List.Description>
          <Link to={"/qso/" + notif.QSO_GUID} onClick={this.handleOnClick}>
            {notif.message}
          </Link>
          // </List.Description>
        );
      case 18: //add QSO Comment
        return (
          // <List.Description>
          <Link to={"/qso/" + notif.QSO_GUID} onClick={this.handleOnClick}>
            {notif.message}
          </Link>
          // </List.Description>
        );
      case 20: //add QSO Link
        return (
          // <List.Description>
          <Link to={"/qso/" + notif.QSO_GUID} onClick={this.handleOnClick}>
            {notif.message}
          </Link>
          // </List.Description>
        );
      case 23: //add QSO Like
        return (
          // <List.Description>
          <Link to={"/qso/" + notif.QSO_GUID} onClick={this.handleOnClick}>
            {notif.message}
          </Link>
          // </List.Description>
        );
      case 50: //Bio updated
        return (
          // <List.Description>
          <Link to={"/" + notif.QRA} onClick={this.handleOnClick}>
            {notif.message}
          </Link>
          // </List.Description>
        );
      default:
        return (
          // <List.Description>
          <Link to={"/qso/" + notif.QSO_GUID} onClick={this.handleOnClick}>
            {notif.message}
          </Link>
          // </List.Description>
        );
    }
  }
  render() {
    return (
      // <List.Item>
      //   <Image avatar src={this.props.notification.qra_avatarpic} />
      //   <List.Content>{this.formatNotification()}</List.Content>
      // </List.Item>
      <Table.Row>
        <Table.Cell>
          <Image avatar src={this.props.notification.qra_avatarpic} />
        </Table.Cell>
        <Table.Cell>{this.formatNotification()}</Table.Cell>
      </Table.Row>
    );
  }
}
