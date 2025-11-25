const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'codifica_jovens.db');
const SQL_SCRIPT_PATH = path.join(__dirname, '..', '..', '..', 'database.sql');

function initializeDatabase() {
    return new Promise((resolve, reject) => {
        const dbExists = fs.existsSync(DB_PATH);
        const db = new sqlite3.Database(DB_PATH, (err) => {
            if (err) {
                console.error('Erro ao abrir o banco de dados:', err.message);
                return reject(err);
            }
            console.log('Conectado ao banco de dados SQLite.');

            if (!dbExists) {
                console.log('Banco de dados não existe. Criando e populando...');
                fs.readFile(SQL_SCRIPT_PATH, 'utf8', (err, sql) => {
                    if (err) {
                        console.error('Erro ao ler o script SQL:', err.message);
                        return reject(err);
                    }
                    db.exec(sql, (err) => {
                        if (err) {
                            console.error('Erro ao executar o script SQL:', err.message);
                            return reject(err);
                        }
                        console.log('Banco de dados populado com sucesso.');
                        resolve(db);
                    });
                });
            } else {
                resolve(db);
            }
        });
    });
}

module.exports = initializeDatabase;
