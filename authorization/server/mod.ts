import { Application, bold, yellow, oakCors, dotenv, Context } from './deps.ts';
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
			`^.+localhost:(${parseInt(env.PORT_FRONTEND)}|${parseInt(
				env.PORT_OPAL_SERVER
			)})$`
		),
		optionsSuccessStatus: 200,
	})
);

await initializeRoutes();

// Use the router
app.use(router.routes());

// Handle HTTP methods that are not explicitly defined in the Router
app.use(router.allowedMethods());

// Log that the server is ready
app.addEventListener('listen', ({ hostname, port, secure }) => {
	console.log(
		`${
			bold('🚀  Server started on ') +
			yellow(`${secure ? 'https' : 'http'}://${hostname}:${port}`)
		}`
	);
});

// Policy OPAL Server needs HTTPS connection (https://docs.opal.ac/tutorials/use_self_signed_certificates/ and https://docs.opal.ac/tutorials/configure_external_data_sources)
await app.listen({
	port: parseInt(env.PORT_SERVER),
	// Enable HTTPS
	secure: true,
	// SSL certificate for HTTPS
	certFile: './localhost.pem',
	// SSL key for HTTPS
	keyFile: './localhost-key.pem',
});

console.log(bold('Server finished'));
