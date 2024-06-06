import z from 'zod';
import crypto from 'node:crypto';

const centroTreinamentoSchema = z.object({
    id: z.string().min(5).max(20).uuid().optional(),
    nome: z.string().min(3).max(20),
    endereco: z.string().min(5).max(60),
    proprietario: z.string().min(3).max(30),
    createdAt: z.date().optional(),
    createdBy: z.string().optional()
})

let centroTreinamentos = [];

class CentroTreinamento {

    index(request, response) {
        response.send(centroTreinamentos);
    }
    
    getOne(request, response) {

        const {id} = request.params;

        const centroTreinamento = centroTreinamentos.find((ct) => { return ct.id === id });

        if(!centroTreinamento){
            return response.status(400).send(`O CT com id: ${id} não foi encontrado`);
        }

        response.send({message: centroTreinamento});
    }

    store(request, response) {

        const centroTreinamento = request.body;

        const {success, data, error} = centroTreinamentoSchema.safeParse({ 
            nome: centroTreinamento.nome,
            endereco: centroTreinamento.endereco,
            proprietario: centroTreinamento.proprietario
        });

        if(!success){
            return response.status(400).send(error);
        }

        const [id] = crypto.randomUUID().split('-');

        data.id = id;
        data.createdAt = new Date();
        data.createdBy = "System";

        centroTreinamentos.push(data);

        response.send({message: 'store CT', body: data});
    }
    
    update(request, response) {
        
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

        const newCT = centroTreinamentos.map((ct) => {
            if (ct.id === id){
                return { 
                    ...ct,
                    nome: data.nome,
                    endereco: data.endereco,
                    proprietario: data.proprietario
                };
            }

            return ct;
        });

        centroTreinamentos = newCT;
        
        response.send({message: "O CT foi atualizado!"});
    }
    
    destroy(request, response) {

        const {id} = request.params;

        centroTreinamentos = centroTreinamentos.filter((ct) => { return (ct.id !== id) })

        if (centroTreinamentos.length === 0){
            return response.status(404).send(`O CT com id: ${id} não existe.`)
        }

        response.status(204).send();
    }
}

export default CentroTreinamento;