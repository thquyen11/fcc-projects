import * as React from "react";
import { connect } from "react-redux";
// import {
//   createStore,
//   applyMiddleware,
//   combineReducers
// } from "../../../node_modules/redux";
// import { composeWithDevTools } from "../../../node_modules/redux-devtools-extension";
// import { Provider } from "react-redux";
// import { createLogger } from "redux-logger";
// import thunkMiddleware from "../../../node_modules/redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";
// import { RandomQuote } from "./rQuoteMachine";
import { queryRandomQuote } from "./aQuoteMachine";

// const logger = createLogger();
// const rootReducers = combineReducers({
//   RandomQuote
// });
// const store = createStore(
//   rootReducers,
//   composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
// );

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

interface Props {
  randomQuoteContent: string;
  randomQuoteAuthor: string;
  queryRandomQuote: typeof queryRandomQuote;
}

const mapStateToProps = (state: any) => {
  return {
    randomQuoteContent: state.randomQuote.randomQuoteContent,
    randomQuoteAuthor: state.randomQuote.randomQuoteAuthor
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    queryRandomQuote: () => dispatch(queryRandomQuote())
  };
};

export class QuoteMachine extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    // const {
    //   randomQuoteContent,
    //   randomQuoteAuthor,
    //   queryRandomQuote
    // } = this.props;

    return (
      <div>
        {/* <Provider store={store}> */}
        Hello
          {/* <div className="container col-md-4 p-5" id="quote-frame">
            <div className="" id="quote-box">
              <h3>{randomQuoteContent}</h3>
            </div>
            <div className="text-right" id="quote-author">
              <p>- {randomQuoteAuthor}</p>
            </div>
            <div className="row">
              <i className="fab fa-3x fa-twitter-square mx-4" />
              <i className="fab fa-3x fa-facebook" />
              <input
                type="button"
                onClick={queryRandomQuote}
                value="New quote"
                className="btn btn-primary ml-auto"
              />
            </div>
          </div>
          <div className="text-center my-2">
            <p>by Quyen</p>
          </div> */}
        {/* </Provider> */}
      </div>
    );
  }

  componentDidMount() {
    this.props.queryRandomQuote();
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteMachine);
