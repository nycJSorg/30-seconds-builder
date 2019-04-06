#!/usr/bin/env node
const path = require("path");
const {generateReadme} = require("./json-to-readme");
const {mdFolderToJSON} = require("./md-to-json");
const validateSnippets = require("./validate-json");
const {writeFileSync, readFileSync} = require("fs");
const cwd = process.cwd();

const paths = {
	snippets: path.join(cwd, "snippets"),
	data: path.join(cwd, "data"),
	templates: path.join(cwd, "templates"),
};

paths.dataJson = path.join(paths.data, 'data.snippets');
paths.dataFormattedJson = path.join(paths.data, 'data-formatted.snippets');
paths.readmeTemplate = path.join(paths.templates, 'README-template.md');


// Generate JSON
const snippets = mdFolderToJSON(paths.snippets);

// Validate JSON
validateSnippets(snippets);

// Write JSON
console.log(`generated ${snippets.length} snippets`);
writeFileSync(paths.dataJson, JSON.stringify(snippets));
writeFileSync(paths.dataFormattedJson, JSON.stringify(snippets, null, '  '));

const readmeTemplate = readFileSync(paths.readmeTemplate, 'UTF-8');

generateReadme(readmeTemplate, snippets);
//writeFileSync(readmePath, result);