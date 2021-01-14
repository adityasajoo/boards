const exphbs = require('express-handlebars');
module.exports = function handlebarsConfig(app) {
    console.log('Setting up Handlebars');
    app.engine('hbs', exphbs({
        defaultLayout: 'main',
        extname: '.hbs'
    }));
    app.set("view engine", 'hbs');

    return app;
};