<script lang="ts">
	import {
		SelectableTile,
		InlineLoading,
		FileUploaderItem,
		ImageLoader
	} from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import type { RouteParams } from './$types';
	import MediaItem from '$lib/components/media/MediaItem.svelte';
	import type { UploadedFile } from '$lib/components/media/File';

	export let media: UploadedFile;
	$: console.log('photos', $page.data);
</script>

<MediaItem {media} />
