/* eslint-disable react/prop-types */
import React from 'react';
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
      if (props.index === 0 || (props.index % 9 === 0 && props.index !== 0)) {
        return (
          <FeedItemFollow
            source={props.source}
            ad={props.ad}
            measure={props.measure}
            recalculateRowHeight={props.recalculateRowHeight}
            index={props.index}
          />
        );
      } else {
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

export default FeedItem;
