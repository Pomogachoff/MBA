let express = require(`express`);
let app = express();
let port = 3000;
let mongoose = require(`mongoose`); // подключаем MongoDB
mongoose.connect(`mongodb://localhost:27017/mba`);

const hbs = require(`hbs`);
app.set(`views`, `public`);
app.set(`view engine`, `hbs`)
app.use(express.static(`public`));
app.use(express.urlencoded({ extended: true }));
const moment = require('moment-timezone');

const fs = require('fs');
const path = require('path');
const pino = require('pino');
const pretty = require('pino-pretty');

// Создаем директорию logs, если её нет
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}
const logStream = fs.createWriteStream(path.join(logDir, 'app.log'), { flags: 'a' });

//Настройка pino-pretty
const prettyStream = pretty({
  colorize: false, // Для файла цвета не нужны
   translateTime: (timestamp) => {
    return moment.utc(timestamp).tz('Asia/Yekaterinburg').format('YYYY-MM-DD HH:mm:ss');
  },
  ignore: 'pid,hostname',
});

const combinedStream = prettyStream.pipe(logStream);

const logger = pino({
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: () => {
    const now = new Date();
    const iso = now.toISOString(); // ISO строка для `pino-pretty`
    const localized = moment.utc(iso).tz('Asia/Yekaterinburg').format('YYYY-MM-DD HH:mm:ss');
    return `,"time":"${localized}"`; // Добавляем в JSON
  },
}, pino.multistream([
  { stream: prettyStream },  // терминал
  { stream: logStream },     // файл
]));

logger.info('Приложение запущено');

let productSchema = new mongoose.Schema({ // Для продуктов в рекламном разделе
    productURL: String,
    moneyCount: Number,
    moneyValute: String,
    percenteCount: Number
});