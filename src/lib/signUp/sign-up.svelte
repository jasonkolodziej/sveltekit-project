<!--? https://github.com/delay/sveltekit-auth-starter/blob/main/src/lib/components/sign-in.svelte -->
<script lang="ts">
	// import { superForm } from 'sveltekit-superforms/client';
	//import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { userSchema } from '$lib/zod-schema';
	import {
		FluidForm,
		TextInput,
		PasswordInput,
		Checkbox,
		Button,
		Link
	} from 'carbon-components-svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	import { boolean } from 'zod';
	// import { ConicGradient } from '@skeletonlabs/skeleton';
	// import type { ConicStop } from '@skeletonlabs/skeleton';
	// import { i } from '@inlang/sdk-js';
	export let data;

	const signUpSchema = userSchema.pick({
		firstName: true,
		lastName: true,
		email: true,
		password: true,

		terms: true
	});

	const { form, errors, enhance, delayed } = superForm(data.form, {
		id: 'signup',
		taintedMessage: null,
		delayMs: 0,
		validators: zod(signUpSchema)
	});

	// const conicStops: ConicStop[] = [
	// 	{ color: 'transparent', start: 0, end: 25 },
	// 	{ color: 'rgb(var(--color-primary-900))', start: 75, end: 100 }
	// ];

	let password = '';
	let invalid = false;
	let termsAccept = false;
	$: invalid = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{6,}$/.test(password);
	// $: termsValue = $form.terms as Writable<boolean>;
</script>

<FluidForm
	on:submit={(e) => {
		e.preventDefault();
		console.log('submit');
	}}
>
	<TextInput
		labelText="First name"
		placeholder="Enter first name..."
		required
		bind:value={$form.firstName}
	/>
	<TextInput
		labelText="Last name"
		placeholder="Enter last name..."
		required
		bind:value={$form.lastName}
	/>
	<TextInput
		labelText="Email"
		placeholder="Enter email..."
		required
		bind:value={$form.email}
		bind:invalidText={$errors.email}
	/>
	<PasswordInput
		bind:value={$form.password}
		{invalid}
		invalidText="Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number."
		required
		type="password"
		labelText="Password"
		placeholder="Enter password..."
	/>
	<br />
	<br />
	<Checkbox
		bind:checked={$form.terms}
		id="checkbox-terms"
		labelText="I accept the terms and privacy policy."
	/>

	<br />
	<Button type="submit">Submit</Button>
</FluidForm>

<!-- <form method="POST" action="/auth/sign-up" use:enhance> -->
<!-- <SuperDebug data={$form} />
	<div class="mt-6">
		<label class="label">
			<span class="sr-only">{i('First Name')}</span>
			<input
				id="firstName"
				name="firstName"
				type="text"
				placeholder={i('firstName')}
				autocomplete="given-name"
				data-invalid={$errors.firstName}
				bind:value={$form.firstName}
				class="input"
				class:input-error={$errors.firstName}
			/>
			{#if $errors.firstName}
				<small>{$errors.firstName}</small>
			{/if}
		</label>
	</div>
	<div class="mt-6">
		<label class="label">
			<span class="sr-only">{i('lastName')}</span>
			<input
				id="lastName"
				name="lastName"
				type="text"
				placeholder={i('lastName')}
				autocomplete="family-name"
				data-invalid={$errors.lastName}
				bind:value={$form.lastName}
				class="input"
				class:input-error={$errors.lastName}
			/>
			{#if $errors.lastName}
				<small>{$errors.lastName}</small>
			{/if}
		</label>
	</div>
	<div class="mt-6">
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
	</div>

	<div class="mt-6">
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
	</div>
	<div class="mt-6">
		<label for="terms" class="label">
			<input id="terms" name="terms" type="checkbox" class="checkbox" bind:checked={termsAccept} />
			<span class="ml-2">
				I accept the
				<a href="/terms" class="text-primaryHover underline">terms</a>
				and
				<a href="/privacy" class="text-primaryHover underline">privacy policy</a>
				<!--{#if $errors.terms}
					<small>{$errors.terms}</small>
				{/if}-->
<!-- </span>
		</label>
	</div>
	<div class="mt-6">
		<button type="submit" disabled={!termsAccept} class="btn variant-filled-primary w-full"
			>{#if $delayed}<ConicGradient stops={conicStops} spin width="w-6" />{:else}{i(
					'signup'
				)}{/if}</button
		>
	</div>  -->
<!-- </form> -->
