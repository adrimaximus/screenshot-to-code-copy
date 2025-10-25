# AI Development Rules

This document outlines the technology stack and coding conventions for AI-driven development of this application. Following these rules ensures consistency, maintainability, and leverages the existing architecture effectively.

## Tech Stack

-   **Frontend Framework**: React with Vite for a fast and modern development experience.
-   **Language**: TypeScript for type safety and improved code quality on the frontend.
-   **Backend Framework**: FastAPI (Python) for building a high-performance API.
-   **Styling**: Tailwind CSS for a utility-first styling approach.
-   **UI Components**: shadcn/ui, built on top of Radix UI, for accessible and reusable components.
-   **State Management**: Zustand for simple and scalable global state management.
-   **Routing**: React Router for all client-side navigation.
-   **Real-time Communication**: WebSockets for streaming code generation from the backend to the frontend.
-   **AI Integration**: The backend communicates with various large language models (LLMs) like OpenAI, Anthropic, and Gemini.

## Library Usage Rules

-   **UI Components**: Always use pre-built components from the **shadcn/ui** library (located in `src/components/ui`). Do not create custom components for common UI elements like buttons, dialogs, or inputs if a suitable one already exists.
-   **Styling**: All styling must be done using **Tailwind CSS** utility classes directly in the JSX. Avoid writing separate CSS files or using inline `style` attributes.
-   **State Management**: Use **Zustand** for managing global application state. Follow the existing pattern of creating separate stores for different concerns (e.g., `app-store.ts`, `project-store.ts`).
-   **Icons**: Use icons exclusively from the **`lucide-react`** package for consistency.
-   **Notifications**: For user feedback, such as success messages or errors, use **`react-hot-toast`**.
-   **Routing**: All client-side routes must be managed using **React Router**. The main route definitions are located in `src/main.tsx`.
-   **Code Editor**: When a code editor interface is needed, use the existing **`CodeMirror`** component found in `src/components/preview/CodeMirror.tsx`.
-   **Backend (Python)**: The backend is built with **FastAPI**. All dependencies must be managed with **Poetry**, and all Python code must include strict type hints.