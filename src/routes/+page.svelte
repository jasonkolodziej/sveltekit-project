<script lang="ts">
	import {
		Row,
		Column,
		Form,
		FormGroup,
		TextInput,
		Button,
		Checkbox,
		Tooltip,
		ButtonSet
	} from 'carbon-components-svelte';
	import { ArrowRight as Arrow, LogoGithub, LogoVmware, Add } from 'carbon-icons-svelte';

	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
	import { signIn } from '@auth/sveltekit/client';
</script>

<Row padding>
	<Column>
		<h2>Login</h2>
	</Column>
</Row>
<Row padding>
	<Column>
		<Form on:submit>
			<!-- <Column> -->
			<FormGroup>
				<TextInput size="xl" labelText="User name" placeholder="Enter user name..." required />
			</FormGroup>
			<FormGroup>
				<ButtonSet>
					<Button type="submit" icon={Arrow} kind="primary" on:click={() => signIn('credentials')}>
						Sign in
					</Button>
				</ButtonSet>
				<br />
				<br />
				<Checkbox labelText="Remember me" align="bottom" />
			</FormGroup>
			<FormGroup legendText="Other providers">
				<Button
					size="field"
					icon={LogoGithub}
					kind="secondary"
					on:click={() => signIn('github')}
					iconDescription="Sign in with Github"
				/>
				<Button
					size="field"
					icon={LogoVmware}
					kind="tertiary"
					on:click={() => signIn('github')}
					iconDescription="Sign in with Vmware"
				/>
			</FormGroup>
			<FormGroup legendText="Don't have an account?" noMargin>
				<Button
					size="field"
					icon={Add}
					kind="tertiary"
					on:click={() => signIn('github')}
					iconDescription="Create an account"
				>
					Create an account
				</Button>
			</FormGroup>
		</Form>
	</Column>
	<Column />
	<Column />
</Row>
