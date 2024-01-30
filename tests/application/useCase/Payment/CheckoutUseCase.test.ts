import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import CheckoutUseCase from '../../../../src/application/useCase/Payment/CheckoutUseCase';
import MockedPaymentAPI from '../../../utils/MockedPaymentAPI';
import MockedFaultyPaymentAPI from '../../../utils/MockedFaultyPaymentApi';

describe("CheckoutUseCase", () => {

    let mockedPaymentAPI = new MockedPaymentAPI();
    let mockedFaultyPaymentAPI = new MockedFaultyPaymentAPI();

    let checkoutUseCase : CheckoutUseCase;

    beforeEach(()=>{
        checkoutUseCase = new CheckoutUseCase(mockedPaymentAPI);
    })

    it("Properly checkout with valid Payment object", async () => {
        //arange
        const bodyPayment = {
            orderId: 1,
            amount: 2,
            description: 'Batata frita'
        };

        const executeSpy = vi.spyOn(checkoutUseCase, 'execute');
        const validateOrderIdSpy = vi.spyOn(checkoutUseCase as any, 'validateOrderId');
        const validateAmountSpy = vi.spyOn(checkoutUseCase as any, 'validateAmount');
        const createCheckoutSpy = vi.spyOn(mockedPaymentAPI, 'createCheckout');

        //act
        const createdQrCode = await checkoutUseCase.execute(bodyPayment);
        
        //assert
        expect(executeSpy).toHaveBeenCalled();
        expect(validateOrderIdSpy).toHaveBeenCalledOnce();
        expect(validateAmountSpy).toHaveBeenCalledOnce();
        expect(createCheckoutSpy).toHaveBeenCalledOnce();
        expect(createdQrCode).toMatchObject(MockedPaymentAPI.mockedQrCodeData);

    });

    it("Return erros if orderId is missing", async () => {
        const bodyPayment = {
            amount: 2,
            description: 'Batata frita'
        }

        await checkoutUseCase.execute(bodyPayment);

        expect(checkoutUseCase.hasErrors()).toBeTruthy();
    });

    it("Return erros if amount is missing", async () => {
        const bodyPayment = {
            orderId: 1,
            description: 'Batata frita'
        }

        await checkoutUseCase.execute(bodyPayment);

        expect(checkoutUseCase.hasErrors()).toBeTruthy();
    });

    it("Return erros if orderId is not valid", async () => {
        const bodyPayment = {
            orderId: 0,
            amount: 2,
            description: 'Batata frita'
        }

        await checkoutUseCase.execute(bodyPayment);

        expect(checkoutUseCase.hasErrors()).toBeTruthy();
    });

    it("Return erros if amount is not valid", async () => {
        const bodyPayment = {
            orderId: 1,
            amount: 0,
            description: 'Batata frita'
        }

        await checkoutUseCase.execute(bodyPayment);

        expect(checkoutUseCase.hasErrors()).toBeTruthy();
    });

    it("Return erros if payment platform fails", async () => {
        //arange
        checkoutUseCase = new CheckoutUseCase(mockedFaultyPaymentAPI);
        const bodyPayment = {
            orderId: 1,
            amount: 2,
            description: 'Batata frita'
        }

        const createCheckoutSpy = vi.spyOn(mockedFaultyPaymentAPI, 'createCheckout');

        //act
        await checkoutUseCase.execute(bodyPayment);

        //assert
        expect(createCheckoutSpy).toBeCalled();
        expect(createCheckoutSpy).Throw();
        expect(checkoutUseCase.hasErrors()).toBeTruthy();
    })
})