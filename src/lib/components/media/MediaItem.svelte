<script lang="ts">
	import {
		SelectableTile,
		InlineLoading,
		FileUploaderItem,
		ImageLoader
	} from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import type { RouteParams } from './$types';
	import type { UploadedFile } from './File';

	export let fileOrUrl: File | RouteParams;
	const pFile: File = fileOrUrl as File; // * Pending file
	const upload = !('photo' in fileOrUrl);
	if (!upload) {
		// TODO: fetch file??
	}

	/* *
	 * Props for uploading status
	 */
	export let media: UploadedFile;
	const id = media.id;
	let invalid = media.invalid;
	let errorSubject = media.errorSubject;
	let errorBody = media.errorBody;
	let status = media.status;
	$: console.log('photos', $page.data);
</script>

{#if upload}
	<!-- ? On an image or video being uploaded -->
	<FileUploaderItem
		{id}
		name={pFile.name}
		bind:status
		bind:errorBody
		bind:errorSubject
		bind:invalid
		on:delete
	/>
{/if}

{#if !upload}
	<!-- ? On already uploaded -->
	<SelectableTile light style="padding:0%">
		<!-- <div style:margin-top="1rem" style:width="100%"> -->
		<ImageLoader fadeIn {src} alt={src}>
			<svelte:fragment slot="loading">
				<InlineLoading />
			</svelte:fragment>
			<svelte:fragment slot="error">An error occurred.</svelte:fragment>
		</ImageLoader>
		<!-- </div> -->
	</SelectableTile>
{/if}
