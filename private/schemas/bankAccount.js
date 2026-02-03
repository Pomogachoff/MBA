let bankAccountSchema = new mongoose.Schema({ // Для банковских счетов пользователя
    bankName: String,
    bankUID: String, // 6 символов из набора A-Z(только заглавные), 0-9 
    accountUID: String, // Уникальные индетификаторы счетов в банках(пример, в РФ - номер счёта)
    accountImageURL: String,
    accountCount: Number,
    accountName: String,
    transactionArray: Array
});
module.exports = mongoose.model('bankAccount', bankAccountSchema);