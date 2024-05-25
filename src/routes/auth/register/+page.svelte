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
	// export let data;
	// $: console.log(data.form);
</script>

<Form let:message let:superform data={$page.data.form} action="?/register">
	<FormGroup>
		<InputField
			{superform}
			{message}
			field="firstName"
			labelText="First name"
			placeholder="Enter first name..."
		/>
	</FormGroup>
	<FormGroup>
		<InputField
			{message}
			{superform}
			field="lastName"
			labelText="Last name"
			placeholder="Enter last name..."
		/>
	</FormGroup>
	<FormGroup>
		<InputField
			{message}
			{superform}
			field="email"
			labelText="Email"
			placeholder="Enter user name..."
		/>
	</FormGroup>
	<FormGroup>
		<InputField
			{message}
			{superform}
			field="password"
			labelText="Password"
			placeholder="Enter password..."
		/>
	</FormGroup>
	<FormGroup>
		<InputField
			{message}
			{superform}
			field="confirmPassword"
			labelText="Confirm Password"
			placeholder="Please confirm password..."
		/>
	</FormGroup>
	<FormGroup>
		<InputField
			{message}
			{superform}
			field="terms"
			labelText="I agree to the terms and privacy policy."
		/>
	</FormGroup>
	<Button type="submit" icon={ArrowRight} kind="primary">Register</Button>
</Form>
