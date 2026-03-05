import skills from '$lib/data/skills.json';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return skills.map((s) => ({ slug: s.slug }));
}

export function load({ params }) {
	const skill = skills.find((s) => s.slug === params.slug);
	if (!skill) throw error(404, 'Skill not found');
	return { skill };
}
