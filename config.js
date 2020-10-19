var mongodb = require('mongodb')
var mongodClient = mongodb.MongoClient;
var url = process.env.MongoUrl

module.exports = {url,mongodClient}