# 🌱 Plant Database Supabase

![Status](https://img.shields.io/badge/status-Work%20In%20Progress-orange)
![Demo](https://img.shields.io/badge/type-Demo-blue)

> 🚧 **Project Status: Early Development / Demo**
>
> This project is currently under active development and represents an early-stage demo.
> Features may change, be incomplete, or introduce breaking changes.
> Not recommended for production use yet.

A modern web application built with **Next.js**, **Supabase**, **Tailwind CSS**, and **shadcn/ui** for managing a structured and scalable plant database.

![Plant Database Screenshot](/preview.png)

---

## 🔗 Quick Links

* [Features](#-features)
* [Getting Started](#-getting-started)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)
* [Supabase Setup](#-supabase-setup)
* [Testing & Linting](#-testing--linting)
* [Environment Variables](#-environment-variables)

---

## 🌟 Features

* 🔐 Authentication using Supabase Auth
* 🌿 CRUD operations for plant records (create, edit, view)
* 🔍 Search functionality by plant name or description
* 📄 Detailed plant views with structured information
* 🎨 Modern UI styled with Tailwind CSS and shadcn/ui
* ⚡ Fully functional local development setup

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Orsola86/plant-database-supabase.git
cd plant-database-supabase
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Rename `.env.example` to `.env.local` and add the required keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find these in your Supabase dashboard under **Project Settings → API**.

### 4. Start development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit:

```
http://localhost:3000
```

---

## 🧱 Tech Stack

* **Framework**: Next.js
* **Backend / Database**: Supabase
* **Styling**: Tailwind CSS
* **UI Components**: shadcn/ui
* **Internationalization**: next-intl (optional)
* **Language**: TypeScript
* **Package Manager**: pnpm (or npm/yarn)

---

## 🗂 Project Structure

```
src/
├── app/            # Next.js App Router structure
├── assets/         # Static files (icons, images)
├── components/     # Reusable UI components
├── lib/            # Supabase client & configuration
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── utils/          # Utility/helper functions
```

---

## 🔐 Supabase Setup

1. Sign up at [https://app.supabase.com](https://app.supabase.com)
2. Create a new project
3. Create a `plants` table with fields similar to:

```sql
create table plants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  image_url text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

4. Copy your Supabase project URL and anon key into `.env.local`

---

## 🥪 Testing & Linting

```bash
# Run tests
npm run test

# Lint the code
npm run lint

# Format the code
npm run format
```

---

## 💡 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

You can get these from your Supabase project dashboard under `Settings → API`.
