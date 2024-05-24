<!--? https://github.com/delay/sveltekit-auth-starter/blob/main/src/lib/components/sign-in.svelte -->
<script lang="ts">
	// import { ConicGradient } from '@skeletonlabs/skeleton';
	// import type { ConicStop } from '@skeletonlabs/skeleton';
	import { superForm, type SuperForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { userSchema } from '$lib/zod-schema';
	// import { AlertTriangle } from 'lucide-svelte';
	import { FluidForm, TextInput, PasswordInput, Button, FormGroup } from 'carbon-components-svelte';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';
	import type { SuperFormError } from 'sveltekit-superforms';
	import { isValid } from 'zod';
	// import { enhance } from '$app/forms';

	// import { i } from '@inlang/sdk-js';
	/** @type {import('./$types').PageData} */
	export let data;

	const signInSchema = userSchema.pick({ email: true, password: true });
	/** @type {import('./$types').ActionData} */
	let { form, errors, delayed } = superForm(data.form, {
		id: 'signin',
		taintedMessage: null,
		delayMs: 0,
		validators: zod(signInSchema),
		validationMethod: 'auto'
		// onResult: (evResult) => {
		// 	console.log(evResult.result);
		// 	if (evResult.result.type === 'success') {
		// 		evResult.cancel();
		// 		// rerun all `load` functions, following the successful update
		// 		// await invalidateAll();
		// 	}

		// 	applyAction(evResult.result);
		// }
	});

	// const result = validateForm();

	// if (result.valid) {
	// 	// ...
	// }
</script>

<FluidForm method="POST" action="/auth/sign-in">
	<SuperDebug data={$form} />
	{#if $errors._errors}
		<TextInput
			id="email"
			name="email"
			labelText="Email"
			placeholder="Enter email..."
			required
			bind:value={$form.email}
			bind:invalid={$errors.email}
			bind:invalidText={$errors.email}
		/>
		<PasswordInput
			id="password"
			name="password"
			bind:value={$form.password}
			required
			type="password"
			labelText="Password"
			placeholder="Enter password..."
			bind:invalid={$errors.password}
			bind:invalidText={$errors.password}
		/>
	{/if}
	<TextInput
		id="email"
		name="email"
		labelText="Email"
		placeholder="Enter email..."
		required
		bind:value={$form.email}
	/>
	<PasswordInput
		id="password"
		name="password"
		bind:value={$form.password}
		required
		type="password"
		labelText="Password"
		placeholder="Enter password..."
	/>
	<br />
	<Button type="submit">Sign in</Button>
</FluidForm>

<!-- <form method="POST" action="/auth/sign-in" use:enhance> -->
<!--<SuperDebug data={$form} />-->

<!-- {#if $errors._errors}
		<aside class="alert variant-filled-error mt-6">
			Icon
			<div><AlertTriangle size="42" /></div>
			 Message -->
<!-- <div class="alert-message">
				<h3 class="h3">{i('signinProblem')}</h3>
				<p>{$errors._errors}</p>
			</div>
		</aside>
	{/if} -->
<!-- <div class="mt-6">
		<label class="label">
			<span class="sr-only">{i('email')}</span>
			<input
				id="email"
				name="email"
				type="email"
				placeholder={i('email')}
				autocomplete="email"
				data-invalid={$errors.email}
				bind:value={$form.email}
				class="input"
				class:input-error={$errors.email}
			/>
			{#if $errors.email}
				<small>{$errors.email}</small>
			{/if}
		</label>
	</div> -->

<!-- <div class="mt-6">
		<label class="label">
			<span class="sr-only">{i('password')}</span>
			<input
				id="password"
				name="password"
				type="password"
				placeholder={i('password')}
				data-invalid={$errors.password}
				bind:value={$form.password}
				class="input"
				class:input-error={$errors.password}
			/>
			{#if $errors.password}
				<small>{$errors.password}</small>
			{/if}
		</label>
	</div> -->

<!-- <div class="mt-6">
		<button type="submit" class="btn variant-filled-primary w-full"
			>{#if $delayed}<ConicGradient stops={conicStops} spin width="w-6" />{:else}{i(
					'signin'
				)}{/if}</button
		>
	</div>
	<div class="flex flex-row justify-center items-center mt-10">
		<a href="/auth/password/reset" class="font-semibold">{i('forgotPassword')}</a>
	</div> -->
<!-- </form> -->
