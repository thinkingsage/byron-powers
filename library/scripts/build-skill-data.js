import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SKILLS_DIR = path.resolve('..', 'skills');
const OUT_FILE = path.resolve('src', 'lib', 'data', 'skills.json');

function readMarkdown(filePath) {
	const raw = fs.readFileSync(filePath, 'utf-8');
	const { data: frontmatter, content } = matter(raw);
	return { frontmatter, content: content.trim() };
}

function buildSkillData() {
	const skillDirs = fs.readdirSync(SKILLS_DIR).filter((d) =>
		fs.statSync(path.join(SKILLS_DIR, d)).isDirectory()
	);

	const skills = skillDirs.map((dir) => {
		const skillPath = path.join(SKILLS_DIR, dir, 'SKILL.md');
		if (!fs.existsSync(skillPath)) return null;

		const { frontmatter, content } = readMarkdown(skillPath);

		// Read references if they exist
		const refsDir = path.join(SKILLS_DIR, dir, 'references');
		let references = [];
		if (fs.existsSync(refsDir)) {
			references = fs.readdirSync(refsDir)
				.filter((f) => f.endsWith('.md'))
				.map((f) => {
					const ref = readMarkdown(path.join(refsDir, f));
					return {
						slug: f.replace('.md', ''),
						filename: f,
						frontmatter: ref.frontmatter,
						content: ref.content
					};
				});
		}

		return {
			slug: dir,
			name: frontmatter.name || dir,
			description: frontmatter.description || '',
			version: frontmatter.version || '0.0.0',
			content,
			referenceCount: references.length,
			references
		};
	}).filter(Boolean);

	fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
	fs.writeFileSync(OUT_FILE, JSON.stringify(skills, null, 2));
	console.log(`Built skill data: ${skills.length} skills, written to ${OUT_FILE}`);
}

buildSkillData();
