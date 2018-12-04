import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ErrorBoundary from './catch/ErrorBoundary';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ErrorBoundary><App /></ErrorBoundary>, document.getElementById('root'));

serviceWorker.register();
