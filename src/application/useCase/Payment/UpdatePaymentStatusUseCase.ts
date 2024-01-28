import AbstractUseCase from "../AbstractUseCase";
import IOrderService from "@ports/OrderService/IOrderService";
import { IPaymentStatusGateway, PaymentStatus } from "@ports/gateway/IPaymentStatusGateway";
import InternalServerError from "src/domain/error/InternalServerError";

export default class UpdatePaymentStatysUseCase extends AbstractUseCase {

	constructor(readonly orderService: IOrderService) {
		super();
		this.orderService = orderService;
	}

	async execute(orderId: number, paymentStatusGateway: IPaymentStatusGateway): Promise<void> {
		this.validateOrderId(orderId);
		if (this.hasErrors()) return;

		let status;
		try{
        	status = await paymentStatusGateway.getStatus();
		} catch (error){
			this.setError(InternalServerError.create({message: 'Error getting payment status from platform'}));
			return;
		}

		try{
			await this.orderService.updateOrderPaymentStatus(orderId, status as PaymentStatus);
		} catch(error){
			this.setError(InternalServerError.create({message: 'Cannot update order service'}));
		}
	}

	private validateOrderId(orderId: number){
		if( !(orderId > 0) ) this.setError({message: 'Invalid order id'});
	}
}