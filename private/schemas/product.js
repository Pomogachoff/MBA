let productSchema = new mongoose.Schema({ // Для продуктов в рекламном разделе
    productURL: String,
    moneyCount: Number,
    moneyValute: String,
    percenteCount: Number
});
module.exports = mongoose.model('product', productSchema);