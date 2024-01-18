import { Client, Router, dotenv } from '../deps.ts';
import { userAuthentication } from './authentication.ts';
import { ICreator, IQuote } from './types.ts';

export const routesDatabase = async (router: Router): Promise<void> => {
	// Load environment variables
	const env = await dotenv({ export: true });

	// Create a database connection
	const client = new Client({
		database: env.DB_NAME,
		hostname: env.DB_HOSTNAME,
		password: env.DB_PASSWORD,
		port: env.DB_PORT,
		user: env.DB_USERNAME,
	});

	await client.connect();

	// Route to get all quotes
	router.get('/quotes', userAuthentication, async (ctx) => {
		try {
			const userId = ctx.state.userId;
			const result = await client.queryObject<IQuote>`
			SELECT * FROM quotes 
			ORDER BY (creator = ${userId}) DESC, id;
    `;
			ctx.response.status = 200;
			ctx.response.body = result.rows;
		} catch (error) {
			ctx.response.status = 500;
			ctx.response.body = { error: 'Failed to fetch quotes' };
		}
	});

	// Route to create a quote
	router.post('/quotes', async (ctx) => {
		try {
			const body = await ctx.request.body().value;
			const { text, author, private: isPrivate, creator } = body;

			await client.queryObject<IQuote>`
    INSERT INTO quotes (text, author, private, creator) VALUES (${text}, ${author}, ${isPrivate}, ${creator});
`;
			ctx.response.status = 201;
			ctx.response.body = { message: 'Quote created successfully' };
		} catch (error) {
			ctx.response.status = 500;
			ctx.response.body = { error: 'Failed to create quote' };
		}
	});

	// Route to update a quote
	router.put('/quotes/:id', async (ctx) => {
		try {
			const id = ctx.params.id;
			const body = await ctx.request.body().value;
			const { text, author, private: isPrivate, creator } = body;

			await client.queryObject`
            UPDATE quotes SET text = ${text}, author = ${author}, private = ${isPrivate}, creator = ${creator} WHERE id = ${id};
        `;

			ctx.response.status = 200;
			ctx.response.body = { message: 'Quote updated successfully' };
		} catch (error) {
			ctx.response.status = 500;
			ctx.response.body = { error: 'Failed to update quote' };
		}
	});

	// Route to delete a quote
	router.delete('/quotes/:id', async (ctx) => {
		try {
			const id = ctx.params.id;

			await client.queryObject`
    DELETE FROM quotes WHERE id = ${id};
`;
			ctx.response.status = 200;
			ctx.response.body = { message: 'Quote deleted successfully' };
		} catch (error) {
			ctx.response.status = 500;
			ctx.response.body = { error: 'Failed to delete quote' };
		}
	});

	// Route to get creator data by id
	router.get('/creators/:id', async (ctx) => {
		try {
			const id = ctx.params.id;
			const result = await client.queryObject<ICreator>`
					SELECT * FROM creators WHERE id = ${id};
			`;

			if (result.rows.length === 0) {
				ctx.response.status = 404;
				ctx.response.body = { error: 'Creator not found' };
				return;
			}

			ctx.response.status = 200;
			ctx.response.body = result.rows[0];
		} catch (error) {
			ctx.response.status = 500;
			ctx.response.body = { error: 'Failed to fetch creator data' };
		}
	});
};
