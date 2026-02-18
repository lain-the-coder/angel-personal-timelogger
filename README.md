# Angel's Personal TimeLogger

A lightweight, no-framework time tracking app built with vanilla HTML, CSS, and JavaScript.

---

## Why I built this

I wanted a simple way to track billable hours across different clients and projects without relying on a paid tool. But more importantly, I used this project as a deliberate learning exercise — every feature was an opportunity to properly understand a concept rather than just copy-paste a solution.

---

## What it does

- Track time spent on tasks across different clients and projects
- Live timer that counts up in real time while you work
- Logs are saved locally in your browser — no backend, no accounts, no setup
- Automatically filters to show only the current work week
- Calculates total hours logged for the week
- Delete tasks you no longer need

---

## Concepts covered

This project touched a surprising number of real JavaScript and web development concepts:

**JavaScript core**

- `localStorage` for client-side data persistence
- JSON serialization and deserialization
- `Date` objects, timestamps, and time arithmetic
- `setInterval` and `clearInterval` for the live timer
- Timestamp-based timing (immune to interval drift)
- Array methods — `filter`, `forEach`, `findIndex`, `splice`, `reduce`
- DOM manipulation — `createElement`, `innerHTML`, `appendChild`
- Template literals
- Form validation
- Event listeners
- `beforeunload` for protecting unsaved state

**CSS**

- CSS custom properties (design system with variables)
- Responsive layout with flexbox and grid
- `nth-child` selectors for table column targeting
- Dark theme with white card islands

**General engineering thinking**

- Data modeling (how to structure a task object)
- Edge case handling (0 second tasks, accidental deletes, mid-timer refresh)
- Separating concerns between rendering, data, and logic
- Working week date logic (calculating Monday 00:00 as the filter boundary)

---

## What I'd add next

- CSV export for billing
- Multiple week history view
- Edit a logged task
- Client/project filter on the table

---

## How to run it

No build step, no dependencies, no package.json. Just open `index.html` in your browser or serve it with any local server like VS Code Live Server.

```
git clone https://github.com/your-username/timelogger.git
cd timelogger
open index.html
```

---

Built as a learning project. Simple on the surface, deliberate underneath.
