<script lang="ts">
	import {
		Row,
		Column,
		FileUploaderDropContainer,
		FileUploaderItem,
		SelectableTile,
		Tile,
		Search,
		InlineNotification,
		InlineLoading,
		ImageLoader,
		DatePicker,
		DatePickerInput,
		Button
	} from 'carbon-components-svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import type { PageData } from './$types';
	// let page: PageData;
	let layout: LayoutData;
	// let timeout = undefined;
	// $: showNotification = timeout !== undefined;

	const images = [
		'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg',
		'https://upload.wikimedia.org/wikipedia/commons/b/b9/Carbon-design-system-logo.png',
		'https://m.media-amazon.com/images/I/81JikRw3uLL.jpg'
	];

	let index = 0;

	// $: src = images[index];
</script>

<Row padding>
	<Column>
		<FileUploaderDropContainer
			on:click={() => {}}
			multiple
			labelText="Drag and drop files here or click to upload"
			validateFiles={(files) => {
				return files.filter((file) => file.size < 1_024);
			}}
			on:change={(e) => {
				console.log('files', e.detail);
			}}
		/>
	</Column>
	<!-- <Column> -->
	<!-- * <div role="group" aria-label="selectable tiles"> -->
	<!-- <div transition:fade>
			<FileUploaderItem
				invalid
				id="readme"
				name="README.md"
				errorSubject="File size exceeds 500kb limit"
				errorBody="Please select a new file."
				status="edit"
				on:delete={(e) => {
					console.log(e.detail); // true if closed via timeout
				}}
			/>
		</div> -->
	<!-- </Column> -->
	{#each images as src}
		<Column>
			<SelectableTile>
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
