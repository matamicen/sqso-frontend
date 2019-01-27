import React from 'react'
import FeedItemRepost from './FeedItemRepost';
import FeedItemQSO from './FeedItemQSO'
import FeedItemAd from './FeedItemAd'
const FeedItem = (props) => {
    switch (props.type) {
        case "QSO":
            return <FeedItemQSO
                key={props.qso.idqsos}
                qso={props.qso}
                measure={props.measure}
                recalculateRowHeight={props.recalculateRowHeight}
                index={props.index}/>
        case "SHARE":
            return <FeedItemRepost
                key={props.qso.idqsos}
                qso={props.qso}
                measure={props.measure}
                recalculateRowHeight={props.recalculateRowHeight}
                index={props.index}/>
        case 'AD':

            return <FeedItemAd
                source={props.source}
                measure={props.measure}
                recalculateRowHeight={props.recalculateRowHeight}
                index={props.index}/>
        default:
            return null;
    }

}

export default FeedItem;
