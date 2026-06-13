# Personal Task Manager

**Exercise 1: Personal Task Manager**

A full-stack task management app that lets you create, view, edit, delete, and filter tasks. Tasks persist across server restarts via a local JSON file. The UI highlights overdue tasks, shows live active/completed counts, and provides context-aware empty states.

---

## Live Demo Links

| | URL |
|---|---|
| Frontend | `https://gleaming-strudel-431a1e.netlify.app` |
| Backend API | `https://personal-task-manager-sirz.onrender.com` |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Backend Framework | Express |
| Frontend | React (Vite) |
| Persistence | Local JSON file (`server/tasks.json`) |

---

## How to Run Locally

The only prerequisite is [Node.js](https://nodejs.org/) (v18+).

**1. Clone the repository**
```bash
git clone https://github.com/<your-username>/personal-task-manager.git
cd personal-task-manager
```

**2. Start the backend**
```bash
cd server
npm install
npm start
```
Server runs on `http://localhost:5000`

**3. Start the frontend** (new terminal)
```bash
cd client
npm install
npm run dev
```
App runs on `http://localhost:3000`

> The Vite dev server proxies all `/api/*` requests to `localhost:5000` automatically — no environment variables needed.

---

## API Documentation

Base URL: `http://localhost:5000`

All request and response bodies are JSON.

---

### GET /api/tasks

Fetch all tasks sorted by creation date, newest first.

**Response `200`**
```json
[
  {
    "id": "uuid",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "dueDate": "2025-07-20",
    "completed": false,
    "createdAt": "2025-07-18T10:00:00.000Z"
  }
]
```

---

### POST /api/tasks

Create a new task.

**Request Body**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "dueDate": "2025-07-20"
}
```

| Field | Required | Type |
|---|---|---|
| `title` | Yes | string |
| `description` | No | string |
| `dueDate` | No | string (YYYY-MM-DD) |

**Response `201`**
```json
{
  "id": "uuid",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "dueDate": "2025-07-20",
  "completed": false,
  "createdAt": "2025-07-18T10:00:00.000Z"
}
```

**Response `400`** — if `title` is missing
```json
{ "error": "title is required" }
```

---

### PATCH /api/tasks/:id

Update any field of an existing task. Send only the fields you want to change.

**Request Body** (all fields optional)
```json
{
  "title": "Buy groceries and cook",
  "description": "Updated list",
  "dueDate": "2025-07-21",
  "completed": true
}
```

**Response `200`** — returns the full updated task object

**Response `404`**
```json
{ "error": "Task not found" }
```

---

### DELETE /api/tasks/:id

Delete a task by ID.

**Response `204`** — no body

**Response `404`**
```json
{ "error": "Task not found" }
```

---

## Project Structure

```
personal-task-manager/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx        # React entry point
│       ├── App.jsx         # Root component: form, filters, task list, stats
│       ├── useTasks.js     # Custom hook: all state, API calls, filter logic
│       ├── api.js          # Thin fetch wrappers for each endpoint
│       └── index.css       # All styles
└── server/
    ├── package.json
    ├── server.js           # Express app + all route handlers
    └── tasks.json          # Flat-file persistence (auto-created)
```

---

## Next Steps

### What works
- [ ] Add what is fully functional in your submission

### What doesn't work / known issues
- [ ] Add any known bugs or incomplete features

### What I would improve with more time
- [ ] Replace flat JSON file with a proper database (e.g. SQLite or MongoDB)
- [ ] Add user authentication so tasks are scoped per user
- [ ] Add drag-and-drop task reordering
- [ ] Write unit tests for the API routes and the `useTasks` hook
- [ ] Add toast notifications instead of `window.confirm` / `alert`
- [ ] Deploy frontend to Vercel and backend to Render
