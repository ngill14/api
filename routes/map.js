var api = require('../api');

module.exports = function(app) {
	app.get('/_/schools', api.getSchools); // Get list of all school.
	app.get('/_/schools/name/:schoolName', api.schoolByName); // Get a school by name.
	app.get('/_/schools/:partial', api.schoolNameContaining); // Get list of schools with given containing string.


	app.get('/policy', api.policy); // Private Policy
	app.get('/', api.indexPage); // Index
};
