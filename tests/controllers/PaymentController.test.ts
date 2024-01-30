import { describe, it, test, expect, beforeEach, vi } from 'vitest';
import PaymentController from '../../src/controllers/PaymentController';
import MockedPaymentAPI from '../utils/MockedPaymentAPI';
import MockedFaultyPaymentApi from '../utils/MockedFaultyPaymentApi';
import MockedPaymentStatusGateway from '../utils/MockedPaymentStatusGateway';
import MockedOrderService from '../utils/MockedOrderService';
import MockedFaultyOrderService from '../utils/MockedFaultyOrderService';

let mockedPaymentAPI = new MockedPaymentAPI();
let mockedPaymentStatusGateway = new MockedPaymentStatusGateway(mockedPaymentAPI, MockedPaymentStatusGateway.mockWebhookNotification);
let mockedOrderService = new MockedOrderService();

let mockedFaultyPaymentAPI = new MockedFaultyPaymentApi();
let mockedFaultyPaymentStatusGateway = new MockedPaymentStatusGateway(mockedFaultyPaymentAPI, MockedPaymentStatusGateway.mockWebhookNotification);
let mockedFaultyOrderService = new MockedFaultyOrderService();

describe("CustomerController", () => {

    let mockedPaymentAPI = new MockedPaymentAPI();
    let mockedPaymentStatusGateway = new MockedPaymentStatusGateway(mockedPaymentAPI, MockedPaymentStatusGateway.mockWebhookNotification);
    let mockedOrderService = new MockedOrderService();
    
    let mockedFaultyPaymentAPI = new MockedFaultyPaymentApi();
    let mockedFaultyPaymentStatusGateway = new MockedPaymentStatusGateway(mockedFaultyPaymentAPI, MockedPaymentStatusGateway.mockWebhookNotification);
    let mockedFaultyOrderService = new MockedFaultyOrderService();

    let paymentController: PaymentController;

    const mockPaymentBody = {
        orderId: 1,
        amount: 2,
        description: 'Batata frita'
    };

    const invalidOrderId = 0;

    beforeEach(() => {
        //paymentController = new PaymentController()
    });

    describe("checkout", () => {
        it("Should return a qr code string", async () => {
            const response = await PaymentController.checkout(mockPaymentBody.orderId, mockPaymentBody.amount, mockPaymentBody.description, mockedPaymentAPI);
            expect(response.qrCode).toMatchObject(MockedPaymentAPI.mockedQrCodeData);
        })

        it("Should throw an error by using invalid orderId or amount", async () => {
            await expect(() => PaymentController.checkout(0, mockPaymentBody.amount, mockPaymentBody.description, mockedPaymentAPI)).rejects.toThrowError();
        })
    })

    describe("handlePaymentWebhook", () => {
        it("Should return a qr code string", async () => {
            //const response = await PaymentController.handlePaymentWebhook(mockPaymentBody.orderId, mockedPaymentStatusGateway, mockedOrderService);
            await expect(() => PaymentController.handlePaymentWebhook(mockPaymentBody.orderId, mockedPaymentStatusGateway, mockedOrderService)).not.Throw();
        })

        it("Should throw an error by using invalid orderId or amount", async () => {
            await expect(() => PaymentController.handlePaymentWebhook(0, mockedPaymentStatusGateway, mockedOrderService)).rejects.toThrowError();
        })
    })

    // describe("list", () => {
    //     it("Must return null", async () => {
    //         const result = await paymentController.list();
    //         expect(result).toBeNull();
    //     })
    // })

    // describe("getCustomerByCPF", () => {
    //     it("Should return an error", async () => {
    //         await expect(() => paymentController.getCustomerByCPF('')).rejects.toThrowError();
    //     })
    // })
})