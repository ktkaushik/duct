/**
  * Mongoose utils should be covered here
  */

var _ = require('underscore'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    

exports.connectionSetup = function() {
  return {
    host: 'localhost',
    database: 'more_sails_development',
    port: 27017,
    schema: false,
    nativeParser: false,
    safe: true,
    user: 'root', // find a way to determine this ?
    module: 'sails-mongoose'
  }
};
