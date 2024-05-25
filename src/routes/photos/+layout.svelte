<script lang="ts">
	import {
		Row,
		Column,
		InlineNotification,
		DatePicker,
		DatePickerInput,
		Search
	} from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import type { PageData } from './$types';
	// let page: PageData;
	// let layout: LayoutData;
</script>

<Row padding>
	<Column padding>
		<h2>{$page.data.title}</h2>
	</Column>
	<Column padding></Column>
	<Column padding></Column>
	<Column padding>
		<!-- <Row> -->
		<!-- <InlineNotification title="Error:" subtitle="An internal server error occurred." /> -->
		<!-- </Row> -->
	</Column>
</Row>

<slot />
