# AISIBVS 🛰️: AI Search Intelligence & Brand Visibility System

**AISIBVS** is a high-performance, full-stack intelligence suite designed to monitor and analyze brand visibility within AI-generated search results (like Google Gemini, Perplexity, and ChatGPT). 

It provides real-time insights into how brands are being ranked, the sentiment of those mentions, and actionable gaps in the market.

---

## 🎨 Features & Capabilities

### 1. AI Analysis Engine (The "Brain")
*   **Search Intent Classifier**: Instantly identifies if a query is **Informational**, **Transactional**, or **Navigational**.
*   **Sentiment Tracking**: Real-time analysis of brand mentions (Positive, Neutral, Negative).
*   **Visibility Scoring**: Calculates a weighted score for brands based on their rank and context in AI responses.

### 2. Strategic Visualizations
*   **Market Opportunity Radar**: A 6-cell grid that identifies "Brand Gaps" and "Niche Dominance," showing where new brands can win.
*   **Brand Power Gauge**: A high-end radial meter that visualizes the market dominance of the top-performing brand.
*   **Competitor Share Chart**: A dynamic bar chart comparing visibility across all mentioned brands.

### 3. Deep Intelligence
*   **Product Extraction**: Automatically pulls specific product names and features mentioned in the search.
*   **Intelligent Linking**: Generates direct links to product pages or official sites for easy navigation.
*   **AI Recommendations**: Provides custom-tailored advice on how to improve a brand's AI SEO ranking.

---

## 🏗️ Technical Architecture

The project uses a **Unified Full-Stack Architecture** designed for speed and scalability:

*   **Frontend**: Built with **Next.js 15 (App Router)** & **React 19**.
    *   Styling: **Tailwind CSS** with a custom "Glassmorphism" design system.
    *   Animations: **Framer Motion** for smooth, premium transitions.
*   **Backend**: Powered by **FastAPI (Python)**.
    *   AI: **Google Gemini 1.5 Flash** for lightning-fast, structured analysis.
    *   Processing: Custom NLP logic to parse AI responses into structured data.
*   **Database**: **Supabase (PostgreSQL)**.
    *   Stores historical analysis, query logs, and market opportunity maps.

---

## 🚀 Local Setup & Installation

Follow these steps to get the project running on your own machine.

### **1. Prerequisites**
*   **Python 3.10+**
*   **Node.js 18+**
*   **Git**

### **2. Environment Variables**
Create a `.env` file in the project root with the following:
```env
# AI
GEMINI_API_KEY=your_key_here

# Database
SUPABASE_URL=your_project_url
SUPABASE_KEY=your_anon_key
```

### **3. Running the Backend**
```bash
# From the project root
python -m uvicorn api.index:app --reload
```
*The API will be available at `http://localhost:8000`.*

### **4. Running the Frontend**
```bash
# From the project root (in a second terminal)
npm install
npm run dev
```
*The Dashboard will be available at `http://localhost:3000`.*

---

## 📂 Project Structure

*   `/api`: The FastAPI backend logic and AI engine.
*   `/src/app`: The main Next.js application pages.
*   `/src/components`: Reusable UI components (Charts, Widgets, Input).
*   `/public`: Static assets and icons.
*   `vercel.json`: Configuration for cloud deployment.
*   `schema.sql`: SQL commands to set up your Supabase database.

---

## 🛡️ License
Built with ❤️ by [mkcodes4](https://github.com/mkcodes4).
