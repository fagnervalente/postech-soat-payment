import { describe, test, expect } from 'vitest';
import ValidationError from '../../../src/domain/error/ValidationError';
import InternalServerErrror from '../../../src/domain/error/InternalServerError';


describe("ValidationError", () => {

    test("Creating Validation Error with valid object", () => {
        const mockedGenericError = {
            message: "Generic Error Message"
        }

        const validationError = ValidationError.create(mockedGenericError);
        expect(validationError.message).equal(mockedGenericError.message);
    })

    test("Creating Validation Error with filled object", () => {
        const validationError = ValidationError.create({});
        expect(validationError.message).equal('An validation error occurred');
    })
})

describe("InternalServerError", () => {

    test("Creating InternalServerError with empty object", () => {
        const mockedGenericError = {
            message: "Generic Error Message",
            stack: 'Error stack'
        }

        const internalServerError = InternalServerErrror.create(mockedGenericError);
        expect(internalServerError.message).equal(mockedGenericError.message);
        expect(internalServerError.stack).equal(mockedGenericError.stack);
    })

    test("Creating InternalServerError with empty object", () => {
        const internalServerError = InternalServerErrror.create({});
        expect(internalServerError.message).equal('An internal error occurred');
        expect(internalServerError.stack).equal('');
    })
})

