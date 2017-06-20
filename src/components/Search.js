import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { FormGroup, FormControl, } from 'react-bootstrap';
export class Search extends React.Component{
    constructor(){
        super();
        this.state = {
            value : ''
        };
    }
    getInitialState() {
        return {
            value: ''
        };
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }
    render(){
        return (
            <form>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                >

                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Search"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />

                </FormGroup>
            </form>
        );
    }
}