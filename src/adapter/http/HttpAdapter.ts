import express, { NextFunction, Request, Response, Router } from 'express';
import routes from './routes/main';
import * as core from 'express-serve-static-core';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger_output.json';
import InternalServerError from '../../domain/error/InternalServerError';

export default class HttpAdapter {
	constructor(readonly server: core.Express) {
		this.server = server;
	}

	public initialize(): void {
		this.setSwagger();
		this.setJsonMiddleware();
		this.setRoutes();
		this.setErrorHandler();
	}

	private setJsonMiddleware(): void {
		this.server.use(express.json());
	}

	private setErrorHandler(): void {
		this.server.use((err: any, req: Request, res: Response, next: NextFunction) => {
			const response = InternalServerError.create({
				message: err.message,
				stack: err.stack
			});

			return res.status(500).json(response);
		});
	}

	private setRoutes(): void {
		this.server.use(routes);
	}

	private setSwagger(): void {
		this.server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
	}
}