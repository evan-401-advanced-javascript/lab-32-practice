import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import App from './app.js';

/**
 * class renders the App
 */
class Main extends React.Component {
  render() {
    return <App />;
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
