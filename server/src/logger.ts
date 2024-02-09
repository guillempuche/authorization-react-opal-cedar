import { bold, Context, green, red, yellow } from '../deps.ts';

export const logger = async (ctx: Context, next: () => Promise<unknown>) => {
	await next();

	const { method, url, headers } = ctx.request;
	const { status } = ctx.response;

	const statusColor =
		status >= 200 && status < 300
			? green
			: status >= 300 && status < 400
			? yellow
			: red;

	const acceptHeader = `${bold('Accept')}: ${headers.get('accept') || 'N/A'}`;
	const contentTypeHeader = `${bold('Content-Type')}: "${
		headers.get('content-type') || 'N/A'
	}"`;
	const authorizationHeader = `${bold('Authorization')}: "${
		headers.get('authorization') || 'N/A'
	}"`;
	const userAgentHeader = `${bold('User-Agent')}: "${
		headers.get('user-agent') || 'N/A'
	}"`;

	const requestMessage = statusColor(
		`${bold(
			`REQUEST ${method} ${status} ${url}`
		)} -h ${acceptHeader} ${contentTypeHeader} ${authorizationHeader} ${userAgentHeader}`
	);
	const responseMessage = statusColor(
		`${bold(`REQUEST ${method} ${status} ${url}`)} -h ${
			ctx.response.headers
		} ${contentTypeHeader} ${authorizationHeader} ${userAgentHeader}`
	);

	console.log(requestMessage);
	// console.log(responseMessage);
};
