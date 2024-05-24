<script lang="ts">
	import { goto } from '$app/navigation';

	// import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import SignIn from '$lib/signIn/sign-in.svelte';
	import SignUp from '$lib/signUp/sign-up.svelte';
	// import { i } from '@inlang/sdk-js';
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
	export let data;
	let selectedTab: number = 0;
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
