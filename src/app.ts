import "reflect-metadata";
import express from 'express';
import * as core from 'express-serve-static-core';
import HttpAdapter from './adapter/http/HttpAdapter';
import Messaging from './adapter/messaging/messaging';

export default class App {
	private server: core.Express = express();

	public async initializeAdapters(): Promise<void> {
		try {
			await this.initDrivenAdapters();
			await this.initDriverAdapters();
			this.server.disable('x-powered-by');
		} catch (error) {
			console.error('Error initializing adapters:', error);
		}
	}

	public getServer(): core.Express {
		return this.server;
	}

	private initDriverAdapters(): void {
		new HttpAdapter(this.server).initialize();
	}

	private async initDrivenAdapters(): Promise<void> {
		await Messaging.connect();
	}
}