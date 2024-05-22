<script lang="ts">
	import SignUp from '$lib/signUp/sign-up.svelte';
	import SignIn from '$lib/signIn/sign-in.svelte';
	import { goto } from '$app/navigation';
	// import { i } from '@inlang/sdk-js';
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
	export let data;

	//let tab: string = $page.params.tab;
	//let tabSet: string = tab === 'sign-up' ? 'signUp' : 'signIn';
	let tabSet: string = 'signUp';
</script>

<Tabs justify="justify-center">
	<Tab bind:group={tabSet} name="signInTab" value={'signIn'}></Tab>
	<Tab bind:group={tabSet} name="signUpTab" value={'signUp'}></Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="content">
		{#if tabSet === 'signIn'}
			<TabContent><SignIn {data} /></TabContent>
			<!-- <SignIn {data} /> -->
		{:else if tabSet === 'signUp'}
			<!-- <SignUp {data} /> -->
			<TabContent><SignUp {data} /></TabContent>
		{/if}
	</svelte:fragment>
</Tabs>
