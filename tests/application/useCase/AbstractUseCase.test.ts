import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import AbstractUseCase from '../../../src/application/useCase/AbstractUseCase';

describe("AbstractUseCase", () => {
    
    let abstractUseCase : AbstractUseCase;
    
    beforeEach(() => {
        abstractUseCase = new AbstractUseCase();
    })

    it("setErrors should return nothing if errors is not passed", () => {
        const result = abstractUseCase.setErrors(undefined);

        expect(result).toBeUndefined();
        expect(abstractUseCase.getErrors().length).toBe(0);
    })

    it("clearErrors", () => {
        abstractUseCase.clearErrors();
        expect(abstractUseCase.getErrors().length).toBe(0);
        abstractUseCase.setErrors([{ message: "test"}]);
        abstractUseCase.clearErrors();
        expect(abstractUseCase.getErrors().length).toBe(0);
    })
})