import { Router } from "express";
import HttpUtils from "../HttpUtils";
import PaymentAPIController from "@http/controllers/PaymentAPIController";

const paymentRoutes = HttpUtils.asyncRouterHandler(Router());

paymentRoutes.post('/payment/checkout', new PaymentAPIController().checkout);
paymentRoutes.post('/payment/webhook/:id', new PaymentAPIController().handlePaymentWebhook);

export default paymentRoutes;