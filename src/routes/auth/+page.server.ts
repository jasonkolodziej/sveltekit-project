// +page.server.ts
import { lucia } from '$lib/server/lucia';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { userSchema } from '$lib/zod-schema';
// import type { LayoutServerLoad } from '../$types';

const signInSchema = userSchema.pick({
	email: true,
	password: true
});
export const load: PageServerLoad = async ({ cookies, isDataRequest, route, locals }) => {
	console.log(`${route.id}.PageServerLoad`);
	// if (!locals.user) {
	// 	// redirect('/login');
	// }
	// if (locals?.auth) {
	// const session = await locals.auth.validate();
	const sessionId = locals.session?.id ?? null;
	if (!sessionId) {
		throw redirect(302, '/auth/sign-in');
	}
	const verify = await lucia.validateSession(sessionId);
	const user = verify.user;
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
	// default: async (event: { locals: { user: any } }) => {
	default: async ({ locals: { user }, request, route }) => {
		console.log(`${route.id}.Actions.default`);
		if (!user) {
			throw fail(401);
		}
		// ...
	}
};
