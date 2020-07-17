import * as Sentry from '@sentry/browser';
import React from 'react';
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    Sentry.withScope(scope => {
      Sentry.configureScope(function(scope) {
        scope.setExtra('ENV', process.env.REACT_APP_STAGE);
      });

      Sentry.captureException(error);
    });
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return null;
  }
}
