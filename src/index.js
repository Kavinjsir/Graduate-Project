import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { updateState } from './reduce/reducer';

let store = createStore(updateState);

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
