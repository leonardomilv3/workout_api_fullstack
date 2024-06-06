import express, { response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import atletaRoutes from './routes/atleta.router.mjs';
import centroTreinamentotRoutes from './routes/centro-treinamento.router.mjs';
import categoriaRoutes from './routes/categoria.mjs';
import { request } from 'http';
import { error } from 'console';

const server = express();

const PORT = process.env.PORT || 5000;

server.use(helmet());
server.use(cors());
server.use(morgan("combined"))
server.use(express.json());
server.use(atletaRoutes);
server.use(centroTreinamentotRoutes);
server.use(categoriaRoutes);

server.use((error, request, response, next) => {
    console.log(error.stack);

    response.status(500).send({ message: error.message});
});

server.use('*', (request, response) => {
    response.status(404).send({ message: "Route not found"});
});

server.listen(PORT, () => {
    console.log(`Estou na porta ${PORT}`);
});