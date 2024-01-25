import Payment from "@entities/Payment";

export default interface IPaymentAPIIntegration{
    getPaymentFromWebhookNotification(webhookNotification:any): Promise<any>;
    createCheckout(payment: Payment): Promise<string>;
}