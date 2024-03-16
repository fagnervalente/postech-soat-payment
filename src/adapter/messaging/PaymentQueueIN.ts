import amqp from 'amqplib';
import IPaymentQueueIN from "@ports/OrderQueue/IPaymentQueueIN";
import PaymentController from "@controllers/PaymentController";
import MercadopagoIntegration from 'src/external/MercadopagoIntegration';

export default class PaymentQueueIN implements IPaymentQueueIN {
    async listen(channel: amqp.Channel): Promise<void> {
        channel.consume(process.env.ORDER_QUEUE_NAME as string, receiveOrder);
    }
}

async function receiveOrder(msg: amqp.ConsumeMessage | null) {
    if (msg !== null) {
        try {
            const paymentAPIIntegration = new MercadopagoIntegration();
            const messageString = msg.content.toString('utf-8');
            console.log("messageString", messageString);
            const messageObj = JSON.parse(messageString);
            console.log("Queue - Message received", messageObj);
            console.log(messageObj.orderId, messageObj.amount, messageObj.description);
            const result = await PaymentController.checkout(messageObj.orderId, messageObj.amount, messageObj.description, paymentAPIIntegration);
        } catch (e) {
            console.error(e);
        }
    } else {
        console.error('Consumer cancelled by server');
    }
}