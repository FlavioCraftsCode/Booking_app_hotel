const db = require('./db');

async function testar() {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS resultado');
        console.log('✅ Conexão bem-sucedida! Resultado:', rows[0].resultado);
        process.exit(0);
    } catch (err) {
        console.error('❌ Erro ao conectar:', err.message);
        process.exit(1);
    }
}

testar();
