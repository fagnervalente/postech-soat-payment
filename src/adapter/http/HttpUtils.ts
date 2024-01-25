import { NextFunction, Request, RequestHandler, Response, Router } from "express";

export default class HttpUtils {

	/**
	 * Aplica o asyncHandler nos recursos assíncronos do Router informado
	 *
	 * @param {Router} router
	 * @return {Router}
	 */
	public static asyncRouterHandler(router: any): Router {
		const methods: string[] = ['get', 'post', 'put', 'delete'];

		for (let key in router) {
			if (methods.includes(key)) {
				let method = router[key];
				router[key] = (path: string, ...callbacks: RequestHandler[]) => method.call(router, path, ...callbacks.map(cb => HttpUtils.asyncHandler(cb)));
			}
		}

		return router;
	}

	/**
	 * Trata rejeições / falhas de recursos assíncronos da API, encaminhando para error handler (HttpAdapter::setErrorHandler)
	 *
	 * @param {RequestHandler} fn
	 * @return {Function}
	 */
	private static asyncHandler(fn: RequestHandler): Function {
		return (req: Request, res: Response, next: NextFunction) => {
			return Promise
				.resolve(fn(req, res, next))
				.catch(next);
		};
	}
}