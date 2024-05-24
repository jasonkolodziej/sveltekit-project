<script lang="ts">
	import {
		Row,
		Column,
		Form,
		FormGroup,
		TextInput,
		Button,
		Checkbox,
		Tooltip
	} from 'carbon-components-svelte';
	import { ArrowRight as Arrow } from 'carbon-icons-svelte';

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
	<Form on:submit>
		<FormGroup>
			<TextInput labelText="User name" placeholder="Enter user name..." required></TextInput>
		</FormGroup>
		<Button type="submit" icon={Arrow} action={signIn}>Sign In</Button>

		<FormGroup>
			<Checkbox labelText="Remember me" />
			<!-- <Tooltip>
				<p>
					You can opt to have your IBMid remembered the next time you access our website by checking
					the "Remember Me" box. If you do not wish to have your IBMid remembered the next time you
					access our website, leave the "Remember Me" box unchecked.
				</p>
			</Tooltip> -->
		</FormGroup>
	</Form>
</Row>
