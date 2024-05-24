<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { preloadData, pushState, goto } from '$app/navigation';
	import { expoIn } from 'svelte/easing';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	import Header from '$lib/header/Header.svelte';
	import {
		Content,
		Grid,
		Theme,
		HeaderAction,
		HeaderPanelDivider,
		HeaderPanelLink
	} from 'carbon-components-svelte';
	import type { HeaderProps } from 'carbon-components-svelte/src/UIShell/Header.svelte';

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
</script>

<Theme
	theme="white"
	tokens={{
		'background-color': '#d02670'
	}}
>
	<Header {headerVals} {sideMenu} {headMenu}>
		<!-- TODO: if logged in? -->
		<svelte:fragment slot="headerAction">
			{#if $page.data.session}
				<!-- * Signed in -->
				<HeaderAction
					bind:isOpen
					icon={UserAvatarFilledAlt}
					iconDescription="Account"
					closeIcon={UserAvatarFilledAlt}
					{transition}
				/>
				<HeaderAction tooltipAlignment="end" iconDescription="Log out" icon={Logout} />
			{:else}
				<!-- * Not Signed in -->
				<HeaderAction
					icon={UserAvatarFilledAlt}
					iconDescription="Account"
					on:click={goto('/auth')}
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
