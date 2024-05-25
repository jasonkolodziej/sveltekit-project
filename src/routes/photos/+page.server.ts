import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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
	// const session = await locals.auth();
	// if (!session) {
	// 	// Redirect to the signin page
	// 	throw redirect(303, '/auth/signIn');
	// }
	return {
		title: 'Photos'
	};
};
