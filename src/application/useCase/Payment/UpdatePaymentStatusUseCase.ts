import AbstractUseCase from "../AbstractUseCase";
import IOrderService from "@ports/OrderService/IOrderService";
import { IPaymentStatusGateway, PaymentStatus } from "@ports/gateway/IPaymentStatusGateway";
import InternalServerError from "src/domain/error/InternalServerError";
import IPaymentQueueOUT from '../../../ports/OrderQueue/IPaymentQueueOUT';

export default class UpdatePaymentStatusUseCase extends AbstractUseCase {

	constructor(readonly orderService: IOrderService) {
		super();
		this.orderService = orderService;
	}

	async execute(orderId: string, paymentStatusGateway: IPaymentStatusGateway, paymentQueueOUT: IPaymentQueueOUT): Promise<void> {
		this.validateOrderId(orderId);
		if (this.hasErrors()) return;

		let status;
		try{
        	status = PaymentStatus.APROVADO; //mocked // await paymentStatusGateway.getStatus() as PaymentStatus;
		} catch (error){
			this.setError(InternalServerError.create({message: 'Error getting payment status from platform'}));
			return;
		}

		try {
			if (status == PaymentStatus.APROVADO) {
				paymentQueueOUT.publishOnConfirmed({ orderId });
			} else if (status === PaymentStatus.RECUSADO) {
				paymentQueueOUT.publishOnCanceled({ orderId });
			}
		} catch(error) {
			console.error(error);
			this.setError(InternalServerError.create({message: 'Cannot post payment status on the queue'}));
		}
	}

	private validateOrderId(orderId: string){
		if( !orderId ) this.setError({message: 'Invalid order id'});
	}
}