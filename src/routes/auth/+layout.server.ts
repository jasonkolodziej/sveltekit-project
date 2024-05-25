import { superValidate } from 'sveltekit-superforms';
import type { LayoutServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { userSchema } from '$lib/zod-schema';
const registerSchema = userSchema.pick({
	firstName: true,
	lastName: true,
	email: true,
	password: true,
	terms: true
});
const signInSchema = userSchema.pick({
	email: true,
	password: true
});
export const load: LayoutServerLoad = async ({
	cookies,
	isDataRequest,
	route,
	request,
	isSubRequest,
	locals: { user, auth },
	parent
}) => {
	console.debug(
		`AUTH>LayoutServerLoad.${request.method}(${route.id}) dataReq?:${isDataRequest} subreq?:${isSubRequest}`
	);
	const data = await parent();
	if (!data.session) {
		const regForm = await superValidate(zod(registerSchema));
		const signInForm = await superValidate(zod(signInSchema));
		// const profileForm = await superValidate(zod(userSchema));

		return {
			title: route.id.includes('register') ? 'Register' : 'Login',
			form: route.id.includes('register') ? regForm : signInForm,
			...data
		};
	}
	return {
		title: route.id.includes('register') ? 'Register' : 'Login',
		...data
	};
	// return await parent();
};
