import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { lucia } from '$lib/server/lucia';
import { userSchema } from '$lib/zod-schema';
import { zod } from 'sveltekit-superforms/adapters';
// import { sendVerificationEmail } from '$lib/config/email-messages';

const signUpSchema = userSchema.pick({
	firstName: true,
	lastName: true,
	email: true,
	password: true,
	terms: true
});

export const load = async ({ request, locals }) => {
	// const session = await locals.auth.validate();
	const session = locals.session;
	if (session) throw redirect(302, '/dashboard');
	return {
		form: await superValidate(zod(signUpSchema))
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(signUpSchema));
		//console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		//add user to db
		try {
			console.log('creating user');
			const token = crypto.randomUUID();

			const user = await user.createUser({
				key: {
					providerId: 'email',
					providerUserId: form.data.email.toLowerCase(),
					password: form.data.password
				},
				attributes: {
					email: form.data.email.toLowerCase(),
					firstName: form.data.firstName,
					lastName: form.data.lastName,
					role: 'USER',
					verified: false,
					receiveEmail: true,
					token: token
				}
			});

			await sendVerificationEmail(form.data.email, token);
			const session = await auth.createSession({ userId: user.userId, attributes: {} });
			event.locals.auth.setSession(session);
		} catch (e) {
			console.error(e);
			// email already in use
			//might be other type of error but this is most common and this is how lucia docs sets the error to duplicate user
			return setError(form, 'email', 'A user with that email already exists.');
		}

		return { form };
	}
};
