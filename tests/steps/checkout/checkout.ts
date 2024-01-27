import { When, Then } from "@cucumber/cucumber";
import assert from "assert";
import Payment from "../../../src/domain/entities/Payment";
import CheckoutUseCase from "../../../src/application/useCase/Payment/CheckoutUseCase";
import MockedPaymentAPI from "../../utils/MockedPaymentAPI";
import MockedFaltyPaymentAPI from "../../utils/MockedFaltyPaymentAPI";

let createCheckout:CheckoutUseCase;
let mockPayment:Payment;
let qrCode:string|null;

When('uma requisição de checkout é recebida com orderId e amount válidos', async function () {
    mockPayment = new Payment(1, 2, 'Batata frita');
    createCheckout = new CheckoutUseCase(new MockedPaymentAPI());
    qrCode = await createCheckout.execute(mockPayment);
});

Then('os dados do qr code de pagamento são retornados', function () {
    assert.strictEqual(typeof qrCode, 'string');
});


When('uma requisição de checkout é recebida sem o parâmetro orderId ou ele é inválido', async function () {
    mockPayment = new Payment(0, 2, 'Batata frita');
    createCheckout = new CheckoutUseCase(new MockedPaymentAPI());
    qrCode = await createCheckout.execute(mockPayment);
});

When('uma requisição de checkout é recebida sem o parâmetro amount ou ele é inválido', async function () {
    mockPayment = new Payment(1, -1, 'Batata frita');
    createCheckout = new CheckoutUseCase(new MockedPaymentAPI());
    qrCode = await createCheckout.execute(mockPayment);
});

When('uma requisição de checkout é recebida', function () {
    mockPayment = new Payment(1, -1, 'Batata frita');
});
       
When('a comunicação com a plataforma de pagamentos resulta em erro', async function () {
    createCheckout = new CheckoutUseCase(new MockedFaltyPaymentAPI());
    qrCode = await createCheckout.execute(mockPayment);
});

Then('deve ocorrer um erro com a mensagem {string}', function (string) {
    assert.strictEqual(createCheckout.hasErrors(), true);
    assert.deepStrictEqual(createCheckout.getErrors()[0].message, string);
});
