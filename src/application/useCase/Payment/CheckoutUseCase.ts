import IPaymentAPIIntegration from "@ports/PaymentAPI/IPaymentAPIIntegration";
import AbstractUseCase from "../AbstractUseCase";
import Payment from "@entities/Payment";
import InternalServerError from "src/domain/error/InternalServerError";

export default class CheckoutUseCase extends AbstractUseCase {
	private paymentApi: IPaymentAPIIntegration;

	constructor(paymentApi: IPaymentAPIIntegration) {
		super();
		this.paymentApi = paymentApi;
	}

	public async execute(payment: Payment): Promise<string|null> {
		this.validateOrderId(payment.orderId);
		this.validateAmount(payment.amount);
		
		if(this.hasErrors()) return null;

		try{
			return this.paymentApi.createCheckout(payment);
		} catch(error){
			this.setError(InternalServerError.create({message: 'Error connecting to payment platform'}));
			return null;
		}
	}

	private validateOrderId(orderId: number){
		if( !(orderId > 0) ) this.setError({message: 'Invalid order id'});
	}

	private validateAmount(amount: number){
		if( !(amount > 0) ) this.setError({message: 'Invalid amount'});
	}
}