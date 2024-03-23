export type errorType = 'ValidationError' | 'InternalServerError' | 'ConnectionError';

export default interface IError {
	type?: errorType,
	message: string,
	stack?: any
}