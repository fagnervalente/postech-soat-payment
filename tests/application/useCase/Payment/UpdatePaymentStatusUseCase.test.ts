import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import UpdatePaymentStatusUseCase from '../../../../src/application/useCase/Payment/UpdatePaymentStatusUseCase';
import MockedPaymentAPI from '../../../utils/MockedPaymentAPI';
import MockedPaymentStatusGateway from '../../../utils/MockedPaymentStatusGateway';
import MockedOrderService from '../../../utils/MockedOrderService';
import MockedFaultyOrderService from '../../../utils/MockedFaultyOrderService';
import MockedFaultyPaymentAPI from '../../../utils/MockedFaultyPaymentApi';

describe("CheckoutUseCase", () => {

    let mockedPaymentAPI = new MockedPaymentAPI();
    let mockedPaymentStatusGateway = new MockedPaymentStatusGateway(mockedPaymentAPI, MockedPaymentStatusGateway.mockWebhookNotification);
    let mockedOrderService = new MockedOrderService();

    let mockedFaultyPaymentAPI = new MockedFaultyPaymentAPI();
    let mockedFaultyPaymentStatusGateway = new MockedPaymentStatusGateway(mockedFaultyPaymentAPI, MockedPaymentStatusGateway.mockWebhookNotification);
    let mockedFaultyOrderService = new MockedFaultyOrderService();

    let updateStatusUseCase : UpdatePaymentStatusUseCase;

    beforeEach(()=>{
        updateStatusUseCase = new UpdatePaymentStatusUseCase(mockedOrderService);
    })

    it("Properly update payment status", async () => {
        //arange
        const orderId = 1;

        const executeSpy = vi.spyOn(updateStatusUseCase, 'execute');
        const validateOrderIdSpy = vi.spyOn(updateStatusUseCase as any, 'validateOrderId');
        const getPaymentFromNotificationSpy = vi.spyOn(mockedPaymentAPI, 'getPaymentFromWebhookNotification');
        const updateOrderStatusSpy = vi.spyOn(mockedOrderService, 'updateOrderPaymentStatus');

        //act
        await updateStatusUseCase.execute(orderId, mockedPaymentStatusGateway);
        
        //assert
        expect(executeSpy).toHaveBeenCalled();
        expect(validateOrderIdSpy).toHaveBeenCalledOnce();
        expect(getPaymentFromNotificationSpy).toHaveBeenCalledOnce();
        expect(updateOrderStatusSpy).toHaveBeenCalledOnce();
        expect(updateStatusUseCase.hasErrors()).toBeFalsy();

    });

    it("Return erros if orderId is missing", async () => {
        await (updateStatusUseCase as any).execute(null, mockedPaymentStatusGateway);

        expect(updateStatusUseCase.hasErrors()).toBeTruthy();
    });

    it("Return erros if orderId is not valid", async () => {
        const orderId = 0;

        await updateStatusUseCase.execute(orderId, mockedPaymentStatusGateway);

        expect(updateStatusUseCase.hasErrors()).toBeTruthy();
    });

    
    it("Return erros if payment platform fails to obtain payment data", async () => {
        //arange
        updateStatusUseCase = new UpdatePaymentStatusUseCase(mockedOrderService);
        const orderId = 1;

        const getPaymentFromNotificationSpy = vi.spyOn(mockedFaultyPaymentAPI, 'getPaymentFromWebhookNotification');

        //act
        await updateStatusUseCase.execute(orderId, mockedFaultyPaymentStatusGateway);

        //assert
        expect(getPaymentFromNotificationSpy).toBeCalled();
        expect(getPaymentFromNotificationSpy).Throw();
        expect(updateStatusUseCase.hasErrors()).toBeTruthy();
    })
    
    it("Return erros if order service fails to update status", async () => {
        //arange
        const updateStatusUseCase = new UpdatePaymentStatusUseCase(mockedFaultyOrderService);
        const orderId = 1;

        const updateOrderPaymentStatusSpy = vi.spyOn(mockedFaultyOrderService, 'updateOrderPaymentStatus');

        //act
        await updateStatusUseCase.execute(orderId, mockedPaymentStatusGateway);

        //assert
        expect(updateOrderPaymentStatusSpy).toBeCalled();
        expect(updateOrderPaymentStatusSpy).Throw();
        expect(updateStatusUseCase.hasErrors()).toBeTruthy();
    })
})