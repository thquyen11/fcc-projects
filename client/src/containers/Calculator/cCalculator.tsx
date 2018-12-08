import * as React from "react";
import { connect } from "react-redux";
import { Button } from "../../components/Calculator/Button";
import { insertNumber, dispatchInsertEquals } from "./aCalculator";
import "./cCalculator.scss";

interface StateProps {
  calculated: number;
  toCalculate: any[];
  insertingNumber: string;
}

const mapStateToProps = (state: any): StateProps => {
  return {
    calculated: state.Calculator.calculated,
    toCalculate: state.Calculator.toCalculate,
    insertingNumber: state.Calculator.insertingNumber
  };
};

interface DispatchProp {
  insertNumber: typeof insertNumber;
  dispatchInsertEquals: typeof dispatchInsertEquals;
}

const mapDispatchToProps = (dispatch: any): DispatchProp => {
  return {
    insertNumber: event => dispatch(insertNumber(event)),
    dispatchInsertEquals: (calculated, toCalculate, insertingNumber) => dispatch(dispatchInsertEquals(calculated, toCalculate, insertingNumber))
  };
};

interface ICalculator extends StateProps, DispatchProp {}

class Calculator extends React.Component<ICalculator> {
  constructor(props: ICalculator) {
    super(props);
  }

  render() {
    const insertEquals = (event: any) => {
      const id = event.target.id;
      const operator = ["plus", "minus", "multiply", "divide"];
      let toCalculate = this.props.toCalculate;
      let insertingNumber = this.props.insertingNumber;
      let calculated = this.props.calculated;

      toCalculate.push(Number(insertingNumber));
      insertingNumber = "";

      if (calculated === 0 && operator.indexOf(id) === -1) {
        //execute multiply, divide operator
        for (let i: number = 0; i < toCalculate.length; i++) {
          let temp = 0;

          if (toCalculate[i] === "multiply") {
            temp = toCalculate[i - 1].toCalculate[i + 1];
            toCalculate[i] = temp;
            toCalculate.splice(i - 1, 1);
            toCalculate.splice(i + 1, 1);
          i--;
          } else if (toCalculate[i] === "divide") {
            temp = toCalculate[i - 1] / toCalculate[i + 1];
            toCalculate[i] = temp;
            toCalculate.splice(i - 1, 1);
            toCalculate.splice(i + 1, 1);
          i--;
          }

        }

        //execute plus, minus operator
        for (let i: number = 0; i < toCalculate.length; i++) {
          let temp = 0;

          if (toCalculate[i] === "plus") {
            temp = toCalculate[i - 1] + toCalculate[i + 1];
            toCalculate[i] = temp;
            toCalculate.splice(i - 1, 1);
            toCalculate.splice(i + 1, 1);
          i--;
          } else if (toCalculate[i] === "minus") {
            temp = toCalculate[i - 1] - toCalculate[i + 1];
            toCalculate[i] = temp;
            toCalculate.splice(i - 1, 1);
            toCalculate.splice(i + 1, 1);
          i--;
          }
        }

        calculated = toCalculate[0];
      } else {
        toCalculate.unshift(calculated);

        //execute multiply, divide operator
        for (let i: number = 0; i < toCalculate.length; i++) {
          let temp = 0;

          if (toCalculate[i] === "multiply") {
            temp = toCalculate[i - 1].toCalculate[i + 1];
          } else if (toCalculate[i] === "divide") {
            temp = toCalculate[i - 1] / toCalculate[i + 1];
          }

          toCalculate[i] = temp;
          toCalculate.splice(i - 1, 1);
          toCalculate.splice(i + 1, 1);
          i--;
        }

        //execute plus, minus operator
        for (let i: number = 0; i < toCalculate.length; i++) {
          let temp = 0;

          if (toCalculate[i] === "plus") {
            temp = toCalculate[i - 1] + toCalculate[i + 1];
          } else if (toCalculate[i] === "minus") {
            temp = toCalculate[i - 1] - toCalculate[i + 1];
          }

          toCalculate[i] = temp;
          toCalculate.splice(i - 1, 1);
          toCalculate.splice(i + 1, 1);
          i--;
        }
        console.log(calculated);
        calculated = toCalculate[0];
      }
      toCalculate = [];

      this.props.dispatchInsertEquals(calculated, toCalculate, insertingNumber);
    };

    return (
      <div id="page-wrapper-calculator">
        <div className="container col-md-6" id="calculator">
          <div className="container col-12" id="display">
            <div className="row justify-content-end" id="display-formula">
              {this.props.calculated}
            </div>
            <div className="row justify-content-end" id="display-result">
              {this.props.insertingNumber}
            </div>
          </div>
          <div className="container col-12" id="keys">
            <div className="row">
              <Button value="AC" id="clear" onClick={this.props.insertNumber} />
              <Button value="C" id="undo" onClick={this.props.insertNumber} />
              <Button value="" id="" />
              <Button value="/" id="divide" onClick={this.props.insertNumber} />
            </div>
            <div className="row">
              <Button value="7" id="seven" onClick={this.props.insertNumber} />
              <Button value="8" id="eight" onClick={this.props.insertNumber} />
              <Button value="9" id="nine" onClick={this.props.insertNumber} />
              <Button
                value="x"
                id="multiply"
                onClick={this.props.insertNumber}
              />
            </div>
            <div className="row">
              <Button value="4" id="four" onClick={this.props.insertNumber} />
              <Button value="5" id="five" onClick={this.props.insertNumber} />
              <Button value="6" id="six" onClick={this.props.insertNumber} />
              <Button value="-" id="minus" onClick={this.props.insertNumber} />
            </div>
            <div className="row">
              <Button value="1" id="one" onClick={this.props.insertNumber} />
              <Button value="2" id="two" onClick={this.props.insertNumber} />
              <Button value="3" id="three" onClick={this.props.insertNumber} />
              <Button value="+" id="plus" onClick={this.props.insertNumber} />
            </div>
            <div className="row">
              <Button value="0" id="zero" onClick={this.props.insertNumber} />
              <Button
                value="."
                id="decimal"
                onClick={this.props.insertNumber}
              />
              <Button value="" id="" />
              <Button value="=" id="equals" onClick={insertEquals} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);
