export default interface IPaymentQueueOUT {
    publishOnConfirmed(message: Object): boolean;
    publishOnCanceled(message: Object): boolean;
}