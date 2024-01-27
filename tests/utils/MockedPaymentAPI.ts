import Payment from '../../src/domain/entities/Payment';
import IPaymentAPIIntegration from '../../src/ports/PaymentAPI/IPaymentAPIIntegration';

export default class MockedPaymentAPI implements IPaymentAPIIntegration {
	getPaymentFromWebhookNotification(webhookNotification:any): Promise<any> {
		return new Promise((resolve)=>resolve({status:'approved'}));
	}

	async createCheckout(payment: Payment): Promise<string>{
		return new Promise((resolve)=>{resolve('mockedQrCodeData')});
	}
}