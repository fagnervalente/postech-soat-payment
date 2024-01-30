import Payment from '../../src/domain/entities/Payment';
import IPaymentAPIIntegration from '../../src/ports/PaymentAPI/IPaymentAPIIntegration';

export default class MockedPaymentAPI implements IPaymentAPIIntegration {
	static mockedQrCodeData = 'mockedQrCodeData';
	static mockedPayment = {status:'approved'};

	getPaymentFromWebhookNotification(webhookNotification:any): Promise<any> {
		return new Promise((resolve)=>resolve(MockedPaymentAPI.mockedQrCodeData));
	}

	async createCheckout(payment: Payment): Promise<string>{
		return new Promise((resolve)=>{resolve(MockedPaymentAPI.mockedQrCodeData)});
	}
}