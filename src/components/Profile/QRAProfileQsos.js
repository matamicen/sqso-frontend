import React from 'react'
import NewsFeed from '../Feed/NewsFeedPresentational';
import FeedItem from "../Feed/FeedItem";
import Immutable from 'immutable';


export default class QRAProfileQsos extends React.Component {
    render() {
        let qsos = Immutable.List(this.props.qsos);
        if (this.props.qsos && this.props.qsos.length > 0) {
            qsos = this.props.qsos.map((qso, i) =>
               { 
                return <FeedItem key={i} qso={qso}/>
        } 
            )
        }
        
        return (
            <NewsFeed list={qsos}/>
        )
    }
}
