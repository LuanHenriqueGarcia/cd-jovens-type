let db;

function setDatabase(database) {
    db = database;
}

function all(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
}

async function getProfessors() {
    const sql = 'SELECT id, nome, genero, materias, foto FROM professors';
    return all(sql);
}

async function getAlunos() {
    const sql = 'SELECT id, nome, foto, email FROM alunos';
    return all(sql);
}

async function getModulos() {
    const modulos = await all('SELECT id, title FROM modulos');
    const videos = await all('SELECT id, modulo_id, title, description, embedUrl FROM videos');

    const modulosComVideos = modulos.map(modulo => {
        const videosDoModulo = videos
            .filter(video => video.modulo_id === modulo.id)
            .map(video => ({
                id: video.id,
                title: video.title,
                description: video.description,
                embedUrl: video.embedUrl
            }));

        return {
            id: String(modulo.id),
            title: modulo.title,
            videos: videosDoModulo
        };
    });

    return modulosComVideos;
}

async function getVideoComments(videoId) {
    const sql = 'SELECT id, video_id as videoId, text FROM comments WHERE video_id = ? ORDER BY id DESC';
    return all(sql, [videoId]);
}

async function addComment(videoId, text) {
    const sql = 'INSERT INTO comments (video_id, text) VALUES (?, ?)';
    const result = await run(sql, [videoId, text]);
    return { id: result.id, videoId: videoId, text };
}

module.exports = {
    setDatabase,
    getProfessors,
    getAlunos,
    getModulos,
    getVideoComments,
    addComment
};
