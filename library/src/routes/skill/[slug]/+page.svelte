<script>
	import { base } from '$app/paths';
	import Markdown from '$lib/Markdown.svelte';

	let { data } = $props();
	let skill = $derived(data.skill);
	let expandedRef = $state(null);

	function toggle(slug) {
		expandedRef = expandedRef === slug ? null : slug;
	}
</script>

<svelte:head>
	<title>{skill.name} — The Library of Byron</title>
</svelte:head>

<nav class="breadcrumb">
	<a href="{base}/">← Back to Library</a>
</nav>

<article>
	<header class="skill-header">
		<h1>{skill.name}</h1>
		<span class="version">v{skill.version}</span>
	</header>

	<p class="description">{skill.description}</p>

	<section class="content">
		<Markdown source={skill.content} />
	</section>

	{#if skill.references.length > 0}
		<section class="references">
			<h2>References ({skill.references.length})</h2>
			{#each skill.references as ref}
				<div class="ref-item" class:expanded={expandedRef === ref.slug}>
					<button class="ref-toggle" onclick={() => toggle(ref.slug)}>
						<span class="ref-icon">{expandedRef === ref.slug ? '▾' : '▸'}</span>
						<span class="ref-name">{ref.slug.replace(/-/g, ' ')}</span>
						<span class="ref-file">{ref.filename}</span>
					</button>
					{#if expandedRef === ref.slug}
						<div class="ref-content">
							<Markdown source={ref.content} />
						</div>
					{/if}
				</div>
			{/each}
		</section>
	{/if}
</article>

<style>
	.breadcrumb {
		margin-bottom: 2rem;
		font-size: 0.9rem;
	}
	.skill-header {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	h1 {
		color: var(--accent);
		font-size: 2rem;
	}
	.version {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.85rem;
	}
	.description {
		color: var(--text-muted);
		font-size: 0.95rem;
		margin-bottom: 2rem;
		line-height: 1.6;
	}
	.content {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--border);
	}
	.references h2 {
		color: var(--accent);
		font-size: 1.3rem;
		margin-bottom: 1rem;
	}
	.ref-item {
		border: 1px solid var(--border);
		border-radius: 6px;
		margin-bottom: 0.5rem;
		overflow: hidden;
	}
	.ref-item.expanded {
		border-color: var(--accent-dim);
	}
	.ref-toggle {
		width: 100%;
		background: var(--bg-card);
		border: none;
		color: var(--text);
		padding: 0.75rem 1rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-family: var(--font-body);
		font-size: 0.95rem;
		text-align: left;
	}
	.ref-toggle:hover { background: var(--bg-hover); }
	.ref-icon { color: var(--accent); font-size: 0.8rem; }
	.ref-name { flex: 1; text-transform: capitalize; }
	.ref-file {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.75rem;
	}
	.ref-content {
		padding: 1.5rem;
		border-top: 1px solid var(--border);
		background: var(--bg);
	}
</style>
