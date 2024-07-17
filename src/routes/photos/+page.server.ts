import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
	request,
	params,
	locals,
	route,
	parent,
	isDataRequest,
	isSubRequest
}) => {
	console.log(
		`PageServerLoad.${request.method}(${route.id}) dataReq?:${isDataRequest} subreq?:${isSubRequest}`,
		params
	);
	const parentData = await parent();
	return {
		...parentData,
		title: 'Photos'
	};
};

// ? see: https://github.com/JustinyAhin/okupter-repos/blob/5e9403e30a49ce5e314f311cffb057d922d2c737/apps/sveltekit-file-upload/src/routes/%2Bpage.server.ts
// export const actions = {
// 	default: async ({ request }) => {
// 	  const formData = Object.fromEntries(await request.formData());

// 	  if (
// 		!(formData.fileToUpload as File).name ||
// 		(formData.fileToUpload as File).name === 'undefined'
// 	  ) {
// 		return fail(400, {
// 		  error: true,
// 		  message: 'You must provide a file to upload'
// 		});
// 	  }

// 	  const { fileToUpload } = formData as { fileToUpload: File };

// 	  // Write the file to the static folder
// 	  writeFileSync(`static/${fileToUpload.name}`, Buffer.from(await fileToUpload.arrayBuffer()));

// 	  return {
// 		success: true
// 	  };
// 	}
//   };
