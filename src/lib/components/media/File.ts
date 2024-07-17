export const uploadFile = async (file: File) => {
	const fd = new FormData();
	fd.append('file', file);
	// ? URL.createObjectURL() creates a temporary URL for the image we can use as src for an img tag
	fd.append('fileObjectUrl', URL.createObjectURL(file));
	return fetch('/photos', {
		method: 'POST',
		body: fd
	});
};

export const getFileFromFormData = async (request: Request) => {
	const formData = await request.formData();
	const file = formData.get('file') as File;
	const fileObjectUrl = formData.get('fileObjectUrl') as string;
	return { file, fileObjectUrl };
};

export interface UploadedFile {
	readonly file: File;
	readonly fileObjectUrl: string;
	readonly invalid?: boolean;
	readonly id?: string;
	readonly arrayBuffer: Awaited<ArrayBuffer>;
	readonly revokeObjectUrl: boolean;
	readonly errorSubject?: string;
	readonly errorBody?: string;
	status: 'edit' | 'uploading' | 'complete' | null;
}
