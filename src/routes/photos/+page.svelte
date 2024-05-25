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
	let timeout = undefined;
	$: showNotification = timeout !== undefined;

	const images = [
		'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg',
		'https://upload.wikimedia.org/wikipedia/commons/b/b9/Carbon-design-system-logo.png'
	];

	let index = 0;

	// $: src = images[index];
</script>

<Row padding>
	<Column>
		<DatePicker datePickerType="range" on:change>
			<DatePickerInput labelText="Start date" placeholder="mm/dd/yyyy" />
			<DatePickerInput labelText="End date" placeholder="mm/dd/yyyy" />
		</DatePicker>
	</Column>
	<Column>
		<Search size="sm" />
		<Button
			disabled={showNotification}
			on:click={() => {
				timeout = 3_000; // 3 seconds
			}}
		>
			Show notification
		</Button>
	</Column>
	<Column />
	<Column />
	<Column />
</Row>

<Row padding>
	<Column>
		<FileUploaderDropContainer />
	</Column>
	<Column>
		<!-- * <div role="group" aria-label="selectable tiles"> -->
		<!-- <Tile> -->
		{#if showNotification}
			<div transition:fade>
				<FileUploaderItem
					invalid
					id="readme"
					name="README.md"
					errorSubject="File size exceeds 500kb limit"
					errorBody="Please select a new file."
					status="edit"
					on:delete={(e) => {
						timeout = undefined;
						console.log(e.detail); // true if closed via timeout
					}}
				/>
			</div>
		{/if}
	</Column>
	<Column>
		{#if showNotification}
			<div transition:fade>
				<!-- * <div role="group" aria-label="selectable tiles"> -->
				<FileUploaderItem id="readme" name="README.md" status="complete" />
			</div>
		{/if}
	</Column>
	<Column>
		<FileUploaderItem id="readme" name="README.md" status="uploading" />
	</Column>
	{#each images as src}
		<Column>
			<SelectableTile style="height: 100%">
				<ImageLoader fadeIn {src} alt={src} />
			</SelectableTile>
		</Column>
	{/each}
</Row>
