import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars';
import methodOverride from 'method-override';
import cors from 'cors';
import data from './config/db/index.js';
import { fileURLToPath } from 'url';


data();
const app = express();


//Thư viện cho phép truy cập API 
app.use(cors());
const port = 3000;

import route from './routes/index.js';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));


//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


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
