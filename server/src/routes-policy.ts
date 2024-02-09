import { Router, dotenv } from '../deps.ts';
import { policyAuthentication } from './authentication.ts';

export const routesPolicy = async (router: Router): Promise<void> => {
	// Load environment variables
	const env = await dotenv({ export: true });

	// Route to get policy configuration
	router.get('/policy-config', policyAuthentication, async (ctx) => {
		ctx.response.status = 200;
		ctx.response.headers.set('Content-Type', 'application/json');
		ctx.response.body = {
			external_source_url: `https://localhost:${env.PORT_SERVER}/policy`,
		};
	});
};
