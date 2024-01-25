import { PaymentStatus } from "@ports/gateway/IPaymentStatusGateway";

export default interface IOrderService{
    updateOrderPaymentStatus(orderId:number, paymentStatus:PaymentStatus):Promise<any>;
}