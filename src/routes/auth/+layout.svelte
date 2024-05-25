<script lang="ts">
	import { Row, Column } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	// import type { PageData } from './$types';
	// let page: PageData;
	// let layout: LayoutData;
</script>

<Row padding>
	<Column>
		<h2>{$page.data.title}</h2>
	</Column>
</Row>

<Row padding>
	<Column>
		<slot />
	</Column>
	<Column />
	<Column />
</Row>
