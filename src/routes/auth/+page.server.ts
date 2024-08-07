import { signIn, signOut } from '$lib/server/auth';
// import { signIn, signOut } from '@auth/sveltekit/client';
import { userSchema, userUpdatePasswordSchema } from '$lib/zod-schema';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate, fail, actionResult } from 'sveltekit-superforms';
import { applyAction } from '$app/forms';
import { redirect } from '@sveltejs/kit';
// import { fail } from '@sveltejs/kit';
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
	// const signInForm = await superValidate(zod(signInSchema));
	const session = await locals.auth();
	if (!session) {
		// Redirect to the signin page
		throw redirect(303, '/auth/signIn');
	}
};

export const actions: Actions = {
	signOut: (event) => {
		console.log(`Actions.${event.request.method}(${event.route.id}).signOut`);
		return signOut(event);
	}
	// default: async ({ route }) => {
	// 	console.log(`${route.id}.Actions.default`);
	// }
} satisfies Actions;
