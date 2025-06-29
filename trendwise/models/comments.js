import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  articleSlug: String,
  userEmail: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
