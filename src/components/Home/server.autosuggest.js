// server.autosuggest.js
import API from '@aws-amplify/api';
import * as Sentry from '@sentry/browser';
import React from 'react';
import Autosuggest from 'react-autosuggest';
import Avatar from 'react-avatar';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import './autosuggest.css';
class ServerAutoSuggest extends React.Component {
  constructor() {
    super();

    //Define state for value and suggestion collection
    this.state = {
      value: '',
      suggestions: []
    };
  }

  // Trigger suggestions
  getSuggestionValue = suggestion => suggestion.qra;

  // Render Each Option

  renderSuggestion = data => (
    <span className="sugg-option">
      <span className="icon-wrap">
        <Avatar
          round
          size={30}
          className="avatar"
          color="#0366d6"
          name={data.qra}
          src={data.avatarpic ? data.avatarpic : '/emptyprofile.png'}
        />
      </span>
      <span className="name">{' ' + data.name}</span>
    </span>
  );
  onSuggestionSelected(
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) {
    this.props.history.push('/' + suggestionValue);
  }
  // OnChange event handler
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Suggestion rerender when user types
  onSuggestionsFetchRequested = async ({ value }) => {
    if (process.env.REACT_APP_STAGE === 'production')
      window.gtag('event', 'qraNavBarSearch_WEBPRD', {
        event_category: 'qra',
        event_label: 'navBarSearch'
      });
    let result = [];

    const input = value.trim().toUpperCase();

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
      await API.get(apiName, path, myInit)
        .then(response => {
          if (response.body.error > 0) {
            console.error(response.body.message);
            this.setState({
              suggestions: []
            });
          } else {
            result = response.body.message;
            this.setState({
              suggestions: result
            });
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
          this.setState({
            suggestions: []
          });
        });
    }
  };

  // Triggered on clear
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  shouldRenderSuggestions(value) {
    return value.trim().length > 2;
  }
  render() {
    const { t } = this.props;
    const { value, suggestions } = this.state;

    // Option props
    const inputProps = {
      placeholder: t('navBar.searchCallsign'),
      value,
      onChange: this.onChange
    };

    // Adding AutoSuggest component
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        getSuggestionValue={this.getSuggestionValue}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(ServerAutoSuggest))
);
