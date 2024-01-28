import { When, Then } from "@cucumber/cucumber";
import assert from "assert";
import MockedPaymentAPI from "../../utils/MockedPaymentAPI";
import MockedFaltyPaymentAPI from "../../utils/MockedFaltyPaymentAPI";
import MockedOrderService from "../../utils/MockedOrderService";
import MockedFaltyOrderService from "../../utils/MockedFaltyOrderService";
import MockedPaymentStatusGateway from "../../utils/MockedPaymentStatusGateway";
import UpdatePaymentStatusUseCase  from "../../../src/application/useCase/Payment/UpdatePaymentStatusUseCase";
import { IPaymentStatusGateway } from "../../../src/ports/gateway/IPaymentStatusGateway";

let mockNotification: any;
let mockOrderId:number;
let paymentStatusGateway: IPaymentStatusGateway;
let updateStatusUseCase: UpdatePaymentStatusUseCase;


When('uma requisição é recebida pelo webhook contendo uma notificação e um id de pedido válidos', function () {
    mockNotification = {dados:{id: 1}};
    mockOrderId = 2;
});

When('o novo status do pagamento é obtido e informado ao serviço order', function () {
    paymentStatusGateway = new MockedPaymentStatusGateway(new MockedPaymentAPI(), mockNotification);
    updateStatusUseCase = new UpdatePaymentStatusUseCase(new MockedOrderService());
    updateStatusUseCase.execute(mockOrderId, paymentStatusGateway);
});

Then('a atualização de status de pagamento ocorre sem erros', function () {
    assert.strictEqual(updateStatusUseCase.hasErrors(), false);
});

When('uma requisição é recebida pelo webhook sem o parâmetro orderId ou ele é inválido', function () {
    mockNotification = {dados:{id: 1}};
    mockOrderId = 0;
    paymentStatusGateway = new MockedPaymentStatusGateway(new MockedPaymentAPI(), mockNotification);
    updateStatusUseCase = new UpdatePaymentStatusUseCase(new MockedOrderService());
    updateStatusUseCase.execute(mockOrderId, paymentStatusGateway);
});

When('ocorre um erro ao solicitar status à plataforma de pagamentos', function () {
    paymentStatusGateway = new MockedPaymentStatusGateway(new MockedFaltyPaymentAPI(), mockNotification);
    updateStatusUseCase = new UpdatePaymentStatusUseCase(new MockedOrderService());
    updateStatusUseCase.execute(mockOrderId, paymentStatusGateway);
});

When('ocorre um erro ao informar novo status ao serviço order', function () {
    paymentStatusGateway = new MockedPaymentStatusGateway(new MockedPaymentAPI(), mockNotification);
    updateStatusUseCase = new UpdatePaymentStatusUseCase(new MockedFaltyOrderService());
    updateStatusUseCase.execute(mockOrderId, paymentStatusGateway);
});

Then('a atualização de status resulta em erro com a mensagem {string}', function (string) {
    assert.strictEqual(updateStatusUseCase.hasErrors(), true);
    assert.deepStrictEqual(updateStatusUseCase.getErrors()[0].message, string);
});        