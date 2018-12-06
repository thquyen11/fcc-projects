import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "../node_modules/redux-thunk";
import { RandomQuote } from "./containers/QuoteMachine/rQuoteMachine";
import { Markdown, Zoom } from "./containers/MarkdownPreviewer/rMarkdownPreviewer";
import {createStore,applyMiddleware,combineReducers} from "../node_modules/redux";
import { composeWithDevTools } from "../node_modules/redux-devtools-extension";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {FCCProjects} from './containers/FCCProjects/cFCCProjects';
import './index.css';
import registerServiceWorker from './registerServiceWorker';



const logger = createLogger();

const rootReducers = combineReducers({
  RandomQuote,
  Markdown,
  Zoom,
});

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
);

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={FCCProjects} />
    </Switch>
  </BrowserRouter>
  </Provider>,
  document.querySelector('#page-wrapper') as HTMLElement
);
registerServiceWorker();
