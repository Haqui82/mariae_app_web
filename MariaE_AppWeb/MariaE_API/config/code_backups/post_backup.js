const sequelize = require('../config/db'); // Importa la conexión desde config/db.js

const express = require('express');
const router = express.Router();

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'haqui',
  database: 'mariae_fashiongirls'
});

// Función para crear una entrada en cualquier tabla
async function createEntry(table, columns, values) {
  const columnsStr = columns.join(', ');
  const placeholders = columns.map(() => '?').join(', ');
  const sql = `INSERT INTO ${table} (${columnsStr}) VALUES (${placeholders})`;
  const [result] = await pool.execute(sql, values);
  return result;
}

// Función para obtener todas las entradas de cualquier tabla
async function getEntries(table) {
  const sql = `SELECT * FROM ${table}`;
  const [rows] = await pool.execute(sql);
  return rows;
}

// Función para obtener una entrada por ID de cualquier tabla
async function getEntryById(table, idColumn, id) {
  const sql = `SELECT * FROM ${table} WHERE ${idColumn} = ?`;
  const [rows] = await pool.execute(sql, [id]);
  return rows[0];
}

// Función para actualizar una entrada por ID en cualquier tabla
async function updateEntryById(table, idColumn, id, columns, values) {
  const updates = columns.map(column => `${column} = ?`).join(', ');
  const sql = `UPDATE ${table} SET ${updates} WHERE ${idColumn} = ?`;
  const [result] = await pool.execute(sql, [...values, id]);
  return result;
}

// Función para eliminar una entrada por ID de cualquier tabla
async function deleteEntryById(table, idColumn, id) {
  const sql = `DELETE FROM ${table} WHERE ${idColumn} = ?`;
  const [result] = await pool.execute(sql, [id]);
  return result;
}

router.post('/create', async (req, res) => {
  try {
    const { table, columns, values } = req.body;
    const result = await createEntry(table, columns, values);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send('Error al crear la entrada');
  }
});

router.get('/entries/:table', async (req, res) => {
  try {
    const { table } = req.params;
    const entries = await getEntries(table);
    res.json(entries);
  } catch (error) {
    res.status(500).send('Error al obtener las entradas');
  }
});

router.get('/entry/:table/:idColumn/:id', async (req, res) => {
  try {
    const { table, idColumn, id } = req.params;
    const entry = await getEntryById(table, idColumn, id);
    if (entry) {
      res.json(entry);
    } else {
      res.status(404).send('Entrada no encontrada');
    }
  } catch (error) {
    res.status(500).send('Error al obtener la entrada');
  }
});

router.put('/update/:table/:idColumn/:id', async (req, res) => {
  try {
    const { table, idColumn, id } = req.params;
    const { columns, values } = req.body;
    const result = await updateEntryById(table, idColumn, id, columns, values);
    res.json(result);
  } catch (error) {
    res.status(500).send('Error al actualizar la entrada');
  }
});

router.delete('/delete/:table/:idColumn/:id', async (req, res) => {
  try {
    const { table, idColumn, id } = req.params;
    const result = await deleteEntryById(table, idColumn, id);
    res.json(result);
  } catch (error) {
    res.status(500).send('Error al eliminar la entrada');
  }
});

module.exports = router;
