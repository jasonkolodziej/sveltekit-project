<script lang="ts">
	import {
		Row,
		Column,
		FileUploaderDropContainer,
		SelectableTile,
		InlineLoading,
		FileUploaderItem,
		ImageLoader
	} from 'carbon-components-svelte';
	import type { LayoutData } from './$types';
	// let page: PageData;
	let layout: LayoutData;
	// let timeout = undefined;

	const images = [
		'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg',
		'https://upload.wikimedia.org/wikipedia/commons/b/b9/Carbon-design-system-logo.png',
		'https://m.media-amazon.com/images/I/81JikRw3uLL.jpg'
	];

	let index = 0;

	let filesUploader;
	let statuses = undefined;
	interface FileUploadStatus {
		file: File;
		readonly invalid: boolean;
		errorSubject?: string;
		errorBody?: string;
		status: 'edit' | 'uploading' | 'complete' | null;
	}
	const filesToUpload: Array<FileUploadStatus> = new Array();

	function validateFiles(files: File[]) {
		return files.map((file) => {
			let errorSubject = '';
			let errorBody = '';
			// * perform checks

			return {
				file: file,
				invalid: errorBody !== '' || errorSubject !== '' ? true : false,
				errorBody: errorBody,
				errorSubject: errorSubject,
				status: errorBody !== '' || errorSubject !== '' ? 'edit' : 'uploading'
			} as FileUploadStatus;
		}); //.filter((file) => file.size < 1_024);
	}

	const noClickOnUpload = (e) => {
		// e.preventDefault();
		return;
	};
	$: showProgress = filesToUpload.length;
	const onUploadFileChanged = (e) => {
		filesToUpload.push(...e.detail);
		showProgress = filesToUpload.length;
		console.log('files', filesToUpload);
	};

	// $: src = images[index];
</script>

<Row padding>
	<!-- <Column sm={{ span: 4, offset: 0 }}> -->
	<Column sm={1} md={4} lg={8}>
		<FileUploaderDropContainer
			bind:this={filesUploader}
			multiple
			labelText="Drag images here"
			{validateFiles}
			on:change={onUploadFileChanged}
			on:click={noClickOnUpload}
		/>
	</Column>
	{#key showProgress}
		{#each filesToUpload as fileUp}
			<Column>
				{#key fileUp.status}
					<FileUploaderItem
						{fileUp}
						id={fileUp.file.name}
						name={fileUp.file.name}
						status={fileUp.status}
						errorBody={fileUp.errorBody}
						errorSubject={fileUp.errorSubject}
						invalid={fileUp.invalid}
						on:delete
					/>
				{/key}
			</Column>
		{/each}
	{/key}
</Row>

<Row padding>
	{#each images as src}
		<Column>
			<SelectableTile light>
				<!-- <div style:margin-top="1rem" style:width="100%"> -->
				<ImageLoader fadeIn {src} alt={src}>
					<svelte:fragment slot="loading">
						<InlineLoading />
					</svelte:fragment>
					<svelte:fragment slot="error">An error occurred.</svelte:fragment>
				</ImageLoader>
				<!-- </div> -->
			</SelectableTile>
		</Column>
	{/each}
</Row>
