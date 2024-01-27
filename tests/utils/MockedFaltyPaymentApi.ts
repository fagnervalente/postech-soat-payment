import Payment from '../../src/domain/entities/Payment';
import IPaymentAPIIntegration from '../../src/ports/PaymentAPI/IPaymentAPIIntegration';

export default class MockedFaltyPaymentApi implements IPaymentAPIIntegration{
    getPaymentFromWebhookNotification(webhookNotification: any): Promise<any> {
        throw new Error('Error while fetching payment from webhook notification');
    }

    createCheckout(payment: Payment): Promise<string> {
        throw new Error('Error while creating checkout');
    }
}