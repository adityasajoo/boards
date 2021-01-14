const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const boardSchema = new mongoose.Schema({
  boardId: {
    type:String,
    unique:true,
    required:true,
  },
  objects: {
    type: Array,
    default: []
  },
  pages:{
    type:Number,
    default:1
  }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board; 