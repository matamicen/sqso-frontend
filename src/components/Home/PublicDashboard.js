import React from "react";
import FeedQSO from "../Feed/NewsFeedContainer";
import {isMobile} from 'react-device-detect';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'

class PublicDashboard extends React.Component {

    render() {

        return (
           <div >
            <Grid style={{display: 'flex'}} centered>
                {(!isMobile) &&
                    <Grid.Row 
                        style={{ 
                                                     
                            flexWrap: 'nowrap',
                            justifyContent: 'center'
                        }}  >

                    <Grid.Column style={{ width: '160px', flex: 'none', marginLeft: 'auto'}}>
                        <Advertisement unit='wide skyscraper' test='Wide Skyscraper'/>
                    </Grid.Column>

                    <Grid.Column  
                        style={{ 
                        width: '700px', 
                        marginLeft: '30px', 
                        // marginRight: '-5px',
                        flexShrink: '0'}}>

                        < FeedQSO/>

                    </Grid.Column>

                    <Grid.Column  style={{ width: '160px', flex: 'none', marginRight: 'auto'}}>
                        <Advertisement unit='wide skyscraper' test='Wide Skyscraper' />
                    </Grid.Column>

                </Grid.Row>
}
                {(isMobile) && <Grid.Row  >
                    <Grid.Column>

                        < FeedQSO/>

                    </Grid.Column>

                </Grid.Row>
}
            </Grid>            
            </div>
        );
    }
}

export default(PublicDashboard);