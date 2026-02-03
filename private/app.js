const express = require('express');
const logger = require('./config/logger');
const { connectDB } = require('./config/mongoDB');
//const calculations = require('./helpers/calculations');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Шаблонизатор
app.set('view engine', 'hbs');
app.set('views', 'views');

// Импортируем модели (если нужны)
// const Product = require('./models/Product');

// ========== МАРШРУТЫ ==========

// Главная страница
app.get('/', async (req, res) => {
    try {
        const ipAddress = await fetch('https://api.ipify.org/').then(r => r.text());
        
        logger.info({
            page: '/',
            ip: ipAddress,
            method: req.method,
            userAgent: req.headers['user-agent']
        }, 'Пользователь зашел на /');
        
        const logged = req.query.logged === 'true';
        
        res.render('main', {
            logged: logged,
            ip: ipAddress
        });
    } catch (error) {
        logger.error('Ошибка на /info:', error);
        res.status(500).send('Ошибка сервера');
    }
});