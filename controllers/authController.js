const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.registerUser = async (req, res) => {
    const { name, email, password, fandoms } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO users (name, email, password, fandoms) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, fandoms]
        );

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user: user[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};
