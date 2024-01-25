export interface IPaymentStatusGateway {
	getStatus(): Promise<PaymentStatus | null>;
}

export enum PaymentStatus {
    APROVADO = "Aprovado",
    RECUSADO = "Recusado",
    AGUARDANDO = "Aguardando pagamento"
}
