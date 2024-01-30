import UpdatePaymentStatusUseCase from "../application/useCase/Payment/UpdatePaymentStatusUseCase";
import IPaymentAPIIntegration from "@ports/PaymentAPI/IPaymentAPIIntegration";
import Payment from "@entities/Payment";
import CheckoutUseCase from "../application/useCase/Payment/CheckoutUseCase";
import { IPaymentStatusGateway } from "@ports/gateway/IPaymentStatusGateway";
import IOrderService from "@ports/OrderService/IOrderService";

export default class PaymentController {
	static async checkout(orderId: number, amount: number, description: string, paymentApi: IPaymentAPIIntegration) {
		const checkoutUseCase = new CheckoutUseCase(paymentApi);
		const result = await checkoutUseCase.execute({ orderId, amount, description } as Payment);

		if (checkoutUseCase.hasErrors()) throw checkoutUseCase.getErrors();

		return { qrCode: result };
	}

	static async handlePaymentWebhook(orderId: number, paymentStatusGateway: IPaymentStatusGateway, orderService: IOrderService) {
		const updatePaymentStatus = new UpdatePaymentStatusUseCase(orderService);

		await updatePaymentStatus.execute(orderId, paymentStatusGateway);

		if (updatePaymentStatus.hasErrors()) throw updatePaymentStatus.getErrors();
	}
}