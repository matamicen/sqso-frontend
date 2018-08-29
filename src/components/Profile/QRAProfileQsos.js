import React from 'react'
import NewsFeed from '../Feed/NewsFeedPresentational';
import FeedItem from "../Feed/FeedItem";
import Immutable from 'immutable';
import FeedItemShare from "../Feed/FeedItemShare"

export default class QRAProfileQsos extends React.Component {
    render() {
        let qsos = Immutable.List(this.props.qsos);
        if (this.props.qsos && this.props.qsos.length > 0) {
            qsos = this.props.qsos.map((qso, i) =>
               { 
                    switch (qso.type) {
                        case "QSO": return <FeedItem key={i} qso={qso}/>;
                        case "SHARE": return <FeedItemShare key={i} qso={qso}/>;
                        default: return null; 
                    }
        } 
            )
        }
        
        return (
            <NewsFeed list={qsos}/>
        )
    }
}
