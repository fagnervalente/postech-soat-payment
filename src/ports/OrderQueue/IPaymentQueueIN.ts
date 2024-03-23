import amqp from 'amqplib';
export default interface IPaymentQueueIN {
    listen(channel: amqp.Channel): void;
}