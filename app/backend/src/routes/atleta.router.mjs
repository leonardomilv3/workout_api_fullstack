import { Router } from "express";

import AtletaController from "../controllers/atleta.controller.mjs";

const routes = Router();

const atletaController = new AtletaController();


routes.get('/atleta/', (request, response) => {
    atletaController.index(request, response);
})

routes.get('/atleta/:id', (request, response) => {
    atletaController.getOne(request, response);
})

routes.post('/atleta/', (request, response) => {
    atletaController.store(request, response);
})

routes.put('/atleta/:id', (request, response) => {
    atletaController.update(request, response);
})

routes.delete('/atleta/:id', (request, response) => {
    atletaController.destroy(request, response);
})



export default routes;