import AbstractUseCase from "../AbstractUseCase";
import IOrderService from "@ports/OrderService/IOrderService";
import { IPaymentStatusGateway, PaymentStatus } from "@ports/gateway/IPaymentStatusGateway";

export default class UpdatePaymentStatysUseCase extends AbstractUseCase {

	constructor(readonly orderService: IOrderService) {
		super();
		this.orderService = orderService;
	}

	async execute(orderId: number, paymentStatusGateway: IPaymentStatusGateway): Promise<void> {
        const status = await paymentStatusGateway.getStatus();
		
		this.validateOrderId(orderId);
        this.validateStatus(status);
		
		if (this.hasErrors()) return;

		try{
			this.orderService.updateOrderPaymentStatus(orderId, status as PaymentStatus);
		} catch(error){
			this.setError({message: 'An unexpected error occurred during status update'});
		}
	}

	private validateOrderId(orderId: number){
		if( !(orderId > 0) ) this.setError({message: 'Invalid order id'});
	}

	private async validateStatus(status: PaymentStatus | null) {
		if (status === null) this.setError({ message: "Invalid payment status" });
	}
}