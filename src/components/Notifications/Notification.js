import moment from 'moment';
import 'moment/locale/es';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Feed from 'semantic-ui-react/dist/commonjs/views/Feed';
import '../../styles/style.css';
class Notification extends React.Component {
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
    const { t } = this.props;
    let notif = this.props.notification;
    var date = new Date(notif.UTC);
    var datetime = new Date(notif.DATETIME);
    moment.locale();

    switch (this.props.notification.activity_type) {
      case 1: //Follow
        return (
          <Feed.Content>
            <Feed.Summary>
              <Link
                to={
                  '/' + ((this.props.currentQRA === notif.REF_QRA)
                    ? notif.QRA
                    : notif.REF_QRA)
                }
                onClick={this.handleOnClick}
              >
                {this.props.currentQRA === notif.REF_QRA
                  ? t('notification.followYou', { QRA: notif.QRA })
                  : t('notification.followOther', {
                      QRA: notif.QRA,
                      QRA_REF: notif.REF_QRA
                    })}
              </Link>
              <Feed.Date>{moment(datetime).fromNow()}</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>{notif.comment}</Feed.Extra>
          </Feed.Content>
        );

      case 10: //new QSO
        return (
          <Feed.Content>
            <Feed.Summary>
              <Link to={'/qso/' + notif.QSO_GUID} onClick={this.handleOnClick}>
                {t('notification.workedQSO', { QRA: notif.QRA })}
              </Link>
              <Feed.Date>{moment(datetime).fromNow()}</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              {notif.mode ? t('qso.mode') + ': ' + notif.mode : ''}
              {notif.band ? ' | ' + t('qso.band') + ': ' + notif.band : ''}

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
      case 12: //add QRA to QSO
        return (
          <Feed.Content>
            <Feed.Summary>
              <Link to={'/qso/' + notif.QSO_GUID} onClick={this.handleOnClick}>
                {this.props.currentQRA === notif.REF_QRA
                  ? t('notification.includedYou', { QRA: notif.QRA })
                  : t('notification.includedOther', {
                      QRA: notif.QRA,
                      QRA_REF: notif.REF_QRA
                    })}
              </Link>
              <Feed.Date>{moment(datetime).fromNow()}</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              {notif.mode ? t('qso.mode') + ': ' + notif.mode : ''}
              {notif.band ? ' | ' + t('qso.band') + ': ' + notif.band : ''}

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
                {t('notification.commentedQSO', { QRA: notif.QRA })}
              </Link>
              <Feed.Date>{moment(datetime).fromNow()}</Feed.Date>
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
              <Feed.Date>{moment(datetime).fromNow()}</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              {notif.mode ? t('qso.mode') + ': ' + notif.mode : ''}
              {notif.band ? ' | ' + t('qso.band') + ': ' + notif.band : ''}

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
                {t('notification.updatedBio', { QRA: notif.QRA })}
              </Link>
              <Feed.Date>{moment(datetime).fromNow()}</Feed.Date>
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
              <Feed.Date>{moment(datetime).fromNow()}</Feed.Date>
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

export default withTranslation()(Notification);
