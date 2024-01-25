import IError from "./IError";

export default class ValidationError {
	public static create(error: any): IError {
		return {
			type: 'ValidationError',
			message: error.message || 'An validation error occurred'
		} as IError;
	}
}