import { CALCULATOR_INSERT_NUMBER, CALCULATOR_INSERT_OPERATOR, CALCULATOR_INSERT_EQUALS
    , CALCULATOR_INSERT_AC, CALCULATOR_INSERT_C, CALCULATOR_INSERT_ERROR } from "./constans";



export const dispatchInsertEquals=(calculated: number, toCalculate: any[], insertingNumber: string)=>{
   return{
        type: CALCULATOR_INSERT_EQUALS,
        payload: {
            calculated: calculated,
            toCalculate: toCalculate,
            insertingNumber: insertingNumber
    }
   }
}

export const insertNumber=(event: any)=>{
    const id = event.target.id;
    const idNumber = ["zero","one","two","three","four","five","six","seven","eight","nine","decimal"];
    const number = ["0","1","2","3","4","5","6","7","8","9","."];
    const operator = ["plus","minus","multiply","divide"];
    const AC = "clear";
    const C = "undo";

    if(idNumber.indexOf(id)!==-1){
        return{
            type: CALCULATOR_INSERT_NUMBER,
            payload: number[idNumber.indexOf(id)],
        }
    } else if(operator.indexOf(id)!==-1){
        return{
            type: CALCULATOR_INSERT_OPERATOR,
            payload: id,
        }
    } else if(id===AC){
        return{
            type: CALCULATOR_INSERT_AC,
            payload: id,
        }
    } else if(id===C){
        return{
            type: CALCULATOR_INSERT_C,
            payload: id,
        }
    }

    //catch unexpected 
    return {
        type: CALCULATOR_INSERT_ERROR,
        payload: "",
    }
}