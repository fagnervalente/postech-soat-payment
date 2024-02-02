import PaymentStatusGatewayWebhookMercadopago from '../../src/adapter/payment/PaymentStatusGatewayWebhookMercadopago';
import PaymentAPIIntegration from '../../src/ports/PaymentAPI/IPaymentAPIIntegration';
import { PaymentStatus } from '../../src/ports/gateway/IPaymentStatusGateway';
import { test, expect, vi, describe } from 'vitest';

describe('PaymentStatusGatewayWebhookMercadopago', () => {
    // Mocks
    const mockPaymentAPIIntegration = {
        getPaymentFromWebhookNotification: async (webhookNotification: any) => {
            return { status: 'approved' };
        },
    } as PaymentAPIIntegration;

    const mockWebhookNotification = {data: {id:12345}};

    test('Return APROVADO for approved status', async () => {
        const paymentStatusGateway = new PaymentStatusGatewayWebhookMercadopago(mockPaymentAPIIntegration, mockWebhookNotification);
        const status = await paymentStatusGateway.getStatus();

        expect(status).toEqual(PaymentStatus.APROVADO);
    });

    test('Return AGUARDANDO for pending, authorized, in process, in mediation, or rejected status', async () => {
        const mockPaymentAPIIntegration = {
            getPaymentFromWebhookNotification: async (webhookNotification: any) => {
                return { status: 'pending' };
            },
        } as PaymentAPIIntegration;

        const paymentStatusGateway = new PaymentStatusGatewayWebhookMercadopago(mockPaymentAPIIntegration, mockWebhookNotification);
        const status = await paymentStatusGateway.getStatus();

        expect(status).toEqual(PaymentStatus.AGUARDANDO);
    });

    test('Return RECUSADO for cancelled, refunded, or charged back status', async () => {
        const mockPaymentAPIIntegration = {
            getPaymentFromWebhookNotification: async (webhookNotification: any) => {
                return { status: 'cancelled' };
            },
        } as PaymentAPIIntegration;

        const paymentStatusGateway = new PaymentStatusGatewayWebhookMercadopago(mockPaymentAPIIntegration, mockWebhookNotification);
        const status = await paymentStatusGateway.getStatus();

        expect(status).toEqual(PaymentStatus.RECUSADO);
    });

    test('Return null for unknown status', async () => {
        const mockPaymentAPIIntegration = {
            getPaymentFromWebhookNotification: async (webhookNotification: any) => {
                return { status: 'unknown' };
            },
        } as PaymentAPIIntegration;

        const paymentStatusGateway = new PaymentStatusGatewayWebhookMercadopago(mockPaymentAPIIntegration, mockWebhookNotification);
        const status = await paymentStatusGateway.getStatus();

        expect(status).toBeNull();
    });
});
