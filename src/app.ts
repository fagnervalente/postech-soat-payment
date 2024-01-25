import "reflect-metadata";
import express from 'express';
import * as core from 'express-serve-static-core';
import HttpAdapter from './adapter/http/HttpAdapter';
import { AppDataSource } from "./adapter/database/data-source";



export default class App {
	private server: core.Express = express();

	public async initializeAdapters(): Promise<void> {
		try {
			await this.initDriverAdapters();
		} catch (error) {
			console.log('Error initializing adapters:', error);
		}
	}

	public getServer(): core.Express {
		return this.server;
	}

	private initDriverAdapters(): void {
		new HttpAdapter(this.server).initialize();
	}
}