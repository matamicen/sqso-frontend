import React from "react";

import Button from 'semantic-ui-react/dist/commonjs/elements/Button'

import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import "../../styles/style.css";

const QRAProfileHeader = (props) => {

    let buttonText;

    if (props.followed) {
        buttonText = "Unfollow";
    } else {
        buttonText = "Follow";
    }

    return (
        <div className='profile-header'>

            <Segment>
                <div className='inner'>
                    <div className='pic'>
                        {props.qraInfo.profilepic && <Image src={props.qraInfo.profilepic} centered size='small' circular/>
}
                    </div>
                    <div className='detail'>
                    <span className='qra'>                            {props.qraInfo.qra}
                            </span><br/>
                        <span className='name'>
                            {props.qraInfo.firstname && props.qraInfo.firstname + " "
}
                            {props.qraInfo.lastname && props.qraInfo.lastname
}</span><br/><br/> {(props.isAuthenticated && props.qraInfo.qra !== props.currentQRA) && <Button size='mini' positive={!props.followed} onClick={() => props.onClick()}>
                            {buttonText}
                        </ Button>}

                    </div>
                </div>
            </Segment>

        </div>

    )
};

export default QRAProfileHeader