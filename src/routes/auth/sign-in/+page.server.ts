import { fail, redirect, type Actions } from '@sveltejs/kit';
import { actionResult, setError, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { lucia } from '$lib/server/lucia';
import { userSchema } from '$lib/zod-schema';
import type { PageServerLoad } from './$types';

const signInSchema = userSchema.pick({
	email: true,
	password: true
});

export const load: PageServerLoad = async ({ request, locals, route }) => {
	console.log(`${route.id}.PageServerLoad.${request.method}`);
	// const session = await event.locals.auth.validate();
	// if (session) throw redirect(302, '/');
	return {
		form: await superValidate(zod(signInSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, route, cookies }) => {
		console.log(`${route.id}.Actions.default`);
		// const data = await request.formData();
		const form = await superValidate(request, zod(signInSchema));
		console.log(request, form);

		if (!form.valid) {
			return actionResult('error', { form });
			// return fail(400, {
			// 	form
			// });
		}

		//add user to db
		try {
			console.log('sign in user');
			const key = await auth.useKey('email', form.data.email.toLowerCase(), form.data.password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			event.locals.auth.setSession(session);
		} catch (e) {
			//TODO: need to return error message to client
			console.error(e);
			// email already in use
			//const { fieldErrors: errors } = e.flatten();
			return setError(form, null, 'The email or password is incorrect.');
		}

		return { form };
	}
};
