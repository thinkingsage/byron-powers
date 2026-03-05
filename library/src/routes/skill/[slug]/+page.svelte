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
					<button 
						class="ref-toggle" 
						onclick={() => toggle(ref.slug)}
						aria-expanded={expandedRef === ref.slug}
					>
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
	/* Breadcrumb with pill/chip treatment */
	.breadcrumb {
		margin-block-end: var(--space-xl);
	}
	.breadcrumb a {
		display: inline-block;
		background: var(--bg-surface);
		color: var(--text-secondary);
		padding-block: var(--space-xs);
		padding-inline: var(--space-md);
		border-radius: 999px;
		font-size: clamp(0.8125rem, 1.5vw, 0.875rem);
		border: 1px solid var(--border-default);
		transition: all var(--duration-fast) var(--ease-out);
	}
	.breadcrumb a:hover {
		background: var(--bg-surface-alt);
		color: var(--accent-primary);
		border-color: var(--accent-muted);
		text-decoration: none;
		transform: translateX(-2px);
	}
	
	/* Prominent hero-like header area */
	.skill-header {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		margin-block-end: var(--space-lg);
		padding-block: var(--space-xl) var(--space-xl);
		border-block-end: 2px solid var(--border-default);
	}
	h1 {
		color: var(--text-primary);
		font-family: var(--font-display);
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.2;
	}
	
	/* Version pill consistent with skill card badge */
	.version {
		display: inline-flex;
		align-items: center;
		background: var(--accent-glow);
		color: var(--accent-primary);
		font-family: var(--font-mono);
		font-size: clamp(0.7rem, 1.5vw, 0.75rem);
		font-weight: 500;
		padding-block: var(--space-xs);
		padding-inline: var(--space-sm);
		border-radius: 999px;
		border: 1px solid var(--accent-muted);
		white-space: nowrap;
	}
	
	.description {
		color: var(--text-secondary);
		font-size: clamp(1rem, 2vw, 1.125rem);
		line-height: 1.7;
		margin-block-end: var(--space-2xl);
		max-inline-size: 70ch;
	}
	
	/* Visual separation between primary content and reference section */
	.content {
		margin-block-end: var(--space-3xl);
		padding-block-end: var(--space-2xl);
		border-block-end: 2px solid var(--border-default);
		background: linear-gradient(to bottom, transparent, var(--bg-subtle) 100%);
		padding-block-start: var(--space-lg);
		border-radius: 8px;
	}
	
	.references {
		margin-block-start: var(--space-3xl);
	}
	.references h2 {
		color: var(--text-primary);
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 2.5vw, 1.5rem);
		font-weight: 600;
		margin-block-end: var(--space-lg);
		padding-block-end: var(--space-md);
		border-block-end: 1px solid var(--border-subtle);
	}
	.ref-item {
		border: 1px solid var(--border-default);
		border-radius: 8px;
		margin-block-end: var(--space-sm);
		overflow: hidden;
		transition: all var(--duration-normal) var(--ease-out);
	}
	.ref-item.expanded {
		border-color: var(--accent-muted);
		box-shadow: 0 0 0 1px var(--accent-glow);
	}
	.ref-toggle {
		inline-size: 100%;
		background: var(--bg-surface);
		border: none;
		color: var(--text-primary);
		padding-block: var(--space-md);
		padding-inline: var(--space-lg);
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: var(--space-md);
		font-family: var(--font-body);
		font-size: clamp(0.875rem, 1.5vw, 0.95rem);
		text-align: start;
		transition: background var(--duration-fast) var(--ease-out);
	}
	.ref-toggle:hover { 
		background: var(--bg-surface-alt);
	}
	.ref-toggle:focus-visible {
		outline: 2px solid var(--accent-primary);
		outline-offset: -2px;
	}
	.ref-icon { 
		color: var(--accent-primary);
		font-size: clamp(0.8125rem, 1.5vw, 0.875rem);
		transition: transform var(--duration-normal) var(--ease-out);
		display: inline-block;
	}
	.ref-item.expanded .ref-icon {
		transform: rotate(90deg);
	}
	.ref-name { 
		flex: 1;
		text-transform: capitalize;
		font-weight: 500;
	}
	.ref-file {
		color: var(--text-tertiary);
		font-family: var(--font-mono);
		font-size: clamp(0.7rem, 1.5vw, 0.75rem);
	}
	.ref-content {
		padding: var(--space-xl);
		border-block-start: 1px solid var(--border-default);
		background: var(--bg-subtle);
		animation: expandContent var(--duration-normal) var(--ease-out);
		transform-origin: top;
	}
	
	@keyframes expandContent {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	/* Respect user motion preferences */
	@media (prefers-reduced-motion: reduce) {
		.ref-content {
			animation: none;
		}
		.ref-icon {
			transition: none;
		}
		.ref-item {
			transition: none;
		}
		.ref-toggle {
			transition: none;
		}
	}
</style>
