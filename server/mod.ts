import {
	Application,
	bold,
	yellow,
	oakCors,
	dotenv,
	Context,
	loggerB,
} from './deps.ts';
import { authorization } from './src/authorization.ts';
import { logger } from './src/logger.ts';
import { initializeRoutes, router } from './src/router.ts';

// Load environment variables
const env = await dotenv({ export: true });

const app = new Application();

// // Apply the authorization middleware to all routes
// router.use(authorization);

// app.use(logger.logger);
app.use(logger);

// Prevent CORS (Cross-Origin Resource Sharing) issues by allowing requests
// from the specified origin. This ensures secure communication.
app.use(
	oakCors({
		// Accept requests from the React app and the OPAL Client.
		origin: new RegExp(
			// `^.+localhost:(${parseInt(env.PORT_FRONTEND)}|${parseInt(
			// 	env.PORT_OPAL_SERVER
			// )})$`
			`^.+localhost:(${parseInt(Deno.env.get('PORT_FRONTEND')!)}|${parseInt(
				Deno.env.get('PORT_OPAL_SERVER')!
			)})$`
		),
		optionsSuccessStatus: 200,
	})
);

await initializeRoutes();

// app.use(loggerB());

// Use the router
app.use(router.routes());

// Handle HTTP methods that are not explicitly defined in the Router
app.use(router.allowedMethods());

// Log that the server is ready
app.addEventListener('listen', ({ hostname, port, secure }) => {
	console.log(
		`${bold('🚀 Server started on')} ${yellow(
			`${secure ? 'https' : 'http'}://${hostname}:${port}`
		)}`
	);
});

// Policy OPAL Server needs HTTPS connection (https://docs.opal.ac/tutorials/use_self_signed_certificates/ and https://docs.opal.ac/tutorials/configure_external_data_sources)
// await app.listen({
// 	port: parseInt(env.PORT_SERVER),
// 	// Enable HTTPS
// 	secure: true,
// 	// SSL certificate for HTTPS
// 	cert: await Deno.readTextFile('./localhsot.pem'),
// 	// SSL key for HTTPS
// 	key: await Deno.readTextFile('./localhost-key.pem'),
// });
await app.listen({
	// port: parseInt(env.PORT_SERVER),
	port: parseInt(Deno.env.get('PORT_SERVER')!),
	// // Enable HTTPS
	// secure: true,
	// // SSL certificate for HTTPS
	// // cert: './localhost.pem',
	// cert: await Deno.readTextFile('./localhost.pem'),
	// // SSL key for HTTPS
	// // key: './localhost-key.pem',
	// key: await Deno.readTextFile('./localhost-key.pem'),
});

console.log(bold('Server finished'));
