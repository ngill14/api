var mongo = require('mongodb').MongoClient;
var mongoURL = 'mongodb://127.0.0.1:27017/kb';

exports.indexPage = function(req, res) {
  res.render('index', { title: 'Accredited Schools List' });
};

exports.getSchools = function(req, res) {
	mongo.connect(mongoURL, function (err, db) {
    if (err) {
      throw err;
    } else {
      console.log('Successfully Connected to the Database');
    }
    var schools = db.collection('schools');
		schools.find({},{ _id: 0}).toArray(function(err, results) {
  		res.json(results);
			db.close();
  	});
	});
};

exports.schoolByName = function(req, res) {
  mongo.connect(mongoURL, function (err, db) {
    if (err) {
      throw err;
    } else {
      console.log('Successfully Connected to the Database');
    }
    var schools = db.collection('schools');
    schools.find({schoolName: req.params.schoolName},{ _id: 0}).toArray(function(err, results) {
      res.json(results);
      db.close();
    });
  });
};

exports.schoolNameContaining = function(req, res) {
  mongo.connect(mongoURL, function (err, db) {
    if (err) {
      throw err;
    } else {
      console.log('Successfully Connected to the Database');
    }
    var find = req.params.partial;
    var schools = db.collection('schools');   
    schools.find({schoolName: {$regex: find, $options: "si"}},{ _id: 0}).toArray(function(err, results) {
      res.json(results);
      db.close();
    });
  });
};
