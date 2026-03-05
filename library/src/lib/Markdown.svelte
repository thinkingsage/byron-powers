<script>
	import { marked } from 'marked';

	let { source = '' } = $props();
	let html = $derived(marked.parse(source));
</script>

<div class="prose">
	{@html html}
</div>

<style>
	.prose :global(h1),
	.prose :global(h2),
	.prose :global(h3) {
		color: var(--accent);
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}
	.prose :global(h1) { font-size: 1.6rem; }
	.prose :global(h2) { font-size: 1.3rem; }
	.prose :global(h3) { font-size: 1.1rem; }
	.prose :global(p) {
		margin-bottom: 1rem;
	}
	.prose :global(ul),
	.prose :global(ol) {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}
	.prose :global(li) {
		margin-bottom: 0.35rem;
	}
	.prose :global(code) {
		background: var(--border);
		padding: 0.15rem 0.4rem;
		border-radius: 3px;
		font-family: var(--font-mono);
		font-size: 0.85em;
	}
	.prose :global(pre) {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 1rem;
		overflow-x: auto;
		margin-bottom: 1rem;
	}
	.prose :global(pre code) {
		background: none;
		padding: 0;
	}
	.prose :global(strong) {
		color: var(--text);
	}
	.prose :global(hr) {
		border: none;
		border-top: 1px solid var(--border);
		margin: 2rem 0;
	}
	.prose :global(blockquote) {
		border-left: 3px solid var(--accent-dim);
		padding-left: 1rem;
		color: var(--text-muted);
		margin-bottom: 1rem;
	}
</style>
