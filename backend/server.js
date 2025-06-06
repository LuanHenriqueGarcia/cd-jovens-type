const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Professors data
const professors = [
  { id: 1, nome: 'Eduarda', genero: 'professora', materias: 'Realidade virtual, Robótica e IA', foto: 'img/image.png' },
  { id: 2, nome: 'Cleber', genero: 'professor', materias: 'Word, Excel e Lógica de programação', foto: 'img/image1.png' }
];

// Alunos data
const alunos = [
  { id: 1, nome: 'Eduarda', foto: 'img/image.png', email: '-' },
  { id: 2, nome: 'Cleber', foto: 'img/image1.png', email: '-' },
  { id: 3, nome: 'Luan', foto: 'img/eu.png', email: 'adasdasdas' },
  { id: 4, nome: 'Renan', foto: 'img/renan.png', email: 'adasdasdas' },
  { id: 5, nome: 'Eduarda', foto: 'img/image.png', email: 'adasdasdas' },
  { id: 6, nome: 'Cleber', foto: 'img/image1.png', email: 'adasdasdas' }
];

// Modules data
const modulos = [
  {
    id: '1',
    title: 'Introdução',
    videos: [
      { id: 'v1', title: 'Boas vindas', description: 'Apresentação do curso', embedUrl: 'https://www.youtube.com/embed/example1' }
    ]
  }
];

app.get('/api/professors', (req, res) => {
  res.json(professors);
});

app.get('/api/alunos', (req, res) => {
  res.json(alunos);
});

app.get('/api/modulos', (req, res) => {
  res.json(modulos);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
