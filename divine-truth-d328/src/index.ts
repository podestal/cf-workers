/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Hono } from 'hono';

const app = new Hono();

// app.get('/', (c) => c.text('Hola!'));

// app.get('/', (c) => {
// 	return c.text('Hola!');
// });

app.get('/customers', c => {
	return c.html(`
		<html>
			<body>
				<h1>Customers</h1>
			</body>
		</html>
	`)
})

app.get('/customers/:id', c => {
	const id = c.req.param('id');
	return c.json({
		id: parseInt(id),
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1234567890',
	})
})

export default app;
