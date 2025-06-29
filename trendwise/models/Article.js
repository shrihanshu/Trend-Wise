import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  meta: String,
  media: [String],
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
