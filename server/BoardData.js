const Board = require('./models/board');
const log = require('./utils/log');
const myCRUD = require('./controllers/controller');

const BoardData = function (id, objects) {
    this.boardId = (id) ? id : 'temp';
    this.lastSaved = Date.now();
    this.objects = (objects) ? objects : [];
    this.users = new Set();
    this.currentPage = 0;
    this.pages = 0;
}

/**
 * @description Add a object to the board
 * @param {Object} object 
 */
BoardData.prototype.add = function (object) {
    this.objects.push(object);
    this.delaySave();
}

/**
 * @description Returns all the objects of the board
 */
BoardData.prototype.getAll = function () {
    return this.objects;
}

/**
 * @description Add the user to the board
 * @param {String} user  
 */
BoardData.prototype.addUser = function (user) {
    this.users.add(user);
}

/**
 * @description Remove user from the board
 * @param {String} user 
 */
BoardData.prototype.removeUser = function (user) {
    this.users.delete(user);
}


BoardData.prototype.delaySave = function () {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(this.save.bind(this), process.env.SAVE_DELAY);
}

BoardData.prototype.save = function () {
    Board.findOneAndUpdate({
        boardId: this.boardId
    }, {
        objects: this.objects,
        pages:this.pages
    }, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    }, function (err, savedBoard) {
        if (err) return console.error(err);
        console.log('Saving Board : ', savedBoard.boardId);
    });
}


BoardData.load = async function  (id) {
    let boardData = new BoardData(id),data = [],pages;
    let board = await myCRUD.retirieveOne({boardId : boardData.boardId});
    if(board){
        //board exists
        console.log(`Board Found, Loading....`);
        data = board.objects;
        pages = board.pages;
    }else{
        console.log(`Board Not Found, Creating one...`);
        data = [];
        pages = 1;
    }
    boardData.objects = data;
    boardData.pages = pages;
     return boardData;
  
}




module.exports.BoardData = BoardData;