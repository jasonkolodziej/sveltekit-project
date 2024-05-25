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

	import { Login, Logout, UserAvatarFilledAlt } from 'carbon-icons-svelte';

	export let data: LayoutData;
	export const transition = { duration: 600, delay: 50, easing: expoIn };
	// const time = new Date(Date.now());
	// const totalMinutes = time.getMinutes() + time.getHours() * 60;
	// const themeSundial =
	// 	totalMinutes >= 0 || 360 >= totalMinutes
	// 		? 'g100'
	// 		: totalMinutes > 360 || 648 >= totalMinutes
	// 			? 'g90'
	// 			: totalMinutes > 648 || 936 >= totalMinutes
	// 				? 'g80'
	// 				: totalMinutes > 936
	// 					? 'g10'
	// 					: 'white';

	let sideMenu = data.sections;
	let headMenu = data.sections;
	let isOpen = false;
	let headerVals: HeaderProps = {
		company: 'ASAD',
		platformName: '/ IN',
		persistentHamburgerMenu: true,
		href: '/'
	};
	// console.log(`totalMinutesToday: ${totalMinutes}, theme: ${themeSundial}`);
</script>

<!-- "white" "white" | "g10" | "g80" | "g90" | "g100"; -->
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
						goto('/auth/signIn');
					}}
				/>
			{:else}
				<!-- * Signed in -->
				<HeaderGlobalAction
					iconDescription="Sign out"
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
