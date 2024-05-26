import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
// import { MimeTypes } from 'mime-type';
import { getFileFromFormData } from '$lib/components/media/File';

export const POST: RequestHandler = async ({
	request,
	params,
	locals,
	route,
	parent,
	isDataRequest,
	isSubRequest
}) => {
	console.log(
		`RequestHandler.${request.method}(${route.id}) dataReq?:${isDataRequest} subreq?:${isSubRequest}`,
		params
	);
	console.log(request);
	const file = await getFileFromFormData(request);
	return json({ file }, { status: 200 });
};
