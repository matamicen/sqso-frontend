import React from "react";
import FeedQSO from "../Feed/NewsFeedContainer";

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'

class PublicDashboard extends React.Component {

    render() {

        return (
           <div      >
            <Grid style={{display: 'flex'}} centered>
                {(navigator.maxTouchPoints === 0) &&
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
                {(navigator.maxTouchPoints > 0) && <Grid.Row columns={1} >
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