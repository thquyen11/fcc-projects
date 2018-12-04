import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {FCCProjects} from './containers/FCCProjects/cFCCProjects';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <FCCProjects />,
  document.querySelector('#page-wrapper') as HTMLElement
);
registerServiceWorker();
