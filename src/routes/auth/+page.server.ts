// +page.server.ts
import { lucia } from '$lib/server/lucia';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, isDataRequest, route, locals }) => {
	// if (!locals.user) {
	// 	// redirect('/login');
	// }
	// if (locals?.auth) {
	// const session = await locals.auth.validate();

	// const verify = await lucia.validateSession(locals.session?.id ?? '');
	const user = locals.user;

	// }
	if (verify) {
		locals.user = user;
	}
	if (route.id?.startsWith('/(protected)')) {
		if (!user) throw redirect(302, '/auth/sign-in');
		if (!user.verified) throw redirect(302, '/auth/verify/email');
	}
	// ...
};

export const actions: Actions = {
	default: async (event: { locals: { user: any } }) => {
		if (!event.locals.user) {
			throw fail(401);
		}
		// ...
	}
};
