import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { userSchema } from '$lib/zod-schema';
import { sendPasswordResetEmail } from '$lib/server/email/config';
// import prisma from '$lib/config/prisma';

const resetPasswordSchema = userSchema.pick({ email: true });

export const load = async (event) => {
	// const form = await superValidate(event, resetPasswordSchema);
	return {
		event
	};
};

// export const actions = {
// 	default: async (event) => {
// 		const form = await superValidate(event, resetPasswordSchema);
// 		//console.log(form);

// 		if (!form.valid) {
// 			return fail(400, {
// 				form
// 			});
// 		}

// 		//add user to db
// 		try {
// 			console.log('reset user password');
// 			const token = crypto.randomUUID();
// 			await prisma.authUser.update({
// 				where: {
// 					email: form.data.email
// 				},
// 				data: {
// 					token: token
// 				}
// 			});

// 			await sendPasswordResetEmail(form.data.email, token);
// 		} catch (e) {
// 			console.error(e);
// 			return setError(
// 				form,
// 				null,
// 				'The was a problem resetting your password. Please contact support if you need further help.'
// 			);
// 		}
// 		throw redirect(302, '/auth/password/reset/success');
// 		//		return { form };
// 	}
// };
