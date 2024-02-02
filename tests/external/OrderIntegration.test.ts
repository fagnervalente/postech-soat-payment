import OrderIntegration from '../../src/external/OrderIntegration'; // Certifique-se de ajustar o caminho conforme necessário
import { PaymentStatus } from '../../src/ports/gateway/IPaymentStatusGateway';
import { test, expect, vi, describe, beforeEach, beforeAll, afterAll } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

describe('OrderIntegration', () => {
    const fetchMocker = createFetchMock(vi);


    beforeAll(()=>{
        fetchMocker.enableMocks();
    });

    beforeEach(()=>{
        fetchMocker.resetMocks();
    });

    afterAll(()=>{
        fetchMocker.dontMock();
    });


    test('Properly update status', async () => {
        const orderId = 1;
        const paymentStatus: PaymentStatus = PaymentStatus.APROVADO;
        const expectedUrl = `${process.env.PROCESS_SERVICE_ENDPOINT}/add/${orderId}`;
        const expectedBody = {
            status: paymentStatus
        };

        const orderIntegration = new OrderIntegration();

        await orderIntegration.updateOrderPaymentStatus(orderId, paymentStatus);

        expect(fetchMocker.requests().length).toEqual(1);
        expect(fetchMocker.requests()[0].url).toEqual(expectedUrl);
        expect(await fetchMocker.requests()[0].json()).toEqual(expectedBody);
    });

    test('Throw error if order service response is not ok', async () => {
        //arrange
        const orderId = 1;
        const paymentStatus: PaymentStatus = PaymentStatus.APROVADO;
        const orderIntegration = new OrderIntegration();

        fetchMocker.mockResponse('', {
            status: 500
        });

        await expect(orderIntegration.updateOrderPaymentStatus(orderId, paymentStatus)).rejects.toThrowError();
    });

    test('Throw error if request fails', async () => {
        //arrange
        const orderId = 1;
        const paymentStatus: PaymentStatus = PaymentStatus.APROVADO;
        const orderIntegration = new OrderIntegration();

        fetchMocker.mockReject(new Error('Not ok response'));

        await expect(orderIntegration.updateOrderPaymentStatus(orderId, paymentStatus)).rejects.toThrowError();
    });


});