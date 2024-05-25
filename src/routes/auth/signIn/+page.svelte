<script lang="ts">
	import { FormGroup, Button, Checkbox, ButtonSet, Link } from 'carbon-components-svelte';
	import Form from '$lib/components/form/Form.svelte';
	import { ArrowRight as Arrow, LogoGithub, LogoVmware, Add } from 'carbon-icons-svelte';

	// import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import InputField from '$lib/components/inputField/InputField.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import type { SuperForm } from 'sveltekit-superforms';
	import { unknown } from 'zod';
	// export let data: PageData;
	let form = $page.data.signInForm;
	let sforms: Record<string, unknown>;
</script>

<!-- Form with dataType 'form' -->
<Form action="?/signIn" data={form} invalidateAll={false} let:message let:superform>
	<FormGroup>
		<!-- <TextInput
			size="xl"
			labelText="User name"
			id="email"
			name="email"
			placeholder="Enter user name..."
			required
		/> -->
		<InputField
			{superform}
			{message}
			field="email"
			placeholder="pssst try your email..."
			size="xl"
			labelText="User name"
		/>
	</FormGroup>
	<FormGroup>
		<InputField
			{superform}
			{message}
			field="password"
			hideable
			placeholder="Password"
			size="xl"
			labelText="Password"
		/>
	</FormGroup>
	<FormGroup>
		<ButtonSet>
			<Button
				type="submit"
				icon={Arrow}
				kind="primary"
				on:click={(e) => {
					e.preventDefault();
					superform.form.subscribe((form) => (sforms = form));
					// console.log(sforms);
					signIn('credentials', sforms);
				}}>Sign in</Button
			>
		</ButtonSet>
		<br />
		<Checkbox labelText="Remember me" />
	</FormGroup>
	<FormGroup legendText="Other providers">
		<Button
			size="field"
			icon={LogoGithub}
			kind="secondary"
			on:click={() => signIn('github')}
			iconDescription="Login with Github"
		/>
		<Button
			size="field"
			icon={LogoVmware}
			kind="tertiary"
			on:click={() => signIn('github')}
			iconDescription="Login with Vmware"
		/>
	</FormGroup>
	<FormGroup legendText="Don't have an account?">
		<Button
			size="field"
			icon={Add}
			kind="tertiary"
			on:click={() => goto('/auth/register')}
			iconDescription="Create an account"
		>
			Create an account
		</Button>
	</FormGroup>
	<Link on:click={() => signIn('github')}>Forgot my password</Link>
</Form>
