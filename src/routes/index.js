import newsRouter from './news.js';
import siteRouter from './site.js';
import courseRouter from './course.js';
import productRouter from './product.js';
import meRouter from './me.js';
import loginRouter from './login.js';
import apiRouter from './api.js'


function route(app) {
    app.use('/api/v1', apiRouter);
    app.use('/news', newsRouter);
    app.use('/courses', courseRouter);
    app.use('/products', productRouter);
    app.use('/me', meRouter);
    app.use('/login', loginRouter);
    app.use('/', siteRouter);
}
export default route;
