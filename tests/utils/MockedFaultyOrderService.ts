import fetch from "node-fetch";
import IOrderService from "../../src/ports/OrderService/IOrderService";
import { PaymentStatus } from "../../src/ports/gateway/IPaymentStatusGateway";

const orderServiceEndpoint = process.env.ORDER_SERVICE_ENDPOINT;

export default class MockedFaultyOrderService implements IOrderService {
    updateOrderPaymentStatus(orderId: string, paymentStatus: PaymentStatus): Promise<any> {
        throw new Error('Error while updating order status');
    }
}