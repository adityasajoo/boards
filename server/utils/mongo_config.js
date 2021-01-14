const mongoose = require('mongoose');
module.exports = function mongoConfig() {
    mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify: false
        });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console,'connection error'));
    db.once('open',function(){
        console.log('Connected to mongo')
    });

    return db;
};