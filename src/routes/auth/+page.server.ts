import { signIn, signOut } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, locals, route }) => {
	console.log(`${route.id}.PageServerLoad.from`);
	return {
		// session: await locals.auth()
	};
};

export const actions: Actions = {
	signOut: signOut,
	signIn: signIn,
	default: async ({ route }) => {
		console.log(`${route.id}.Actions.default`);
	}
} satisfies Actions;
