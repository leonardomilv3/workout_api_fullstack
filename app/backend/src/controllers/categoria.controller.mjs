import z from 'zod';
import prismaCliente from '../utils/prismaClient.mjs'

const categoriaSchema = z.object({
    id: z.string().uuid().optional(),
    nome: z.string().min(3),
    createdAt: z.date().optional(),
});


class Categoria {

    async index(request, response) {

        const categorias = await prismaCliente.categoria.findMany();
        response.send(categorias);
    }

    async getOne(request, response) {
        
        const {id} = request.params;

        try {
            
            const categoria = await prismaCliente.categoria.findUnique({
                where: {
                    id
                }
            });

            response.send(categoria);
        } catch (error) {
            response.status(404).send({message: `A categoria com id: ${id} não existe.` });
        }

    }

    async store(request, response) {

        const body = request.body;

        const {success, data, error} = categoriaSchema.safeParse({
            nome: body.nome,
        });


        if (!success){
            return response.status(400).send({message: error});
        }

        try {
            
            const categoria = await prismaCliente.categoria.create({
                data: {
                    nome: data.nome
                }
            });

            response.send({message: "A categoria foi criada com sucesso!", body: categoria});

        } catch (error) {
            response.status(400).send({message: error});
        }

    }
    
    async update(request, response) {

        const {id} = request.params;

        const categoria = request.body;

        const {success, data, error} = categoriaSchema.safeParse({
            nome: categoria.nome,
        });

        if (!success){
            return response.status(400).send({message: error});
        }

        try {
            await prismaCliente.categoria.update({
                where: {
                    id
                },
                data: {
                    nome: categoria.nome
                }
            });

            response.send({message: "A categoria foi atualizada com sucesso!"});
        } catch (error) {
            response.status(400).send({message: error});
        }

        response.send('update CATEGORIA');
    }
    
    async destroy(request, response) {

        const {id} = request.params;

        try {
            await prismaCliente.categoria.delete({
                where: {
                    id
                }
            });

            response.send({message: `A categoria com id: ${id} foi excluída.`});

        } catch {
            response.status(400).send({message: `A categoria com id: ${id} não existe.`}); 
        }

    }

}

export default Categoria;