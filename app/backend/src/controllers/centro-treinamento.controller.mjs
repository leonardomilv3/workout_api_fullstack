import z from 'zod';
import crypto from 'node:crypto';
import prismaClient from '../utils/prismaClient.mjs';

const centroTreinamentoSchema = z.object({
    id: z.string().min(5).max(20).uuid().optional(),
    nome: z.string().min(3).max(20),
    endereco: z.string().min(5).max(60),
    proprietario: z.string().min(3).max(30),
    createdAt: z.date().optional(),
});

let centroTreinamentos = [];

class CentroTreinamento {

    async index(request, response) {

        const centroTreinamentos = await prismaClient.cT.findMany();

        response.send(centroTreinamentos);
    }
    
    async getOne(request, response) {

        const {id} = request.params;

        try {
            const centroTreinamento = await prismaClient.cT.findUnique({
                where: {
                    id
                }
            });
            response.send({message: centroTreinamento});
        } catch (error) {
            return response.status(400).send(`O CT com id: ${id} não foi encontrado`);
        }

    }

    async store(request, response) {

        const centroTreinamento = request.body;

        const {success, data, error} = centroTreinamentoSchema.safeParse({ 
            nome: centroTreinamento.nome,
            endereco: centroTreinamento.endereco,
            proprietario: centroTreinamento.proprietario
        });

        if(!success){
            return response.status(400).send(error);
        }


        try {

            const newCT = await prismaClient.cT.create({data: {
                nome: data.nome,
                endereco: data.endereco,
                proprietario: data.proprietario
            }});

            response.send({message: 'CT criado com sucesso!', body: newCT});

        } catch (error){

            response.status(404).send({message: error.message});
        }
        
        
        // delete newCT.createdAt, newCT.id;

    }
    
    async update(request, response) {
        
        const {id} = request.params;

        const body = request.body;

        const {success, data, error} = centroTreinamentoSchema.safeParse({
            nome: body.nome,
            endereco: body.endereco,
            proprietario: body.proprietario
        });

        if(!success){
            return response.status(400).send(error);
        }

        try {
            
            await prismaClient.cT.update({
                where: {
                    id
                }, 
                data: {
                    nome: data.nome,
                    endereco: data.endereco,
                    proprietario: data.proprietario,         
                }
            });

            response.send({message: "O CT foi atualizado!"});

        } catch (error) {

            response.send({message: `O CT com id: ${id} não existe.`});
        }
        
    }
    
    async destroy(request, response) {

        const {id} = request.params;

        try {
            await prismaClient.cT.delete({where: {id}})

            response.status(204).send({message: "CT deletado com sucesso!"});

        } catch (error) {

            return response.status(404).send({message: `O CT com id: ${id} não existe.`});

        }

    }
}

export default CentroTreinamento;