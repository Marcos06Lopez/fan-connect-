const db = require('../config/db');

exports.getForumsByFandom = async (req, res) => {
    const { fandom_id } = req.params; // Extrae el fandom_id de los parámetros de la ruta

    if (!fandom_id) {
        return res.status(400).json({ error: 'Se requiere el ID del fandom' });
    }

    try {
        const [forums] = await db.query('SELECT * FROM forums WHERE fandom_id = ?', [fandom_id]);
        if (forums.length === 0) {
            return res.status(404).json({ message: 'No se encontraron foros para este fandom' });
        }
        res.status(200).json(forums);
    } catch (error) {
        console.error('Error al obtener los foros:', error);
        res.status(500).json({ error: 'Error al obtener los foros' });
    }
};

exports.createForum = async (req, res) => {
    const { title, description, fandom_id } = req.body; // Extrae los datos del cuerpo de la solicitud

    if (!title || !fandom_id) {
        return res.status(400).json({ error: 'El título y el fandom son obligatorios' });
    }

    try {
        await db.query('INSERT INTO forums (title, description, fandom_id) VALUES (?, ?, ?)', [
            title,
            description,
            fandom_id,
        ]);
        res.status(201).json({ message: 'Foro creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el foro:', error);
        res.status(500).json({ error: 'Error al crear el foro' });
    }
};

exports.getForumById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Se requiere el ID del foro' });
    }

    try {
        const [forum] = await db.query('SELECT * FROM forums WHERE id = ?', [id]);
        if (forum.length === 0) {
            return res.status(404).json({ message: 'Foro no encontrado' });
        }
        res.status(200).json(forum[0]);
    } catch (error) {
        console.error('Error al obtener el foro:', error);
        res.status(500).json({ error: 'Error al obtener el foro' });
    }
};

exports.updateForum = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Se requiere el ID del foro' });
    }

    try {
        const [result] = await db.query(
            'UPDATE forums SET title = ?, description = ? WHERE id = ?',
            [title, description, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Foro no encontrado' });
        }
        res.status(200).json({ message: 'Foro actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el foro:', error);
        res.status(500).json({ error: 'Error al actualizar el foro' });
    }
};

exports.deleteForum = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Se requiere el ID del foro' });
    }

    try {
        const [result] = await db.query('DELETE FROM forums WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Foro no encontrado' });
        }
        res.status(200).json({ message: 'Foro eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el foro:', error);
        res.status(500).json({ error: 'Error al eliminar el foro' });
    }
};
