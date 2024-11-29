const db = require('../config/db');

exports.getFandoms = async (req, res) => {
    try {
        const [fandoms] = await db.query('SELECT id, name, category, image_url FROM fandoms');
        res.status(200).json(fandoms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los fandoms' });
    }
};

exports.addFandom = async (req, res) => {
    const { name, category } = req.body;

    if (!name || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        await db.query('INSERT INTO fandoms (name, category) VALUES (?, ?)', [name, category]);
        res.status(201).json({ message: 'Fandom creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el fandom' });
    }
};
