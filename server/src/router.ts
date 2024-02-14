import { Router } from '../deps.ts';
import { routesDatabase } from './routes_database.ts';
import { routesPolicy } from './routes_policy.ts';

export const router = new Router();

export async function initializeRoutes(): Promise<void> {
	await routesDatabase(router);
	await routesPolicy(router);
}
