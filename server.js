const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'techlogistics'
});

// Endpoint para obtener todos los pedidos
app.get('/pedidos', (req, res) => {
    db.query('SELECT * FROM Pedidos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint para crear un nuevo pedido
app.post('/pedidos', (req, res) => {
    const { ClienteID, FechaPedido, EstadoID } = req.body;
    db.query('INSERT INTO Pedidos (ClienteID, FechaPedido, EstadoID) VALUES (?, ?, ?)', [ClienteID, FechaPedido, EstadoID], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId });
    });
});

app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});

import React, { useEffect, useState } from 'react';

const App = () => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/pedidos')
            .then(response => response.json())
            .then(data => setPedidos