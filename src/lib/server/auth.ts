import { SvelteKitAuth, type DefaultSession } from '@auth/sveltekit';
import { ZodError } from 'zod';
import { D1Adapter } from '@auth/d1-adapter';
// import Apple from '@auth/sveltekit/providers/apple';
// import Auth0 from '@auth/sveltekit/providers/auth0';
// import AzureB2C from '@auth/sveltekit/providers/azure-ad-b2c';
// import BoxyHQSAML from '@auth/sveltekit/providers/boxyhq-saml';
// import Cognito from '@auth/sveltekit/providers/cognito';
// import Coinbase from '@auth/sveltekit/providers/coinbase';
// import Discord from '@auth/sveltekit/providers/discord';
// import Dropbox from '@auth/sveltekit/providers/dropbox';
// import Facebook from '@auth/sveltekit/providers/facebook';
import GitHub from '@auth/sveltekit/providers/github';
// import GitLab from '@auth/sveltekit/providers/gitlab';
// import Google from '@auth/sveltekit/providers/google';
// import Hubspot from '@auth/sveltekit/providers/hubspot';
// import Keycloak from '@auth/sveltekit/providers/keycloak';
// import LinkedIn from '@auth/sveltekit/providers/linkedin';
// import Netlify from '@auth/sveltekit/providers/netlify';
// import Okta from '@auth/sveltekit/providers/okta';
// import Passage from '@auth/sveltekit/providers/passage';
// import Pinterest from '@auth/sveltekit/providers/pinterest';
// import Reddit from '@auth/sveltekit/providers/reddit';
// import Slack from '@auth/sveltekit/providers/slack';
// import Spotify from '@auth/sveltekit/providers/spotify';
// import Twitch from '@auth/sveltekit/providers/twitch';
// import Twitter from '@auth/sveltekit/providers/twitter';
// import WorkOS from '@auth/sveltekit/providers/workos';
// import Zoom from '@auth/sveltekit/providers/zoom';
import Credentials from '@auth/sveltekit/providers/credentials';
import { env } from '$env/dynamic/private';
import { userSchema } from '$lib/zod-schema';

// export const { handle, signIn, signOut } = SvelteKitAuth({
// 	trustHost: true,
// 	providers: [
// 		Apple,
// 		Auth0,
// 		AzureB2C({
// 			clientId: env.AUTH_AZURE_AD_B2C_ID,
// 			clientSecret: env.AUTH_AZURE_AD_B2C_SECRET,
// 			issuer: env.AUTH_AZURE_AD_B2C_ISSUER
// 		}),
// 		BoxyHQSAML({
// 			clientId: 'dummy',
// 			clientSecret: 'dummy',
// 			issuer: env.AUTH_BOXYHQ_SAML_ISSUER
// 		}),
// 		Cognito,
// 		Coinbase,
// 		Discord,
// 		Dropbox,
// 		Facebook,
// 		GitHub,
// 		GitLab,
// 		Google,
// 		Hubspot,
// 		Keycloak,
// 		LinkedIn,
// 		Netlify,
// 		Okta,
// 		Passage,
// 		Pinterest,
// 		Reddit,
// 		Slack,
// 		Spotify,
// 		Twitch,
// 		Twitter,
// 		WorkOS({
// 			connection: env.AUTH_WORKOS_CONNECTION!
// 		}),
// 		Zoom
// 	]
// });

declare module '@auth/sveltekit' {
	interface Session {
		user: {
			userId: string;
			/* *
			 * By default, TypeScript merges new interface properties and overwrites existing ones.
			 * In this case, the default session user properties will be overwritten,
			 * with the new ones defined above. To keep the default session user properties,
			 * you need to add them back into the newly declared interface.
			 */
		} & DefaultSession['user'];
	}
}

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		GitHub({ clientId: env.GITHUB_ID, clientSecret: env.GITHUB_SECRET }),
		Credentials({
			// * You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// * e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {}
			},
			authorize: async (credentials, request) => {
				try {
					// let user = null;

					const user = await userSchema.parseAsync(credentials);

					// logic to salt and hash password
					// const pwHash = saltAndHashPassword(password);

					// logic to verify if user exists
					// user = await getUserFromDb(email, pwHash);

					if (!user) {
						throw new Error('User not found.');
					}

					// return json object with the user data
					return user;
				} catch (error) {
					if (error instanceof ZodError) {
						// Return `null` to indicate that the credentials are invalid
						return null;
					}
				}
			}
		})
	],
	secret: env.AUTH_SECRET,
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
