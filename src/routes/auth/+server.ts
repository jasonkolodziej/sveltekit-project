// +server.ts
import { lucia } from '$lib/server/lucia';
import type { RequestEvent } from '@sveltejs/kit';

export const GET = async (event: RequestEvent): Promise<Response> => {
	if (!event.locals.user) {
		return new Response(null, {
			status: 401
		});
	}
	// ...
	return new Response(null);
};
