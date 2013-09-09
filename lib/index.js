/**
  *
  * Duct main file
  */

var Duct = module.exports = {};

// Collection to be extended in your application
Duct.Collection = require('./duct/collection');

// Model Instance, returned as query results
Duct.Model = require('./duct/model');
