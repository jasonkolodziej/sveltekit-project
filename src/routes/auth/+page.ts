import type { PageLoad } from '../$types';
import type { PageData } from './$types';

export const load: PageLoad = async ({ route, data }) => {
	console.log(`${route.id}.PageServerLoad.from`);
	return {
		data
	};
};

export const prerender = 'auto';
