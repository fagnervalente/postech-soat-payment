export default class Payment {
    readonly orderId: string;
	readonly amount: number;
	readonly description: string;

	constructor(orderId: string, amount: number, description: string) {
        this.orderId = orderId;
		this.amount = amount;
		this.description = description;
	}
}