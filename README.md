# Personal Task Manager

Exercise 1 — a simple full-stack app to manage your daily tasks. You can add, edit, delete, and filter tasks. Overdue tasks get highlighted automatically and everything saves to a JSON file so nothing is lost on restart.

---

## Live Demo

| | URL |
|---|---|
| Frontend | https://gleaming-strudel-431a1e.netlify.app |
| Backend | https://personal-task-manager-sirz.onrender.com |

---

## Tech Stack

- Node.js + Express (backend)
- React + Vite (frontend)
- JSON file for storage (no database needed)

---

## Running Locally

You just need Node.js (v18+) installed.

```bash
# clone the repo
git clone https://github.com/kartikkapri/Personal_Task_Manager.git
cd Personal_Task_Manager
```

```bash
# start backend
cd server
npm install
npm start
```

```bash
# start frontend (new terminal)
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:5000`. The Vite proxy handles the `/api` requests automatically so no extra config needed.

---

## API Endpoints

Base URL: `http://localhost:5000`

**GET /api/tasks** — get all tasks, newest first
```json
[{ "id": "uuid", "title": "...", "description": "...", "dueDate": "2025-07-20", "completed": false, "createdAt": "..." }]
```

**POST /api/tasks** — create a task (`title` required)
```json
{ "title": "Buy groceries", "description": "Milk, eggs", "dueDate": "2025-07-20" }
```
Returns `201` with the created task, `400` if title is missing.

**PATCH /api/tasks/:id** — update any field
```json
{ "completed": true }
```
Returns `200` with updated task, `404` if not found.

**DELETE /api/tasks/:id** — delete a task
Returns `204`, `404` if not found.

---

## Project Structure

```
Personal_Task_Manager/
├── client/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── useTasks.js
│       ├── api.js
│       └── index.css
└── server/
    ├── server.js
    └── tasks.json
```

---

## Next Steps

### What works
- Create, edit, delete tasks
- Mark tasks as complete/incomplete
- Filter by All, Active, Completed
- Overdue task highlighting
- Live active/completed count
- Data persists across server restarts

### What doesn't work / known issues
- No user auth — tasks are shared across everyone
- No input sanitization on the backend

### What I'd improve with more time
- Swap JSON file for a real database (MongoDB or SQLite)
- Add user login so tasks are private
- Toast notifications instead of `window.confirm`
- Write tests for the API and the `useTasks` hook
