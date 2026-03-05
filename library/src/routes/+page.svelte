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
		gap: var(--space-lg);
		width: 100%;
	}
	
	.card {
		background: var(--bg-surface);
		border: 1px solid var(--border-default);
		border-radius: 8px;
		padding: var(--space-lg);
		transition: transform var(--duration-normal) var(--ease-out),
		            box-shadow var(--duration-normal) var(--ease-out),
		            border-color var(--duration-fast) var(--ease-out), 
		            background var(--duration-fast) var(--ease-out);
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: var(--text-primary);
		position: relative;
		overflow: hidden;
		/* Reserve minimum height to prevent layout shift */
		min-block-size: 200px;
		/* Staggered fade-in entrance animation */
		opacity: 0;
		animation: fadeIn var(--duration-normal) var(--ease-out) forwards;
	}
	
	/* Staggered animation delays for each card */
	.card:nth-child(1) { animation-delay: 0ms; }
	.card:nth-child(2) { animation-delay: 50ms; }
	.card:nth-child(3) { animation-delay: 100ms; }
	.card:nth-child(4) { animation-delay: 150ms; }
	.card:nth-child(5) { animation-delay: 200ms; }
	.card:nth-child(6) { animation-delay: 250ms; }
	.card:nth-child(7) { animation-delay: 300ms; }
	.card:nth-child(8) { animation-delay: 350ms; }
	.card:nth-child(9) { animation-delay: 400ms; }
	.card:nth-child(n+10) { animation-delay: 450ms; }
	
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	/* Respect user motion preferences */
	@media (prefers-reduced-motion: reduce) {
		.card {
			animation: none;
			opacity: 1;
		}
	}
	
	/* Decorative accent element - top border */
	.card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--accent-primary), var(--accent-muted));
		opacity: 0.6;
		transition: opacity var(--duration-fast) var(--ease-out);
	}
	
	.card:hover::before {
		opacity: 1;
	}
	
	.card:hover {
		border-color: var(--accent-muted);
		background: var(--bg-surface-alt);
		text-decoration: none;
		/* Vertical translate lift and expanded shadow */
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4),
		            0 0 0 1px var(--accent-glow);
	}
	
	/* Keyboard focus indicator with WCAG AA contrast */
	.card:focus {
		outline: none;
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 3px var(--accent-glow),
		            0 4px 12px rgba(0, 0, 0, 0.3);
	}
	
	.card:focus:not(:focus-visible) {
		outline: none;
		border-color: var(--border-default);
		box-shadow: none;
	}
	
	.card:focus-visible {
		outline: none;
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 3px var(--accent-glow),
		            0 4px 12px rgba(0, 0, 0, 0.3);
	}
	
	/* Disable transform on hover for reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		.card:hover {
			transform: none;
		}
	}
	
	h2 {
		color: var(--accent-primary);
		font-size: clamp(1.125rem, 2vw, 1.25rem);
		margin-block-end: var(--space-xs);
		font-family: var(--font-display);
		font-weight: 600;
	}
	
	/* Version badge with pill treatment */
	.version {
		display: inline-block;
		background: var(--accent-glow);
		color: var(--accent-primary);
		font-size: clamp(0.7rem, 1.5vw, 0.75rem);
		font-family: var(--font-mono);
		padding-block: var(--space-xs);
		padding-inline: var(--space-sm);
		border-radius: 12px;
		margin-block-end: var(--space-md);
		font-weight: 500;
		border: 1px solid var(--accent-muted);
	}
	
	.desc {
		font-size: clamp(0.875rem, 1.5vw, 0.9rem);
		color: var(--text-secondary);
		flex: 1;
		line-height: 1.6;
		margin-block-end: var(--space-md);
	}
	
	.meta { 
		margin-block-start: auto;
		padding-block-start: var(--space-sm);
	}
	
	/* Reference count badge with distinct visual treatment */
	.badge {
		display: inline-block;
		background: var(--bg-subtle);
		color: var(--text-secondary);
		padding-block: var(--space-xs);
		padding-inline: var(--space-sm);
		border-radius: 6px;
		font-size: clamp(0.7rem, 1.5vw, 0.75rem);
		font-family: var(--font-body);
		font-weight: 500;
		border: 1px solid var(--border-subtle);
	}
	
	/* Responsive adjustments */
	@media (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
			gap: var(--space-md);
		}
	}
	
	@media (min-width: 769px) and (max-width: 1024px) {
		.grid {
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		}
	}
	
	@media (min-width: 1440px) {
		.grid {
			grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		}
	}
</style>
