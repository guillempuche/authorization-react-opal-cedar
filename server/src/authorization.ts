import { RouterMiddleware, Context, Next } from '../deps.ts';

// export const authorization: RouterMiddleware<string, Record<string, any>> = async (
export const authorization = async (ctx: Context, next: Next) => {
	const action = ctx.request.headers.get('action');
	const creator = ctx.request.headers.get('creator');
	const originalUrl = ctx.request.url.pathname;
	const body = await ctx.request.body().value;

	console.log('creator: ', creator);
	console.log('action: ', action);
	console.log('originalUrl: ', originalUrl);
	console.log('body: ', body);

	// Call the authorization service (Decision Point)
	const response = await fetch(
		'http://host.docker.internal:8180/v1/is_authorized',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				principal: `QuotesApp::Creator::\"${creator}\"`,
				action: `QuotesApp::Action::\"${action}\"`,
				context: body,
			}),
		}
	);

	const { decision } = await response.json();

	// If the decision is not 'Allow', return a 403
	if (decision !== 'Allow') {
		ctx.response.status = 403;
		ctx.response.body = 'Access Denied';

		console.log('Request denied 🚫');
		return;
	}
	console.log('Request authorized 👌');

	await next();
};
