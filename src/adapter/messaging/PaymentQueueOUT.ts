import 'dotenv/config';
import IPaymentQueueOUT from "@ports/OrderQueue/IPaymentQueueOUT";
import Messaging from "./messaging";

export default class PaymentQueueOUT implements IPaymentQueueOUT {
    publishOnCanceled(message: Object): boolean {
        return Messaging.getChannel().sendToQueue(process.env.CANCELED_PAYMENT_QUEUE_NAME as string, Buffer.from(JSON.stringify(message)));
    }
    publishOnConfirmed(message: Object): boolean {
        return Messaging.getChannel().sendToQueue(process.env.CONFIRMED_PAYMENT_QUEUE_NAME as string, Buffer.from(JSON.stringify(message)));
    }
}