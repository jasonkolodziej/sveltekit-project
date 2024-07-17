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

//? see: https://github.com/JustinyAhin/okupter-repos/blob/5e9403e30a49ce5e314f311cffb057d922d2c737/apps/sveltekit-file-upload/src/routes/api/upload/%2Bserver.ts
// export const POST = async ({ request }) => {
// 	const requestBody = await request.json();

// 	if (!requestBody.fileData || requestBody.fileData === 'data:') {
// 	  throw error(400, { message: 'No file data' });
// 	}

// 	const { fileData, fileName } = requestBody as {
// 	  fileData: string;
// 	  fileName: string;
// 	};

// 	writeFileSync(`static/${fileName}`, fileData.split(',')[1], 'base64');

// 	return json({ success: true, message: 'File uploaded successfully' });
//   };
