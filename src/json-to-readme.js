const handlebars = require('handlebars');
const slugify = require('slugify');
const groupBy = require('handlebars-group-by');

// Set up handlebars
handlebars.registerHelper('slugify', (str) => slugify(str, '-'));
handlebars.registerHelper(groupBy(handlebars));
handlebars.registerHelper('capitalize', function (str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
});


// Generate!
module.exports.generateReadme = function (template, snippets) {
	return handlebars.compile(template)({snippets});
};
