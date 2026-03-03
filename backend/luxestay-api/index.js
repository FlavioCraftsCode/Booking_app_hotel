const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API LuxeStay Online!');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Campos obrigatórios." });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, 0]
        );
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: "E-mail já existe." });
        res.status(500).json({ error: "Erro ao registrar usuário." });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ error: "Usuário não encontrado." });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Senha incorreta." });

        res.json({ id: user.id, name: user.name, email: user.email, is_admin: user.is_admin });
    } catch (err) {
        res.status(500).json({ error: "Erro no servidor." });
    }
});


app.get('/bookings/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const [rows] = await db.query(`
            SELECT b.*, 
                   COALESCE(h.name, 'Hotel LuxeStay') as hotel_name, 
                   COALESCE(h.location, 'Localização Indisponível') as hotel_location
            FROM bookings b
            LEFT JOIN hotels h ON CAST(b.hotel_id AS UNSIGNED) = h.id
            WHERE b.user_id = ?
            ORDER BY b.id DESC
        `, [userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar reservas." });
    }
});

app.post('/bookings', async (req, res) => {
    const { user_id, hotel_id, check_in, check_out, adults, kids, total_price } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO bookings (user_id, hotel_id, check_in, check_out, adults, kids, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [user_id, hotel_id, check_in, check_out, adults || 1, kids || 0, total_price, 'confirmed']
        );
        res.status(201).json({ id: result.insertId, message: "Reserva realizada!" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao salvar reserva." });
    }
});

app.delete('/bookings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM bookings WHERE id = ?', [id]);
        res.json({ message: "Reserva removida." });
    } catch (err) {
        res.status(500).json({ error: "Erro ao remover." });
    }
});


app.get('/admin/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, email, is_admin FROM users ORDER BY id DESC');
        res.json(rows || []);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar usuários para o admin." });
    }
});


app.get('/admin/bookings', async (req, res) => {
    try {

        const [rows] = await db.query(`
            SELECT 
                b.id, b.check_in, b.check_out, b.total_price, b.status,
                COALESCE(u.name, 'Usuário Removido') as user_name,
                COALESCE(h.name, 'Hotel Não Encontrado') as hotel_name
            FROM bookings b
            LEFT JOIN users u ON b.user_id = u.id
            LEFT JOIN hotels h ON CAST(b.hotel_id AS UNSIGNED) = h.id
            ORDER BY b.id DESC
        `);
        res.json(rows || []);
    } catch (err) {
        console.error("ERRO NO ADMIN BOOKINGS:", err);
        res.status(500).json({ error: "Erro ao carregar mapa de reservas.", details: err.message });
    }
});


app.delete('/admin/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM bookings WHERE user_id = ?', [id]);
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: "Usuário e suas reservas foram removidos." });
    } catch (err) {
        res.status(500).json({ error: "Erro ao remover usuário." });
    }
});


app.get('/hotels', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM hotels ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar hotéis." });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 API LuxeStay rodando em http://localhost:${PORT}`);
});