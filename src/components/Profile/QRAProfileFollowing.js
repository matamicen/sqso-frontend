import React from 'react'

import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import {Link} from 'react-router-dom'
import "../../styles/style.css";

const QRAProfileFollowing = (props) => (
    <div className='profile-following'>
        {props.following
            ? props
                .following
                .map((qra, i) => 
                <div className='qra' key={qra.qra}>
                    <div className='avatar'>
                        {qra.avatarpic
                            ? <Image avatar size='tiny' src={qra.avatarpic}/>
                            : ""}
                    </div>
                    <div className='qra'>
                    <Link to={"/" + qra.qra}>
                        {qra.qra}</Link>
                    </div>
                </div>)
            : ""
}
    </div>

);
export default QRAProfileFollowing
