// import React from 'react';
// import { withRouter } from 'react-router-dom';

// class GoogleAnalytics extends React.Component {
//     componentWillUpdate ({ location, history }) {
//         const gtag = window.gtag;

//         if (location.pathname === this.props.location.pathname) {
//             // don't log identical link clicks (nav links likely)
//             return;
//         }

//         if (history.action === 'PUSH' &&
//             typeof(gtag) === 'function') {
//             gtag('config', 'G-H8G28LYKBY', {
//                 'page_title': document.title,
//                 'page_location': window.location.href,
//                 'page_path': location.pathname
//             });
//         }
//     }

//     render () {
//         return null;
//     }
// }

// export default withRouter(GoogleAnalytics);

// utils/GoogleAnalytics.js
import React, { Component } from "react";
import PropTypes from "prop-types";
// import ReactGA from "react-ga";
import { Route } from "react-router-dom";

class GoogleAnalytics extends Component {
  componentDidMount() {
    this.logPageChange(
      this.props.location.pathname,
      this.props.location.search
    );
  }

  componentDidUpdate({ location: prevLocation }) {
    const {
      location: { pathname, search }
    } = this.props;
    const isDifferentPathname = pathname !== prevLocation.pathname;
    const isDifferentSearch = search !== prevLocation.search;

    if (isDifferentPathname || isDifferentSearch) {
      this.logPageChange(pathname, search);
    }
  }

  logPageChange(pathname, search = "") {
    // const page = pathname + search;
    const { location } = window;

    window.gtag("config", "G-H8G28LYKBY", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname
    });
    // ReactGA.set({
    //     page,
    //     location: `${location.origin}${page}`,
    //     ...this.props.options
    // });
    // ReactGA.pageview(page);
  }

  render() {
    return null;
  }
}

GoogleAnalytics.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string
  }).isRequired,
  options: PropTypes.object
};

const RouteTracker = () => <Route component={GoogleAnalytics} />;

export default {
  GoogleAnalytics,
  RouteTracker
  // init
};
