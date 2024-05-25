<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { formFieldProxy } from 'sveltekit-superforms';
	import type { SuperForm, FormPathLeaves } from 'sveltekit-superforms';
	import { Checkbox, PasswordInput, TextInput } from 'carbon-components-svelte';

	let _class = '';
	export { _class as class };

	export let labelText = '';
	export let placeholder = '';
	export let hideable: boolean = false;
	export let field: FormPathLeaves<T>;
	export let superform: SuperForm<T>;

	const { value, errors, constraints } = formFieldProxy(superform, field);
	// console.log(errors);
</script>

<!-- {#if label}
	<label class="label" for={field}>{label}</label>
{/if} -->

{#if field.toLowerCase().includes('password') || hideable}
	<!-- * PasswordInput -->
	<!-- <label class="label" for={field}>{label}</label> -->
	<PasswordInput
		bind:labelText
		bind:placeholder
		bind:name={field}
		aria-invalid={$errors ? 'true' : undefined}
		invalid={$errors ? true : undefined}
		invalidText={$errors?.join('. ')}
		bind:value={$value}
		{...$constraints}
		{...$$restProps}
	/>
{:else if typeof $value === 'boolean'}
	<!-- * TextInput -->
	<Checkbox
		bind:labelText
		bind:placeholder
		bind:name={field}
		aria-invalid={$errors ? 'true' : undefined}
		bind:value={$value}
		{...$constraints}
		{...$$restProps}
	/>
{:else}
	<!-- * TextInput -->
	<TextInput
		bind:labelText
		bind:placeholder
		bind:name={field}
		aria-invalid={$errors ? 'true' : undefined}
		invalid={$errors ? true : undefined}
		invalidText={$errors?.join('. ')}
		bind:value={$value}
		{...$constraints}
		{...$$restProps}
	/>
{/if}

<!-- <div class="control">
	<input
		class={'input ' + _class}
		name={field}
		aria-invalid={$errors ? 'true' : undefined}
		placeholder=""
		bind:value={$value}
		{...$constraints}
		{...$$restProps}
	/>
</div> -->
<!-- {#if $errors}
	<p class="help is-danger">{$errors}</p>
{/if} -->

<!-- <style>
	.is-danger {
		color: red;
	}

	input {
		background-color: #e7e7e7;
	}

	input:not(:placeholder-shown):invalid {
		box-shadow: inset 0px 0px 3px 1px #f00;
	}
</style> -->
