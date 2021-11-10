import React from 'react';
import * as PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  static propTypes = {
    fallback: PropTypes.node
  };

  static defaultProps = {
    fallback: <h1>Something went wrong.</h1>
  };

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log('Error caught');
    console.error(error);
    console.info(info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
