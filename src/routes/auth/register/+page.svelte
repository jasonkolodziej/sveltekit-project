<script lang="ts">
	import {
		Row,
		Column,
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
		Link,
		PasswordInput
	} from 'carbon-components-svelte';
	import { ArrowRight } from 'carbon-icons-svelte';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import InputField from '$lib/components/inputField/InputField.svelte';
	export let data;
	$: console.log(data.form);
</script>

<Form let:message let:superform data={$page.data.form} action="?/register">
	<FormGroup>
		<InputField
			{superform}
			field="firstName"
			labelText="First name"
			placeholder="Enter first name..."
		/>
	</FormGroup>
	<FormGroup>
		<InputField
			{superform}
			field="lastName"
			labelText="Last name"
			placeholder="Enter last name..."
			required
		/>
	</FormGroup>
	<FormGroup>
		<InputField
			{superform}
			field="email"
			labelText="Email"
			placeholder="Enter user name..."
			required
		/>
	</FormGroup>
	<FormGroup>
		<InputField
			{superform}
			field="password"
			labelText="Password"
			placeholder="Enter password..."
			required
		/>
	</FormGroup>
	<FormGroup>
		<InputField
			{superform}
			field="confirmPassword"
			labelText="Confirm Password"
			placeholder="Please confirm password..."
			required
		/>
	</FormGroup>
	<Button type="submit" icon={ArrowRight} kind="primary">Register</Button>
</Form>
