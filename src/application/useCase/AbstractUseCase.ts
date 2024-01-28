import IError from "../../domain/error/IError";
import ValidationError from "../../domain/error/ValidationError";

export default class AbstractUseCase {
	private errors: IError[] = [];

	constructor() {
		this.errors = [];
	}

	public hasErrors(): Boolean {
		return this.errors.length > 0;
	}

	public setError(error: IError): void {
		if (error.type) {
			this.errors.push(error);
			return;
		}

		this.errors.push(ValidationError.create(error));
	}

	public setErrors(errors: IError[] | void[] | undefined) {
		if (!errors) return;
		for (const error of errors) {
			this.setError(error!);
		}
	}

	public clearErrors(): void {
		this.errors = [];
	}

	public getErrors(): IError[] {
		const errors = this.errors;
		this.clearErrors();

		return errors;
	}
}