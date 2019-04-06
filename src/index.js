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
	readmePath:  path.join(cwd, 'data-schema.json')
};

paths.dataJson = path.join(paths.data, 'data.snippets');
paths.dataFormattedJson = path.join(paths.data, 'data-formatted.snippets');
paths.readmeTemplate = path.join(paths.templates, 'README-template.md');
paths.dataSchema = path.join(paths.data, 'data-schema.json');


// Generate JSON
const snippets = mdFolderToJSON(paths.snippets);

// Validate JSON
const schema = require(paths.dataSchema).schema;
validateSnippets(snippets, schema);

// Write JSON
console.log(`generated ${snippets.length} snippets`);
writeFileSync(paths.dataJson, JSON.stringify(snippets));
writeFileSync(paths.dataFormattedJson, JSON.stringify(snippets, null, '  '));

// Generate Readme
const readmeTemplate = readFileSync(paths.readmeTemplate, 'UTF-8');
const readme = generateReadme(readmeTemplate, snippets);
writeFileSync(paths.readmePath, readme);
