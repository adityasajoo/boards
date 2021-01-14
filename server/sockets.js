const BoardData = require('./BoardData').BoardData;

//all open boards 
let boards = {}

async function getBoard(id, user) {
    let board;
    if (boards[id]) {   
        board = boards[id];              
    } else {
        board = await BoardData.load(id);
        board.currentPage  = 0;
        boards[id] = board;
    }
    boards[id].addUser(user);
    return board;
}

module.exports = function start(io) {
    console.log('Initializing Sockets');

    io.on('connection', (socket) => {
        console.log('New Connection');
        socket.on('join',async (room) => {
            socket.join(room);
            socket.room = room;
            let board = await getBoard(room, socket.id);
            socket.emit("load",{"objects" : board.getAll(), "currentPage" : board.currentPage,"pages":board.pages});
        });

        socket.on('draw', (object) => {
            boards[socket.room].add(object);
            socket.to(object.room).broadcast.emit("draw", object);
        })

        socket.on('nextPage', (room) => {
            boards[socket.room].currentPage++;
            socket.to(room).broadcast.emit("nextPage");
            
        })

        socket.on('previousPage', (room) => {
            if(boards[socket.room].currentPage !== 0){
                boards[socket.room].currentPage--;
            }
            socket.to(room).broadcast.emit("previousPage");
        })

        socket.on('newPage',(room)=>{
            boards[room].pages++;
            boards[room].save();
        })

        socket.on('disconnecting', () => {
            if (boards[socket.room]) {
                boards[socket.room].removeUser(socket.id);
                boards[socket.room].save();
                if (boards[socket.room].users.size === 0) delete boards[socket.room];
                console.log(`${socket.id} is disconnecting from ${socket.room} `);
            }
        })
    });



}