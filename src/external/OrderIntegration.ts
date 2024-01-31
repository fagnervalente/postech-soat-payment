import IOrderService from "@ports/OrderService/IOrderService";
import { PaymentStatus } from "@ports/gateway/IPaymentStatusGateway";
import got from "got";

const processServiceEndpoint = process.env.PROCESS_SERVICE_ENDPOINT;

export default class OrderIntegration implements IOrderService {
    async updateOrderPaymentStatus(orderId: number, paymentStatus: PaymentStatus): Promise<any> {
        const url = `${processServiceEndpoint}/add/${orderId}`;

        try {
            const response = await got.post(url, { json: { status: paymentStatus } })

            if (response.statusCode !== 200) {
                throw new Error(`Error updating the order status: ${response.statusCode} - ${response.body}`);
            }

            console.log('Status do pedido atualizado com sucesso!');

        } catch (error) {
            throw new Error('Error making the request: ' + (error as Error).message);
        }
    }

}