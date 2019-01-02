import React from 'react'
import FeedItemRepost from './FeedItemRepost';
import FeedItemQSO from './FeedItemQSO'
const FeedItem = (props) => {
    
    if (props.qso.type === 'QSO') 
        return <FeedItemQSO
            key={props.qso.idqsos}
            qso={props.qso}
            measure={props.measure}
            recalculateRowHeight={props.recalculateRowHeight}
            index={props.index}/>
    if (props.qso.type === 'SHARE') 
        return <FeedItemRepost
            key={props.qso.idqsos}
            qso={props.qso}
            measure={props.measure}
            recalculateRowHeight={props.recalculateRowHeight}
            index={props.index}/>
            
}

export default FeedItem;
