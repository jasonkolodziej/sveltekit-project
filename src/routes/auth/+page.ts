import type { PageLoad } from '../$types';
import type { PageData } from './$types';

export const load: PageLoad = async ({ route, data, parent }) => {
	console.log(`${route.id}.PageServerLoad.from`);
	return {};
};

export const prerender = 'auto';
