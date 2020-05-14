import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Feed from 'semantic-ui-react/dist/commonjs/views/Feed';
import '../../styles/style.css';
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
    var date = new Date(notif.UTC);
    // var date = new Date(notif.DATETIME);
    // console.log(date)
    switch (this.props.notification.activity_type) {
      case 1: //Follow
        if (this.props.currentQRA === notif.REF_QRA)
          return (
            <Feed.Content>
              <Feed.Summary>
                <Link to={'/' + notif.QRA} onClick={this.handleOnClick}>
                  {notif.message}
                </Link>
                <Feed.Date>
                  <Moment fromNow>{notif.DATETIME}</Moment>
                </Feed.Date>
              </Feed.Summary>
              <Feed.Extra text>{notif.comment}</Feed.Extra>
            </Feed.Content>
          );
        else
          return (
            <Feed.Content>
              <Feed.Summary>
                <Link to={'/' + notif.REF_QRA} onClick={this.handleOnClick}>
                  {notif.message}
                </Link>
                <Feed.Date>
                  <Moment fromNow>{notif.DATETIME}</Moment>
                </Feed.Date>
              </Feed.Summary>
              <Feed.Extra text>{notif.comment}</Feed.Extra>
            </Feed.Content>
          );
      case 10: //new QSO
        return (
          <Feed.Content>
            <Feed.Summary>
              <Link to={'/qso/' + notif.QSO_GUID} onClick={this.handleOnClick}>
                {notif.message}
              </Link>
              <Feed.Date>
                <Moment fromNow>{notif.datetime}</Moment>
              </Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>{notif.comment}</Feed.Extra>
          </Feed.Content>
        );
      case 12: //add QRA to QSO
        return (
          <Feed.Content>
            <Feed.Summary>
              <Link to={'/qso/' + notif.QSO_GUID} onClick={this.handleOnClick}>
                {notif.message}
              </Link>
              <Feed.Date>
                <Moment fromNow>{notif.DATETIME}</Moment>
              </Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              {notif.mode ? 'Mode: ' + notif.mode : ''}
              {notif.band ? ' | Band: ' + notif.band : ''}
              
              {notif.UTC
                ? ' | UTC: ' +
                  date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()
                : ''}
            </Feed.Extra>
          </Feed.Content>
        );
      case 18: //add QSO Comment
        return (
          <Feed.Content>
            <Feed.Summary>
              <Link to={'/qso/' + notif.QSO_GUID} onClick={this.handleOnClick}>
                {notif.message}
              </Link>
              <Feed.Date>
                <Moment fromNow>{notif.DATETIME}</Moment>
              </Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>{notif.comment}</Feed.Extra>
          </Feed.Content>
        );
      case 20: //add QSO Link
        return (
          <Feed.Content>
            <Feed.Summary>
              <Link to={'/qso/' + notif.QSO_GUID} onClick={this.handleOnClick}>
                {notif.message}
              </Link>
              <Feed.Date>
                <Moment fromNow>{notif.DATETIME}</Moment>
              </Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              {notif.mode ? 'Mode: ' + notif.mode : ''}
              {notif.band ? ' | Band: ' + notif.band : ''}
              
              {notif.UTC
                ? ' | UTC: ' +
                  date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()
                : ''}
            </Feed.Extra>
          </Feed.Content>
          // // <List.Description>
          // <Link to={'/qso/' + notif.QSO_GUID} onClick={this.handleOnClick}>
          //   {notif.message}
          // </Link>
          // // </List.Description>
        );
      case 23: //add QSO Like
        return (
          <Feed.Content>
            <Feed.Summary>
              <Link to={'/qso/' + notif.QSO_GUID} onClick={this.handleOnClick}>
                {notif.message}
              </Link>
              <Feed.Date>
                <Moment fromNow>{notif.DATETIME}</Moment>
              </Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              {notif.mode ? 'Mode: ' + notif.mode : ''}
              {notif.band ? ' | Band: ' + notif.band : ''}
              
              {notif.UTC
                ? ' | UTC: ' +
                  date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()
                : ''}
            </Feed.Extra>
          </Feed.Content>
          // // <List.Description>
          // <Link to={'/qso/' + notif.QSO_GUID} onClick={this.handleOnClick}>
          //   {notif.message}
          // </Link>
          // // </List.Description>
        );
      case 50: //Bio updated
        return (
          <Feed.Content>
            <Feed.Summary>
              <Link to={'/' + notif.QRA} onClick={this.handleOnClick}>
                {notif.message}
              </Link>
              <Feed.Date>
                <Moment fromNow>{notif.DATETIME}</Moment>
              </Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>{notif.comment}</Feed.Extra>
          </Feed.Content>
          // // <List.Description>
          // <Link to={'/' + notif.QRA} onClick={this.handleOnClick}>
          //   {notif.message}
          // </Link>
          // // </List.Description>
        );
      default:
        return (
          <Feed.Content>
            <Feed.Summary>
              <Link to={'/qso/' + notif.QSO_GUID} onClick={this.handleOnClick}>
                {notif.message}
              </Link>
              <Feed.Date>
                <Moment fromNow>{notif.DATETIME}</Moment>
              </Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>{notif.comment}</Feed.Extra>
          </Feed.Content>
          // // <List.Description>
          // <Link to={'/qso/' + notif.QSO_GUID} onClick={this.handleOnClick}>
          //   {notif.message}
          // </Link>
          // // </List.Description>
        );
    }
  }
  render() {
    return (
      // <List.Item>
      //   <Image avatar src={this.props.notification.qra_avatarpic} />
      //   <List.Content>{this.formatNotification()}</List.Content>
      // </List.Item>
      // <Table.Row>
      //   <Table.Cell>
      //     <Image
      //       avatar
      //       src={
      //         this.props.notification.qra_avatarpic
      //           ? this.props.notification.qra_avatarpic
      //           : "/emptyprofile.png"
      //       }
      //     />
      //   </Table.Cell>
      //   <Table.Cell>{this.formatNotification()}</Table.Cell>
      // </Table.Row>

      <Feed.Event>
        {' '}
        <Feed.Label>
          <Image
            avatar
            src={
              this.props.notification.qra_avatarpic
                ? this.props.notification.qra_avatarpic
                : '/emptyprofile.png'
            }
          />
        </Feed.Label>
        {this.formatNotification()}{' '}
      </Feed.Event>
    );
  }
}
