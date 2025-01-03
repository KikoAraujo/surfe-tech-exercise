# **Note-Taking App**

Welcome to this Note-Taking App! This repository contains a small note-taking application built with **React**. The app includes an input field for setting the note title, a text area for taking notes, automatic saving, and a collaborative @mention feature

---

## **Features**

### **1. Note-taking Text-area**

- A dedicated input field for setting the title of your note.

### **1. Note-taking Text-area**

- A text-area for inputting free plain text.

### **2. Auto-save and Load Notes**

- Notes are automatically saved when the user stops typing.

### **3. Collaborative @mention Feature**

- Mention users by typing `@` in the text-area.
- Displays a dynamic list of users as you type, showing the top 5 relevant results.
- Mentions are styled differently to stand out in the text.

---

## **Technologies Used**

- **React** (preferred framework)
- **Typescript** (optional but used for better type safety)
- **Tailwind CSS** (for styling)

---

## **API Endpoints**

### **Notes**

- **POST**: `https://challenge.surfe.com/SESSION/notes` (to save a note)
- **PUT**: `https://challenge.surfe.com/SESSION/notes/{ID}` (to update a note)
- **GET**: `https://challenge.surfe.com/SESSION/notes` (to fetch all notes)
- **GET**: `https://challenge.surfe.com/SESSION/notes/{ID}` (to fetch a specific note)

### **Users**

- **GET**: `https://challenge.surfe.com/users` (to fetch available users for mentions)

---

## **Installation and Setup**

### **Prerequisites**

- **Node.js** (version 14+ recommended)
- **npm** or **yarn** for package management

### **Steps**

1. Clone this repository:

   ```bash
   git clone https://github.com/KikoAraujo/surfe-tech-exercise.git

   ```

2. Navigate to the project directory:

   ```bash
   cd surfe-tech-exercise

   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Start the development server:
   ```bash
   npm start
   ```

---

## **Project Structure**

The project is organized to ensure maintainability and scalability. Below is an overview:

```plaintext
├── src/
│   ├── assets/          # Static assets like images or fonts
│   ├── components/      # Reusable UI components (e.g., buttons, inputs)
│   ├── hooks/           # Custom React hooks for shared logic
│   ├── pages/           # Page-level components for layouts
│   ├── services/        # Business logic and API interactions
│   ├── types/           # TypeScript type definitions and interfaces
│   ├── utils/           # Shared utility functions
│   ├── App.tsx          # Main application component
│   ├── index.css        # Global styles
│   ├── index.tsx        # Entry point of the React app
├── test/
│   ├── e2e/             # End-to-end tests for workflows
│   ├── unit/            # Unit tests for individual functions and components
├── public/              # Static files like `index.html` and favicon
└── README.md            # Project documentation
```

---

## **Usage**

### **Saving and Loading Notes**

- Start typing in the text-area. Notes will automatically save after a pause in typing.
- Refresh the page to see the note loaded back.

### **Mentioning Users**

- Type `@` followed by the first few letters of a username.
- A dropdown with up to 5 matching users will appear. Select a user to mention them.

## Testing

### **Available scripts to run unit and e2e tests**

- `npm run unit_tests`: Runs tests with Jest in watch mode.
- `npm run e2e_tests`: Runs Playwright tests.
