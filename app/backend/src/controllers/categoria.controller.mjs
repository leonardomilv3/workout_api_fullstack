import z from 'zod';

const CategoriaSchema = z.object({
    id: z.string().uuid(),
    nome: z.string().min(3),
})

class Categoria {

    index(request, response) {
        response.send('index CATEGORIA');
    }
    
    getOne(request, response) {
        response.send('getOne CATEGORIA');
    }

    store(request, response) {
        response.send('store CATEGORIA');
    }
    
    update(request, response) {
        response.send('update CATEGORIA');
    }
    
    destroy(request, response) {
        response.send('destroy CATEGORIA');
    }

}

export default Categoria;