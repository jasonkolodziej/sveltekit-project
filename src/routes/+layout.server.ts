import type { LayoutServerLoad } from './$types';
import { PWD } from '$env/static/private';
import { readdirSync } from 'fs';
// import { dataArray } from "$lib/server/libconfig.server";

export const load: LayoutServerLoad = (async ({
	cookies,
	isDataRequest,
	route,
	request,
	isSubRequest,
	locals: { user, auth }
}) => {
	console.debug(
		`MAIN.LayoutServerLoad.${route.id}.${request.method} ${isDataRequest} subreq?:${isSubRequest}`
	);
	const session = await auth();
	//* Cookies
	//* determine the routes of the App
	const dirContent = readdirSync(PWD + '/src/routes'); // .filter(val => val.valueOf())
	const routes = dirContent.filter(
		(content) => !content.endsWith('.svelte') && !content.endsWith('.ts')
	);
	// console.info(routes);
	return {
		// user: user,
		session,
		calculatedRoutes: routes
	};
}) satisfies LayoutServerLoad;
