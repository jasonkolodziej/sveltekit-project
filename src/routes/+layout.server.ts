import type { LayoutServerLoad } from './$types';
import { PWD } from '$env/static/private';
import { readdirSync } from 'fs';
import path from 'path';
const __dirname = path.resolve();
// import { dataArray } from "$lib/server/libconfig.server";

export const load: LayoutServerLoad = (async ({
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
	// const session = ;
	//* Cookies
	//* determine the routes of the App
	const dirContent = readdirSync(PWD + '/src/routes'); // .filter(val => val.valueOf())
	const routes = dirContent.filter(
		(content) => !content.endsWith('.svelte') && !content.endsWith('.ts')
	);
	// console.info(routes);
	return {
		// user: user,
		session: await auth(),
		calculatedRoutes: routes
	};
}) satisfies LayoutServerLoad;
