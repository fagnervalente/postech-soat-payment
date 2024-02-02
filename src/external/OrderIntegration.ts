import IOrderService from "@ports/OrderService/IOrderService";
import { PaymentStatus } from "@ports/gateway/IPaymentStatusGateway";

const orderServiceEndpoint = process.env.ORDER_SERVICE_ENDPOINT;

export default class OrderIntegration implements IOrderService {
    async updateOrderPaymentStatus(orderId: number, paymentStatus: PaymentStatus): Promise<any> {
        const url = `${orderServiceEndpoint}/order/paymentStatus/${orderId}`;

        const body = {
            status: paymentStatus
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            
            if (!response.ok) {
                throw new Error(`Error updating the order status: ${response.status} - ${response.statusText}`);
            }

        } catch (error) {
            throw new Error('Error making the request: ' + (error as Error).message);
        }
    }

}