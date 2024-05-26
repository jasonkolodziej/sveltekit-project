<script lang="ts">
	import {
		Row,
		Column,
		DatePicker,
		DatePickerInput,
		Search,
		FileUploaderDropContainer,
		Button,
		Popover
	} from 'carbon-components-svelte';
	import { Calendar } from 'carbon-icons-svelte';
	import { uploadFile, type UploadedFile } from '$lib/components/media/File';
	// let page: PageData;
	// let layout: LayoutData;
	let open = false;
	let ref: { contains: (arg0: any) => boolean } | null = null;

	let filesUploader;
	let statuses = undefined;

	const filesToUpload: Array<Promise<UploadedFile>> = new Array();

	function validateFiles(files: File[]) {
		return files;
	}

	const noClickOnUpload = (e: any) => {
		// e.preventDefault();
		return;
	};

	$: showProgress = filesToUpload.length;

	const onUploadFileChanged = (e) => {
		const pendingFiles: Array<File> = new Array(...e.detail);
		const promisedResponses = pendingFiles.map((file) => {
			const promisedResponse = uploadFile(file);
			return promisedResponse.then<UploadedFile>((val) => val.json());
		});
		filesToUpload.push(...promisedResponses);
		console.log(filesToUpload);
		showProgress = filesToUpload.length;
	};
</script>

<Row>
	<Column>
		<Search />
	</Column>
	<!-- * Date range picker -->
	<Column>
		<div bind:this={ref} style:position="relative">
			<Button
				kind="secondary"
				icon={Calendar}
				iconDescription="Select date range"
				on:click={() => (open = !open)}
			/>
			<Popover
				caret
				bind:open
				align="bottom-left"
				on:click:outside={({ detail }) => {
					console.log('on:click:outside');
					open = ref.contains(detail.target);
				}}
			>
				<div style="padding: var(--cds-spacing-05)">
					<DatePicker datePickerType="range" on:change>
						<DatePickerInput labelText="Start date" placeholder="mm/dd/yyyy" />
						<DatePickerInput labelText="End date" placeholder="mm/dd/yyyy" />
					</DatePicker>
				</div>
			</Popover>
		</div>
	</Column>
	<!-- <Column>
		<OverflowMenu>
			<OverflowMenuItem text="Manage credentials" />
			<OverflowMenuItem href="https://cloud.ibm.com/docs/api-gateway/" text="API documentation" />
			<OverflowMenuItem danger text="Delete service" />
		</OverflowMenu>
	</Column> -->
</Row>
<!-- <Row>
	<Column padding>
		<h2>{$page.data.title}</h2>
	</Column>
</Row> -->

<Row padding>
	<Column>
		<FileUploaderDropContainer
			bind:this={filesUploader}
			multiple
			labelText="Drag images/videos here"
			{validateFiles}
			on:change={onUploadFileChanged}
			on:click={noClickOnUpload}
		/>
	</Column>
</Row>

<slot />
