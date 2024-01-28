import PaymentAPIIntegration from "../../src/ports/PaymentAPI/IPaymentAPIIntegration";
import { IPaymentStatusGateway, PaymentStatus } from "../../src/ports/gateway/IPaymentStatusGateway";

export default class PaymentStatusGatewayWebhookMercadopago implements IPaymentStatusGateway{
    private _paymentAPIIntegration: PaymentAPIIntegration;
    private _webhookNotification: any;

    constructor(paymentAPIIntegration: PaymentAPIIntegration, webhookNotification: any){
        this._paymentAPIIntegration = paymentAPIIntegration;
        this._webhookNotification = webhookNotification;
    }

    async getStatus(): Promise<PaymentStatus | null> {
        const paymentData = await this._paymentAPIIntegration.getPaymentFromWebhookNotification(this._webhookNotification);
        if(paymentData) return PaymentStatus.APROVADO;
        return null;
    }
}