const db = require('../config/db');

exports.getMessagesByForum = async (req, res) => {
    const { forum_id } = req.params;

    try {
        const [messages] = await db.query(
            'SELECT messages.*, users.name FROM messages JOIN users ON messages.user_id = users.id WHERE forum_id = ?',
            [forum_id]
        );
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los mensajes' });
    }
};

exports.createMessage = async (req, res) => {
    const { user_id, forum_id, content } = req.body;

    if (!user_id || !forum_id || !content) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        await db.query('INSERT INTO messages (user_id, forum_id, content) VALUES (?, ?, ?)', [
            user_id,
            forum_id,
            content,
        ]);
        res.status(201).json({ message: 'Mensaje creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el mensaje' });
    }
};
