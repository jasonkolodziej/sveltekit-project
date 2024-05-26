<script lang="ts">
	import {
		SelectableTile,
		InlineLoading,
		FileUploaderItem,
		ImageLoader
	} from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import type { RouteParams } from './$types';

	export let fileOrUrl: File | RouteParams;
	export let id: string;
	const pFile: File = fileOrUrl as File; // * Pending file
	const upload = !('photo' in fileOrUrl);
	if (!upload) {
		// TODO: fetch file??
	}

	/* *
	 * Props for uploading status
	 */
	let invalid: boolean;
	let errorSubject: string;
	let errorBody: string;
	let status: 'edit' | 'uploading' | 'complete' | null;
	$: console.log($page.data);
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
