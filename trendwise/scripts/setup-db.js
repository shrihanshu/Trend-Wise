// scripts/setup-db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Article from '../models/Article.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.log('❌ MONGODB_URI not found in environment variables');
  console.log('');
  console.log('📝 To set up your database:');
  console.log('1. Create a .env.local file in your project root');
  console.log('2. Add your MongoDB connection string:');
  console.log('   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trendwise');
  console.log('');
  console.log('🔗 Get a free MongoDB Atlas cluster at: https://www.mongodb.com/atlas');
  console.log('');
  process.exit(1);
}

console.log('✅ Using MongoDB URI:', MONGO_URI);

const dummyArticles = [
  {
    title: 'AI Revolutionizes Healthcare',
    slug: 'ai-healthcare',
    meta: 'Explore how artificial intelligence is transforming the healthcare industry.',
    content: '<p>Artificial Intelligence is revolutionizing diagnostics, patient care, and research. Experts predict that AI will become an integral part of healthcare delivery systems worldwide.</p><p>From early disease detection to personalized treatment plans, AI is making healthcare more efficient and accessible.</p>',
  },
  {
    title: 'Top 5 JavaScript Frameworks in 2025',
    slug: 'js-frameworks-2025',
    meta: 'Stay updated with the best JavaScript frameworks dominating in 2025.',
    content: '<p>React, Vue, Svelte, SolidJS, and Qwik lead the charts. Here\'s why these frameworks are dominating the JavaScript ecosystem in 2025.</p><p>Performance, developer experience, and ecosystem maturity are key factors driving their popularity.</p>',
  },
  {
    title: 'Climate Change and Global Policy',
    slug: 'climate-policy',
    meta: 'A detailed review of climate change actions taken by global leaders.',
    content: '<p>With rising global temperatures, nations have committed to new environmental goals. The Paris Agreement continues to guide international climate policy.</p><p>Renewable energy adoption and carbon reduction targets are becoming more ambitious worldwide.</p>',
  },
];

async function setupDB() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Clearing existing articles...');
    await Article.deleteMany({});
    console.log('✅ Existing articles removed');

    console.log('📝 Inserting dummy articles...');
    await Article.insertMany(dummyArticles);
    console.log('✅ Dummy articles inserted');

    console.log('🔌 Closing connection...');
    await mongoose.connection.close();
    console.log('✅ Database setup complete!');
    console.log('');
    console.log('🚀 You can now run your application with: npm run dev');
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.log('');
    console.log('💡 Make sure your MongoDB connection string is correct');
    process.exit(1);
  }
}

setupDB(); 