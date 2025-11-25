const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const authenticateToken = require('../middleware/auth'); 

router.get('/professors', async (req, res) => {
    try {
        const professors = await dataController.getProfessors();
        res.json(professors);
    } catch (error) {
        console.error('Erro ao buscar professores:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/alunos', async (req, res) => {
    try {
        const alunos = await dataController.getAlunos();
        res.json(alunos);
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/modulos', async (req, res) => {
    try {
        const modulos = await dataController.getModulos();
        res.json(modulos);
    } catch (error) {
        console.error('Erro ao buscar módulos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/videos/:videoId/comments', async (req, res) => {
    try {
        const { videoId } = req.params;
        const comments = await dataController.getVideoComments(videoId);
        res.json(comments);
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.post('/videos/:videoId/comments', authenticateToken, async (req, res) => {
    try {

        const { videoId } = req.params;
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'O texto do comentário é obrigatório' });
        }
        
        const newComment = await dataController.addComment(videoId, text);
        
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
