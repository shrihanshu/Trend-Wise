import { connectDB } from '@/lib/mongodb';
import Comment from '@/models/comments';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const comment = await Comment.create(body);
  return NextResponse.json(comment);
}

export async function GET(req) {
  await connectDB();
  const url = new URL(req.url);
  const articleId = url.searchParams.get('articleId');
  const comments = await Comment.find({ articleId });
  return NextResponse.json(comments);
}