const mongoose = require('mongoose');
const logger = require('./logger'); // Убедись, что logger.js существует

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mba';
    
    // Начиная с Mongoose 6, useNewUrlParser и useUnifiedTopology больше не нужны.
    await mongoose.connect(mongoURI);
    
    logger.info('✅ MongoDB подключена успешно');
    
    mongoose.connection.on('error', (error) => {
      logger.error(`❌ Ошибка MongoDB: ${error.message}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB отключена');
    });

  } catch (error) {
    logger.error(`❌ Ошибка подключения к MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB соединение закрыто');
  } catch (error) {
    logger.error('Ошибка при закрытии соединения с MongoDB:', error);
  }
};

module.exports = {
  connectDB,
  disconnectDB,
  mongoose
};