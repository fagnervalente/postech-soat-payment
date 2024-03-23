import 'dotenv/config';
import IPaymentQueueOUT from "@ports/OrderQueue/IPaymentQueueOUT";
import Messaging from "./messaging";

export default class PaymentQueueOUT implements IPaymentQueueOUT {
    publishStatus(message: Object): boolean {
        return Messaging.getChannel().sendToQueue(process.env.PAYMENT_QUEUE_NAME as string, Buffer.from(JSON.stringify(message)));
    }
    publishApproved(message: Object): boolean {
        return Messaging.getChannel().sendToQueue(process.env.APPROVED_PAYMENT_QUEUE_NAME as string, Buffer.from(JSON.stringify(message)));
    }
}