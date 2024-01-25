import IOrderService from "@ports/OrderService/IOrderService";
import { PaymentStatus } from "@ports/gateway/IPaymentStatusGateway";

export default class OrderIntegration implements IOrderService{
    updateOrderPaymentStatus(orderId: number, paymentStatus: PaymentStatus): Promise<any> {
        throw new Error("Method not implemented.");
    }

}