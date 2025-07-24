# 📝 Task Management App

A full-stack Task Management application built with:

- **Laravel** (REST API)
- **React + TypeScript** (Frontend)
- **Tailwind CSS** (UI Styling)
- **DnD Kit** (Drag-and-drop support)
- **Jest + Testing Library** (Unit Testing)

---

## 📁 Folder Structure

frontend/
│
├── public/ # Static assets
│ └── index.html # Main HTML template
│
├── src/
│ ├── assets/ # Static image/icons/fonts
│ ├── pages/ # Reusable UI components
│ │ ├── Dashboard.tsx
│ │ ├── AddCategoryModal.tsx
│ │ ├── AddTaskModal.tsx
│ │ ├── Column.tsx
│ │ ├── Login.tsx
│ │ ├── Register.tsx
│ │ ├── SortableTask.tsx
│ │ └── TaskFilter.tsx
│ │
│ ├── components/ Modal.tsx
│ │
│ ├── hooks/ # Custom React hooks (if any)
│ │
│ ├── lib/ # Axios instance & API helpers
│ │ └── axios.ts
│ │
│ ├── tests/ # Unit and integration tests
│ │ ├── AddTaskModal.test.tsx
│ │ ├── AddCategoryModal.test.tsx
│ │ └── Dashboard.test.tsx
│ │
│ ├── App.tsx # App root component
│ ├── index.tsx # Entry point for React
│ └── index.css # TailwindCSS import and global styles
│
├── tailwind.config.ts # TailwindCSS config
├── postcss.config.js # PostCSS config
├── vite.config.ts # Vite config
├── tsconfig.json # TypeScript config
├── jest.config.js # Jest config for testing
└── package.json # NPM dependencies and scripts

# Go to the frontend folder:

cd frontend

# Install dependencies:

npm install

# Start the dev server:

npm run dev

# Run Frontend To avoid CSRF Token Error

Run Frontend at http://127.0.0.1:5173

# Test Cases

# Frontend (React):

npm run test

- Tests are written using:
- Jest
- React Testing Library
- Mocks for axios

## 🚀 Build & Deploy Instructions for React Frontend

This project is built using **React + Vite + TypeScript + TailwindCSS**.

---

### 📦 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/) (for version control, optional)

---

### 🛠️ Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/your-repo.git
cd frontend
```

npm install

2. **Run in Development Mode**
   npm run dev
   http://127.0.0.1:5173

3. **Build for Production**
   npm run build
