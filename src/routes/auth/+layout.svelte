<script lang="ts">
	import { Row, Column } from 'carbon-components-svelte';
</script>

<Row padding>
	<Column>
		<h2>Login</h2>
	</Column>
</Row>

<Row padding>
	<Column>
		<slot />
	</Column>
</Row>
