# 🚀 PrepAI - The Ultimate AI Mock Interview Platform

![PrepAI Banner](https://img.shields.io/badge/PrepAI-Next.js_14-indigo?style=for-the-badge&logo=next.js)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_AI-Google-orange?style=for-the-badge)

**PrepAI** is a premium, beautifully designed full-stack Next.js application that leverages the power of Google's Gemini AI to conduct terrifyingly realistic mock interviews. It helps job seekers construct better answers, practice algorithmic problem solving, and dramatically improve their interview performance through real-time granular AI feedback.

## ✨ Key Features

The application features a stunning **"Nexus Glass" Design System** utilizing fluid animations, rich background gradients, and deep frosted-glass components, giving users an incredibly premium experience. 

### 1. 🤖 AI-Driven Custom Interviews (Student Flow)
- **Dynamic Question Generation:** Input your job role, tech stack, and years of experience, and Gemini AI will dynamically generate 5 highly relevant technical questions.
- **Webcam & Audio Recording:** Record your answers directly within the browser using built-in microphone and webcam integrations.
- **Speech-to-Text Integration:** Your spoken answers are transcribed in real-time and passed to the AI for evaluation.
- **Granular AI Feedback:** Get a strict rating (out of 10) and comprehensive feedback explicitly highlighting what you did well and what you missed.

### 2. 🔐 Advanced Admin Control Flow 
- **Admin Dashboard:** Specific authorized users can access a dedicated admin dashboard (`/dashboard/admin`).
- **Custom Question Setup:** Admins can bypass automatic generation and manually input perfectly tailored questions for specific roles (e.g. Campus Placements, Advanced Architecture Roles).
- **Attempt Tracking Engine:** Admins can view a nested, interactive dashboard showing every student who attempted their custom interview, alongside comprehensive tracking of exactly what they answered and what the AI scored them.
- **One-Click Link Sharing:** Easily generate and distribute specialized interview links directly to student pipelines.

### 3. 🛠️ Robust Architecture & Authentication
- **Clerk Auth Interface:** Fully protected routes securely handled by `Clerk` middleware.
- **Database Architecture:** Uses `Drizzle ORM` connected to a `Neon Serverless Postgres` database for blazing fast, reliable data persistence.

---

## 💻 Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| **Next.js 14** | Application framework (App Router) |
| **React** | Component-based UI library |
| **Tailwind CSS** | Styling, Glassmorphism, & Animations |
| **Google Gemini API** | AI Feedback & Question Generation |
| **Neon Console (PostgreSQL)** | Serverless Database |
| **Drizzle ORM** | Type-safe Database queries |
| **Clerk** | Authentication & User Management |
| **Preact/Lucide-React** | Beautiful SVG icon library |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### 1. Prerequisites
Ensure you have the following installed:
- Node.js (v18+)
- git

### 2. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-mock-interview-PrepAI.git
cd ai-mock-interview-PrepAI
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory. You will need to provision API keys from Clerk, Google AI Studio (Gemini), and Neon Postgres.

```env
# Clerk Authentication Variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Neon PostgreSQL Database URI
NEXT_PUBLIC_DRIZZLE_DB_URL=postgresql://user:password@hostname/dbname?sslmode=require

# Google Gemini API Key
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...
```

### 5. Initialize the Database
Push the Drizzle schema to your Neon postgres database:
```bash
npm run db:push
```

### 6. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📐 Application Architecture & Routing

- `/` - Landing page with animated floating Glass mockups and additional resources.
- `/dashboard` - Protected student dashboard listing mock history and personalized statistics.
- `/dashboard/interview/[id]/start` - The active interview session room (Webcam + Q&A).
- `/dashboard/interview/[id]/feedback` - Immediate post-interview evaluation report.
- `/dashboard/admin` - Protected Admin Dashboard mapping student attempts to specific manual test banks.
- `/dashboard/admin/create` - Admin portal for creating tests bypassing default AI generation.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](https://github.com/yourusername/ai-mock-interview-PrepAI/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


