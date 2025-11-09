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

app.get('/', (c) => {
	return c.text('Hola!');
});

app.get('/customers', c => {
	return c.json([{
		id: 1,
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1234567890',
		address: '123 Main St, Anytown, USA',
		city: 'Anytown',
		state: 'CA',
		zip: '12345',
		country: 'USA',
	}, {
		id: 2,
		name: 'Jane Doe',
		email: 'jane.doe@example.com',
		phone: '+1234567890',
		address: '123 Main St, Anytown, USA',
		city: 'Anytown',
		state: 'CA',
		zip: '12345',
		country: 'USA',
	}])
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
