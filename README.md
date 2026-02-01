# 🤖 AI-Powered Mock Interview Platform

A futuristic, interactive web application that conducts real-time technical interviews using AI. It simulates a real interviewer by asking adaptive questions, listening to your spoken answers, and providing instant, granular feedback on your performance.

![AI Interviewer Demo](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop)

## ✨ Key Features

-   **🧠 Adaptive AI Interviewer**: Powered by **Google Gemini 1.5 Flash**, generating unique, context-aware questions based on your specific job role and resume.
-   **🗣️ Real-time Speech-to-Text**: Uses the browser's native Speech Recognition API to capture your verbal answers instantly.
-   **📄 Smart Resume Parsing**: Upload your PDF resume, and the AI tailors questions to your actual experience and skills.
-   **📊 AI Scorecard & Feedback**: Get graded on **Accuracy**, **Clarity**, **Depth**, and **Relevance**. The AI explains *why* you got that score and how to improve.
-   **🔐 Secure Authentication**: Integrated with **Supabase Auth** for secure Google OAuth login.
-   **💾 Cloud Database**: Persistent history of your mock interviews and progress using **Supabase Postgres**.
-   **🎨 Premium UI/UX**: Built with React, TailwindCSS, and framer-motion-like animations for a sleek, modern feel.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), TypeScript
-   **Styling**: TailwindCSS
-   **AI Core**: Google Gemini API (`@google/generative-ai`)
-   **Backend/DB**: Supabase (Auth & Database)
-   **Speech**: Web Speech API (SpeechRecognition)
-   **Parsing**: PDF.js

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18+)
-   A **Supabase** Project (for Auth & DB)
-   A **Google Gemini** API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/tamilamudhan182/ai-interview-platform.git
    cd ai-interview-platform
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your credentials:
    ```env
    # Supabase Configuration
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

    # Note: The Gemini API Key is currently managed within the application logic
    # but should ideally be moved here for production.
    ```

4.  **Database Setup**
    Run the SQL script provided in `supabase_schema.sql` in your Supabase SQL Editor to create the necessary tables (`interviews`, `answers`) and security policies.

5.  **Run the App**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
