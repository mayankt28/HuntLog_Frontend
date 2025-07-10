# 🎮 HuntLog – Job Tracking App Frontend

HuntLog is a visually unique job application tracker with a pixel-art, 8-bit arcade aesthetic and a Discord-inspired UI. Built using React, Tailwind CSS, and Vite, it offers a fast, responsive, and delightful user experience.

---

## 🚀 Features

- 🔐 JWT Authentication (Login, Register, Forgot Password)
- 🎮 Retro Discord-style Theme (Pixel fonts, custom colors)
- 🧩 Modular API integration (Axios + refresh token support)
- 🧱 Reusable components (Buttons, Modals, Cards, Skeletons)
- 📂 Export job data as CSV (filtered or full list)
- 🖋️ Edit/Delete job entries with confirmation modals

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4.1](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Axios](https://axios-http.com/)

---

## ⚙️ Setup Instructions

1. **Clone the repo:**

```bash
git clone https://github.com/mayankt28/huntlog_frontend.git
cd huntlog_frontend
````

2. **Install dependencies:**

```bash
npm install
# or
yarn
```

3. **Configure environment:**

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000/api
```

4. **Run the development server:**

```bash
npm run dev
```

---

## 🧪 Build for Production

```bash
npm run build
```

Then preview with:

```bash
npm run preview
```

---

## 📁 Folder Structure

```
src/
│
├── api/            # Axios API modules
├── assets/         # Backgrounds, videos, logos
├── components/     # Reusable UI components
├── context/        # Auth context
├── pages/          # Route pages (Login, Register, Dashboard)
└── App.jsx         # Main entry
```

---

## 📸 Demo

> Coming soon...

---

## 📄 License

MIT – feel free to use, modify, and share.

---

### Made with ❤️ by Mayank Tiwari

