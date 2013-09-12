/**
  * Build a collection with Mongoose here.
  */
var _ = require('underscore'),
    _str = require('underscore.string'),
    async = require('async'),
    monUtil = require('../mon'),
    extend = require('../mon/extend'),
    mongoose = require('mongoose'),
    connectURI = 'mongodb://localhost/duct_sails',
    Schema = mongoose.Schema;

/**
  * Collection
  *
  * A prototype for managing a collection of database
  * records.
  *
  * This file is the prototype for collections defined using Waterline.
  * It contains the entry point for all ORM methods (e.g. User.find())
  *
  * Methods in this file defer to the adapter for their true implementation:
  * the implementation here just validates and normalizes the parameters.
  */

var Collection = module.exports = function(options, cb) {

  /* establish connection */
  mongoose.connect( connectURI, monUtil.connectionSetup() );

  mongoose.connection.on('error', function(err) {
    if (err) throw err;
  });
  
  // Allow options object to be optional
  if(typeof options === 'function') {
    cb = options;
    options = {};
  }

  var self = this;

  // Throw Error if no Tablename/Identity is set
  if(!this.tableName && !this.identity && !options.tableName && !options.identity) {
    return cb(new Error('A tableName property must be set.'));
  }

  // Normalize tableName to identity
  if(options.tableName) this.identity = options.tableName;

  // Instantiate Base Collection
  // Core.call(this, options);

  // Instantiate Query Language
  // Query.call(this);

  // Register Collection
  var modelName = _str.capitalize( options.identity );

  // Register if there is no model registered already
  if (!mongoose.models[modelName]) {
    var newSchema = new Schema( options.attributes );
    var modelInstance = mongoose.model( modelName, newSchema );
  };

  cb(null, self); /*initiate callback*/

  // this._adapter.registerCollection(function() {

  //   // Sync the schema to the database
  //   self.sync(function(err) {
  //     if(err) return cb(err);

  //     // Call Local Initialize (Made to be overridden)
  //     self.initialize.call(this, options);

  //     cb(null, self);
  //   });
  // });

};

// _.extend(Collection.prototype, Core.prototype, Query.prototype, {
_.extend(Collection.prototype, {
  /**
   * Empty No-Op function to override in a Model
   */
  initialize: function() {}

});

// Make Extendable
Collection.extend = extend;
