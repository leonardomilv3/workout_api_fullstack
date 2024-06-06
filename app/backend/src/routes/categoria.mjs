import { Router } from "express";
import Categoria from "../controllers/categoria.controller.mjs";

const routes = Router();

const categoriaController = new Categoria();

routes.get('/categoria/', (request, response) => {
    categoriaController.index(request, response);
})

routes.get('/categoria/:id', (request, response) => {
    categoriaController.getOne(request, response);
})

routes.post('/categoria/', (request, response) => {
    categoriaController.store(request, response);
})

routes.put('/categoria/:id', (request, response) => {
    categoriaController.update(request, response);
})

routes.delete('/categoria/:id', (request, response) => {
    categoriaController.destroy(request, response);
})


export default routes;
