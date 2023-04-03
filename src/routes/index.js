import newsRouter from './news';
import siteRouter from './site';
import courseRouter from './course';
import productRouter from './product';
import meRouter from './me';
import apiRouter from './api'


function route(app) {
    app.use('/api/v1', apiRouter);
    app.use('/news', newsRouter);
    app.use('/courses', courseRouter);
    app.use('/products', productRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}
export default route;
