import * as React from "react";
import { connect } from "react-redux";
import { queryRandomQuote, postTwitter } from "./aQuoteMachine";
import './cQuoteMachine.css';



interface StateProps{
  quoteContent: string;
  quoteAuthor: string;
}

const mapStateToProps = (state: any): StateProps => {
  return{
    quoteContent: state.RandomQuote.randomQuoteContent,
    quoteAuthor: state.RandomQuote.randomQuoteAuthor,
  }
}

interface DispatchProps{
  queryRandomQuote: typeof queryRandomQuote;
  postTwitter: typeof postTwitter;
}

const mapDispatchToProps = (dispatch:any): DispatchProps => {
  return{
    queryRandomQuote: () => dispatch(queryRandomQuote()),
    postTwitter: ()=> dispatch(postTwitter()),
  }
}

interface Props extends StateProps, DispatchProps{
}

export class QuoteMachine extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    const { quoteContent, quoteAuthor, queryRandomQuote, postTwitter } = this.props;

    return (
        <div id="quote-machine-wrapper">
          <div className="container col-md-4 p-5" id="quote-box">
            <div className="text-center" id="text">
              <h3>{quoteContent}</h3>
            </div>
            <div className="text-right" id="author">
              <p>- {quoteAuthor}</p>
            </div>
            <div className="row">
              <a id="tweet-code" className="button" onClick={postTwitter} target="_blank" href=""><i className="fab fa-3x fa-twitter-square mx-4" /></a>
              <i className="fab fa-3x fa-facebook" />
              <input id="new-quote" type="button" onClick={queryRandomQuote} value="New quote" className="btn btn-primary ml-auto" />
            </div>
          </div>
          <div className="text-center my-2"><p>by Quyen</p></div>
        </div>
    );
  }

  componentDidMount() {
    this.props.queryRandomQuote();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteMachine);

