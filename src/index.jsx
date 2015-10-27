import React from 'react';
import ReactDOM from 'react-dom';

require('babel/polyfill');

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from 'containers/app/app';

require('style!css!../node_modules/normalize-css/normalize.css');
require('style!css!../node_modules/mdi/css/materialdesignicons.css');

ReactDOM.render((<App />), document.getElementById('app'));
