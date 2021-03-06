const Ajv = require('ajv');
const pointer = require('json-pointer');
const ajv = new Ajv({jsonPointers: true});


module.exports = function validateSnippets(snippets, schema) {
	const validate = ajv.compile(schema);
	const errors = [];

	snippets.forEach(snippet => {
		function logError(error) {
			errors.push(`⚠️ snippet '${snippet.title}': ${error}`);
		}


		if (!validate(snippet)) {
			for (const error of validate.errors) {
				const errorKey = `/properties${error.dataPath}/message/${error.keyword}`;
				const message = pointer.has(schema, errorKey) ? pointer.get(schema, errorKey) : error.message;
				logError(message);
			}
		}
	});

	if (errors.length > 0) {
		console.log('----------- Following errors found when validating snippets');
		errors.forEach(error => console.error(error));
		console.log('-----------');
		throw new Error('Error validating snippets')
	}
};
