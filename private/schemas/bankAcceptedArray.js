let bankAcceptedArraySchema = new mongoose.Schema({
  bankName: String,
  bankUID: String,
  bankLocation: String, // Формат "эмоджи_флага название_страны"
  bankImageURL: String,
  bankAccountCount: Number // Количество отслеживаемых счетов
});
module.exports = mongoose.model('bankAcceptedArray', bankAcceptedArraySchema);