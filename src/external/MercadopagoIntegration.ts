import Payment from "@entities/Payment";
import IPaymentAPIIntegration from "@ports/PaymentAPI/IPaymentAPIIntegration";

export default class MercadopagoIntegration implements IPaymentAPIIntegration {
	readonly paymentsEndpoint = 'https://api.mercadopago.com/v1/payments/';

	extractPaymentId(webhookNotification: any):number{
		return Number(webhookNotification.data?.id);
	}

	async getPaymentFromWebhookNotification(webhookNotification:any): Promise<any> {
		try {
			const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
			const paymentId = this.extractPaymentId(webhookNotification)
			const url = `${this.paymentsEndpoint}${paymentId}`;
			const headers = {
				Authorization: `Bearer ${accessToken}`
			};

			const response = await fetch(url, { headers });

			//Mock
			//const response = {ok:true, statusText:"Sucesso", json:()=>({status:'approved'})};

			if (!response.ok) {
				throw new Error(`Erro ao consultar pagamento: ${response.statusText}`);
			}

			const payment = await response.json();
			return payment;

		} catch (error) {
			throw new Error(`Erro ao consultar pagamento: ${error}`);
		}
	}

	async createCheckout(payment: Payment): Promise<string>{
		//Mock
		console.log('Criação do qrCode ainda não foi implementada');
		return 'mockedQrCodeData';
	}

}