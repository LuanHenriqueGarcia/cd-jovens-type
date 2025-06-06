const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

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

// In-memory comments storage
const comments = [];

app.get('/api/professors', (req, res) => {
  res.json(professors);
});

app.get('/api/alunos', (req, res) => {
  res.json(alunos);
});

app.get('/api/modulos', (req, res) => {
  res.json(modulos);
});

// Get comments for a specific video
app.get('/api/videos/:videoId/comments', (req, res) => {
  const { videoId } = req.params;
  const videoComments = comments.filter(c => c.videoId === videoId);
  res.json(videoComments);
});

// Add a comment to a video
app.post('/api/videos/:videoId/comments', (req, res) => {
  const { videoId } = req.params;
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const comment = { id: comments.length + 1, videoId, text };
  comments.push(comment);
  res.status(201).json(comment);
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
