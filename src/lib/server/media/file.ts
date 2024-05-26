// import { fileTypeFromBlob } from 'file-type';
import type { UploadedFile } from '$lib/components/media/File';
import { v5 as uuid, validate } from 'uuid';

const UUID_NAMESPACE = '5809031d-8f2e-48fe-a9fc-cf5c3c187526';
export class UploadFile implements UploadedFile {
	/* *
	 * ref: https://hartenfeller.dev/blog/sveltekit-image-upload-store
	 */
	readonly file: File;
	readonly fileObjectUrl: string;
	readonly id: string;
	readonly revokeObjectUrl: boolean = false;
	readonly errorSubject?: string;
	readonly errorBody?: string;
	status: 'edit' | 'uploading' | 'complete' | null = null;
	constructor(formData: FormData, file?: File) {
		this.file = formData.get('file')?.valueOf() as File; // * get the obj attribute key 'file' as type File
		this.fileObjectUrl = formData.get('fileObjectUrl')?.valueOf() as string; // * make sure to call `URL.revokeObjectURL(objectURL)`
		this.id = this.resolveId() ?? '';
		if (this.id === '') {
			this.revokeObjectUrl = true;
			this.id = uuid(this.file.name, UUID_NAMESPACE);
		}
		this.status = this.invalid ? 'edit' : this.file === null ? null : 'uploading';
	}

	get invalid() {
		let mimeVal: boolean;
		// this.MimeType().then((answer) => {
		// 	mimeVal = answer;
		// });
		return (this.file.type.includes('image') || this.file.type.includes('video')) === false;
	}

	private resolveId() {
		const maybeId = this.fileObjectUrl.split('/').pop();
		if (validate(maybeId as string)) return maybeId!;
		else console.warn('failed to validate fileObjectUrl as uuid');
		return maybeId;
	}

	get arrayBuffer() {
		return this.file.arrayBuffer() as unknown as Awaited<ArrayBuffer>; // * get Uint8Buffer of File
	}

	writeFile(path?: string) {}

	// private MimeType = async () => {
	// 	// const type = await fileTypeFromBlob(this.file);
	// 	if (type) return type.mime.includes('image') || type.mime.includes('video');
	// 	return false;
	// };

	static validateFiles<T>(files: File[], validators: (file: File) => boolean): T[] | File[] {
		return files.filter(validators);
	}
}

export const getFileFromFormData = async (request: Request) => {
	const data = await request.formData();
	const uploadFile = new UploadFile(data);
	console.log(uploadFile);
	return uploadFile;
};
