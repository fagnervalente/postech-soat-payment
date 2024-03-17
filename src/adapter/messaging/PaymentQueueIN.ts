import amqp from 'amqplib';
import IPaymentQueueIN from "@ports/OrderQueue/IPaymentQueueIN";
import PaymentController from "@controllers/PaymentController";
import MercadopagoIntegration from 'src/external/MercadopagoIntegration';

export default class PaymentQueueIN implements IPaymentQueueIN {
    async listen(channel: amqp.Channel): Promise<void> {
        channel.consume(process.env.ORDER_QUEUE_NAME as string, receiveOrder, { noAck: true });
    }
}

async function receiveOrder(msg: amqp.ConsumeMessage | null) {
    if (msg !== null) {
        try {
            const paymentAPIIntegration = new MercadopagoIntegration();
            const { orderId, amount, description } = JSON.parse(msg.content.toString());
            await PaymentController.checkout(orderId, amount, description, paymentAPIIntegration);
        } catch (e) {
            console.error(e);
        }
    } else {
        console.error('Consumer cancelled by server');
    }
}