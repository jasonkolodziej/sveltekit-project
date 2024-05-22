//? https://github.com/delay/sveltekit-auth-starter/blob/main/src/lib/server/lucia.ts
// lib/server/lucia.ts
import { Lucia, TimeSpan } from 'lucia';
// import { sveltekit } from 'lucia/middleware';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';

const adapter = new PrismaAdapter(new PrismaClient(), {
	user: 'authUser',
	key: 'authKey',
	session: 'authSession'
});

//? Here's the fully updated configuration for reference. `middleware` and `csrfProtection` have been removed.
export const lucia = new Lucia(adapter, {
	// middleware: sveltekit(),
	// sessionExpiresIn: new TimeSpan(3, 'd'), // * no more active/idle
	sessionCookie: {
		// name: "session",
		// expires: false, // * session cookies have very long lifespan (2 years)
		attributes: {
			//? v2 =	env: dev ? 'DEV' : 'PROD',
			secure: dev //* replaces `env` config
			// sameSite: 'strict',
			// domain: 'example.com'
		}
	},
	// getSessionAttributes: (attributes) => {
	// 	return {
	// 		ipCountry: attributes.ip_country
	// 	};
	// },
	getUserAttributes: (attributes) => {
		return {
			userId: attributes.id,
			email: attributes.email,
			firstName: attributes.firstName,
			lastName: attributes.lastName,
			role: attributes.role,
			verified: attributes.verified,
			receiveEmail: attributes.receiveEmail,
			token: attributes.token
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	[x: string]: any;
	//* formerly `UserAttributes`
	// username: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	verified: boolean;
	receiveEmail: boolean;
	token: string;
}

/// ? v2 matter
// export const auth = lucia({
// 	adapter: prisma(new PrismaClient(), {
// 		user: 'authUser',
// 		key: 'authKey',
// 		session: 'authSession'
// 	}),
// 	env: dev ? 'DEV' : 'PROD',
// 	middleware: sveltekit(),
// 	getUserAttributes: (data) => {
// 		return {
// 			userId: data.id,
// 			email: data.email,
// 			firstName: data.firstName,
// 			lastName: data.lastName,
// 			role: data.role,
// 			verified: data.verified,
// 			receiveEmail: data.receiveEmail,
// 			token: data.token
// 		};
// 	}
// });

// export type Auth = typeof auth;
