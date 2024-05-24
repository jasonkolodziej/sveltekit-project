// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in prod
import type { PageLoad } from './$types';
// export const prerender = true;
export const prerender = 'auto';

export const load: PageLoad = async ({ params, route, parent }) => {
	const data = await parent();
	return data;
};

//? +page.server.ts for lucia
// import { lucia } from "$lib/server/lucia";
// import { fail, redirect } from "@sveltejs/kit";

// import type { Actions, PageServerLoad } from "./$types";

// export const load: PageServerLoad = async (event) => {
// 	if (!event.locals.user) {
// 		redirect("/login");
// 	}
// 	// ...
// };

// export const actions: Actions = {
// 	default: async (event) => {
// 		if (!event.locals.user) {
// 			throw fail(401);
// 		}
// 		// ...
// 	}
// };
