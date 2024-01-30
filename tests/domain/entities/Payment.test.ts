import { test, expect } from 'vitest';
import Payment from '../../../src/domain/entities/Payment';

test("Creating Payment entity", () => {
    const orderId = 1;
    const amount = 2;
    const description = 'Batata frita';

    const createdPayment = new Payment(orderId, amount, description);
    expect(createdPayment.orderId).equals(orderId);
    expect(createdPayment.amount).equals(amount);
    expect(createdPayment.description).equals(description);
})