// import 'react-select/dist/react-select.css';
import API from '@aws-amplify/api';
import * as Sentry from '@sentry/browser';
import Hammer from 'hammerjs';
import React, { Fragment } from 'react';
import Avatar from 'react-avatar';
import { withTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { components } from 'react-select';
import Async from 'react-select/async';
import '../../styles/style.css';

class NavigationSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = null;
    this.state = {
      openSearch: false,
      value: null
    };
  }
  componentDidMount() {
    const viewerImage = document.getElementById('root');
    var mc = new Hammer.Manager(viewerImage);
    mc.add(new Hammer.Tap({ event: 'singletap' }));

    mc.on('singletap doubletap', () => {
      window.ReactNativeWebView.postMessage("Hello!")
      // this.setState({ openSearch: true });
      // this.inputRef.focus();
    }); // remove ()
  }
  onChange(value) {
    this.setState({ value: value });
  }
  getUsers(input) {
    if (process.env.REACT_APP_STAGE === 'production')
      window.gtag('event', 'qraNavBarSearch_WEBPRD', {
        event_category: 'qra',
        event_label: 'navBarSearch'
      });
    let result = [];
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    if (input.length > 2) {
      let apiName = 'superqso';
      let path = '/qra-list?qra=' + input;

      let myInit = {
        body: {}, // replace this with attributes you need
        headers: {
          // "Authorization": this.props.token
        } // OPTIONAL
      };
      return API.get(apiName, path, myInit)
        .then(response => {
          if (response.body.error > 0) {
            console.error(response.body.message);
            return result;
          } else {
            result = response.body.message;
            return result;
          }
        })
        .catch(error => {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error);
          } else {
            Sentry.configureScope(function(scope) {
              scope.setExtra('ENV', process.env.REACT_APP_STAGE);
            });
            Sentry.captureException(error);
          }
          return [];
        });

      // return
      // fetch(`https://bvi2z1683m.execute-api.us-east-1.amazonaws.com/reactWeb/qra-li
      // s t?qra=${input}`).then((response) => response.json()).then((json) => {
      // return json.message; });
    }
  }

  render() {
    const { t } = this.props;
    if (this.state.value) {
      this.setState({ value: null });
      return <Redirect to={'/' + this.state.value.qra} />;
    }
    const customStyles = {
      control: base => ({
        ...base,
        height: 40,
        minHeight: 40,
        width: '100%',
        fontSize: '0.8rem'
      })
    };
    return (
      <Fragment>
        <div
          ref={inputRef => {
            this.inputRef = inputRef;
          }}
        />
        <div id="select" className="NavBar">
          <Async
            openMenuOnFocus
            // menuIsOpen={this.state.openSearch}
            multi={false}
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            valueKey="qra"
            labelKey="name"
            placeholder={t('navBar.searchCallsign')}
            loadOptions={this.getUsers.bind(this)}
            autoload={false}
            autosize={false}
            autoclear={true}
            isSearchable={true}
            inputProps={{ readOnly: false }}
            // styles={customStyles}
            components={{
              Option
            }}
            backspaceRemoves={true}
          />
        </div>
      </Fragment>
    );
  }
}
export default withTranslation()(NavigationSearch);
const GRAVATAR_SIZE = 30;
const Option = props => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <Avatar
        round
        size={GRAVATAR_SIZE}
        className="avatar"
        color="#0366d6"
        name={data.qra}
        src={data.avatarpic ? data.avatarpic : '/emptyprofile.png'}
      />
      <span>{' ' + data.name}</span>
    </components.Option>
  );
};
