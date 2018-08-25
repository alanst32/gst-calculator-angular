


var mongoose = require('mongoose');

var CalcHistorySchema = new mongoose.Schema({
  inputPrice: Number,
  priceAfter: Number,
  gstAmount: Number,
  createdAt: {type: Date, default: Date.now}
});

// Model name, schema, collection name
module.exports = mongoose.model('CalcHistory', CalcHistorySchema, 'CalcHistory');
