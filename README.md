# FINRL-DEEPSEEK — AI Risk-Aware Trading Intelligence Platform

This platform allows users to interact with reinforcement learning trading models powered by LLM-generated signals.

## Project Structure
- `backend/`: Node.js + Express API (using in-memory data store for demo).
- `frontend/`: Next.js (App Router) with TailwindCSS and Shadcn UI.

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (No MongoDB required for this demo):
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Features
- **AI Workspace**: Chat-style interface for market analysis.
- **Risk Analysis**: Real-time Sf (Sentiment) and Rf (Risk) factor generation.
- **Visual Analytics**: Interactive charts for price, equity, and drawdown.
- **Authentication**: Secure JWT-based auth system.
