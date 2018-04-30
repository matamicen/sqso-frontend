import React from 'react'
import Feed from 'semantic-ui-react/dist/commonjs/views/Feed'
import FeedItem from "../Feed/FeedItem";

const QRAProfileQsos = (props) => (
    <div>        
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
