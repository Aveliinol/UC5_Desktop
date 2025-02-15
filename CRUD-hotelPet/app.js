const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const port = process.env.port
app.use(express.json());
const bancoPets = []

//Listar todos os pets
app.get('/', (req, res) => {
    try {
        if(bancoPets.length === 0){
            return res.status(200).json({msg:"Não há pets a serem exibidos"})
        }
        res.status(200).json(bancoPets)
    } catch (error) {
       res.status(500).json({msg:"Erro ao buscar pets!"})
    }
})

//Listar pets por id 
app.get('/pet/:id', (req, res) => {
    try {
        const pet = bancoPets.find(i => i.id === 
            parseInt(req.params.id));
        if(!pet) {
            return res.status(404).json({msg:"Pet não encontrado"});
        }
            res.json(pet); 
    } catch (error) {
        res.status(500).json({msg:"Erro ao buscar pet!"})
    }
})

//Registrar pet
app.post('/', (req, res) => {
    try {
        const {id, nome, especie, raca,
            status, dono} = req.body;
        const novoPet = {id, nome, especie, raca, 
            status, dono};
        bancoPets.push(novoPet);    
          res.status(201).json(novoPet)
    } catch (error) {
        res.status(500).json({msg:"Erro ao registrar pet!"})
    }
})

//atualizar status
app.put('/:id', (req, res) => {
    try {
        const pet = bancoPets.find(i => i.id === 
            parseInt(req.params.id));
            const {novoStatus} = req.body;
        if(!pet) {
            return res.status(404).json({msg:"Pet não encontrado"});
        }
        if(pet){
            pet.status = novoStatus;
        }
            res.status(200).json(pet)
    } catch (error) {
        res.status(500).json({msg:"Erro ao atualizar pet!"}) 
    }
})

//Deleta registro
app.delete('/:id', (req, res) => {
    try {
        const pet = bancoPets.findIndex(i => i.id === 
            parseInt(req.params.id));
        if(pet === -1){
            return res.status(404).json({msg:"Pet não encontrado"}); 
        }
        bancoPets.splice(pet, 1)
          res.status(201).send();
    } catch (error) {
        
    }
})

app.listen(port, () => {
    console.log(`Iniciando servidor em http://localhost:${port}`);
});
