<script>
	import { marked } from 'marked';

	// Configure marked to add rel="noopener noreferrer" to external links
	const renderer = new marked.Renderer();
	const originalLinkRenderer = renderer.link.bind(renderer);
	
	renderer.link = (token) => {
		const html = originalLinkRenderer(token);
		const href = token.href;
		// Add rel="noopener noreferrer" to external links (starting with http:// or https://)
		if (href && typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'))) {
			return html.replace('<a', '<a rel="noopener noreferrer"');
		}
		return html;
	};

	marked.setOptions({ renderer });

	let { source = '' } = $props();
	let html = $derived(marked.parse(source));
</script>

<div class="prose">
	{@html html}
</div>

<style>
	/* Custom text selection styling with accent color */
	.prose :global(::selection) {
		background: var(--accent-glow);
		color: var(--accent-primary);
	}

	/* Heading hierarchy with distinct size, weight, and spacing */
	.prose :global(h1),
	.prose :global(h2),
	.prose :global(h3) {
		font-family: var(--font-display);
		color: var(--accent-primary);
		font-weight: 600;
		line-height: 1.3;
		letter-spacing: -0.02em;
	}

	.prose :global(h1) {
		font-size: clamp(1.75rem, 4vw, 2.25rem);
		margin-block-start: var(--space-2xl);
		margin-block-end: var(--space-lg);
	}

	.prose :global(h2) {
		font-size: clamp(1.5rem, 3vw, 1.75rem);
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-md);
	}

	.prose :global(h3) {
		font-size: clamp(1.25rem, 2.5vw, 1.375rem);
		margin-block-start: var(--space-lg);
		margin-block-end: var(--space-sm);
	}

	/* First heading has no top margin */
	.prose :global(h1:first-child),
	.prose :global(h2:first-child),
	.prose :global(h3:first-child) {
		margin-block-start: 0;
	}

	.prose :global(p) {
		margin-block-end: var(--space-md);
		line-height: 1.7;
	}

	/* Lists with refined bullet/number styling and consistent indentation */
	.prose :global(ul),
	.prose :global(ol) {
		margin-block-end: var(--space-md);
		padding-inline-start: var(--space-lg);
		line-height: 1.7;
	}

	.prose :global(ul) {
		list-style-type: none;
	}

	.prose :global(ul > li) {
		position: relative;
		padding-inline-start: var(--space-sm);
		margin-block-end: var(--space-xs);
	}

	/* Custom bullet styling for unordered lists */
	.prose :global(ul > li::before) {
		content: '•';
		position: absolute;
		inset-inline-start: calc(-1 * var(--space-sm));
		color: var(--accent-muted);
		font-weight: 600;
		font-size: 1.2em;
		line-height: 1.4;
	}

	.prose :global(ol) {
		list-style-type: none;
		counter-reset: list-counter;
	}

	.prose :global(ol > li) {
		position: relative;
		padding-inline-start: var(--space-sm);
		margin-block-end: var(--space-xs);
		counter-increment: list-counter;
	}

	/* Custom number styling for ordered lists */
	.prose :global(ol > li::before) {
		content: counter(list-counter) '.';
		position: absolute;
		inset-inline-start: calc(-1 * var(--space-md));
		color: var(--accent-muted);
		font-weight: 600;
		font-family: var(--font-display);
	}

	/* Nested lists */
	.prose :global(li > ul),
	.prose :global(li > ol) {
		margin-block-start: var(--space-xs);
		margin-block-end: var(--space-xs);
	}

	/* Inline code with refined styling */
	.prose :global(code) {
		background: var(--bg-surface);
		color: var(--accent-primary);
		padding-block: 0.2rem;
		padding-inline: 0.5rem;
		border-radius: 4px;
		font-family: var(--font-mono);
		font-size: clamp(0.8125rem, 1.5vw, 0.875em);
		border: 1px solid var(--border-subtle);
	}

	/* Code blocks with polished treatment */
	.prose :global(pre) {
		background: var(--bg-surface);
		border: 1px solid var(--border-default);
		border-radius: 6px;
		padding: var(--space-md);
		overflow-x: auto;
		margin-block-end: var(--space-md);
		position: relative;
		/* Subtle top-border accent for visual polish */
		border-block-start: 2px solid var(--accent-muted);
		/* Add subtle shadow for depth */
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}

	.prose :global(pre code) {
		background: none;
		padding: 0;
		border: none;
		color: var(--text-primary);
	}

	.prose :global(strong) {
		color: var(--text-primary);
		font-weight: 600;
	}

	.prose :global(hr) {
		border: none;
		border-block-start: 1px solid var(--border-default);
		margin-block: var(--space-xl);
	}

	/* Blockquotes with left-border accent and subtle background */
	.prose :global(blockquote) {
		border-inline-start: 4px solid var(--accent-muted);
		background: var(--bg-subtle);
		padding: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--text-secondary);
		margin-block-end: var(--space-md);
		border-radius: 4px;
		font-style: italic;
	}

	.prose :global(blockquote p:last-child) {
		margin-block-end: 0;
	}

	/* Tables with alternating row backgrounds and consistent cell padding */
	.prose :global(table) {
		inline-size: 100%;
		border-collapse: collapse;
		margin-block-end: var(--space-md);
		border: 1px solid var(--border-default);
		border-radius: 6px;
		overflow: hidden;
		/* Ensure table doesn't break layout - wrap in scrollable container */
		display: block;
		overflow-x: auto;
		max-inline-size: 100%;
	}

	.prose :global(thead) {
		background: var(--bg-surface);
		border-block-end: 2px solid var(--accent-muted);
	}

	.prose :global(th) {
		padding-block: var(--space-sm);
		padding-inline: var(--space-md);
		text-align: start;
		font-weight: 600;
		color: var(--accent-primary);
		font-family: var(--font-display);
		font-size: clamp(0.8125rem, 1.5vw, 0.875rem);
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	.prose :global(td) {
		padding-block: var(--space-sm);
		padding-inline: var(--space-md);
		border-block-start: 1px solid var(--border-subtle);
		color: var(--text-primary);
	}

	/* Alternating row backgrounds for better readability */
	.prose :global(tbody tr:nth-child(even)) {
		background: var(--bg-subtle);
	}

	.prose :global(tbody tr:nth-child(odd)) {
		background: var(--bg-base);
	}

	/* Hover state for table rows */
	.prose :global(tbody tr:hover) {
		background: var(--bg-surface-alt);
		transition: background var(--duration-fast) var(--ease-out);
	}
</style>
