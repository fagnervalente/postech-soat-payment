import IError from "./IError";

export default class ConnectionError {
	public static create(error: any): IError {
		return {
			type: 'ConnectionError',
			message: error.message || 'An connection error occurred',
			stack: error.stack || ''
		} as IError;
	}
}