import { Router } from "express";

import CentroTreinamento from "../controllers/centro-treinamento.controller.mjs";

const routes = Router();

const ctController = new CentroTreinamento();

routes.get('/ct/', (request, response) => {
    ctController.index(request, response);
})

routes.get('/ct/:id', (request, response) => {
    ctController.getOne(request, response);
})

routes.post('/ct/', (request, response) => {
    ctController.store(request, response);
})

routes.put('/ct/:id', (request, response) => {
    ctController.update(request, response);
})

routes.delete('/ct/:id', (request, response) => {
    ctController.destroy(request, response);
})

export default routes;

