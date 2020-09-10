/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import FeedItemAd from './FeedItemAd';
import FeedItemFollow from './FeedItemFollow';
import FeedItemPost from './FeedItemPost';
import FeedItemQSO from './FeedItemQSO';
import FeedItemRepost from './FeedItemRepost';
const FeedItem = props => {
  switch (props.type) {
    case 'QSO':
      return (
        <FeedItemQSO
          key={props.qso.idqsos}
          qso={props.qso}
          measure={props.measure}
          recalculateRowHeight={props.recalculateRowHeight}
          index={props.index}
        />
      );
    case 'LISTEN':
      return (
        <FeedItemQSO
          key={props.qso.idqsos}
          qso={props.qso}
          measure={props.measure}
          recalculateRowHeight={props.recalculateRowHeight}
          index={props.index}
        />
      );
    case 'POST':
    case 'QAP':
    case 'FLDDAY':
      return (
        <FeedItemPost
          key={props.qso.idqsos}
          qso={props.qso}
          measure={props.measure}
          recalculateRowHeight={props.recalculateRowHeight}
          index={props.index}
        />
      );

    case 'SHARE':
      return (
        <FeedItemRepost
          key={props.qso.idqsos}
          qso={props.qso}
          measure={props.measure}
          recalculateRowHeight={props.recalculateRowHeight}
          index={props.index}
        />
      );
    case 'AD':
      if (props.index === 0) {
        return (
          <Fragment>
            <div>
              <Button
                style={{backgroundColor: "#243665"}}
                positive
                fluid
                size="small"
                onClick={() => props.history.push('/explore')}
              >
                {props.t('exploreUsers.lookWhoInQSO')}
              </Button>
              <FeedItemFollow
                source={props.source}
                ad={props.ad}
                measure={props.measure}
                recalculateRowHeight={props.recalculateRowHeight}
                index={props.index}
              />
            </div>
          </Fragment>
        );
      } else if (props.index % 9 === 0)
        return (
          <FeedItemFollow
            source={props.source}
            ad={props.ad}
            measure={props.measure}
            recalculateRowHeight={props.recalculateRowHeight}
            index={props.index}
          />
        );
      else {
        return (
          <FeedItemAd
            source={props.source}
            ad={props.ad}
            measure={props.measure}
            recalculateRowHeight={props.recalculateRowHeight}
            index={props.index}
          />
        );
      }
    default:
      return null;
  }
};

export default withRouter(withTranslation()(FeedItem));
