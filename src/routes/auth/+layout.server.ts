import type { LayoutServerLoad } from './$types';

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
		`MAIN.LayoutServerLoad.${request.method}(${route.id}) dataReq?:${isDataRequest} subreq?:${isSubRequest}`
	);
	// const session = await auth();
	return await parent();
};
