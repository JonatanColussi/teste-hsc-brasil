import { Router } from 'express';
import RecordController from '../app/controllers/RecordController';

const routes = new Router();

routes.get('/', RecordController.command);

export default routes;
