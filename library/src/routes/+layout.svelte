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
		<p>Built with SvelteKit · Deployed on GitHub Pages</p>
	</footer>
</div>

<style>
	.shell {
		max-width: 960px;
		margin: 0 auto;
		padding: 2rem 1.5rem;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	header {
		text-align: center;
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--border);
	}
	.logo {
		font-size: 2rem;
		color: var(--accent);
		text-decoration: none;
		letter-spacing: 0.02em;
	}
	.logo:hover { text-decoration: none; opacity: 0.9; }
	.tagline {
		color: var(--text-muted);
		margin-top: 0.5rem;
		font-style: italic;
	}
	main { flex: 1; }
	footer {
		text-align: center;
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border);
		color: var(--text-muted);
		font-size: 0.85rem;
	}
</style>
