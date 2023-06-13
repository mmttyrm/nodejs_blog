const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

app.use(morgan('combined'));

//template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));
//route
app.get('/', (req, res) => {
    res.render('home');
});

//127.0.0.1 - localhost

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
