import React, {Component} from 'react'
import Async  from 'react-select/lib/Async';
// import 'react-select/dist/react-select.css';
import fetch from 'isomorphic-fetch';
import {Redirect} from "react-router-dom";
import { components } from 'react-select';
import Avatar from 'react-avatar';

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
                                
                    return json.message;
                });
        }
    }
    render() {
        let custWidth; 
        if (this.state.value) {
            this.setState({value: null});
            return <Redirect to={"/" + this.state.value.qra}/>
        }
 
        if (window.innerWidth <= 380){
            custWidth =  "120px" 
        } else {
            custWidth =  "320px" 
        }
        return (
            <div style={{width: custWidth}}>
                <Async multi={false}
                                value={this.state.value}
                                onChange={this.onChange.bind(this)}
                               // onValueClick={this.gotoUser.bind(this)}
                                valueKey="qra"
                                labelKey="name"
                                placeholder={'Search QRA'}
                                loadOptions={this.getUsers.bind(this)}
                                autoload={false}
                                autosize={false}
                                autoclear={true}
                                components={{Option}}
                                backspaceRemoves={true}/>

            </div>
        );
    }
}
const GRAVATAR_SIZE = 30;
const Option = props => {
    const {data} = props;
    return (
      <components.Option {...props}>
        <Avatar round size={GRAVATAR_SIZE} className="avatar" color="#0366d6" name={data.qra} src={data.avatarpic} />
        <span>{' ' + data.name}</span>
      </components.Option>
    );
  };
export default NavigationSearch