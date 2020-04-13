import React from "react";
import FeedItemRepost from "./FeedItemRepost";
import FeedItemQSO from "./FeedItemQSO";
import FeedItemPost from "./FeedItemPost";
import FeedItemAd from "./FeedItemAd";
const FeedItem = props => {
  switch (props.type) {
    case "QSO":
      return (
        <FeedItemQSO
          key={props.qso.idqsos}
          qso={props.qso}
          measure={props.measure}
          recalculateRowHeight={props.recalculateRowHeight}
          showComments={props.showComments}
          index={props.index}
        />
      );
    case "LISTEN":
      return (
        <FeedItemQSO
          key={props.qso.idqsos}
          qso={props.qso}
          measure={props.measure}
          recalculateRowHeight={props.recalculateRowHeight}
          showComments={props.showComments}
          index={props.index}
        />
      );
    case "POST":
      return (
        <FeedItemPost
          key={props.qso.idqsos}
          qso={props.qso}
          measure={props.measure}
          recalculateRowHeight={props.recalculateRowHeight}
          showComments={props.showComments}
          index={props.index}
        />
      );
    case "SHARE":
      return (
        <FeedItemRepost
          key={props.qso.idqsos}
          qso={props.qso}
          measure={props.measure}
          showComments={props.showComments}
          recalculateRowHeight={props.recalculateRowHeight}
          index={props.index}
        />
      );
    // case "AD":
    //   return (
    //     <FeedItemAd
    //       source={props.source}
    //       ad={props.ad}
    //       measure={props.measure}
    //       recalculateRowHeight={props.recalculateRowHeight}
    //       index={props.index}
    //     />
    //   );
    default:
      return null;
  }
};

export default FeedItem;
