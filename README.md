# Excel Training Test App

This repo contains a simple React + Vite frontend to create Excel assessment tests. The backend relies on Supabase for authentication, database and storage.

## Setup

1. Install dependencies

```bash
cd frontend
npm install
```

2. Copy `.env.example` to `.env` and provide your Supabase credentials.

3. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

## Features

- Step-by-step form to create a test:
  - Step 1: test name, company name, optional logo upload.
  - Step 2: list of participant emails and button to create the test.
- Test data is saved to Supabase and logo is uploaded to Supabase Storage.
- After creation, a shareable link is displayed.

This is only the first part of the application as described in the specifications.
