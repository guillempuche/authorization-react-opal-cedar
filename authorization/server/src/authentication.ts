import { Context, Next } from '../deps.ts';

export async function userAuthentication(ctx: Context, next: Next) {
	const authHeader = ctx.request.headers.get('Authorization');
	if (!authHeader) {
		ctx.response.status = 401;
		ctx.response.body = { error: 'Unauthorized' };
		return;
	}

	const token = authHeader.split(' ')[1];
	if (!token) {
		ctx.response.status = 401;
		ctx.response.body = { error: 'Unauthorized' };
		return;
	}

	// Assuming the token is the user's ID.
	// In a real scenario, you'd typically decode and verify a JWT here.
	ctx.state.userId = token;

	await next();
}

export async function policyAuthentication(ctx: Context, next: Next) {
	const authHeader = ctx.request.headers.get('Authorization');

	// If you change the bearer token, also change it in the OPAL server configuration in Docker.
	if (!authHeader || authHeader !== 'Bearer FAKE-POLICY-SECRET') {
		ctx.response.status = 401;
		ctx.response.body = { error: 'Unauthorized' };
		return;
	}

	await next();
}
