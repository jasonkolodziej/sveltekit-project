<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { preloadData, pushState, goto } from '$app/navigation';
	import { expoIn } from 'svelte/easing';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	import Header from '$lib/components/header/Header.svelte';
	import {
		Content,
		Grid,
		Theme,
		HeaderGlobalAction,
		HeaderAction,
		HeaderPanelDivider,
		HeaderPanelLink
	} from 'carbon-components-svelte';
	import type { HeaderProps } from 'carbon-components-svelte/src/UIShell/Header.svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';

	import { Logout, UserAvatarFilledAlt } from 'carbon-icons-svelte';

	export let data: LayoutData;
	export const transition = { duration: 600, delay: 50, easing: expoIn };
	let sideMenu = data.sections;
	let headMenu = data.sections;
	let isOpen = false;
	let headerVals: HeaderProps = {
		company: 'International',
		platformName: 'Business of Music',
		persistentHamburgerMenu: true,
		href: '/'
	};
	// console.log(data.session);
</script>

<Theme
	theme="white"
	tokens={{
		'background-color': '#d02670'
	}}
>
	<Header {headerVals} {sideMenu} {headMenu}>
		<!-- TODO: if logged in? -->
		<svelte:fragment slot="headerGlobalAction">
			{#if data.session === null}
				<!-- * Not Signed in -->
				<HeaderGlobalAction
					iconDescription="Account"
					tooltipAlignment="end"
					icon={UserAvatarFilledAlt}
					on:click={(e) => {
						e.preventDefault();
						goto('/auth');
					}}
				/>
			{:else}
				<!-- * Signed in -->
				<HeaderGlobalAction
					iconDescription="Log out"
					icon={Logout}
					on:click={(e) => {
						e.preventDefault();
						signOut();
					}}
				/>
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="headerAction">
			{#if data.session !== null}
				<!-- * Signed in -->
				<HeaderAction
					bind:isOpen
					icon={UserAvatarFilledAlt}
					text="User"
					closeIcon={UserAvatarFilledAlt}
					{transition}
				/>
			{/if}
		</svelte:fragment>
	</Header>
</Theme>

<Content>
	<!--    <div class="submenu">-->
	<!--        {#each data.sections as section}-->
	<!--            <a href="/settings/{section.slug}">{section.title}</a>-->
	<!--        {/each}-->
	<!--    </div>-->
	<Grid fullWidth>
		<slot />
	</Grid>
</Content>
