const CALCULATOR_STATES = {
    INITIAL: 1,
    NEXT_NUMBER_ENTERED: 2,
    STORED_NUMBER_AND_OPERATOR_ENTERED: 3,
    STORED_NUMBER_AND_OPERATOR_AND_NEXT_NUMBER_ENTERED: 4,
    SHOW_ERROR: 5
}

export const OPERATIONS = {
    MULTIPLICATION: '*',
    DIVISION: '/',
    ADDITION: '+',
    SUBTRACTION: '-',
    NONE_SPECIFIED: 'derp'
}

export class Calculator {
    
    _calculatorState = CALCULATOR_STATES.INITIAL;

    _storedNumber = 0;
    _operation = OPERATIONS.NONE_SPECIFIED;
    _nextNumber = 0;

    
    get displayText() {
        switch (this._calculatorState) {
            case CALCULATOR_STATES.INITIAL:
                return '';
            case CALCULATOR_STATES.NEXT_NUMBER_ENTERED:
                return `${this._nextNumber}`;
            case CALCULATOR_STATES.STORED_NUMBER_AND_OPERATOR_ENTERED:
                return `${this._storedNumber} ${this._operation}`;
            case CALCULATOR_STATES.STORED_NUMBER_AND_OPERATOR_AND_NEXT_NUMBER_ENTERED:
                return `${this._storedNumber} ${this._operation} ${this._nextNumber}`;
            case CALCULATOR_STATES.SHOW_ERROR:
                return 'ERROR';
        }
    }

    pressDigit(digit) {
        switch (this._calculatorState) {
            case CALCULATOR_STATES.INITIAL:
            case CALCULATOR_STATES.SHOW_ERROR:
                this._nextNumber = digit;
                this._calculatorState = CALCULATOR_STATES.NEXT_NUMBER_ENTERED;
                break;
            case CALCULATOR_STATES.STORED_NUMBER_AND_OPERATOR_ENTERED:
                this._nextNumber = digit;
                this._calculatorState = CALCULATOR_STATES.STORED_NUMBER_AND_OPERATOR_AND_NEXT_NUMBER_ENTERED;
                break;
            case CALCULATOR_STATES.NEXT_NUMBER_ENTERED:
            case CALCULATOR_STATES.STORED_NUMBER_AND_OPERATOR_AND_NEXT_NUMBER_ENTERED:
                this._nextNumber = 10 * this._nextNumber + digit;
                break;
        }
    }

    pressOperation(operation) {
        switch (this._calculatorState) {
            case CALCULATOR_STATES.INITIAL:
                this._calculatorState = CALCULATOR_STATES.SHOW_ERROR
                break;
            case CALCULATOR_STATES.NEXT_NUMBER_ENTERED:
                this._storedNumber = this._nextNumber;
                this._operation = operation;
                this._calculatorState = CALCULATOR_STATES.STORED_NUMBER_AND_OPERATOR_ENTERED;
                break;
            case CALCULATOR_STATES.STORED_NUMBER_AND_OPERATOR_ENTERED:
                this._calculatorState = CALCULATOR_STATES.SHOW_ERROR;
                break;
            case CALCULATOR_STATES.STORED_NUMBER_AND_OPERATOR_AND_NEXT_NUMBER_ENTERED:
                const success = this._performOperation();
                if(success) {
                    this._operation = operation;
                    this._calculatorState = CALCULATOR_STATES.STORED_NUMBER_AND_OPERATOR_ENTERED;
                } else {
                    this._calculatorState = CALCULATOR_STATES.SHOW_ERROR;
                }
                break;
        }
    }

    equals() {
        switch (this._calculatorState) {
            case CALCULATOR_STATES.INITIAL:
            case CALCULATOR_STATES.STORED_NUMBER_AND_OPERATOR_ENTERED:
                this._calculatorState = CALCULATOR_STATES.SHOW_ERROR;
                break;
            case CALCULATOR_STATES.STORED_NUMBER_AND_OPERATOR_AND_NEXT_NUMBER_ENTERED:
                const success = this._performOperation();
                if(success) {
                    this._nextNumber = this._storedNumber;
                    this._calculatorState =  CALCULATOR_STATES.NEXT_NUMBER_ENTERED;
                } else {
                    this._calculatorState = CALCULATOR_STATES.SHOW_ERROR;
                }
                break;
        }
    }

    reset() {
        this._storedNumber = 0;
        this._operation = OPERATIONS.NONE_SPECIFIED;
        this._nextNumber = 0;
        this._calculatorState = CALCULATOR_STATES.INITIAL;
    }

    _performOperation() {
        let success = true;

        switch (this._operation) {
            case OPERATIONS.ADDITION:
                this._add();
                break;
            case OPERATIONS.SUBTRACTION:
                this._subtract();
                break;
            case OPERATIONS.MULTIPLICATION:
                this._multiply();
                break;
            case OPERATIONS.DIVISION:
                success = this._divide();
                break;
        }

        return success;
    }

    _add() {
        this._storedNumber += this._nextNumber
    }

    _subtract() {
        this._storedNumber -= this._nextNumber
    }

    _multiply() {
        this._storedNumber *= this._nextNumber
    }

    _divide() {
        if(this._nextNumber === 0) {
            return false;
        }

        this._storedNumber /= this._nextNumber
        return true;
    }

    _finishOperation() {
        this._nextNumber = this._storedNumber;
        this._calculatorState = CALCULATOR_STATES.NEXT_NUMBER_ENTERED;
        this._operation = OPERATIONS.NONE_SPECIFIED;
    }
}