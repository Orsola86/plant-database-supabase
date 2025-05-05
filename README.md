# 🌱 Plant Database Supabase

A modern web application built with **Next.js**, **Supabase**, **Tailwind CSS** and **Shadcn/ui** for managing a comprehensive plant database.

![Plant Database Screenshot](/preview.png)

## 🔗 Quick Links

- [Getting Started](#-getting-started)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Icon System](#icon-system)
- [Development Tools](#development-tools)
- [Documentation](#documentation)
- [Project Management](#project-management)

---

## 🌟 Features

* 🔐 Authentication using [Supabase Auth](https://supabase.com/docs/guides/auth)
* 🌿 CRUD operations for plant records (create, edit, view)
* 🔍 Search functionality by plant name or description
* 📄 Detailed plant views with structured information
* 🎨 Styled with [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com)
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

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧱 Tech Stack

* **Framework**: [Next.js](https://nextjs.org)
* **Backend**: [Supabase](https://supabase.com)
* **Styling**: [Tailwind CSS](https://tailwindcss.com)
* **UI Library**: [shadcn/ui](https://ui.shadcn.com)
* **Internationalization**: [next-intl](https://github.com/amannn/next-intl) (optional)
* **Package Manager**: pnpm (or npm/yarn)

---

## 🗂 Project Structure

```
src/
├── app/            # Next.js app router structure
├── assets/         # Static files (icons, images)
├── components/     # UI components
├── lib/            # Supabase client, configs
├── hooks/          # Custom hooks
├── types/          # TypeScript types
├── utils/          # Utility functions
```

---

## 🔐 Supabase Setup

1. [Sign up at Supabase](https://app.supabase.com)
2. Create a new project
3. Set up a `plants` table with desired fields, for example:

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

4. Copy your Supabase project URL and keys into `.env.local`

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

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

You can get these from your Supabase project dashboard under `Settings → API`.
