const mongoose = require('mongoose');
const logger = require('./logger');

// Функция подключения к MongoDB
const connectDB = async () => {
  try {
    // Получаем URI из .env или используем по умолчанию
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mba';
    
    // Опции подключения (только самые важные)
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Подключаемся к базе данных
    await mongoose.connect(mongoURI, options);
    
    logger.info('✅ MongoDB подключена успешно');
    
    // Обработчики событий подключения
    mongoose.connection.on('error', (error) => {
      logger.error(`❌ Ошибка MongoDB: ${error.message}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB отключена');
    });

  } catch (error) {
    logger.error(`❌ Ошибка подключения к MongoDB: ${error.message}`);
    // Завершаем процесс, если не удалось подключиться
    process.exit(1);
  }
};

// Функция для безопасного отключения
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB соединение закрыто');
  } catch (error) {
    logger.error('Ошибка при закрытии соединения с MongoDB:', error);
  }
};

// Экспортируем функции и mongoose
module.exports = {
  connectDB,
  disconnectDB,
  mongoose // чтобы использовать в моделях
};