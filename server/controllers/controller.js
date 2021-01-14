const mongoose = require('mongoose');
const Board = require('../models/board');

const CRUD = {
    retirieveOne:function(query){
      return new Promise((resolve, reject) => {
        Board.findOne(query, function(err, result) {
           if (err){ 
            console.log(err);   
            reject(err)};
           resolve(result);
        });
      });
    }
}

module.exports = CRUD;