import { signIn, signOut } from '$lib/server/auth';
import { userSchema, userUpdatePasswordSchema } from '$lib/zod-schema';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
// import {superValidate} from ''

const signInSchema = userSchema.pick({
	email: true,
	password: true
});
const resetPasswordSchema = userSchema.pick({ email: true });
const registerSchema = userSchema.pick({
	firstName: true,
	lastName: true,
	email: true,
	password: true,
	terms: true
});

export const load: PageServerLoad = async ({
	request,
	params,
	locals,
	route,
	parent,
	isDataRequest,
	isSubRequest
}) => {
	console.log(
		`PageServerLoad.${request.method}(${route.id}) dataReq?:${isDataRequest} subreq?:${isSubRequest}`,
		params
	);
	const regForm = await superValidate(zod(registerSchema));
	// const signInForm = await superValidate(zod(signInSchema));
	// const data = await parent();
	return {
		regForm
		// data
	};
};

export const actions: Actions = {
	register: async ({ request, route }) => {
		console.log(`Actions.${request.method}(${route.id}).register`);
		const regForm = await superValidate(request, zod(registerSchema));

		console.log('register', regForm);

		if (!regForm.valid) return fail(400, { regForm });

		return message(regForm, { text: 'Form "register" posted successfully!' });
	}
} satisfies Actions;
