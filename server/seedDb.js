const mongoose = require("mongoose");
const readline = require("readline");
const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
mongoose.connect(" mongodb+srv://adi:adi@cluster0.8xfgw.mongodb.net/boards?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    r.question("Are you sure you want to clear the main database ? [Y/N]", function (choice) {
        if (choice === 'Y' || choice === 'y') {
            mongoose.connection.db.dropDatabase(function () {
                mongoose.connection.close(() => {
                    console.log("Main database cleared");
                });
            });
        } else {
            mongoose.connection.close(() => {
                console.log("Database not cleared");
            });
        }
        r.close();
    });

});