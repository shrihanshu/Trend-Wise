// scripts/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Article from '../models/Article.js'; // adjust if your path is different

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trendwise';

console.log('Using MongoDB URI:', MONGO_URI);

const dummyArticles = [
  {
    title: 'AI Revolutionizes Healthcare',
    slug: 'ai-healthcare',
    meta: 'Explore how artificial intelligence is transforming the healthcare industry.',
    content: '<p>Artificial Intelligence is revolutionizing diagnostics, patient care, and research. Experts predict...</p>',
  },
  {
    title: 'Top 5 JavaScript Frameworks in 2025',
    slug: 'js-frameworks-2025',
    meta: 'Stay updated with the best JavaScript frameworks dominating in 2025.',
    content: '<p>React, Vue, Svelte, SolidJS, and Qwik lead the charts. Here\'s why...</p>',
  },
  {
    title: 'Climate Change and Global Policy',
    slug: 'climate-policy',
    meta: 'A detailed review of climate change actions taken by global leaders.',
    content: '<p>With rising global temperatures, nations have committed to new environmental goals...</p>',
  },
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Article.deleteMany({});
    console.log('Existing articles removed');

    await Article.insertMany(dummyArticles);
    console.log('Dummy articles inserted');

    mongoose.connection.close();
    console.log('DB connection closed');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

seedDB();
