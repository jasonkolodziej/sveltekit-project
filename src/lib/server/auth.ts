import { SvelteKitAuth, type DefaultSession } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';

// import Keycloak from '@auth/sveltekit/providers/keycloak';
import { GITHUB_ID, GITHUB_SECRET, AUTH_SECRET } from '$env/dynamic/private';
import { D1Adapter } from '@auth/d1-adapter';

declare module '@auth/sveltekit' {
	interface Session {
		user: {
			userId: string;
			/**
			 * By default, TypeScript merges new interface properties and overwrites existing ones.
			 * In this case, the default session user properties will be overwritten,
			 * with the new ones defined above. To keep the default session user properties,
			 * you need to add them back into the newly declared interface.
			 */
		} & DefaultSession['user'];
	}
}

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
	secret: AUTH_SECRET,
	trustHost: true
	// adapter: D1Adapter(env.db)
});

// export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
// 	const authOptions = {
// 		providers: [
// 			GitHub({
// 				clientId: event.platform.env.AUTH_GITHUB_ID,
// 				clientSecret: event.platform.env.AUTH_GITHUB_SECRET
// 			})
// 		],
// 		secret: event.platform.env.AUTH_SECRET,
// 		trustHost: true
// 	};
// 	return authOptions;
// });
