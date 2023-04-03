var path = require('path');
import express from 'express';
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')
const morgan = require('morgan');
import data from './config/db';



data();
const app = express();
const port = 3000;

import route from './routes';


app.use(express.static(path.join(__dirname, 'public')));
// app.use(morgan('combined'))

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});


