require('dotenv').config();
const app = require('./app');
const logger = require('./config/logger');
const { connectDB } = require('./config/mongoDB');

const PORT = process.env.PORT || 3000;

// Функция запуска
const start = async () => {
    try {
        // Подключаем базу данных (если нужна)
        await connectDB();
        
        // Запускаем сервер
        app.listen(PORT, () => {
            logger.info(`
            🚀 Сервер запущен!
            📍 Порт: ${PORT}
            📂 Режим: ${process.env.NODE_ENV || 'development'}
            ⏰ Время: ${new Date().toLocaleString('ru-RU')}
            `);
            logger.info(`🌍 Открой http://localhost:${PORT}`);
        });
        
    } catch (error) {
        logger.error('Не удалось запустить сервер:', error);
        process.exit(1);
    }
};

start();