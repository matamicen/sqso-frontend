import React from 'react'
import NewsFeed from '../Feed/NewsFeedPresentational';


export default class QRAProfileQsos extends React.PureComponent {
    render() {
        let qsos = [];
        if (this.props.qsos && this.props.qsos.length > 0) {
            for (let i = 0; i < this.props.qsos.length; i++) {
                if (i % 3 === 0) 
                qsos.push({type:'AD',
                            source:'QRA'});
                 qsos.push({qso:this.props.qsos[i],
                    type:this.props.qsos[i].type})
                 
             
            }
            return (<NewsFeed list={qsos}/>)
        }

        return null;
    }
}
