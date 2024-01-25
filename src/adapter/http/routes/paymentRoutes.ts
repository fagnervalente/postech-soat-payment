import { Router } from "express";
import HttpUtils from "../HttpUtils";
import PaymentAPIController from "@http/controllers/PaymentAPIController";

const paymentRoutes = HttpUtils.asyncRouterHandler(Router());

paymentRoutes.post('/checkout', new PaymentAPIController().checkout);
paymentRoutes.post('/webhook/:id', new PaymentAPIController().handlePaymentWebhook);

export default paymentRoutes;