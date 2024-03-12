import { Request, Response } from "express";
import PaymentStatusGatewayWebhookMercadopago from "../../payment/PaymentStatusGatewayWebhookMercadopago";
import MercadopagoIntegration from "src/external/MercadopagoIntegration";
import PaymentController from "@controllers/PaymentController";
import OrderIntegration from "src/external/OrderIntegration";
import PaymentQueueOUT from "src/adapter/messaging/PaymentQueueOUT";

export default class PaymentAPIController{

    async checkout(req: Request, res: Response) {
		// #swagger.tags = ['Checkout']
		// #swagger.description = 'Endpoint que recebe requisições para criação de pagamentos.'
		const { orderId, amount, description } = req.body;
		const paymentAPIIntegration = new MercadopagoIntegration();

		PaymentController.checkout(orderId, amount, description, paymentAPIIntegration)
			.then((result: any) => {
				return res.status(201).json(result);
			})
			.catch((errors: any) => {
				return res.status(400).json(errors);
			});
	}

	async handlePaymentWebhook(req: Request, res: Response) {
		// #swagger.tags = ['Webhook']
		// #swagger.description = 'Endpoint que recebe as notificações de atualização de status de pagamento.'
		const orderId = Number(req.params.id);
		const webhookNotification = req.body;
		
		const paymentAPIIntegration = new MercadopagoIntegration();
		const paymentStatusGateway = new PaymentStatusGatewayWebhookMercadopago(paymentAPIIntegration, webhookNotification);
		const orderService = new OrderIntegration();
		const paymentQueueOUT = new PaymentQueueOUT();

		PaymentController.handlePaymentWebhook(orderId, paymentStatusGateway, orderService, paymentQueueOUT)
			.then(() => {
				/* #swagger.responses[200] = {
						schema: { $ref: "#/definitions/HandlePaymentWebhook" },
						description: 'Status do pagamento do pedido atualizado'
				} */
				return res.status(200).json();
			})
			.catch((errors: any) => {
				return res.status(400).json(errors);
			});
	}

}