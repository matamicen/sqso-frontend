import React from 'react'
import {Feed} from 'semantic-ui-react'
import FeedItem from "../Feed/FeedItem";

const QRAProfileQsos = (props) => (
    <div>   
        { console.table(props.qsos) }
        {   props.qsos && <Feed>
            {props
                .qsos
                .map((qso, i) => <FeedItem key={i} qso={qso}/>)
}
  
        </Feed>
}
    </div>
);
export default QRAProfileQsos
