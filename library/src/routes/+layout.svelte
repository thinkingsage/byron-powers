<script>
	import '../app.css';
	import { base } from '$app/paths';
	let { children } = $props();
</script>

<div class="shell">
	<header>
		<a href="{base}/" class="logo">📚 The Library of Byron</a>
		<p class="tagline">A browsable collection of Kiro Skills</p>
	</header>
	<main>
		{@render children()}
	</main>
	<footer>
		<p>© {new Date().getFullYear()} Steven J. Miklovic | <a href="https://sxs.io" target="_blank" rel="noopener noreferrer">sxs.io</a></p>
		<p class="tech">Built with SvelteKit · Deployed on GitHub Pages</p>
	</footer>
</div>

<style>
	.shell {
		max-width: 1080px;
		margin: 0 auto;
		padding: 0;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	
	header {
		text-align: center;
		padding-block: var(--space-2xl) var(--space-xl);
		padding-inline: var(--space-lg);
		margin-block-end: var(--space-2xl);
		background: linear-gradient(
			180deg,
			var(--bg-subtle) 0%,
			var(--bg-base) 100%
		);
		border-block-end: 2px solid var(--border-default);
		position: relative;
	}
	
	header::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			var(--accent-primary) 50%,
			transparent 100%
		);
		opacity: 0.6;
	}
	
	.logo {
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 700;
		color: var(--accent-primary);
		text-decoration: none;
		letter-spacing: 0.08em;
		display: inline-block;
		transition: transform var(--duration-fast) var(--ease-out),
		            color var(--duration-fast) var(--ease-out);
	}
	
	.logo:hover {
		text-decoration: none;
		transform: translateY(-2px);
		color: var(--accent-muted);
	}
	
	.tagline {
		color: var(--text-secondary);
		margin-block-start: var(--space-sm);
		font-style: italic;
		font-size: clamp(0.875rem, 2vw, 1rem);
	}
	
	main {
		flex: 1;
		padding-block: 0 var(--space-xl);
		padding-inline: var(--space-lg);
	}
	
	footer {
		text-align: center;
		margin-block-start: var(--space-2xl);
		padding-block: var(--space-xl);
		padding-inline: var(--space-lg);
		border-block-start: 1px solid var(--border-default);
		background: var(--bg-subtle);
		color: var(--text-secondary);
		font-size: clamp(0.8125rem, 1.5vw, 0.875rem);
	}
	
	footer p {
		margin-block-end: var(--space-xs);
	}
	
	footer p:last-child {
		margin-block-end: 0;
	}
	
	footer a {
		color: var(--accent-primary);
		transition: color var(--duration-fast) var(--ease-out);
	}
	
	footer a:hover {
		color: var(--accent-muted);
	}
	
	footer .tech {
		color: var(--text-tertiary);
		font-size: clamp(0.75rem, 1.5vw, 0.8125rem);
	}
	
	/* Responsive adjustments for viewport breakpoints */
	@media (max-width: 768px) {
		header {
			padding-block: var(--space-xl) var(--space-lg);
			padding-inline: var(--space-md);
			margin-block-end: var(--space-xl);
		}
		
		.logo {
			font-size: clamp(1.5rem, 6vw, 2rem);
			letter-spacing: 0.06em;
		}
		
		main {
			padding-block: 0 var(--space-lg);
			padding-inline: var(--space-md);
		}
		
		footer {
			padding-block: var(--space-lg);
			padding-inline: var(--space-md);
			margin-block-start: var(--space-xl);
		}
	}
	
	@media (max-width: 320px) {
		header {
			padding-block: var(--space-lg) var(--space-md);
			padding-inline: var(--space-sm);
		}
		
		.logo {
			font-size: 1.25rem;
			letter-spacing: 0.04em;
		}
		
		main {
			padding-block: 0 var(--space-md);
			padding-inline: var(--space-sm);
		}
		
		footer {
			padding-block: var(--space-md);
			padding-inline: var(--space-sm);
		}
	}
	
	@media (min-width: 1024px) {
		header {
			padding-block: var(--space-3xl) var(--space-2xl);
			padding-inline: var(--space-xl);
		}
	}
	
	@media (min-width: 1440px) {
		.shell {
			padding-inline: var(--space-lg);
		}
	}
	
	/* Respect user motion preferences */
	@media (prefers-reduced-motion: reduce) {
		.logo {
			transition: none;
		}
		
		.logo:hover {
			transform: none;
		}
	}
</style>
