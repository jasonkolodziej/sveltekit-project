import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { userUpdatePasswordSchema } from '$lib/zod-schema';
import { lucia } from '$lib/server/lucia';
import { zod } from 'sveltekit-superforms/adapters';
// import prisma from '$lib/config/prisma';

export const load = async ({ request }) => {
	const form = await superValidate(zod(userUpdatePasswordSchema));
	return {
		form
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(userUpdatePasswordSchema));
		//console.log(form);

		if (!form.valid) {
			return setError(
				form,
				'There was a logging in. Please contact support if you need further help.',
				{ status: 400 }
			);
			// return fail(400, {
			// 	form
			// });
		}

		//add user to db
		try {
			const token = event.params.token as string;
			console.log('update user password');
			const newToken = crypto.randomUUID();
			//get email from token
			const user = await prisma.authUser.findUnique({
				where: {
					token: token
				}
			});

			if (user?.email) {
				await auth.updateKeyPassword('email', user.email, form.data.password);
				// need to update with new token because token is also used for verification
				// and needs a new verification token in case user has not verified their account
				// and already forgot their password before verifying. Now they can get a new one resent.
				// await prisma.authUser.update({
				// 	where: {
				// 		token: token
				// 	},
				// 	data: {
				// 		token: newToken
				// 	}
				// });
			} else {
				return setError(
					form,
					null,
					'Email address not found for this token. Please contact support if you need further help.'
				);
			}
		} catch (e) {
			console.error(e);
			return setError(
				form,
				null,
				'The was a problem resetting your password. Please contact support if you need further help.'
			);
		}
		const token = event.params.token as string;
		throw redirect(302, `/auth/password/update-${token}/success`);
		//		return { form };
	}
};
