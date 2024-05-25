<script lang="ts">
	import {
		Row,
		Column,
		InlineNotification,
		DatePicker,
		DatePickerInput,
		Search,
		OverflowMenu,
		OverflowMenuItem,
		Button,
		Popover
	} from 'carbon-components-svelte';
	import { Calendar } from 'carbon-icons-svelte';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import type { PageData } from './$types';
	// let page: PageData;
	// let layout: LayoutData;
	let open = false;
	let ref = null;
</script>

<Row>
	<Column>
		<Search />
	</Column>
	<!-- * Date range picker -->
	<Column>
		<div bind:this={ref} style:position="relative">
			<Button icon={Calendar} iconDescription="Select date range" on:click={() => (open = !open)} />
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

<slot />
