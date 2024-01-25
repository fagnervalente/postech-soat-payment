import IError from "./IError";

export default class InternalServerError {
	public static create(error: any): IError {
		return {
			type: 'InternalServerError',
			message: error.message || 'An internal error occurred',
			stack: error.stack || ''
		} as IError;
	}
}