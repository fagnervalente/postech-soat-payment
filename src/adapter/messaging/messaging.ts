import 'dotenv/config';
import amqp from 'amqplib';
import ConnectionError from '@error/ConnectionError';
import PaymentQueueIN from './PaymentQueueIN';

let channel: any;
const paymentQueueIN = new PaymentQueueIN();

export default class Messaging {

    static async connect() {
        console.log('🕛 Connecting to RabbitMQ...')
        const connectOptions: amqp.Options.Connect = {
            hostname: process.env.RABBITMQ_HOST,
            username: process.env.RABBITMQ_USER,
            password: process.env.RABBITMQ_PASSWORD,
            port: process.env.RABBITMQ_PORT as number | undefined
        }
        try {
            const connection = await amqp.connect(connectOptions);
            channel = await connection.createChannel() as amqp.Channel;
            await channel.assertQueue(process.env.ORDER_QUEUE_NAME as string);
            await channel.assertQueue(process.env.PAYMENT_QUEUE_NAME as string);
            await channel.assertQueue(process.env.APPROVED_PAYMENT_QUEUE_NAME as string);
            paymentQueueIN.listen(channel);
            console.log('✅ Connected to RabbitMQ!');
        } catch (e) {
            console.error("❌ Error on connect RabbitMQ");
            throw ConnectionError.create({ message: "Error on connect with RabbitMQ", stack: e });
        }
    }

    static getChannel() {
        return channel;
    }
}