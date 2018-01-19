import React from 'react';
import {Button, Icon} from 'semantic-ui-react'
import PropTypes from 'prop-types';

export class Audio extends React.Component {
    constructor() {
        super();
        this.state = {
            audioNotVisible: true
        }
        this.onClick = this.onClick.bind(this)
    }

    componentDidMount() {

    }
    onClick(){
        this.setState({audioNotVisible:false})
    }
    render() {
        if (this.props.url) {



                        if (this.state.audioNotVisible) {
                            return ( <Button icon onClick={this.onClick} >
                                <Icon name='play'/>
                            </Button> )
                        }
                        else {
                            return ( < audio
                                    ref="audio_tag"
                                    src={this.props.url}
                                    controls
                                    autoPlay
                                    preload="none"
                                />
                            )
                        }







        }
        else {
            return null
        }

    }
}
Audio.propTypes = {    
    url: PropTypes.string.isRequired
}