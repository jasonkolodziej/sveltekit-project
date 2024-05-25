<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { Form as CarbForm } from 'carbon-components-svelte';

	export let data: SuperValidated<T>;
	export let dataType: 'form' | 'json' = 'form';
	export let invalidateAll = true; // set to false to keep form data using multiple forms on a page
	// let restProps = $$restProps;

	export const superform = superForm(data, {
		dataType,
		invalidateAll,
		onUpdated({ form }) {
			if (form.valid) {
				console.log('form is valid');
				// Successful post! Do some more client-side stuff.
			}
		}
	});

	const { form, message, delayed, errors, allErrors, enhance } = superform;
</script>

<CarbForm method="POST" {...$$restProps} {...enhance}>
	<!-- <form method="POST" use:enhance {...$$restProps}> -->
	<slot
		{superform}
		form={$form}
		message={$message}
		errors={$errors}
		allErrors={$allErrors}
		delayed={$delayed}
	/>
</CarbForm>

<SuperDebug data={$form}></SuperDebug>
