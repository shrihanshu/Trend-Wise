import { connectDB } from '@/lib/mongodb';
import Comment from '@/models/comments';

export default async function handler(req, res) {
  await connectDB();
  if (req.method === 'POST') {
    const comment = await Comment.create(req.body);
    res.status(200).json(comment);
  }
}
