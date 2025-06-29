import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

export async function GET(req) {
  await connectDB();
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '6');
  const skip = (page - 1) * limit;

  const articles = await Article.find().skip(skip).limit(limit);
  const total = await Article.countDocuments();

  return NextResponse.json({ articles, total });
}