let activeSchema = new mongoose.Schema({
  activeName: String,
  activeUID: String,
  activeTicker: String, // Если нет тикера, то совпадает с ActiveUID
  activeLocation: String, // Место, где располагается тот или иной актив
  activeCount: Number,
  activeValute: String,
  activeImageURL: String
});
module.exports = mongoose.model('active', activeSchema);