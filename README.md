# /**Frontend**/

# 📝 Task Management App

A full-stack Task Management application built with:

- **Laravel** (REST API)
- **React + TypeScript** (Frontend)
- **Tailwind CSS** (UI Styling)
- **DnD Kit** (Drag-and-drop support)
- **Jest + Testing Library** (Unit Testing)

---

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
git clone https://github.com/raman333singh90/Task-Manager
cd frontend
```

npm install

2. **Run in Development Mode**
   npm run dev
   http://127.0.0.1:5173

3. **Build for Production**
   npm run build

# /**Backend**/

cd

composer install

cp .env.example .env
php artisan key:generate

php artisan migrate

php artisan serve

The API will run at http://127.0.0.1:8000.

---

## 🔧 Setup Instructions

### 🔙 Backend (Laravel API)

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | `/api/login`           | Login with email/password |
| POST   | `/api/logout`          | Logout user               |
| GET    | `/api/categories`      | Get all categories        |
| POST   | `/api/categories`      | Create new category       |
| DELETE | `/api/categories/{id}` | Delete category           |
| GET    | `/api/tasks`           | Get all tasks             |
| POST   | `/api/tasks`           | Create new task           |
| DELETE | `/api/tasks/{id}`      | Delete task               |
| PUT    | `/api/tasks/reorder`   | Update task order         |

```

### 🔙 Backend (Laravel Upload CSV Code)

http://127.0.0.1:8000/

Upload File and Check
```
