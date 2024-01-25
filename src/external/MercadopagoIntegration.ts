import fetch from "node-fetch";
import Payment from "@entities/Payment";
import IPaymentAPIIntegration from "../ports/PaymentAPI/IPaymentAPIIntegration";

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

export default class MercadopagoIntegration implements IPaymentAPIIntegration {
	extractPaymentId(webhookNotification: any):number{
		return Number(webhookNotification.data?.id);
	}

	async getPaymentFromWebhookNotification(webhookNotification:any): Promise<any> {
		try {
			const paymentId = this.extractPaymentId(webhookNotification)
			const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;
			const headers = {
				Authorization: `Bearer ${accessToken}`
			};

			const response = await fetch(url, { headers });

			if (!response.ok) {
				console.log(`Erro ao consultar pagamento: ${response.statusText}`);
				return null;
			}

			const payment = await response.json();
			return payment;

		} catch (error) {
			console.log(`Erro ao consultar pagamento`, error);
			return null;
		}
	}

	async createCheckout(payment: Payment): Promise<string>{
		//Mock
		console.log('Criação do qrCode ainda não foi implementada');
		return 'qrCodeData';
	}

}