export type errorType = 'ValidationError' | 'InternalServerError';

export default interface IError {
	type?: errorType,
	message: string
}