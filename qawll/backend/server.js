// backend/server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Укажите путь к вашей БД из DBeaver
const dbPath = 'C:\\Users\\MiRinnDa\\Desktop\\Mirinnda\\Qwerty';

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Ошибка подключения к БД:', err);
    } else {
        console.log('✅ Подключение к SQLite успешно');
    }
});
// 
// API эндпоинты для ваших таблиц
// Сессия
app.get('/api/session', (req, res) => {
    const sessionApi = `
    SELECT 
        session.name as sessionName,
        startTime,
        filmDuration,
        hall.name, hall.numOfSeats
    FROM session
    LEFT JOIN hall ON session.hall_id = hall.id 
    `
    db.all(sessionApi, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Посетители
app.get('/api/customers', (req, res) => {
    const customersApi = `
SELECT 
    customers.id,
    customers.name as name,
    customers.passportDetails
FROM customers
    `
    db.all(customersApi, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/api/customers', (req, res) => {
    const { name, passportDetails } = req.body;

    if (!name || !passportDetails) {
        return res.status(400).json({ error: 'Имя и паспортные данные обязательны' });
    }

    const sql = `INSERT INTO customers (name, passportDetails) VALUES (?, ?)`;
    
    db.run(sql, [name, passportDetails], function(err) {
        if (err) {
            console.error('Ошибка при добавлении посетителя:', err);
            return res.status(500).json({ error: 'Ошибка базы данных' });
        }
        
        // Возвращаем добавленного посетителя с ID
        res.json({
            id: this.lastID,
            name: name,
            passportDetails: passportDetails
        });
    });
});


// Удаление посетителя
app.delete('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    
    const sql = `DELETE FROM customers WHERE id = ?`;
    
    db.run(sql, [id], function(err) {
        if (err) {
            console.error('Ошибка при удалении посетителя:', err);
            return res.status(500).json({ error: 'Ошибка базы данных' });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Посетитель не найден' });
        }
        
        res.json({ message: 'Посетитель успешно удален', id: id });
    });
});

// Обновление посетителя
app.put('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    const { name, passportDetails } = req.body;

    if (!name || !passportDetails) {
        return res.status(400).json({ error: 'Имя и паспортные данные обязательны' });
    }

    const sql = `UPDATE customers SET name = ?, passportDetails = ? WHERE id = ?`;
    
    db.run(sql, [name, passportDetails, id], function(err) {
        if (err) {
            console.error('Ошибка при обновлении посетителя:', err);
            return res.status(500).json({ error: 'Ошибка базы данных' });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Посетитель не найден' });
        }
        
        res.json({
            id: parseInt(id),
            name: name,
            passportDetails: passportDetails
        });
    });
});

// Организация
app.get('/api/organization', (req, res) => {
    const organizationApi = `
    SELECT 
        organization.name as organizationName,
        openingHours,
        adress,
        numOfHalls
    FROM organization
    `
    db.all(organizationApi, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});



// Залы
app.get('/api/hall', (req, res) => {
    const hallApi = `
    SELECT 
        hall.name as hallName,
        hall.numOfSeats,
        hall.typeOfShowing,
        organization.name as organizationName
    FROM hall
    LEFT JOIN organization ON hall.organization_id = organization.id
    `;
    db.all(hallApi, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Сотрудники
app.get('/api/employee', (req, res) => {
    const employeeApi = `
    SELECT 
        employee.name as employeeName,
        employee.passportDetails,
        employee.jobTitle,
        organization.name as organizationName
    FROM employee
    LEFT JOIN organization ON employee.organization_id = organization.id
    `;
    db.all(employeeApi, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Чеки
app.get('/api/receipt', (req, res) => {
    const receiptApi = `
    SELECT 
        receipt.data,
        session.name as sessionName,
        customers.name as customerName,
        hall.name as hallName,
        organization.name as organizationName
    FROM receipt
    LEFT JOIN session ON receipt.session_id = session.id
    LEFT JOIN customers ON receipt.customers_id = customers.id
    LEFT JOIN hall ON receipt.hall_id = hall.id
    LEFT JOIN organization ON receipt.organization_id = organization.id
    `;
    db.all(receiptApi, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});



// LEFT JOIN связанная_таблица ON текущая_таблица.внешний_ключ = связанная_таблица.первичный_ключ



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});