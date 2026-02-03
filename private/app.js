const express = require('express');
const path = require('path');
const logger = require('./config/logger');
const { connectDB } = require('./config/mongoDB');
// const calculations = require('./helpers/calculations');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Шаблонизатор - исправленный путь
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views')); // views на уровень выше private

// Импортируем модели (если нужны)
// const Product = require('./models/Product');

// ========== МАРШРУТЫ ==========

app.get('/', (req, res) => {
    try {
        logger.info({
            page: '/',
            method: req.method,
            userAgent: req.headers['user-agent']
        }, 'Пользователь зашел на главную');
        
        const logged = req.query.logged === 'true';
        
        // Просто рендерим шаблон без IP
        res.render('main', {
            logged: logged,
            title: 'MBA - Главная',
            message: 'Добро пожаловать!'
        });
    } catch (error) {
        logger.error('Ошибка на /:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// Health check маршрут
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'MBA Backend',
        version: '1.0.0'
    });
});

// Тестовый маршрут без fetch
app.get('/test', (req, res) => {
    res.json({
        message: 'Тест пройден!',
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development'
    });
});

// Маршрут /info БЕЗ fetch (пока)
app.get('/info', (req, res) => {
    const logged = req.query.logged === 'true';
    
    // Если есть шаблон info.hbs - используй его
    // res.render('info', { logged });
    
    // Или просто JSON
    res.json({
        page: 'info',
        logged: logged,
        timestamp: new Date().toISOString(),
        userAgent: req.headers['user-agent']
    });
});

// Обработка 404
app.use((req, res) => {
    logger.warn(`404: ${req.method} ${req.url}`);
    res.status(404).json({
        error: 'Not Found',
        message: `Маршрут ${req.method} ${req.url} не найден`
    });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    logger.error('Ошибка сервера:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method
    });
    
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Что-то пошло не так'
    });
});

module.exports = app;