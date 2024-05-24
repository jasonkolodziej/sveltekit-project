// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {
		// 	code?: string;
		// 	errorId?: string;
		// }
		interface Locals {
			// auth: import('lucia').AuthRequest;
			user: import('lucia').RegisteredDatabaseUserAttributes | null;
			session: import('lucia').Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
