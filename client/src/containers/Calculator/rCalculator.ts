import { CALCULATOR_INSERT_NUMBER, CALCULATOR_INSERT_OPERATOR, CALCULATOR_INSERT_EQUALS
    , CALCULATOR_INSERT_AC, CALCULATOR_INSERT_C, CALCULATOR_INSERT_ERROR } from "./constans";



const initialCalculator={
    calculated: 0 as number,
    toCalculate: [] as any[],
    insertingNumber: "0",
}

export const Calculator = (state=initialCalculator, action:any={})=>{

    switch(action.type){
        case CALCULATOR_INSERT_NUMBER:
            return Object.assign({}, state, { insertingNumber: state.insertingNumber + action.payload })

        case CALCULATOR_INSERT_OPERATOR:
            const elementToAdd:any[] = state.toCalculate;
            elementToAdd.push(Number(state.insertingNumber));
            elementToAdd.push(action.payload);
            return Object.assign({}, state, { toCalculate: [...elementToAdd], insertingNumber: "" })

        case CALCULATOR_INSERT_EQUALS:
            return Object.assign({}, state, { calculated: action.payload.calculated, toCalculate: action.payload.toCalculate, insertingNumber: action.payload.insertingNumber })

        case CALCULATOR_INSERT_AC:
            return Object.assign({}, state, { calculated: 0, toCalculate: [], insertingNumber: "0" })

        case CALCULATOR_INSERT_C:
            return Object.assign({}, state, { insertingNumber: "" })

        case CALCULATOR_INSERT_ERROR:
            return Object.assign({}, initialCalculator)

        default:
            return state;
    }
}