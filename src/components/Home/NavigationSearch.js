import React, {Component} from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import fetch from 'isomorphic-fetch';
import {Redirect} from "react-router-dom";


class NavigationSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {value: null}



    }
    onChange(value) {
        this.setState({
            value: value,
        });

    }
    getUsers(input) {
        if (!input) {
            return Promise.resolve({options: []});
        }
        if (input.length > 2) {
            return fetch(`https://bvi2z1683m.execute-api.us-east-1.amazonaws.com/reactWeb/qra-list?qra=${input}`)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json.message);
                    return {options: json.message};
                });
        }
    }
    gotoUser(value, event) {
        console.log(value);
        window.open('https://github.com/' +value.html_url);
    }
    render() {
        if (this.state.value) {
            this.setState({value: null});
            return <Redirect to={"/" + this.state.value.qra}/>
        }
        const AsyncComponent =  Select.Async;

        return (
            <div>
                <AsyncComponent multi={false}
                                value={this.state.value}
                                onChange={this.onChange.bind(this)}
                               // onValueClick={this.gotoUser.bind(this)}
                                valueKey="qra"
                                labelKey="name"
                                loadOptions={this.getUsers.bind(this)}
                                autoload={false}
                                autosize={false}
                                autoclear={true}
                                //style={{width:  '400px'}}
                                backspaceRemoves={true}/>

            </div>
        );
    }
}

export default NavigationSearch