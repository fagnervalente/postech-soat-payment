const swaggerAutoGen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/adapter/http/routes/*.{ts,js}'];

const doc = {
	info: {
		version: "1.0.0",
		title: "Postech - Payment",
		description: "Documentação sobre os endpoints fornecidos pela API."
	},
	host: "localhost:3000",
	basePath: "/",
	schemes: ['http', 'https'],
	consumes: ['application/json'],
	produces: ['application/json'],
	tags: [
		{
			"name": "Checkout",
			"description": "Endpoints"
		},
		{
			"name": "Webhook",
			"description": "Endpoints"
		},
		{
			"name": "HelthCheck",
			"description": "Endpoints"
		}
	],
	definitions: {
		Checkout: {
			$orderId: 1,
			$amount: 30.0,
			description: "Batata frita",
		},
		Webhook: {
			$orderId: 1,
			$notification: {
				data: {id: 2}
			},
		},
	}
}


swaggerAutoGen(outputFile, endpointsFiles, doc);