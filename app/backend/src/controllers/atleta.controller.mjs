import z from 'zod';
import crypto from 'node:crypto';

const AtletaSchema = z.object({
    id: z.string().uuid(),
    nome: z.string().min(3).max(50),
    cpf: z.string().min(11).max(11),
    idade: z.number().min(0).max(120),
    peso: z.number(),
    altura: z.number(),
    sexo: z.string().min(1).max(1),
})


class AtletaController {
    
    index(request, response) {
        response.send('index');
    }
    
    getOne(request, response) {
        response.send('getOne');
    }

    store(request, response) {
        response.send('store');
    }

    update(request, response) {
        response.send('update');
    }

    destroy(request, response) {
        response.send('destroy');
    }

}

export default AtletaController;