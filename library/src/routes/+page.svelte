<script>
	import skills from '$lib/data/skills.json';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>The Library of Byron</title>
</svelte:head>

<section class="grid">
	{#each skills as skill}
		<a href="{base}/skill/{skill.slug}" class="card">
			<h2>{skill.name}</h2>
			<p class="version">v{skill.version}</p>
			<p class="desc">{skill.description.slice(0, 140)}{skill.description.length > 140 ? '…' : ''}</p>
			<div class="meta">
				{#if skill.referenceCount > 0}
					<span class="badge">{skill.referenceCount} references</span>
				{/if}
			</div>
		</a>
	{/each}
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
	}
	.card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.5rem;
		transition: border-color 0.2s, background 0.2s;
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: var(--text);
	}
	.card:hover {
		border-color: var(--accent-dim);
		background: var(--bg-hover);
		text-decoration: none;
	}
	h2 {
		color: var(--accent);
		font-size: 1.25rem;
		margin-bottom: 0.25rem;
	}
	.version {
		color: var(--text-muted);
		font-size: 0.8rem;
		font-family: var(--font-mono);
		margin-bottom: 0.75rem;
	}
	.desc {
		font-size: 0.9rem;
		color: var(--text-muted);
		flex: 1;
		line-height: 1.5;
	}
	.meta { margin-top: 1rem; }
	.badge {
		background: var(--border);
		color: var(--text-muted);
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-family: var(--font-mono);
	}
</style>
