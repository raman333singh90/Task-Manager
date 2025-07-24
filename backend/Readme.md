---
## 🚀 Features

- User login/logout using Laravel Sanctum
- Create, update, delete **categories** and **tasks**
- Drag-and-drop tasks between categories using DnD Kit
- Modal-based forms (Radix UI or custom)
- Task filtering and search
- Persistent order of tasks (sortable index)
- Fully tested with Jest + React Testing Library
---

## 🔧 Setup Instructions

### 🔙 Backend (Laravel API)

1. Go to the backend folder:

```bash
cd backend
composer install

cp .env.example .env
php artisan key:generate


php artisan migrate


php artisan serve

The API will run at http://127.0.0.1:8000.


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
