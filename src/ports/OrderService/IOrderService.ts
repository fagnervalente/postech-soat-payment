import { PaymentStatus } from "@ports/gateway/IPaymentStatusGateway";

export default interface IOrderService{
    updateOrderPaymentStatus(orderId: string, paymentStatus:PaymentStatus):Promise<any>;
}