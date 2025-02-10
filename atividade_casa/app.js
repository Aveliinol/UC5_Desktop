const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();


const port = process.env.PORTA;


app.use(express.json());
const livros = [];

app.get('/livros', (req, res) => {
    res.json(livros)
});

app.post('/livros', (req, res) => {
    const {id, titulo, autor, ano, genero, 
        sinopse } = req.body;

    if( !id || !titulo || !autor || !ano 
    || !genero || !sinopse) {
        return res.status(400).json({mensage: "Todos os campos são obrigatórios!"});
    }    

    if(livros.some(livro => livro.id === id)){
        return res.status(400).json({mensage: "Livro com este ID já esta cadastrado!"});
    }

const novoLivro = {id, titulo, autor, ano, genero,
    sinopse};
    livros.push(novoLivro);
    
    res.status(201).json({mensage:"Livro cadastrado com sucesso!", livro:novoLivro});
});

app.listen(port, () => {
    console.log(`Iniciando servidor em http://localhost:${port}`);
});

