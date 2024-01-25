export default class Payment {
    readonly orderId: number;
	readonly amount: number;
	readonly description: string;

	constructor(orderId:number, amount: number, description: string) {
        this.orderId = orderId;
		this.amount = amount;
		this.description = description;
	}
}