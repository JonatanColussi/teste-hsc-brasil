import { Router } from 'express';
import RecordController from '../app/controllers/RecordController';
import RecordRestController from '../app/controllers/RecordRestController';

const routes = new Router();

routes.get('/', RecordController.command);

routes.get('/dbsize', RecordRestController.dbsize);
routes.post('/incr/:key', RecordRestController.incr);
routes.put('/zadd/:key', RecordRestController.zadd);
routes.get('/zcard/:key', RecordRestController.zcard);
routes.get('/zrank/:key/:member', RecordRestController.zrank);
routes.get('/zrange/:key', RecordRestController.zrange);
routes.get('/:key', RecordRestController.get);
routes.put('/:key', RecordRestController.set);
routes.delete('/:key', RecordRestController.del);

export default routes;
