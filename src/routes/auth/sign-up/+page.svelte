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
	let selectedTab: number = 1;
</script>

<Tabs bind:selected={selectedTab}>
	<Tab
		label="Sign in"
		href="/auth/sign-in"
		on:click={(e) => {
			goto('/auth/sign-in');
		}}
	/>
	<Tab
		label="Sign up"
		href="/auth/sign-up"
		on:click={(e) => {
			goto('/auth/sign-up');
		}}
	/>
	<!-- Tab Panels --->
	<svelte:fragment slot="content">
		<!-- {#if tabSet === ''} -->
		<TabContent><SignIn {data} /></TabContent>
		<!-- <SignIn {data} /> -->
		<!-- {:else if tabSet === 'signUp'} -->
		<!-- <SignUp {data} /> -->
		<TabContent><SignUp {data} /></TabContent>
		<!-- {/if} -->
	</svelte:fragment>
</Tabs>
