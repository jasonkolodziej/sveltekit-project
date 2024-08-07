import type { HandleServerError } from '@sveltejs/kit';
import log from '$lib/server/log';
import { redirect, type Handle } from '@sveltejs/kit';
import { handle as authenticationHandle } from '$lib/server/auth';
import { sequence } from '@sveltejs/kit/hooks';

export const authorizationHandle: Handle = async ({ resolve, event }) => {
	console.log(`hooks.server.authorizationHandle.${event.request.method}(${event.route.id})`);
	if (event.url.pathname.startsWith('/authenticated')) {
		const session = await event.locals.auth();
		if (!session) {
			// Redirect to the signin page
			throw redirect(303, '/auth/signIn');
		}
	}
	const result = await resolve(event);
	return result;
};

export const otherHandler: Handle = async ({ resolve, event }) => {
	console.log(`hooks.server.otherHandler.${event.request.method}(${event.route.id})`);
	const result = await resolve(event);
	return result;
};

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(authenticationHandle, authorizationHandle, otherHandler);

export const handleError: HandleServerError = async ({ error, event }) => {
	const errorId = crypto.randomUUID();

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	event.locals.error = error?.toString() || undefined;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	event.locals.errorStackTrace = error?.stack || undefined;
	// event.locals.errorId = errorId;
	log(500, event);

	return {
		message: 'An unexpected error occurred.',
		errorId
	};
};

// async function authorizationHandle({ event, resolve }) {
// 	// * Protect any routes under /authenticated
// 	if (event.url.pathname.startsWith('/authenticated')) {
// 		const session = await event.locals.auth();
// 		if (!session) {
// 			// Redirect to the signin page
// 			throw redirect(303, '/auth');
// 		}
// 	}

// 	// If the request is still here, just proceed as normally
// 	return resolve(event);
// }

// export const handle: Handle = async ({ event, resolve }) => {
// 	/**
// 	 * SvelteKit has basic CSRF protection by default.
// 		We recommend creating a handle hook to validate requests and store the current user inside locals.
// 		You can get the cookie name with Lucia.sessionCookieName and validate the session cookie with
// 		Lucia.validateSession(). Make sure to delete the session cookie if it's invalid and
// 		create a new session cookie when the expiration gets extended,
// 		which is indicated by Session.fresh.
// 	 */
// 	const sessionId = event.cookies.get(lucia.sessionCookieName);
// 	if (!sessionId) {
// 		event.locals.user = null;
// 		event.locals.session = null;
// 		return resolve(event);
// 	}
// 	//? validateSession() no longer throws an error when the session is invalid,
// 	//? and returns an object of User and Session instead.
// 	const { session, user } = await lucia.validateSession(sessionId);
// 	if (session && session.fresh) {
// 		const sessionCookie = lucia.createSessionCookie(session.id);
// 		//? sveltekit types deviates from the de-facto standard
// 		//? you can use 'as any' too
// 		event.cookies.set(sessionCookie.name, sessionCookie.value, {
// 			path: '.',
// 			...sessionCookie.attributes
// 		});
// 	}
// 	if (!session) {
// 		// * invalid session
// 		const sessionCookie = lucia.createBlankSessionCookie();
// 		event.cookies.set(sessionCookie.name, sessionCookie.value, {
// 			path: '.',
// 			...sessionCookie.attributes
// 		});
// 	}
// 	event.locals.user = user;
// 	event.locals.session = session;
// 	return resolve(event);
// };

//? Old v2 for lucia
// export const handle: Handle = async ({ event, resolve }) => {
// 	const startTimer = Date.now();
// 	event.locals.startTimer = startTimer;

// 	event.locals.auth = auth.handleRequest(event);
// 	if (event.locals?.auth) {
// 		const session = await event.locals.auth.validate();
// 		const user = session?.user;
// 		if (user) {
// 			event.locals.user = user;
// 		}
// 		if (event.route.id?.startsWith('/(protected)')) {
// 			if (!user) throw redirect(302, '/auth/sign-in');
// 			if (!user.verified) throw redirect(302, '/auth/verify/email');
// 		}
// 	}

// 	const response = await resolve(event);
// 	log(response.status, event);
// 	return response;
// };
