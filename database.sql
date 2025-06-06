-- Schema for Codifica Jovens application

CREATE TABLE professors (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    genero TEXT,
    materias TEXT,
    foto TEXT
);

CREATE TABLE alunos (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    foto TEXT,
    email TEXT
);

CREATE TABLE modulos (
    id INTEGER PRIMARY KEY,
    title TEXT
);

CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    modulo_id INTEGER REFERENCES modulos(id),
    title TEXT,
    description TEXT,
    embedUrl TEXT
);

CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_id TEXT REFERENCES videos(id),
    text TEXT NOT NULL
);

-- Sample data
INSERT INTO professors (id, nome, genero, materias, foto) VALUES
(1, 'Eduarda', 'professora', 'Realidade virtual, Robótica e IA', 'img/image.png'),
(2, 'Cleber', 'professor', 'Word, Excel e L\u00f3gica de programa\u00e7\u00e3o', 'img/image1.png');

INSERT INTO alunos (id, nome, foto, email) VALUES
(1, 'Eduarda', 'img/image.png', '-'),
(2, 'Cleber', 'img/image1.png', '-'),
(3, 'Luan', 'img/eu.png', 'adasdasdas'),
(4, 'Renan', 'img/renan.png', 'adasdasdas'),
(5, 'Eduarda', 'img/image.png', 'adasdasdas'),
(6, 'Cleber', 'img/image1.png', 'adasdasdas');

INSERT INTO modulos (id, title) VALUES
(1, 'Introdu\u00e7\u00e3o');

INSERT INTO videos (id, modulo_id, title, description, embedUrl) VALUES
('v1', 1, 'Boas vindas', 'Apresenta\u00e7\u00e3o do curso', 'https://www.youtube.com/embed/example1');

INSERT INTO comments (video_id, text) VALUES
('v1', 'Primeiro!');
