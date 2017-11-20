import React from 'react'
import {Feed} from 'semantic-ui-react'
import QSOFeedItem from "./QSOFeedItem";


const QRAProfileQsos = (props) => (
    <div>
        <Feed>
            {props.qsos ?
                props.qsos.map((qso, i) =>
                    <QSOFeedItem key={i} qso={qso}/>
                )
                : ""
            }
        </Feed>

    </div>
);
export default QRAProfileQsos

