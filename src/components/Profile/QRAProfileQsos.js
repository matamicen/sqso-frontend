import React from 'react'
import NewsFeed from '../Feed/NewsFeedPresentational';
import FeedItem from "../Feed/FeedItem";

export default class QRAProfileQsos extends React.PureComponent {
    render() {
        let qsos = [];
        if (this.props.qsos && this.props.qsos.length > 0) {
            for (let i = 0; i < this.props.qsos.length; i++) {
                if (i % 3 === 0) 
                    qsos.push(<FeedItem key={1} type='AD' source='QRA'/>)
                qsos.push(<FeedItem key={i} qso={this.props.qsos[i]} type={this.props.qsos[i].type}/>)
            }
            return (<NewsFeed list={qsos}/>)
        }

        return null;
    }
}
