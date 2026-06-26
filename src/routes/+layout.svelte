<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon_48x48.svg';

	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Header />
{@render children()}
