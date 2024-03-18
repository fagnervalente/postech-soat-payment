export default interface IPaymentQueueOUT {
    publishStatus(message: Object): boolean;
    publishApproved(message: Object): boolean;
}