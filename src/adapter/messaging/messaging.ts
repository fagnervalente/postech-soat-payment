import 'dotenv/config';
import amqp from 'amqplib';
import ConnectionError from '@error/ConnectionError';
import PaymentQueueIN from './PaymentQueueIN';

let channel: any;
const paymentQueueIN = new PaymentQueueIN();

export async function connectRabbitMQ() {
    console.log('🕛 Connecting to RabbitMQ...')
    const connectOptions: amqp.Options.Connect = {
        hostname: process.env.RABBITMQ_HOST,
        username: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASSWORD,
        port: process.env.RABBITMQ_PORT as number | undefined
    }
    try {
        const connection = await amqp.connect(connectOptions);
        console.log('✅ Connected to RabbitMQ!');
        channel = await connection.createChannel();
        await channel.assertQueue(process.env.ORDER_QUEUE_NAME as string);
        await channel.assertQueue(process.env.CONFIRMED_PAYMENT_QUEUE_NAME as string);
        await channel.assertQueue(process.env.CANCELED_PAYMENT_QUEUE_NAME as string);
    } catch (e) {
        console.log("❌ Error on connect RabbitMQ");
        throw ConnectionError.create({ message: "Error on connect with RabbitMQ", stack: e });
    }

    paymentQueueIN.listen(channel);
}

export default channel as amqp.Channel;