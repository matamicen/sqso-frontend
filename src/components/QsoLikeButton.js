import React from 'react';
import Thumbs_OFF from 'react-icons/lib/fa/thumbs-o-up';
import Thumbs_ON from 'react-icons/lib/fa/thumbs-up';
import { Form, FormControl, FormGroup, ControlLabel, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import FaFolderOpen from 'react-icons/lib/fa/folder-open';
import FaFileCodeO from 'react-icons/lib/fa/file-code-o';



export  class QsoLikeButton extends React.Component {
    constructor() {
        super();
        this.state = {
            liked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            liked: !this.state.liked
        });
    }

    render() {
        const label = this.state.liked ? <Thumbs_ON/> : <Thumbs_OFF/>
        return (
            <div className="customContainer">
                <Button type="button" bsStyle="success" block onClick={this.handleClick} >
                    {label}
                </Button>
            </div>
        );
    }
}