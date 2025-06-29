# TrendWise

> An AI-powered, SEO-optimized blog platform that fetches trending topics and auto-generates rich articles using ChatGPT.

---

##  Features

###  Backend Bot
- Fetch trending topics from **Google Trends** and **Twitter**
- Gather related **images**, **videos**, and **articles**
- Send data to **OpenAI API (ChatGPT)** to generate SEO-structured content
- Save content to MongoDB with:
  - Title
  - Slug
  - Meta tags
  - Media (YouTube, Tweets, Images)
  - Full content

###  Blog Frontend
- **Homepage**:
  - Lists all articles with title, thumbnail, and excerpt
- **Detail Page**:
  - Full article view with embedded media
  - SEO meta tags (title, OG tags)
- **Search Bar**:
  - Filter articles by keyword/title

###  User Authentication
- Google Login via **NextAuth.js**
- Logged-in users can:
  - Post comments on articles
  - View their comment history

###  ChatGPT Integration
- Generate blog posts using OpenAI API
- Structured with:
  - SEO-optimized content (H1–H3, meta)
  - Embedded tweets, videos, and images
  - Open Graph tags

---

## ⚙ Tech Stack

| Frontend     | Backend            | AI & APIs        | Auth         | DB         |
|--------------|--------------------|------------------|--------------|------------|
| Next.js (App Router) | Node.js + API Routes | OpenAI API       | NextAuth.js | MongoDB    |
| Tailwind CSS | Mongoose           | Google Trends API | Google OAuth |            |

---

##  Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/trendwise.git
cd trendwise
