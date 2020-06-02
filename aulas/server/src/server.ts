import express from 'express';

const app = express();

app.get('/users', (request, response) =>{
    console.log('Listagem de usuarios');

    response.json([
        'Edmilson',
        'Marcelo',
        'Vinicio',
        'Renan'
    ])
});

app.listen(3000);