// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code?: string;
			errorId?: string;
		}
		interface Locals {
			auth: import('lucia').AuthRequest;
			user: Lucia.UserAttributes | null;
			session: import('lucia').Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

/// <reference types="lucia-auth" />
declare global {
	//? v2
	// namespace Lucia {
	// 	type Auth = import('$lib/server/lucia').Auth;
	// 	type DatabaseUserAttributes = {
	// 		//* formerly `UserAttributes`
	// 		email: string;
	// 		firstName: string;
	// 		lastName: string;
	// 		role: string;
	// 		verified: boolean;
	// 		receiveEmail: boolean;
	// 		token: string;
	// 	};
	// 	type DatabaseSessionAttributes = {}; // new
	// }
}
declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}
export {};
