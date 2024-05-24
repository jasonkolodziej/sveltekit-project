import { lucia } from '$lib/server/lucia';
import { redirect, type Actions } from '@sveltejs/kit';

// export const actions = {
// 	default: async ({ locals }) => {
// 		const session = await locals.auth.validate();
// 		if (!session) {
// 			throw redirect(302, '/auth/sign-in');
// 		}
// 		await auth.invalidateSession(session.sessionId); // invalidate session
// 		locals.lucia.setSession(null); // remove cookie
// 		throw redirect(302, '/auth/sign-in');
// 	}
// };

export const actions: Actions = {
	default: async ({ locals }) => {
		const sessionId = locals.session?.id ?? null;
		// const session = await lucia.validateSession()
		if (!sessionId) {
			throw redirect(302, '/auth/sign-in');
		}
		await lucia.invalidateSession(sessionId); // * invalidate session
		// lucia.readSessionCookie()
		throw redirect(302, '/auth/sign-in');
		// ...
	}
};
