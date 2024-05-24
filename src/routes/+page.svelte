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
		ButtonSet,
		Tabs,
		Tab,
		Tile,
		TabContent,
		FluidForm,
		Link
	} from 'carbon-components-svelte';
	import { ArrowRight as Arrow, LogoGithub, LogoVmware, Add } from 'carbon-icons-svelte';

	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
	import { signIn } from '@auth/sveltekit/client';
</script>

<Row padding>
	<Column>
		<h2 heading>Login</h2>
	</Column>
</Row>
<Row>
	<Column>
		<!-- <Tile light> -->
		<!-- <Tabs type="container">
			<Tab>Sign In</Tab>
			<Tab icon={Add}>Create an Account</Tab>
			<svelte:fragment slot="content">
				<TabContent> -->
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
				<Checkbox labelText="Remember me" align="bottom" />
			</FormGroup>
			<FormGroup legendText="Login with another provider">
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
					on:click={() => signIn('github')}
					iconDescription="Create an account"
				>
					Create an account
				</Button>
			</FormGroup>
			<Link
				size="field"
				kind="ghost"
				on:click={() => signIn('github')}
				iconDescription="Forgot my password"
			>
				Forgot my password
			</Link>
		</Form>
		<!-- </TabContent>
				<TabContent> -->
		<!-- <Form>
			<TextInput labelText="First name" placeholder="Enter first name..." required />
			<TextInput labelText="Last name" placeholder="Enter last name..." required />
			<TextInput labelText="Email" placeholder="Enter user name..." required />
		</Form> -->
		<!-- </TabContent>
			</svelte:fragment>
		</Tabs> -->
		<!-- </Tile> -->
	</Column>
	<Column />
	<Column />
</Row>
