import MercadopagoIntegration from '../../src/external/MercadopagoIntegration';
import Payment from '../../src/domain/entities/Payment';
import { test, expect, vi, describe, beforeEach, beforeAll, afterAll } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

describe('MercadopagoIntegration', () => {
    const fetchMocker = createFetchMock(vi);
    const mockAccessToken = 'mockedAccessToken';
    const mockPaymentId = 12345;
    const mockWebhookNotification = {
        data: {
            id: mockPaymentId.toString(),
        },
    };

    beforeAll(()=>{
        fetchMocker.enableMocks();
        vi.stubEnv('MERCADOPAGO_ACCESS_TOKEN', mockAccessToken);
    });

    beforeEach(()=>{
        fetchMocker.resetMocks();
    });

    afterAll(()=>{
        fetchMocker.dontMock();
        vi.unstubAllEnvs();
    });

    test('Extract payment ID from webhook notification', () => {
        const mercadopagoIntegration = new MercadopagoIntegration();
        const extractedPaymentId = mercadopagoIntegration.extractPaymentId(mockWebhookNotification);
        expect(extractedPaymentId).toEqual(mockPaymentId);
    });

    test('Get payment from webhook notification', async () => {
        const mockPayment = { status: 'approved' };

        fetchMocker.mockResponse(JSON.stringify(mockPayment), {
            status: 200
        });

        const mercadopagoIntegration = new MercadopagoIntegration();
        const payment = await mercadopagoIntegration.getPaymentFromWebhookNotification(mockWebhookNotification);

        expect(fetchMocker.requests().length).toEqual(1);
        expect(fetchMocker.requests()[0].url).toEqual(`https://api.mercadopago.com/v1/payments/${mockPaymentId}`);
        expect(fetchMocker.requests()[0].headers.get('Authorization')).toEqual(`Bearer ${mockAccessToken}`);
        expect(payment).toEqual(mockPayment);
    });

    test('Throw Error if get payment request is not successful', async () => {
        fetchMocker.mockResponse('', {
            status: 500
        });

        const mercadopagoIntegration = new MercadopagoIntegration();
        await expect(mercadopagoIntegration.getPaymentFromWebhookNotification(mockWebhookNotification)).rejects.toThrowError();
    });

    test('Create checkout and return mocked QR code data', async () => {
        const mockPayment = new Payment(1, 2, '');

        const mercadopagoIntegration = new MercadopagoIntegration();
        const mockedQrCodeData = await mercadopagoIntegration.createCheckout(mockPayment);

        expect(mockedQrCodeData).toEqual('mockedQrCodeData');
    });
});
