# Task Tracker - Frontend

This repository contains the frontend code for a modern, responsive To-Do List (Task Tracker) web application. It is built entirely using vanilla web technologies: HTML, CSS, and JavaScript. No external frameworks or libraries were used.

This project is intended to serve as the frontend for the `tasktracker-backend` repository. **Note: The frontend and backend are not yet connected.** Currently, this application operates independently as a client-side tool and uses the browser's local storage to save data.

## Features

- **Interactive Welcome Screen**: A stylized, animated entry screen featuring a glowing UI and typing effects.
- **Task Management**: Create new tasks, check them off as completed, and delete them (only completed tasks can be deleted).
- **Task Details**: Add optional descriptions to tasks for better context.
- **Deadlines & Timestamps**: 
  - Set specific deadlines (date and time) for tasks. Overdue tasks are automatically highlighted in red.
  - Automatically records and displays the exact creation date and time for every task.
- **Premium UI**: Features a sleek glassmorphism aesthetic, smooth hover effects, custom typography (Orbitron and Space Grotesk fonts), and an animated gradient background.
- **Local Persistence**: All tasks are saved to the browser's `localStorage`, so data is not lost when refreshing the page.

## Technologies Used

- **HTML5**: For structural layout and semantic elements.
- **CSS3**: For advanced styling, keyframe animations, glassmorphism effects, and responsive design.
- **JavaScript (Vanilla)**: For DOM manipulation, event handling, and local state management.

## How to Run

Because this is a pure HTML/CSS/JS frontend, no installation, package manager, or build process is required. 

To view and interact with the application:
1. Clone or download this repository.
2. Open the `index.html` file directly in any modern web browser.

## Future Plans

The next major step is to connect this frontend to the existing `tasktracker-backend` to enable proper database persistence and server-side logic.
